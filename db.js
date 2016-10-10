var mongo = require('mongoskin');
var async = require('async');

var dbOptions = {
	safe: true
};
var dbName = ('mongodb://127.0.0.1:27017/test?auto_reconnect=true');
var db = mongo.db(dbName, dbOptions);

function randomInt(min, max) {
	return min + Math.round(Math.random() * (max - min));
}

function test() {
	db.collection('test').find({}).count(function(err, result) {
		console.log(err, result);
	});
}

function insert(uid, cb) {
	var count = 1;

	async.whilst(
		function() {
			return count <= 160;
		},
		function(callback) {
			db.collection('test').insert({
				"buy_num": 0,
				"chapter_reward_flag": 0,
				"extra_num": 0,
				"first_reward": 1,
				"is_pass": 2,
				"last_buy_time": 1471330797143.0,
				"last_pve_time": 0,
				"max_score": 2,
				"pass_time": 0,
				"pve_num_per_day": 0,
				"reward_f3_flag": 0,
				"stage_id": '100-' + count,
				"uid": uid.toString()
			}, function(err) {
				// console.log(count);
				count++;
				callback(err);
			});
		},
		function(err) {
			cb(err);
		}
	);

};

console.time('time')
var count = 30001;
async.whilst(
	function() {
		return count <= 60000;
	},
	function(callback) {
		insert(count, function(err) {
			count++;
			callback(null);
		});
	},
	function(err) {
		console.timeEnd('time');
	}
);