import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import TodoTaskRouter from "./controllers/TodoTaskRouter";
import HeroRouter from "./controllers/HeroRouter";
import WebRouter from "./controllers/WebRouter";

export default class Startup {
    public static Configure(app: express.Application) {

        // MIDDLEWARE

        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(express.static('src/client/public'));

        // ROUTES

        app.use('/api/v1/todo-task', TodoTaskRouter);
        app.use('/api/v1/heroes', HeroRouter);
        app.use('/', WebRouter);
    }
}