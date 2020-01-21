/**
 * 测试进程间通信
 */
function ipc() {
    const http = require('http');
    
    const hostname = '0.0.0.0';
    const port = 3000;
    
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    
        process.send({
            foo: 'bar'
        });
    });
    
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
    
    process.on('message', function(m) {
        console.log('CHILD got message:', m);
    });
}

// ipc();

/**
 * 测试进程间通信传递句柄
 */
function transferHandle() {
    process.on('message', function(m, server) {
        if (m === 'server') {
            console.log('---')
            server.on('connection', function(socket) {
                socket.end('handled by child\n');
            });
        }
    });
}

transferHandle();
