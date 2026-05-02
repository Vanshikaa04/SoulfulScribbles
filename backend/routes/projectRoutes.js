import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
} from '../controllers/projectController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// ── Public ──────────────────────────────
router.get('/',    getProjects);
router.get('/:id', getProjectById);

// ── Admin only ──────────────────────────
router.post('/',              authMiddleware, createProject);
router.put('/:id',            authMiddleware, updateProject);
router.delete('/:id',         authMiddleware, deleteProject);
router.patch('/:id/featured', authMiddleware, toggleProjectFeatured);

export default router;