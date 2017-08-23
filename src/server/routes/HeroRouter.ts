import {Router, Request, Response, NextFunction} from 'express';

const Heroes = require('../assets/data');

class HeroRouter {
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
        res.send(Heroes);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    private init() {
        this.router.get('/', HeroRouter.getAll);
    }
}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();

export default heroRoutes.router;