import {Router, Request, Response, NextFunction} from 'express';
import DB from "../db";
import TodoTask from "../models/TodoTask";

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
    public static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const connection = await DB.defaultConnection();
            const repo = connection.getRepository(TodoTask);
            const tasks = await repo.find();
            res.send(tasks);
        } catch (error) {
            console.error('fail', error);
            return res.status(500).send('Internal server error');
        }
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
    public static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const connection = await DB.defaultConnection();
            const repo = connection.getRepository(TodoTask);
            const found = await repo.findOneById(req.params.id);
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
        } catch (error) {
            console.error('fail', error);
            return res.status(500).send('Internal server error');
        }
    }
}

export default new TodoTaskRouter().router;