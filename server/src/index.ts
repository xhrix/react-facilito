import * as http from 'http';
import * as socketIo from 'socket.io';
import * as fs from 'fs';
import {IncomingMessage, ServerResponse} from "http";

const app = http.createServer(handler);
const io = socketIo(app);

app.listen(8000);
console.log('listening on port 8000');

function handler(req: IncomingMessage, res: ServerResponse) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

console.log('sockets were set up');