import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';

const app = express();
const server = new http.Server(app);
const io = socketIo(server);

const publicRoot = {root: __dirname + '/../../client/public/'};

server.listen(8000);

app.use(express.static('../client/public'));

app.get('/**', function (req, res) {
    res.sendFile('/index.html', {...publicRoot}, error => {
        console.log('express GET fail', error);
    });
});

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});