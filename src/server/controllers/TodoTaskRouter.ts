import {Router, Request, Response, NextFunction} from 'express';

const MockTasks: any[] = [];

class TodoTaskRouter {
    router: Router;

    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Heroes.
     */
    public static getAll(req: Request, res: Response, next: NextFunction) {
        res.send(MockTasks);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    private init() {
        this.router.get('/', TodoTaskRouter.getAll);
        this.router.get('/:id', TodoTaskRouter.getOne);
    }

    /**
     * GET one hero by id
     */
    public static getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let found = MockTasks.find(x => x.id === query);
        if (found) {
            res.status(200).send(found);
        }
        else {
            res.status(404)
                .send({
                    message: 'No task found with the given id.',
                    status: res.status
                });
        }
    }
}

export default new TodoTaskRouter().router;