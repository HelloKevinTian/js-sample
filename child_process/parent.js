/**
 * 测试进程间通信
 */
function ipc() {
    const child_process = require('child_process');
    
    var n = child_process.fork('./child.js');
    
    n.on('message', function(m) {
        console.log('PARENT got message:', m);
    });
    
    n.send({
        hello: 'world'
    });
}

// ipc();

/**
 * 测试进程间通信传递句柄
 */
function transferHandle() {
    const child = require('child_process').fork('child.js');
    
    const server = require('net').createServer();
    server.on('connection', function(socket) {
        socket.end('handle by parent \n');
    });
    
    server.listen(1337, function() {
        child.send('server', server);
    });
}

transferHandle();
