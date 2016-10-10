'use strict';
/**
 *  protobuf协议管理器
 */
var ProtoBuf = require('protobufjs');
var logger = require('ss-logger').getLogger(__filename);
var util = require('util');
var _ = require('underscore');
var crc = require('crc');
var protoList = {};
var protocolMap = {};

// 消息头
var headerMsg = {
	'version': 0,
	'protoId': 0,
	'length': 0,
	'crcCode': 0,
	'number': 0
};
// 消息头长度
var headerLength = 12;
/**
 *  读取全部proto文件
 */
function LoadAllProtoFile() {

	LoadProtoFile('/proto/message.proto');

	RegisterProtocol(1, 'Item');
	RegisterProtocol(2, 'Equip');
};

/**
 * 注册协议解析
 */
function RegisterProtocol(protoId, msgName) {
	if (!protoList[msgName]) {
		logger.error('Register Protocol [ %d ][ %s ] is NULL', protoId, msgName);
		return;
	};
	protocolMap[protoId] = msgName;
};

/**
 *  读取全部proto文件
 */
function LoadProtoFile(file, pack) {
	try {
		var root = ProtoBuf.loadProtoFile(process.cwd() + file).build(pack);
		for (var i in root) {
			if (protoList[i]) {
				logger.error('loadProtfile[ %s ]错误 协议[ %s ] 已存在!', file, i);
				continue;
			};
			protoList[i] = root[i];
		}
	} catch (e) {
		logger.error(e);
	};
};

/**
 * 消息编码
 */
function Encode(message, protoId) {
	message = message.toBuffer();
	// 生成消息头
	var head = _.clone(headerMsg);
	head.protoId = protoList.MessageType[protoId];
	head.length = message.length;
	head.crcCode = crc.crc32(message);
	var messageBuffer = new Buffer(headerLength);
	if (protoList.MessageType[protoId] != undefined) {
		// 压入消息头
		messageBuffer.writeUInt8(head.version, 0);
		messageBuffer.writeUInt8(head.protoId, 1);
		messageBuffer.writeUInt16LE(head.length, 2);
		messageBuffer.writeUInt32LE(head.crcCode, 4);
		messageBuffer.writeUInt32LE(head.number, 8);
		// 压入消息体
		messageBuffer = Buffer.concat([messageBuffer, message]);
		return messageBuffer;
	} else {
		logger.error('协议id错误[%d]', protoId);
		return undefined;
	}
};

/**
 * 消息解码
 */
function Decode(message) {

	if (!Buffer.isBuffer(message)) {
		logger.error(1);
		message = new Buffer(message);
	};

	// 解析消息头
	var head = _.clone(headerMsg);
	head.version = message.readUInt8(0);
	head.protoId = message.readUInt8(1);
	head.length = message.readUInt16LE(2);
	head.crcCode = message.readUInt32LE(4);
	head.number = message.readUInt32LE(8);

	if (message.length == (headerLength + head.length)) {
		var originBuffer = new Buffer(head.length);
		message.copy(originBuffer, 0, headerLength, message.length);

		// 验证消息编码
		/*
		if (head.crcCode != crc.crc32(originBuffer)) {
			return null;
		}
		*/
		// 解析协议体
		if (!protocolMap[head.protoId]) {
			logger.error("协议id未注册");
			return null;
		};
		var Msg = protoList[protocolMap[head.protoId]];
		Msg = Msg.decode(originBuffer);
		Msg.headerMsg = head;
		return Msg;
	} else {
		logger.error("解析消息长度不一致");
		return null;
	}
};


/**
 * 获取消息体
 */
function GetMessage(field) {
	return protoList[field];
};

/**
 * 生成消息体
 */
function NewMessage(field, obj) {
	obj = obj || {};

	return new protoList[field](obj);
};
/**
 * 导出函数列表
 */
module.exports = {
	// 读取全部proto文件
	'LoadAllProtoFile': LoadAllProtoFile,
	// 消息编码
	'Encode': Encode,
	// 消息解码
	'Decode': Decode,
	// 获取消息体
	'GetMessage': GetMessage,
	// 生成消息体
	'NewMessage': NewMessage
};