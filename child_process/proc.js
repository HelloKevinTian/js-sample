const net  = require('net');
const assert = require('assert');

let server = net.createServer(assert.fail);

server.listen(8080, 'localhost');

server.once('listening', () => {

    console.log(server._handle)
});

