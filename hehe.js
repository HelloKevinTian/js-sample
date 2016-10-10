var _ = require('underscore');
var async = require('async');

function isValidDate(d) {
	if (Object.prototype.toString.call(d) === "[object Date]") {
		// it is a date
		if (isNaN(d.getTime())) { // d.valueOf() could also work
			// date is not valid
			return false;
		} else {
			// date is valid
			return true;
		}
	} else {
		// not a date
		return false;
	}
}

var a = new Date();
var b = new Date('2015/12/11 0:00:0');
var c = new Date('2015-12-1 00:11:01');
var d = new Date('asda');

console.log(isValidDate(a));
console.log(isValidDate(b));
console.log(isValidDate(c));
console.log(isValidDate(d));