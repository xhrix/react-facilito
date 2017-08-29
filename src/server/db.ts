import {Connection, createConnection} from "typeorm";

const rc = require('rc');

export default class DB {

    private static instance: Connection = null;

    public static async defaultConnection(): Promise<Connection> {
        if (!this.instance) {
            const config = rc('app');
            this.instance = await createConnection({...config.DATABASE, entities: [__dirname + '/models/*.js']})
        }
        return this.instance;
    }
}