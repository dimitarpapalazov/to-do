import { Controller } from '../base/Controller.js';
import { TaskService } from '../services/TaskService.js';

export class TaskController extends Controller {
    /**
     * @param {Object} options - Configuration options
     * @param {TaskService} [options.taskService] - TaskService instance (for dependency injection)
     */
    constructor(options = {}) {
        super({ basePath: '/api' });

        this.taskService = options.taskService || new TaskService();
    }

    /**
     * Initialize routes for Task endpoints
     */
    initializeRoutes() {
        this.router.get('/lists/:listId/tasks', this.asyncHandler(this.getTasksByList.bind(this)));
        this.router.post('/lists/:listId/tasks', this.asyncHandler(this.createTask.bind(this)));
        this.router.patch('/tasks/:id', this.asyncHandler(this.updateTask.bind(this)));
    }

    /**
     * GET /api/lists/:listId/tasks - Get all tasks for a list
     * @param {express.Request} req - Express request object
     * @param {express.Response} res - Express response object
     */
    async getTasksByList(req, res) {
        const { listId } = req.params;
        const tasks = await this.taskService.findAllByListId(listId);
        this.sendSuccess(res, tasks);
    }

    /**
     * POST /api/lists/:listId/tasks - Create a new task
     * @param {express.Request} req - Express request object
     * @param {express.Response} res - Express response object
     */
    async createTask(req, res) {
        try {
            const { listId } = req.params;

            const task = await this.taskService.create({
                ...req.body,
                listId,
            });

            this.sendSuccess(res, task, 201);
        } catch (error) {
            this.sendError(res, error.message, 400);
        }
    }


    /**
     * PATCH /api/tasks/:id - Update a task
     * @param {express.Request} req - Express request object
     * @param {express.Response} res - Express response object
     */
    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const task = await this.taskService.update(id, req.body);

            if (!task) {
                return this.sendError(res, 'Task not found', 404);
            }

            this.sendSuccess(res, task);
        } catch (error) {
            this.sendError(res, error.message, 400);
        }
    }
}