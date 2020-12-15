/**
 * 测试asyncFunction并发执行
 */

const delay = function(t = 2000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, t);
    })
}

const func1 = async function() {
    console.log('func1-start')
    let arr = [];
    await delay(5000);
    console.log('func1-end')
    arr.push(1);
    return arr;
}
const func2 = async function() {
    console.log('func2-start')
    let arr = [];
    await delay(5000);
    console.log('func2-end')
    arr.push(2);
    return arr;
}
const func3 = async function() {
    console.log('func3-start')
    let arr = [];
    await delay(5000);
    console.log('func3-end')
    arr.push(3);
    return arr;
}

setTimeout(async() => {
    const a = [];
    a.push(func1);
    a.push(func2);
    a.push(func3);
    console.log('------start')
    const res = await Promise.all(a.map(f => f()));
    console.log(res);
}, 100);