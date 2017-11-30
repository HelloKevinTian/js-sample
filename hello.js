// 'use strict';
// var arp = require('node-arp');
// var co = require('co');

// function getMAC(ipAddress) {
// 	return function(callback) {
// 		arp.getMAC(ipAddress, callback);
// 	}
// }

// co1(function*() {
// 	var address = [
// 		'192.168.20.161',
// 		'192.168.20.160'
// 	];
// 	var p1 = yield getMAC(address[0]);
// 	var p2 = yield getMAC(address[1]);

// 	console.log(address[0] + ' ->' + p1);
// 	console.log(address[1] + ' ->' + p2);
// 	return 'done';
// })(function(err, result) {
// 	console.log('err: ' + err + ', result: ' + result);
// });


// function co1(generator) {
// 	return function(fn) {
// 		var gen = generator();

// 		function next(err, result) {
// 			if (err) {
// 				return fn(err);
// 			}
// 			var step = gen.next(result);
// 			if (!step.done) {
// 				step.value(next);
// 			} else {
// 				fn(null, step.value);
// 			}
// 		}
// 		next();
// 	}
// }

// co(function*() {
// 	var address = [
// 		'192.168.20.161',
// 		'192.168.20.160'
// 	];
// 	var p1 = yield getMAC(address[0]);
// 	var p2 = yield getMAC(address[1]);

// 	console.log(address[0] + ' ->' + p1);
// 	console.log(address[1] + ' ->' + p2);
// 	return 'done';
// })(function(err, result) {
// 	console.log('err: ' + err + ', result: ' + result);
// });


function* gen(x) {
	var y = yield x + 2;
	return y;
}

var g = gen(1);
console.log(g.next()) // { value: 3, done: false }
console.log(g.next(2)) // { value: 2, done: true }