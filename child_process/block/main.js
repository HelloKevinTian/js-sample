/**
 * 主进程
 */
const http = require('http')
const fork = require('child_process').fork;

const app = http.createServer(function(req, res) {
    if (req.url === '/a') {

        const compute = fork('./compute.js');
        compute.send('开启一个新的子进程');

        // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
        compute.on('message', fib => {
            res.end(`fib is ${fib}, a is ` + new Date());
            compute.kill();
        });

        // 子进程监听到一些错误消息退出
        compute.on('close', (code, signal) => {
            console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
            compute.kill();
        });
    } else if (req.url === '/b') {
        res.end('b is ' + new Date())
    }
})

app.listen(3600, function() {
    console.log('服务已启动')
})