/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ Date   Mon Jul 13 2015 17:30:43 GMT+0800 (CST)
 * @ warning auto create file template,care with modify!!
 */

var redis = require('ss-redis'),
	redis_pool = 'test',
	redis_table = 'test',
	redis_key = 'test',
	redis_obj = {
		"a": "",
		"b": "",
		"c": 0
	};
var model_rank_info = module.exports;

model_rank_info.init_table = function() {
	redis.execute(redis_pool, function(client, release) {
		client.hset(redis_table, redis_key, JSON.stringify(redis_obj), function(err) {
			if (err) console.log(err);
			release();
		})
	})
}

model_rank_info.get_table_data = function(callback) {
	redis.execute(redis_pool, function(client, release) {
		client.hgetall(redis_table, function(err, reply) {
			if (err) console.log(err);
			callback(reply);
			release();
		});
	});
}

model_rank_info.get_table_keys = function(callback) {
	redis.execute(redis_pool, function(client, release) {
		client.hkeys(redis_table, function(err, reply) {
			if (err) console.log(err);
			callback(reply);
			release();
		});
	});
}

model_rank_info.get_table_vals = function(callback) {
	redis.execute(redis_pool, function(client, release) {
		client.hvals(redis_table, function(err, reply) {
			if (err) console.log(err);
			callback(reply);
			release();
		});
	});
}

model_rank_info.del_table = function() {
	redis.execute(redis_pool, function(client, release) {
		client.del(redis_table, function(err) {
			if (err) console.log(err);
			release();
		});
	});
}

model_rank_info.table_exists = function(callback) {
	redis.execute(redis_pool, function(client, release) {
		client.exists(redis_table, function(err, is_exist) {
			if (err) console.log(err);
			callback(is_exist);
			release();
		});
	});
}

model_rank_info.get_a = function() {

}
model_rank_info.set_a = function() {

}
model_rank_info.get_b = function() {

}
model_rank_info.set_b = function() {

}
model_rank_info.get_c = function() {

}
model_rank_info.set_c = function() {

}
