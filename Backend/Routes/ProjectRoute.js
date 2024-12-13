const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const {createProject, getProjects, getProject, updateProject, deleteProject} = require('../Controller/ProjectController');

router.post('/',authMiddleware, createProject);
router.get('/',authMiddleware, getProjects);
router.get('/:id',authMiddleware, getProject);
router.put('/:id',authMiddleware, updateProject);
router.delete('/:id',authMiddleware, deleteProject);


module.exports = router;