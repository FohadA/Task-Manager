const Proyecto = require('../models/project');
const Tarea = require('../models/tasks');

const getProjects = async (userId, filters = {}) => {
  const { search, sort = 'desc' } = filters;

  const query = { usuario: userId };
  if (search) query.nombre = { $regex: search, $options: 'i' };

  const sortOrder = sort === 'asc' ? 1 : -1;

  return Proyecto.find(query).sort({ createdAt: sortOrder });
};

const createProject = async (userId, data) => {
  return Proyecto.create({ ...data, usuario: userId });
};

const updateProject = async (projectId, userId, data) => {
  const proyecto = await Proyecto.findOneAndUpdate(
    { _id: projectId, usuario: userId },
    data,
    { new: true, runValidators: true }
  );

  if (!proyecto) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  return proyecto;
};

const deleteProject = async (projectId, userId) => {
  const proyecto = await Proyecto.findOneAndDelete({ _id: projectId, usuario: userId });

  if (!proyecto) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  await Tarea.deleteMany({ proyecto: projectId });

  return proyecto;
};

module.exports = { getProjects, createProject, updateProject, deleteProject };