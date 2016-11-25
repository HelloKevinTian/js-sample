'use strict';
/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/6/29
 * @ util通用模块
 */

var exec = require('child_process').exec;
var crypto = require('crypto');
var fs = require('fs');
var _ = require('underscore');
var request = require('request');

var util = module.exports;

util.sendError = function(endcb, err, flowid) {
	var proto = require('../proto/ProtoManager');
	var code = Number(err);
	if (isNaN(code) || err == null || err == undefined) {
		code = 10000;
	}
	var tail = {
		'time': Math.floor(Date.now()),
		'flowid': flowid
	};
	var msg = proto.NewMessage('s2c_error_code', {
		'tail': tail,
		'code': code
	});
	endcb(msg, 'message_s2c_error_code');
}

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
		if (obj.hasOwnProperty(i)) {
			count++;
		}
	}
	return count;
};

/**
 * 检测是否为同一天
 */
util.checkSameDay = function(time1, time2) {
	var date1 = new Date(time1);
	var date2 = new Date(time2);
	return (date1.getFullYear() === date2.getFullYear()) && (date1.getMonth() === date2.getMonth()) && (date1.getDate() === date2.getDate());
}

util.md5 = function(str) {
	var md5 = crypto.createHash('md5');
	md5.update(str, 'utf8'); //默认是binary,可选：ascii  utf8
	return md5.digest('hex'); // The encoding can be 'hex', 'binary' or 'base64'
};

util.md5File = function(file_path) {
	var fileContent = fs.readFileSync(file_path, 'utf-8');
	var buffer = new Buffer(fileContent, 'utf8'); // 扁平化buffer
	var md5 = crypto.createHash('md5');
	md5.update(buffer);
	return md5.digest('hex');
}

util.bmd5 = function(str) {
	var buffer = new Buffer(str, 'utf8');
	var md5 = crypto.createHash('md5');
	md5.update(buffer);
	return md5.digest('hex');
}

util.sha1Hash = function(salt, password) {
	return crypto.createHmac('sha1', salt + "").update(password + "").digest('hex');
};

/*
 * Date format
 */
util.formatDate = function(format, date) {
	var date = date || new Date();
	var format = format || 'yyyy/MM/dd hh:mm:ss';
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
util.getWeek = function(time, delayDayNum) {
	var curDate = new Date();

	if (typeof time === 'number') {
		curDate = new Date(time);;
	} else {
		curDate = time;;
	}

	//每年的第一天
	var firstDay = new Date(curDate.getFullYear(), 0, 1);

	//1表示周一为每周第一天 3表示周三为每周第一天
	var delayDay = delayDayNum ? delayDayNum : 1;

	return Math.ceil((((curDate - firstDay) / 86400000) + firstDay.getDay() + 1 + delayDay) / 7);
};

util.checkSameWeek = function(time1, time2) {
	var day1 = new Date(time1);
	var day2 = new Date(time2);

	return (day1.getFullYear() === day2.getFullYear()) ? (util.getWeek(time1) === util.getWeek(time2)) : false;
}

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
util.exeuteCMD = function(cmd, cb) {
	exec(cmd, function(err, stdout, stderr) {
		cb(err, stdout, stderr);
	});
}

/**
 * 生成随机字符串	eg. 93c1f974-9d3b-a412-2239-1e340aef524b
 */
util.guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}

/**
 * 生成随机字符串	eg. 47695b6e-9636-47f8-a1cc-8f67093e4113
 */
util.uuid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 * 根据权重取数组的一个随机索引
 */
util.randomByWeight = function(arr) {
	var weightArr = [];
	for (var i = 0; i < arr.length; i++) {
		if (!isNaN(Number(arr[i]))) {
			weightArr.push(Number(arr[i]));
		}
	};

	var fullWeight = 0;
	var weightLen = weightArr.length;
	for (var i = 0; i < weightLen; i++) {
		fullWeight += weightArr[i];
	};
	if (fullWeight <= 0) {
		return 0;
	}
	var randomValue = Math.random() * fullWeight;
	var accWeight = 0;
	for (var i = 0; i < weightLen; i++) {
		accWeight += weightArr[i];
		if (accWeight >= randomValue) {
			return i;
		}
	}
}

/**
 * 根据权重取数组的n个随机索引
 */
util.randomNByWeight = function(dataArr, weightArr, n) {
	var result = [];
	var weightArrClone = _.clone(weightArr);
	var dataArrClone = _.clone(dataArr);
	for (var i = 0; i < n; i++) {
		var index = util.randomByWeight(weightArrClone);
		if (dataArrClone.length > 0) {
			result.push(dataArrClone[index]);
			weightArrClone.splice(index, 1);
			dataArrClone.splice(index, 1);
		}
	};
	return result;
}

