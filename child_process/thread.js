var http = require('http')

var app = http.createServer(function(req, res) {
    if (req.url === '/a') {
        // 斐波拉契函数
        function fib(n) {
            if (n === 0) return 0;
            else if (n === 1) return 1;
            else return fib(n - 1) + fib(n - 2)
        }
        // process.nextTick(fib.bind(null, 44))
        fib(44) // 执行时间要 10s 左右
        res.end('a is ' + new Date())
    } else if (req.url === '/b') {
        res.end('b is ' + new Date())
    }
})

app.listen(3600, function() {
    console.log('服务已启动')
})