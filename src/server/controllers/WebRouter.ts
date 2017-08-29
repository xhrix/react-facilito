import {Router, Request, Response, NextFunction} from 'express';

class WebRouter {
    router: Router;

    /**
     * Initialize the HeroRouter
     */
    constructor() {
        const publicRoot = {root: __dirname + '/../../src/client/public/'};
        this.router = Router();

        this.router.get('/**', (req: Request, res: Response, next: NextFunction) => {
            res.sendFile('/index.html', {...publicRoot}, error => {
                console.log('express GET fail', error);
            });
        });
    }
}

export default new WebRouter().router;