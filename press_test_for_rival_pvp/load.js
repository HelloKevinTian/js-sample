var redis = require("redis")
var async = require('async');
var json_rival_vs = require("./rival_vs");
var client = redis.createClient("6379","127.0.0.1",{"no_ready_check":false});
var h_robot_rival_vs = "h_robot_rival_vs";
var z_robot_rival_vs = "z_robot_rival_vs";

client.on("connect", load_data);
 
function load_data() {
	use_async();
};

function use_async(){
	//	load data
	client.hlen(h_robot_rival_vs, function (err, reply) {
		var time_begin = Date.now();
		console.log("robot_index_begin "+ reply);
		var robot_index_begin = reply;
		var robot_index_end = robot_index_begin + 10000;
		var count = robot_index_begin;
		async.whilst(
			function () { return count < robot_index_end; },
			function (callback) {
				async.waterfall([
					function(callback){
						client.hlen(h_robot_rival_vs, function (err, reply) {
							callback(null,reply);
						});
					},	
					function(length,callback){
						var robot_id = "robot_" + length;
						var random_val = Math.floor(Math.random()*json_rival_vs.length);
						client.hset(h_robot_rival_vs, robot_id,JSON.stringify(json_rival_vs[random_val]), function (err, reply) {
							callback(null,robot_id,length);
						});
					},
					function(robot_id,length,callback){
						client.zadd(z_robot_rival_vs, length,robot_id, function (err, reply) {
							callback(null);
						});
					}
				],
				// optional callback
                function(err){
                    if(err){
                        console.error(err);
                    }
                    ++count;
                    callback(null);
                });
			},
            function (err) {
                //  whilst end,do nothing
                if(err){
                    console.error(err);
                }
				var time_end = Date.now();
				console.log("elapsed time " + (time_end - time_begin));
            }
		);
	});
}

/*
22.63---22.63		not use twmproxy
0~500000			elapsed time 131892
500000~1000000		elapsed time 133769
1000000~2000000		elapsed time 259835
2000000~3000000		elapsed time 276097
3000000~5000000		elapsed time 575230
5000000~10000000
*/

/*
1.71---1.73---1.74	use twmproxy 8 node
0~500000			elapsed time 429034
500000~1000000		elapsed time 422621
1000000~2000000		elapsed time 841531
2000000~3000000		elapsed time 
3000000~5000000
5000000~10000000
*/