const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');
const {
  createTask, getTasks, updateTask, deleteTask,
} = require('../controllers/taskController');

router.get('/', protect, getTasks);
router.post('/', protect, validate(createTaskSchema), createTask);
router.put('/:id', protect, validate(updateTaskSchema), updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;