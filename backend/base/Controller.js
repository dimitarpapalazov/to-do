import express from 'express';

/**
 * Abstract Controller base class
 */
export class Controller {
    /**
     * @param {Object} options - Configuration options
     * @param {string} options.basePath - Base path for routes (optional)
     */
    constructor(options = {}) {
        this.router = express.Router();
        this.basePath = options.basePath || '';
        // Initialize routes in child class
        this.initializeRoutes();
    }

    /**
     * Get the router instance
     * @returns {express.Router} The Express router
     */
    getRouter() {
        return this.router;
    }

    /**
     * Get the base path for routes
     * @returns {string} The base path
     */
    getBasePath() {
        return this.basePath;
    }

    /**
     * Initialize routes - must be implemented by child classes
     * @abstract
     */
    initializeRoutes() {
        throw new Error('initializeRoutes() must be implemented by child class');
    }

    /**
     * Helper method to send success response
     * @param {express.Response} res - Express response object
     * @param {*} data - Data to send
     * @param {number} statusCode - HTTP status code (default: 200)
     */
    sendSuccess(res, data, statusCode = 200) {
        res.status(statusCode).json(data);
    }

    /**
     * Helper method to send error response
     * @param {express.Response} res - Express response object
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP status code (default: 400)
     */
    sendError(res, message, statusCode = 400) {
        res.status(statusCode).json({ error: message });
    }

    /**
     * Async error handler wrapper
     * Wraps async route handlers to catch errors
     * @param {Function} fn - Async function to wrap
     * @returns {Function} Wrapped function
     */
    asyncHandler(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}
