
var async = require('async');
/*
async.waterfall( [ function(cb) { console.log('1.1.1: ', 'start'); cb(null, 31); },function(n, cb) { console.log('1.1.2: ',n); }],function(err, result) {});
*/

var waterfall = function(){
	async.waterfall([
		function(callback){
			callback(null, 'one', 'two');
		},
		function(arg1, arg2, callback){
			console.log("step 1 ..." + arg1 + "..." + arg2);
			callback(null, 'three');
		},
		function(arg1, callback){
			// arg1 now equals 'three'
			callback(null, 'done');
			console.log("step 2 ..." + arg1);
		}
	], function (err, result) {
	   // result now equals 'done'    
		console.log("step 3 ..." +result);
	});
}

var whilst = function(){
	var count = 0;
	console.log("whilst start");
	async.whilst(
		function () { return count < 5; },
		function (callback) {
			count++;
			console.log(count);
			async.waterfall( [ function(cb) { console.log('1.1.1: ', 'start'); cb(null, 31); },function(n, cb) { console.log('1.1.2: ',n); }],function(err, result) {});
			setTimeout(callback, 100);
		},
		function (err) {
			// 5 seconds have passed
			console.log("whilst end");
		}
	);
}

waterfall();
