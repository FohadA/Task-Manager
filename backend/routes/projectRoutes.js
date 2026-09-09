const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { createProjectSchema, updateProjectSchema } = require('../validators/projectValidator');
const {
  getProjects, createProject, updateProject, deleteProject,
} = require('../controllers/projectController');

router.get('/', protect, getProjects);
router.post('/', protect, validate(createProjectSchema), createProject);
router.put('/:id', protect, validate(updateProjectSchema), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;