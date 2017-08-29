import * as express from 'express';
import Startup from "./Startup";
import * as http from 'http';
import * as debug from 'debug';
import {Server} from "net";

const d = debug('ts-express:server');

/**
 * Creates and configures an ExpressJS web server.
 */
export default class App {
    /**
     * Reference to Express instance.
     */
    private expressApplication: express.Application;

    /**
     * Reference to the server.
     */
    private server: Server;

    /**
     * Port the server will listen to.
     */
    private readonly port: number = Math.abs(parseInt(process.env.PORT, 10)) || 8000;

    /**
     * Run configuration methods on the Express instance.
     */
    constructor() {
        this.expressApplication = express();
        Startup.Configure(this.expressApplication);
    }

    /**
     * Runs the server.
     */
    public Run(): void {
        this.expressApplication.set('port', this.port);
        this.server = http.createServer(this.expressApplication);
        this.server.listen(this.port);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
    }

    private onListening = () => {
        const address = this.server.address();
        d(`Listening on ${(typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`}`);
    };

    private onError = (error: NodeJS.ErrnoException) => {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
}