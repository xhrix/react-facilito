import * as express from 'express';
import * as http from 'http';

const app = express();
const server = new http.Server(app);

const publicRoot = {root: __dirname + '/../../client/public/'};

server.listen(8000);

app.use(express.static('../client/public'));

app.get('/**', function (req, res) {
    res.sendFile('/index.html', {...publicRoot}, error => {
        console.log('express GET fail', error);
    });
});

console.log('Go to http://localhost:8000');