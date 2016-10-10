'use strict';
/**
 *  url: '/'
 */
var async = require('async');
var logger = require('ss-logger').getLogger(__filename);
var protoManager = require('../proto/ProtoManager');


/**
 *  协议逻辑处理
 * @param {String} clientip 客户端ip
 * @param {Object} args 数据包
 * @param {Function} endcb 回包回调函数
 */
function handle(clientip, args, endcb) {

	var equip = {
		'guid': 1,
		'templateid': 2,
		'intensifyLevel': 3
	}
	// 给客户端回包数据
	var msg = protoManager.NewMessage('Equip', equip);
	// 客户端回包
	endcb(msg, 'Msg_Get_EventAxis');

};

/**
 * 导出函数列表
 */
module.exports = {
	'handle': handle
};