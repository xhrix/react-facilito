import {createConnection} from "typeorm";

const rc = require('rc');

export default class DB {
    public static defaultConnection() {
        const config = rc('app');
        return createConnection({...config.DATABASE, entities: [__dirname + '/models/*.js']})
    }
}