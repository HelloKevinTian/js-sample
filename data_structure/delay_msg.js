/*
 * @Author: tianwen 
 * @Date: 2018-11-29 18:14:59 
 * @Description: 延时任务执行器 
 {
     id: String/Number, //定时任务唯一id
     time: Number, //延时秒数
     cycelNum: Number, //循环圈数，圈数减至0时触发任务回调
     func: Function //任务回调，支持async回调
 }
 */
const _ = require('lodash');
const queue = {}; //{ '6': [{ id: '9s', time: 5, cycelNum: 0, func: [Function]}] }
const INTERVAL_TIME = 3600;
let curIndex = 1;

class Timer {
    constructor() {
        setInterval(function () {
            if (curIndex >= INTERVAL_TIME) {
                curIndex = 1;
            } else {
                curIndex++;
            }
            console.log(`curIndex:${curIndex} queue:`, queue);

            if (queue[curIndex]) {
                const newList = [];
                queue[curIndex].forEach((q) => {
                    if (q.cycelNum <= 0) {
                        q.func.call(null, null, q.id);
                    } else {
                        newList.push(q);
                        q.cycelNum--;
                    }
                });
                if (newList.length <= 0) {
                    delete queue[curIndex];
                } else {
                    queue[curIndex] = newList;
                }
            }
        }, 1000);
    }

    /**
     * 添加任务
     * @param {String} id 任务唯一id
     * @param {Number} time 延时秒数
     * @param {Function} func 任务回调
     */
    addTask(id, time, func) {
        if (typeof time !== 'number') {
            throw new Error('time must be Number');
        }
        if (id === null || id === undefined || id === '') {
            throw new Error('id must exist');
        }
        let targetIndex = (curIndex + time) % INTERVAL_TIME;
        let cycelNum = Math.floor((curIndex + time) / INTERVAL_TIME);

        for (let k in queue) {
            if (queue[k].length) {
                for (let i = 0; i < queue[k].length; i++) {
                    const q = queue[k][i];
                    if (q.id === id) {
                        throw new Error('id exists');
                    }
                }
            }
        }
        const newTask = {
            id: id,
            time: time,
            cycelNum: cycelNum,
            func: func
        };
        if (!queue[targetIndex] || queue[targetIndex].length == 0) {
            queue[targetIndex] = [newTask];
        } else {
            queue[targetIndex].push(newTask);
        }

        console.log('addTask:', newTask);
    }

    /**
     * 移除任务
     * @param {String} id 任务唯一id
     */
    removeTask(id) {
        let delKey = null;
        for (const k in queue) {
            const delIndex = _.findIndex(queue[k], {
                id: id
            });
            if (delIndex > -1) {
                console.log('removeTask:', id);
                queue[k].splice(delIndex, 1);
                if (queue[k].length <= 0) {
                    delKey = k;
                }
                break;
            }
        }
        if (delKey) {
            delete queue[delKey];
        }
    }
}

module.exports = new Timer();

const t = new Timer();

//添加5秒后触发任务，任务为异步任务
t.addTask('6s', 6, async function (err, id) {
    const ioFunc = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('#### promise done')
            resolve('promise return');
        }, 3000);
    });
    const ret = await ioFunc;
    console.log('6666666', err, id, ret);
});

//添加3秒后触发任务
t.addTask('3s', 3, (err, id) => {
    console.log('88888888', err, id);
});
//2秒后删除上一任务
setTimeout(() => {
    t.removeTask('3s');
}, 2000);

//添加n个同一队列中的任务
t.addTask('50', 5, (err, id) => {
    console.log('555555555', err, id);
});
t.addTask('51', 5, (err, id) => {
    console.log('555555555', err, id);
});
t.addTask('52', 3605, (err, id) => {
    console.log('5555555111', err, id);
});
t.addTask('54', 7205, (err, id) => {
    console.log('55555552222', err, id);
});