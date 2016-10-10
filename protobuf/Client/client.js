'use strict';
var logger = require('ss-logger').getLogger(__filename);
var request = require('./request');
var protoManager = require('./proto/ProtoManager');

protoManager.LoadAllProtoFile();

var req_url = 'http://192.168.20.137:18000/auth_client'

var item = {
	'guid': 123456789012345678, // 唯一索引
	'templateid': 2, // 道具ID
	'number': 3, // 数量
	'type': 4 //道具类型
}
var protoData = protoManager.NewMessage('Item', item);
logger.debug("发送给服务端的数据：", protoData);

request.post(req_url, protoManager.Encode(protoData, 'Msg_Get_BasicUserInfo'), function(error, result) {

	logger.debug(error);
	if (!error) {
		result = protoManager.Decode(result);
		logger.debug("接受的服务端的数据：", result);
	};

});
// var test = protoManager.Encode(protoData, 'Msg_Get_BasicUserInfo');

// test = protoManager.Decode(test);
// logger.debug(test);

// {
// 	"guid": {
// 		"low": 1,
// 		"high": 0,
// 		"unsigned": true
// 	},
// 	"templateid": 2,
// 	"number": 3,
// 	"type": 4,
// 	"headerMsg": {
// 		"version": 0,
// 		"protoId": 1,
// 		"length": 8,
// 		"crcCode": 1822736129,
// 		"number": 0
// 	}
// }