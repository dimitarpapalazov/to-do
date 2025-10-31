import { Controller } from '../base/Controller.js';
import { ListService } from '../services/ListService.js';


export class ListController extends Controller {
    /**
     * @param {Object} options - Configuration options
     * @param {ListService} [options.listService] - ListService instance (for dependency injection)
     */
    constructor(options = {}) {
        super({ basePath: '/api/lists' });

        this.listService = options.listService || new ListService();
    }

    /**
    * Initialize routes for List endpoints
    */
    initializeRoutes() {
        this.router.get('/', this.asyncHandler(this.getAllLists.bind(this)));
        this.router.post('/', this.asyncHandler(this.createList.bind(this)));
        this.router.get('/:id', this.asyncHandler(this.getListById.bind(this)));
    }

    /**
    * GET /api/lists - Get all lists
    * @param {express.Request} req - Express request object
    * @param {express.Response} res - Express response object
    */
    async getAllLists(req, res) {
        const lists = await this.listService.findAll();
        this.sendSuccess(res, lists);
    }

    /**
    * POST /api/lists - Create a new list
    * @param {express.Request} req - Express request object
    * @param {express.Response} res - Express response object
    */
    async createList(req, res) {
        try {
            const list = await this.listService.create(req.body);
            this.sendSuccess(res, list, 201);
        } catch (error) {
            this.sendError(res, error.message, 400);
        }
    }

    /**
    * GET /api/lists/:id - Get list by ID
    * @param {express.Request} req - Express request object
    * @param {express.Response} res - Express response object
    */
    async getListById(req, res) {
        const { id } = req.params;
        const list = await this.listService.findById(id);

        if (!list) {
            return this.sendError(res, 'List not found', 404);
        }

        this.sendSuccess(res, list);
    }
}