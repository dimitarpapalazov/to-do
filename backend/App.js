import express from 'express';
import cors from 'cors';

export class App {
    /**
     * @param {Object} options - Configuration options
     * @param {Array<Controller>} [options.controllers] - Array of controller instances
     * @param {Array<express.RequestHandler>} [options.middleware] - Array of middleware functions
     */
    constructor(options = {}) {
        this.expressApp = express();
        this.controllers = options.controllers || [];
        this.middleware = options.middleware || [];
        
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    /**
     * Initialize default middleware
     */
    initializeMiddleware() {
        this.expressApp.use(cors());
        this.expressApp.use(express.json());
        
        this.middleware.forEach(middleware => {
            this.expressApp.use(middleware);
        });
    }

    /**
     * Initialize routes from controllers
     */
    initializeRoutes() {
        // Health check endpoint
        this.expressApp.get('/api/health', (req, res) => {
            res.json({ status: 'ok' });
        });

        // Register routes from controllers
        this.controllers.forEach(controller => {
            const basePath = controller.getBasePath();
            const router = controller.getRouter();
            this.expressApp.use(basePath, router);
        });
    }

    /**
     * Add a controller to the application
     * @param {Controller} controller - Controller instance
     */
    addController(controller) {
        this.controllers.push(controller);
        const basePath = controller.getBasePath();
        const router = controller.getRouter();
        this.expressApp.use(basePath, router);
    }

    /**
     * Add middleware to the application
     * @param {express.RequestHandler} middleware - Middleware function
     */
    addMiddleware(middleware) {
        this.middleware.push(middleware);
        this.expressApp.use(middleware);
    }

    /**
     * Get the underlying Express application
     * @returns {express.Application} Express app instance
     */
    getExpressApp() {
        return this.expressApp;
    }

    /**
     * Start the server
     * @param {number} port - Port number to listen on
     * @param {Function} callback - Callback function called when server starts
     * @returns {http.Server} HTTP server instance
     */
    listen(port, callback) {
        return this.expressApp.listen(port, callback);
    }

    /**
     * Use a middleware at a specific path
     * @param {string} path - Path to mount middleware
     * @param {express.RequestHandler} middleware - Middleware function
     */
    use(path, middleware) {
        if (typeof path === 'function') {
            this.expressApp.use(path);
        } else {
            this.expressApp.use(path, middleware);
        }
    }
}
