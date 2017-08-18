import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';

const app = express();
const server = new http.Server(app);
const io = socketIo(server);

server.listen(8000);

app.get('/', function (req, res) {
    res.sendFile('/index.html', {root: __dirname + '/../'});
});

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});