'use strict';
/**
 *  客户端数据安全验证
 */
var logger = require('ss-logger').getLogger(__filename);
var protoManager = require('../../proto/ProtoManager');
/**
 *  协议逻辑处理
 * @param {Object} args 数据包
 * @param {Function} endcb 回包回调函数
 * @param {Function} result 验证结果回调
 */
function handle(args, endcb, result, req, res) {

	// 解析数据包
	args = protoManager.Decode(args);
	//在此对协议包数据做验证处理


	result(false, args, function(data, protocol) {
		var body = data;
		// 编码数据包
		data = protoManager.Encode(data, protocol);
		res.end(data);
		logger.info('发送到客户端数据[ %s ][%s]', JSON.stringify(body), protocol);
	});
};

/**
 * 导出函数列表
 */
module.exports = {
	'handle': handle
};