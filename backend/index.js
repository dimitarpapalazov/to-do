import { sequelize } from './models/index.js';
import { App } from './App.js';
import { ListController } from './controllers/ListController.js';
import { TaskController } from './controllers/TaskController.js';

/**
 * Initialize and start the application
 */
async function start() {
    try {
        // Authenticate database connection
        await sequelize.authenticate();
        await sequelize.sync();

        // Initialize controllers
        const listController = new ListController();
        const taskController = new TaskController();

        // Create App instance with controllers
        const app = new App({
            controllers: [listController, taskController],
        });

        // Start server
        const port = Number(process.env.PORT || 3001);
        app.listen(port, () => {
            // eslint-disable-next-line no-console
            console.log(`API listening on http://localhost:${port}`);
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

start();

// Export App instance for testing purposes
export { App };