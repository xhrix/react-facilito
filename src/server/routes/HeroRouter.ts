import {Router, Request, Response, NextFunction} from 'express';

const Heroes = require('../assets/data') as any[];

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
        this.router.get('/:id', HeroRouter.getOne);
    }

    /**
     * GET one hero by id
     */
    public static getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    hero
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No hero found with the given id.',
                    status: res.status
                });
        }
    }
}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();

export default heroRoutes.router;