/**
 * 获取一个数组n个随机对象
 */
util.getRandomN = function(array, n) {
	var cloneArr = _.clone(array);
	var randomResult = [];
	var arrLen = cloneArr.length;
	if (arrLen <= 0 || n <= 0) {
		return randomResult;
	} else if (arrLen <= n) {
		return cloneArr;
	} else {
		for (var i = 0; i < n; i++) {
			var randomIndex = Math.round(Math.random() * (cloneArr.length - 1));
			randomResult.push(cloneArr[randomIndex]);
			cloneArr.splice(randomIndex, 1);
		};
		return randomResult;
	}
}

/**
 * "1" "1,2,3" 转换成数组 [1] [1,2,3]
 * toNumber : 是否转成Number
 */
util.strToArr = function(str, toNumber) {
	if (str.indexOf(',') > -1) {
		var strArr = str.split(',');
		if (toNumber) {
			for (var i = 0; i < strArr.length; i++) {
				strArr[i] = Number(strArr[i]);
			};
		}
		return strArr;
	} else {
		var strArr = [];
		if (toNumber) {
			strArr.push(Number(str));
		} else {
			strArr.push(str);
		}
		return strArr;
	}
}

util.random = function(min, max) {
	return min + Math.round(Math.random() * (max - min));
}

util.isValidDate = function(d) {
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

util.max = function(arr) {
	Array.prototype.max = function() {
		return Math.max.apply(null, this);
	};

	var max = Math.max.apply(null, arr);
	return max;
}

util.min = function(arr) {
	Array.prototype.min = function() {
		return Math.min.apply(null, this);
	};

	var min = Math.min.apply(null, arr);
	return min;
}

util.rr = function(url, form, callback) {
	request.post({
		'url': url,
		'form': form,
		'json': true
	}, function(err, result) {
		callback(err, result);
	});
}

/**
 * 按字节取字符串长度
 */
util.strlen = function(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if (/^[\u0000-\u00ff]$/.test(c)) {
			len++;
		} else {
			len += 2;
		}
	}
	return len;
}

/**
 * 按字节从头截取字符串
 */
util.cutStr = function(str, L) {
	var result = '',
		strlen = str.length, // 字符串长度
		chrlen = str.replace(/[^\x00-\xff]/g, '**').length; // 字节长度

	if (chrlen <= L) {
		return str;
	}

	for (var i = 0, j = 0; i < strlen; i++) {
		var chr = str.charAt(i);
		if (/[\x00-\xff]/.test(chr)) {
			j++; // ascii码为0-255，一个字符就是一个字节的长度
		} else {
			j += 2; // ascii码为0-255以外，一个字符就是两个字节的长度
		}
		if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
			result += chr;
		} else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
			return result;
		}
	}
}

/**
 * 数组乱序
 */
util.outOrder = function(arr) {
	arr.sort(function(a, b) {
		return Math.random() > .5 ? -1 : 1;
	});

	return arr;
}

/**
 * 计算两个时间戳的相隔天数
 */
util.diffDay = function(start, end) {
	var startDate = new Date(start);
	var endDate = new Date(end);

	var sY = startDate.getFullYear();
	var sM = startDate.getMonth() + 1;
	var sD = startDate.getDate();

	var eY = endDate.getFullYear();
	var eM = endDate.getMonth() + 1;
	var eD = endDate.getDate();

	var Date1 = new Date(sY + '-' + sM + '-' + sD);
	var Date2 = new Date(eY + '-' + eM + '-' + eD);
	var iDays = parseInt(Math.abs(Date2 - Date1) / (1000 * 24 * 60 * 60));

	return iDays;
}

/**
 * 取n以内素数
 */
util.getPrime = function(n) {
	var ret = [];
	for (var i = 2; i <= n; i++) {
		var t = 1;
		for (var j = 2; j < i; j++) {
			if (i % j === 0) {
				t = 0;
				break;
			}
		}
		if (t === 1) {
			ret.push(i);
		}
	}
	return ret;
}

/**
 * 对象拷贝
 */
util.objCopy = function(obj) {
	if (obj == null) { // null or undefined
		return obj;
	} else if (Array.isArray(obj)) {
		return obj.slice();
	} else if (typeof(obj) === 'object') {
		var copy = {};
		Object.keys(obj).forEach(function(k) {
			copy[k] = obj[k];
		});
		return copy;
	} else {
		return obj;
	}
}