const Tarea = require('../models/tasks');
const Proyecto = require('../models/project');

const createTask = async (userId, data) => {
  const proyecto = await Proyecto.findOne({ _id: data.proyecto, usuario: userId });

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return Tarea.create({ ...data, usuario: userId });
};

const getTasks = async (userId, filters = {}) => {
  const { proyecto, estado, prioridad, page = 1, limit = 10 } = filters;

  const query = { usuario: userId };
  if (proyecto) query.proyecto = proyecto;
  if (estado) query.estado = estado;
  if (prioridad) query.prioridad = prioridad;

  const skip = (Number(page) - 1) * Number(limit);

  const [tareas, total] = await Promise.all([
    Tarea.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Tarea.countDocuments(query),
  ]);

  return {
    tareas,
    pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
  };
};

const updateTask = async (taskId, userId, data) => {
  const changes = { ...data };
  if (data.estado === 'completada') changes.fechaCompletada = new Date();
  if (data.estado && data.estado !== 'completada') changes.fechaCompletada = null;

  const tarea = await Tarea.findOneAndUpdate(
    { _id: taskId, usuario: userId },
    changes,
    { returnDocument: 'after', runValidators: true }
  );

  if (!tarea) {
    const error = new Error('Tarea no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return tarea;
};

const deleteTask = async (taskId, userId) => {
  const tarea = await Tarea.findOneAndDelete({ _id: taskId, usuario: userId });

  if (!tarea) {
    const error = new Error('Tarea no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return tarea;
};

module.exports = { createTask, getTasks, updateTask, deleteTask };