let func = process.argv[2];

/**
 * Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。
 */
if (func == '1') {
    const promise = new Promise((resolve, reject) => {
        console.log(1)
        resolve()
        console.log(2)
    })
    promise.then(() => {
        console.log(3)
    })
    console.log(4)
}


/**
 * 解析：

    这道题主要理解js执行机制。

    第一轮事件循环，先执行宏任务，主script，new Promise立即执行，输出 3，执行p这个new Promise操作，输出 7，发现setTimeout，将回调函数放入下一轮任务队列（Event Quene），p的then，暂且命名为then1，放入微任务队列，且first也有then，命名为then2，放入微任务队列。执行console.log(4),输出 4，宏任务执行结束。

    再执行微任务，执行then1,输出 1，执行then2,输出 3.

    第一轮事件循环结束，开始执行第二轮。第二轮事件循环先执行宏任务里面的，也就是setTimeout的回调，输出 5.resolve(6)不会生效，因为p的Promise状态一旦改变就不会再变化了。
 */
if (func == '2') {
    const first = () => (new Promise((resolve, reject) => {
        console.log(3);
        let p = new Promise((resolve, reject) => {
            console.log(7);
            setTimeout(() => {
                console.log(5);
                resolve(6);
            }, 0)
            resolve(1);
        });
        resolve(2);
        p.then((arg) => {
            console.log(arg);
        });

    }));

    first().then((arg) => {
        console.log(arg);
    });
    console.log(4);
}


/**
 * 解释：promise 有 3 种状态：pending、fulfilled 或 rejected。
 * 状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。
 * 上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。
 */
if (func == '3') {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 1000)
    })
    const promise2 = promise1.then(() => {
        throw new Error('error!!!')
    })

    console.log('promise1', promise1)
    console.log('promise2', promise2)

    setTimeout(() => {
        console.log('promise1', promise1)
        console.log('promise2', promise2)
    }, 2000)
}


/**
 * process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。
 * 事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。
 */
if (func == '4') {
    process.nextTick(() => {
        console.log('nextTick')
    })
    setTimeout(() => {
        console.log('timeout 0')
    }, 0);
    Promise.resolve()
        .then(() => {
            console.log('then')
        })
    setImmediate(() => {
        console.log('setImmediate')
    })
    console.log('end')
}


/**
 * 你不能立即从构造函数中触发事件，因为脚本尚未处理到用户为该事件分配回调函数的地方。
 * 因此，在构造函数本身中可以使用 process.nextTick() 来设置回调，以便在构造函数完成后发出该事件
 */
if (func == '5') {
    const EventEmitter = require('events');
    const util = require('util');

    function MyEmitter() {
        EventEmitter.call(this);

        // use nextTick to emit the event once a handler is assigned
        process.nextTick(() => {
            this.emit('event');
        });
        // this.emit('event');
    }
    util.inherits(MyEmitter, EventEmitter);

    const myEmitter = new MyEmitter();
    myEmitter.on('event', () => {
        console.log('an event occurred!');
    });
}