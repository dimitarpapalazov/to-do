import { Service } from '../base/Service.js';
import { List, Task } from '../models/index.js';

export class ListService extends Service {
    /**
     * Get all lists ordered by creation date
     * @returns {Promise<Array>} Array of lists
     */
    async findAll() {
        return await List.findAll({
            order: [['createdAt', 'DESC']],
        });
    }

    /**
     * Get list by ID with associated tasks
     * @param {number|string} id - List ID
     * @returns {Promise<Object|null>} List object or null if not found
     */
    async findById(id) {
        return await List.findByPk(id, {
            include: [{ model: Task, as: 'tasks', order: [['createdAt', 'ASC']] }],
        });
    }

    /**
     * Create a new list
     * @param {Object} data - List data
     * @param {string} data.name - List name (required)
     * @param {string} [data.description] - List description (optional)
     * @returns {Promise<Object>} Created list
     * @throws {Error} If name is invalid
     */
    async create(data) {
        const { name, description } = data || {};
        
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Name is required');
        }

        return await List.create({
            name: name.trim(),
            description: description || null,
        });
    }

    /**
     * Update a list
     * @param {number|string} id - List ID
     * @param {Object} data - Update data
     * @returns {Promise<Object|null>} Updated list or null if not found
     */
    async update(id, data) {
        const list = await List.findByPk(id);

        if (!list) {
            return null;
        }

        if (data.name && typeof data.name === 'string') {
            list.name = data.name.trim();
        }

        if (data.description !== undefined) {
            list.description = data.description || null;
        }

        await list.save();
        return list;
    }

    /**
     * Delete a list
     * @param {number|string} id - List ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    async delete(id) {
        const list = await List.findByPk(id);

        if (!list) {
            return false;
        }

        await list.destroy();
        return true;
    }
}
