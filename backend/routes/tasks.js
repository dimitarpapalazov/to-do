import express from 'express';
import { createTask, updateTask, getTasksByList } from '../controllers/taskController.js';

const router = express.Router();

router.get('/lists/:listId/tasks', getTasksByList);
router.post('/lists/:listId/tasks', createTask);
router.patch('/tasks/:id', updateTask);

export default router;


