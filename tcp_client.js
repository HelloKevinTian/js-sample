var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1337;

function createClient() {
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        client.write('I am Chuck Norris!');
    });

    client.on('data', function(data) {
        console.log('DATA: ' + data);
        // client.destroy();
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}

for (var i = 0; i < 200; i++) {
    createClient();
};