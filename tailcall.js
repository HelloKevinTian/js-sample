'use strict';

//-------使用尾调用优化---------
function fTail(n, a = 0, b = 1) {
    if (n === 0) return a
    return fTail(n - 1, b, a + b)
}


//------------未使用尾调用优化-------
function f(n) {
    if (n === 0 || n === 1) return n
    else return f(n - 1) + f(n - 2)
}


//-------两者调用对比-------------
console.time('未使用尾调用')
let b = f(40);
console.timeEnd('未使用尾调用')
console.log(b);

console.time('使用尾调用')
let a = fTail(100);
console.timeEnd('使用尾调用')
console.log(a);