'use strict';
const fs = require('fs');

let fun = function() {
	return new Promise(function(resolve, reject) {
		fs.readFile('test.js', 'utf8', function(err, result) {
			// err = 'unknown error';
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

fun().then(function(str) {
	console.log(aaa);
	console.log(str);
}).catch(function(reason) {
	console.log('catch: ', reason);
});

// fun().then(function(str) {
// 	console.log(aaa);
// 	console.log(str);
// }, function(err) {
// 	console.error(err);
// });