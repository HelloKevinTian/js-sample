const _ = require('lodash');

/**
 * 需要batch执行的测试函数
 */
async function testFunc(v) {
    await delay(v);
}

function delay(v) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(v);
            resolve();
        }, 2000);
    });
}

// testFunc(123);
setTimeout(async () => {
    let promiseArr = [];
    for (let i = 0; i < 100; i++) {
        // await testFunc(i);
        promiseArr.push(testFunc.bind(null, i));
    }
    let chunkArr = _.chunk(promiseArr, 8);
    for (const arr of chunkArr) {
        await Promise.all(arr.map(a => a()));
    }
}, 10);