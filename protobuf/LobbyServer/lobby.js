'use strict';
/**
 *  游戏大厅服务器
 *
 */
var app = require('ss-server');
var logger = require('ss-logger').getLogger(__filename);
var mongo = require('ss-mongo');
var globaltable = require('ss-globaltable');
var protoManager = require('./proto/ProtoManager');


/**
 *  修改框架配置
 */
app.configure('server', 'cfg/server.json');
app.configure('handle', 'cfg/handle.json');

/**
 * 添加mongodb读写组件
 */
app.configure('proto', function() {
	protoManager.LoadAllProtoFile();
	logger.info('添加proto管理器');
});

/**
 * 添加mongodb读写组件
 */
app.configure('mongo', function() {
	mongo.configure('cfg/mongo.json');
	logger.info('添加mongodb读写组件');
});



/**
 *  开启服务器
 */
app.start();
