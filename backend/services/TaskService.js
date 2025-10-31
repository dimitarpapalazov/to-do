import { Service } from '../base/Service.js';
import { Task } from '../models/index.js';

export class TaskService extends Service {
    /**
     * Get all tasks for a specific list
     * @param {number|string} listId - List ID
     * @returns {Promise<Array>} Array of tasks
     */
    async findAllByListId(listId) {
        return await Task.findAll({
            where: { listId: Number(listId) },
            order: [['createdAt', 'ASC']],
        });
    }

    /**
     * Get all tasks (generic implementation)
     * @returns {Promise<Array>} Array of tasks
     */
    async findAll() {
        return await Task.findAll({
            order: [['createdAt', 'ASC']],
        });
    }

    /**
     * Get task by ID
     * @param {number|string} id - Task ID
     * @returns {Promise<Object|null>} Task object or null if not found
     */
    async findById(id) {
        return await Task.findByPk(id);
    }

    /**
     * Create a new task
     * @param {Object} data - Task data
     * @param {number|string} data.listId - List ID (required)
     * @param {string} data.title - Task title (required)
     * @returns {Promise<Object>} Created task
     * @throws {Error} If title is invalid
     */
    async create(data) {
        const { listId, title } = data || {};
        
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Title is required');
        }

        return await Task.create({
            title: title.trim(),
            listId: Number(listId),
        });
    }

    /**
     * Update a task
     * @param {number|string} id - Task ID
     * @param {Object} data - Update data
     * @param {string} [data.title] - Task title
     * @param {boolean} [data.completed] - Completion status
     * @returns {Promise<Object|null>} Updated task or null if not found
     */
    async update(id, data) {
        const task = await Task.findByPk(id);

        if (!task) {
            return null;
        }

        if (data.title !== undefined && typeof data.title === 'string') {
            task.title = data.title.trim();
        }

        if (data.completed !== undefined && typeof data.completed === 'boolean') {
            task.completed = data.completed;
        }

        await task.save();
        return task;
    }

    /**
     * Delete a task
     * @param {number|string} id - Task ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    async delete(id) {
        const task = await Task.findByPk(id);
        
        if (!task) {
            return false;
        }

        await task.destroy();
        return true;
    }
}
