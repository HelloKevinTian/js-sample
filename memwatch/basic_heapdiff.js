var memwatch = require('memwatch');

function LeakingClass() {
}

memwatch.gc();

var arr = [];

var hd = new memwatch.HeapDiff();

for (var i = 0; i < 10000; i++) arr.push(new LeakingClass);

var hde = hd.end();

console.log(JSON.stringify(hde, null, 2));




