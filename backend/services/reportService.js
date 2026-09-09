const Tarea = require('../models/tasks');
const Proyecto = require('../models/project');

const getSummary = async (userId) => {
  const [totalProyectos, totalTareas, tareasCompletadas] = await Promise.all([
    Proyecto.countDocuments({ usuario: userId }),
    Tarea.countDocuments({ usuario: userId }),
    Tarea.countDocuments({ usuario: userId, estado: 'completada' }),
  ]);

  const porcentajeCompletadas = totalTareas > 0
    ? Math.round((tareasCompletadas / totalTareas) * 10000) / 100
    : 0;

  return { totalProyectos, totalTareas, tareasCompletadas, porcentajeCompletadas };
};

const getTasksByStatus = async (userId) => {
  const result = await Tarea.aggregate([
    { $match: { usuario: userId } },
    { $group: { _id: '$estado', count: { $sum: 1 } } },
  ]);

  const estados = ['pendiente', 'en_progreso', 'completada'];
  const counts = Object.fromEntries(estados.map((e) => [e, 0]));
  result.forEach((r) => { counts[r._id] = r.count; });

  return estados.map((estado) => ({ estado, count: counts[estado] }));
};

const getTopProjectsWithPendingTasks = async (userId) => {
  return Tarea.aggregate([
    { $match: { usuario: userId, estado: 'pendiente' } },
    { $group: { _id: '$proyecto', pendingCount: { $sum: 1 } } },
    { $sort: { pendingCount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'proyectos',
        localField: '_id',
        foreignField: '_id',
        as: 'proyecto',
      },
    },
    { $unwind: '$proyecto' },
    {
      $project: { _id: 0, proyectoId: '$proyecto._id', proyectoNombre: '$proyecto.nombre', pendingCount: 1 },
    },
  ]);
};

const getProductivityByDate = async (userId) => {
  const hace30Dias = new Date();
  hace30Dias.setDate(hace30Dias.getDate() - 30);

  const result = await Tarea.aggregate([
    { $match: { usuario: userId, estado: 'completada', fechaCompletada: { $gte: hace30Dias } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$fechaCompletada' } }, completedCount: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  return result.map((r) => ({ fecha: r._id, completedCount: r.completedCount }));
};

module.exports = { getSummary, getTasksByStatus, getTopProjectsWithPendingTasks, getProductivityByDate };