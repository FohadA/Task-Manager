const taskService = require('../services/taskService');

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user._id, req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

// GET /api/tasks?project=&status=&priority=&page=&limit=
const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.user._id, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user._id, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user._id);
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(error.statusCode || 500);
    next(error);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };