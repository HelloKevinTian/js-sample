var _ = require('underscore');
var mgr = module.exports;

var t = {
	'bag': []
};

mgr.test = function() {
	var obj = {
		'a': 1
	};
	var arr = _.clone(t);
	arr.bag.push(obj);
	console.log('arr;  ', arr, t);
}

exports.test1 = function() {
	var obj = {
		'a': 1
	};
	var arr = _.clone(t);
	arr.bag.push(obj);
	console.log('arr1;  ', arr, t);
}