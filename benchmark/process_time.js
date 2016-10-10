/**
 * 程序运行时间测试
 */

var util = require('util');

//基础测试
function test1() {
	var time = process.hrtime();
	// [ 1800216, 25 ]

	setTimeout(function() {
		var diff = process.hrtime(time);
		// [ 1, 552 ]
		console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
	}, 1000);

	console.log('memoryUsage: ', util.inspect(process.memoryUsage()));

	// 测试结果：
	// memoryUsage:  { rss: 8708096, heapTotal: 4083456, heapUsed: 2153776 }
	// benchmark took 1003199246 nanoseconds
}

//测试普通循环
function test2() {
	var time = process.hrtime();

	for (var i = 0; i < 1000000; i++) {
		console.log('test2');
	};

	var diff = process.hrtime(time);
	console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
	
	// 测试结果（循环次数）：
	// 10000： 	0.14s
	// 100000: 	1.75s
	// 1000000：17.50s
}

//测试双层循环
function test3() {
	var time = process.hrtime();
	console.time('be');

	for (var i = 0; i < 100; i++) {
		for (var j = 0; j < 100; j++) {
			console.log('test3');
		};
	};

	var diff = process.hrtime(time);
	console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
	console.timeEnd('be');
	
	// 测试结果（循环次数）：
	// 10000： 	0.14s
	// 100000: 	1.35s
	// 1000000：14.60s
}

function test4() {
	var time = process.hrtime();
	var json = require('./rival_story');
	console.log(json);
	var diff = process.hrtime(time);
	console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
}

test4();