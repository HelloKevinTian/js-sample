var fs = require('fs'),
	async = require('async'),
	model_config = require('./model_config');

var prefix = 'model_';
var suffix = '.js';

begin();

function begin() {
	async.waterfall([
		function(callback) {
			write_file_head(callback);
		},
		function(callback) {
			write_file_body(callback);
		},
		function(callback) {
			write_file_tail(callback);
		}
	], function(err) {
		console.log("all over");
	});
}

function write_file_head(callback) {
	fs.open(get_file_name(true), "w", function(err, fd) {
		if (err) throw err;
		var file_data = '/**' + '\n' +
			' * @ Author Kevin' + '\n' +
			' * @ Email  tianwen@chukong-inc.com' + '\n' +
			' * @ Date   ' + new Date().toString() + '\n' +
			' * @ warning auto create file template,care with modify!!' + '\n' +
			' */' + '\n\n';

		fs.write(fd, file_data, 0, 'utf8', function(e) {
			if (e) throw e;
			console.log("write step1 over...");
			callback(null);
			fs.closeSync(fd);
		});
	});
}

function write_file_body(callback) {
	fs.open(get_file_name(true), "a", function(err, fd) {
		if (err) throw err;
		var file_data = '' +
			'var redis = require(\'ss-redis\'),' + '\n' +
			'	redis_pool = \'test\',' + '\n' +
			'	redis_table = \'test\',' + '\n' +
			'	redis_key = \'test\',' + '\n' +
			'	redis_obj = {' + '\n' +
			'		"a": "",' + '\n' +
			'		"b": "",' + '\n' +
			'		"c": 0' + '\n' +
			'	};' + '\n' +
			'var ' + get_file_name(false) + ' = module.exports;' + '\n\n' +

			get_file_name(false) + '.init_table = function() {' + '\n' +
			'	redis.execute(redis_pool, function(client, release) {' + '\n' +
			'		client.hset(redis_table, redis_key, JSON.stringify(redis_obj), function(err) {' + '\n' +
			'			if (err) console.log(err);' + '\n' +
			'			release();' + '\n' +
			'		})' + '\n' +
			'	})' + '\n' +
			'}' + '\n\n' +

			get_file_name(false) + '.get_table_data = function(callback) {' + '\n' +
			'	redis.execute(redis_pool, function(client, release) {' + '\n' +
			'		client.hgetall(redis_table, function(err, reply) {' + '\n' +
			'			if (err) console.log(err);' + '\n' +
			'			callback(reply);' + '\n' +
			'			release();' + '\n' +
			'		});' + '\n' +
			'	});' + '\n' +
			'}' + '\n\n' +

			get_file_name(false) + '.get_table_keys = function(callback) {' + '\n' +
			'	redis.execute(redis_pool, function(client, release) {' + '\n' +
			'		client.hkeys(redis_table, function(err, reply) {' + '\n' +
			'			if (err) console.log(err);' + '\n' +
			'			callback(reply);' + '\n' +
			'			release();' + '\n' +
			'		});' + '\n' +
			'	});' + '\n' +
			'}' + '\n\n' +

			get_file_name(false) + '.get_table_vals = function(callback) {' + '\n' +
			'	redis.execute(redis_pool, function(client, release) {' + '\n' +
			'		client.hvals(redis_table, function(err, reply) {' + '\n' +
			'			if (err) console.log(err);' + '\n' +
			'			callback(reply);' + '\n' +
			'			release();' + '\n' +
			'		});' + '\n' +
			'	});' + '\n' +
			'}' + '\n\n' +

			get_file_name(false) + '.del_table = function() {' + '\n' +
			'	redis.execute(redis_pool, function(client, release) {' + '\n' +
			'		client.del(redis_table, function(err) {' + '\n' +
			'			if (err) console.log(err);' + '\n' +
			'			release();' + '\n' +
			'		});' + '\n' +
			'	});' + '\n' +
			'}' + '\n\n' +

			get_file_name(false) + '.table_exists = function(callback) {' + '\n' +
			'	redis.execute(redis_pool, function(client, release) {' + '\n' +
			'		client.exists(redis_table, function(err, is_exist) {' + '\n' +
			'			if (err) console.log(err);' + '\n' +
			'			callback(is_exist);' + '\n' +
			'			release();' + '\n' +
			'		});' + '\n' +
			'	});' + '\n' +
			'}' + '\n\n'

		fs.write(fd, file_data, 0, 'utf8', function(e) {
			if (e) throw e;
			console.log("write step2 over...");
			callback(null);
			fs.closeSync(fd);
		});
	});
}

function write_file_tail(callback) {
	fs.open(get_file_name(true), "a", function(err, fd) {
		if (err) throw err;
		var file_data = '' +
			get_file_name(false) + '.get_a = function() {' + '\n\n' +

			'}' + '\n' +

			get_file_name(false) + '.set_a = function() {' + '\n\n' +

			'}' + '\n' +

			get_file_name(false) + '.get_b = function() {' + '\n\n' +

			'}' + '\n' +

			get_file_name(false) + '.set_b = function() {' + '\n\n' +

			'}' + '\n' +

			get_file_name(false) + '.get_c = function() {' + '\n\n' +

			'}' + '\n' +

			get_file_name(false) + '.set_c = function() {' + '\n\n' +

			'}' + '\n'

		fs.write(fd, file_data, 0, 'utf8', function(e) {
			if (e) throw e;
			console.log("write step3 over...");
			callback(null);
			fs.closeSync(fd);
		});
	});
}

function get_file_name(has_suffix) {
	var file_name = 'test';
	for (var key in model_config) {
		file_name = key;
	}
	if (has_suffix) {
		return prefix + file_name + suffix;
	} else {
		return prefix + file_name;
	}
}
