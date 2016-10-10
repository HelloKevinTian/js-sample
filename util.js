/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/6/29
 * @ util通用模块
 */

var exec = require('child_process').exec;
var crypto = require('crypto');

var util = module.exports;


util.isObject = function(arg) {
	return typeof arg === 'object' && arg !== null;
};

/*
 * check string is json or not	
 */
util.isJson = function(str) {
	if (JSON.stringify(str).indexOf('{') === -1) {
		return false;
	}
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

/*
 * Get the count of elements of object
 */
util.size = function(obj) {
	var count = 0;
	for (var i in obj) {
		if (obj.hasOwnProperty(i) && typeof obj[i] !== 'function') {
			count++;
		}
	}
	return count;
};

util.md5 = function(str) {
	var md5 = crypto.createHash('md5');
	md5.update(str, 'utf8'); //默认是binary
	// md5.update(str,'binary');
	// md5.update(str,'ascii');
	// md5.update(str,'utf8');
	return md5.digest('hex'); // The encoding can be 'hex', 'binary' or 'base64'
};

/*
 * Date format
 */
util.format = function(date, format) {
	format = format || 'yyyy/MM/dd hh:mm:ss';
	var o = {
		"M+": date.getMonth() + 1, //月
		"d+": date.getDate(), //日
		"h+": date.getHours(), //时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

/*
 * get current week in a year	
 */
util.getWeek = function(date) {
	var date = date || new Date();
	var firstDay = new Date(date.getFullYear(), 0, 1);
	//	delayDay ,such as 3,that means wednesday is the first day of new week
	var delayDay = 3;
	return Math.ceil((((date - firstDay) / 86400000) + firstDay.getDay() + 1 + delayDay) / 7);
};

/*
 * check if has Chinese characters.
 */
util.hasChineseChar = function(str) {
	if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
		return true;
	} else {
		return false;
	}
};

/*
 * Exeute command
 * 'ping -w 15 127.0.0.1'
 */
util.exeute = function(cmd, cb) {
	exec(cmd, function(err, stdout, stderr) {
		if (err) {
			cb(false,err);
		} else {
			cb(true,stdout);
		}
	});
}

/*
 * transform unicode to utf8
 */
util.unicodeToUtf8 = function(str) {
	var i, len, ch;
	var utf8Str = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		ch = str.charCodeAt(i);

		if ((ch >= 0x0) && (ch <= 0x7F)) {
			utf8Str += str.charAt(i);

		} else if ((ch >= 0x80) && (ch <= 0x7FF)) {
			utf8Str += String.fromCharCode(0xc0 | ((ch >> 6) & 0x1F));
			utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

		} else if ((ch >= 0x800) && (ch <= 0xFFFF)) {
			utf8Str += String.fromCharCode(0xe0 | ((ch >> 12) & 0xF));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

		} else if ((ch >= 0x10000) && (ch <= 0x1FFFFF)) {
			utf8Str += String.fromCharCode(0xF0 | ((ch >> 18) & 0x7));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

		} else if ((ch >= 0x200000) && (ch <= 0x3FFFFFF)) {
			utf8Str += String.fromCharCode(0xF8 | ((ch >> 24) & 0x3));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 18) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

		} else if ((ch >= 0x4000000) && (ch <= 0x7FFFFFFF)) {
			utf8Str += String.fromCharCode(0xFC | ((ch >> 30) & 0x1));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 24) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 18) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
			utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

		}

	}
	return utf8Str;
};