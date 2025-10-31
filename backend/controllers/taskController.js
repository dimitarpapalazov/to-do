import { Task } from '../models/index.js';

async function createTask(req, res) {
    const { listId } = req.params;
    const { title } = req.body || {};
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    const task = await Task.create({ title: title.trim(), listId: Number(listId) });
    res.status(201).json(task);
}

async function updateTask(req, res) {
    const { id } = req.params;
    const { title, completed } = req.body || {};
    const task = await Task.findByPk(id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    if (typeof title === 'string') task.title = title.trim();
    if (typeof completed === 'boolean') task.completed = completed;
    await task.save();
    res.json(task);
}

async function getTasksByList(req, res) {
    const { listId } = req.params;
    const tasks = await Task.findAll({ where: { listId: Number(listId) }, order: [['createdAt', 'ASC']] });
    res.json(tasks);
}

export {
    createTask,
    updateTask,
    getTasksByList,
};


