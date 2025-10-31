import { List, Task } from '../models/index.js';

async function getAllLists(req, res) {
    const lists = await List.findAll({
        order: [['createdAt', 'DESC']],
    });
    res.json(lists);
}

async function createList(req, res) {
    const { name, description } = req.body || {};
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required' });
    }
    const list = await List.create({ name: name.trim(), description: description || null });
    res.status(201).json(list);
}

async function getListById(req, res) {
    const { id } = req.params;
    const list = await List.findByPk(id, {
        include: [{ model: Task, as: 'tasks', order: [['createdAt', 'ASC']] }],
    });
    if (!list) {
        return res.status(404).json({ error: 'List not found' });
    }
    res.json(list);
}

export {
    getAllLists,
    createList,
    getListById,
};


