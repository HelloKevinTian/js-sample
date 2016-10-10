'use strict';
var util = require('util');
var http = require('http');
var url = require('url');
var logger = require('ss-logger').getLogger(__filename);


/**
 *  获取字符串真实长度
 *  @param {string} str 字符串
 */
function getLength(str) {
	var length = str.length;
	var realLength = 0;
	var charCode = -1;
	if (!length) {
		return 0;
	}
	for (var i = 0; i < length; i++) {
		if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) < 128) {
			realLength++;
		} else {
			realLength += 3;
		}
	}
	return realLength;
}

/**
 *  发送get请求
 *  @param {string} url 完整url中端口后面的部分，形如'/home/dirPath?lwt=9527&wy=250'
 *  @param {string || object} data 请求数据
 *  @param {function} cb 回调函数
 */
function get(url, data, cb) {
	var param = '';
	if (typeof data === 'string') {
		param = data;
	} else {
		for (var i in data) {
			var elem = data[i];
			if (typeof elem == 'object') {
				elem = JSON.stringify(elem);
			}
			if (!param) {
				param = util.format('%s=%s', i, elem);
			} else {
				param = util.format('%s&%s=%s', param, i, elem);
			}
		}
	}

	var real_url = util.format('%s?%s', url, param);
	http.get(real_url, function(res) {
		var chunks = new Buffer(0);
		res.on('data', function(chunk) {
			chunks = Buffer.concat([chunks, chunk]);
		});
		res.on('end', function() {
			var result = null;
			try {
				result = chunks;
			} catch (e) {
				logger.error("try post %s", e);
				cb(true);
				return;
			}
			cb(false, result);
		});
	}).on('error', function(e) {
		logger.debug('error: ' + e.message);
	});
}

/**
 *  发送post请求
 *  @param {string} url 完整url中端口后面,问号前面的部分，形如'/home/dirPath'
 *  @param {string || object} data 请求数据
 *  @param {function} cb 回调函数
 */
function post(uri, data, cb) {

	uri = url.parse(uri);
	var http_options = {
		'host': uri.hostname,
		'port': uri.port,
		'path': uri.path,
		'method': 'POST'
	}
	var param = '';
	if (typeof data === 'string' || Buffer.isBuffer(data)) {
		param = data;
	} else {
		for (var i in data) {
			var elem = data[i];
			if (typeof elem == 'object') {
				elem = JSON.stringify(elem);
			}
			if (!param) {
				param = util.format('%s=%s', i, elem);
			} else {
				param = util.format('%s&%s=%s', param, i, elem);
			}
		}
	}
	var length = 0;
	if (Buffer.isBuffer(data)) {
		length = param.length;
	} else {
		length = getLength(param);
	}
	logger.info(length);
	var headers = {
		'Content-Length': length,
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	http_options.headers = headers;
	var req = http.request(http_options, function(res) {
		var chunks = new Buffer(0);
		res.on('data', function(chunk) {
			chunks = Buffer.concat([chunks, chunk]);
		});
		res.on('end', function() {
			var result = null;
			try {
				result = chunks;
			} catch (e) {
				logger.error("try post %s", e);
				cb(true);
				return;
			}
			cb(false, result);
		});
	});
	req.on('error', function(e) {
		logger.error('error: ' + e.message);
		// logger.error('http_options: ' + JSON.stringify(http_options));
		// logger.error('request_data: ' + param);
		cb(true);
	});
	req.write(param);
	req.end();
}


/**
 * 导出函数列表
 */
module.exports = {
	// get请求
	'get': get,
	// post请求
	'post': post
};