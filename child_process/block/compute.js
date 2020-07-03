const computation = () => {
    // 斐波拉契函数
    function fib(n) {
        if (n === 0) return 0;
        else if (n === 1) return 1;
        else return fib(n - 1) + fib(n - 2);
    }
    return fib(44); // 执行时间要 10s 左右
};

process.on('message', msg => {
    console.log(msg, 'process.pid', process.pid); // 子进程id
    const fib = computation();

    // 如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息
    process.send(fib);
});