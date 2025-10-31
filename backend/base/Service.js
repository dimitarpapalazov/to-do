/**
 * Abstract Service base class
 */
export class Service {
    /**
     * Placeholder methods that should be implemented by child classes
     * These represent common service operations
     */
    
    /**
     * Find all records
     * @abstract
     */
    async findAll() {
        throw new Error('findAll() must be implemented by child class');
    }

    /**
     * Find record by ID
     * @abstract
     * @param {number|string} id - The ID of the record
     */
    async findById(id) {
        throw new Error('findById() must be implemented by child class');
    }

    /**
     * Create a new record
     * @abstract
     * @param {Object} data - The data to create
     */
    async create(data) {
        throw new Error('create() must be implemented by child class');
    }

    /**
     * Update a record
     * @abstract
     * @param {number|string} id - The ID of the record
     * @param {Object} data - The data to update
     */
    async update(id, data) {
        throw new Error('update() must be implemented by child class');
    }

    /**
     * Delete a record
     * @abstract
     * @param {number|string} id - The ID of the record
     */
    async delete(id) {
        throw new Error('delete() must be implemented by child class');
    }
}
