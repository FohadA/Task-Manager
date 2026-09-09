const projectService = require('../services/projectService');

const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects(req.user._id, req.query);
    res.status(200).json(projects);
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.user._id, req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.user._id, req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id, req.user._id);
    res.status(200).json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };