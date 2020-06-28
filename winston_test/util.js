const util = require('util');


let a = 'hello'
let b = 123000000999
let c = ['100075', '100080']
let d = { name: 'joe', rank: [1, 2, 3] }
let e = new Date()
let f = new Error('must be cool')

let formatLog = util.format(1, 2, 3, a, b, c, d, e, f);

console.log(formatLog, typeof formatLog, util.format('%j %j', c, d))