var async = require('async');
var redis = require("redis");
var client = redis.createClient("6379","192.168.20.135",{"no_ready_check":false});
client.on("connect", load_data);

//  current is the x week
var getWeek = function (date) {
    var onejan = new Date(date.getFullYear(), 0, 1);
    //	delay_day ,such as 3,that means wednesday is the first day of new week
    var delay_day = 3;
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1 + delay_day) / 7);
};

var championship_id = getWeek(new Date());
function export_data() {
	var robot_rank_info = [];
	client.zrevrange("z_rank_pvp_score", 0,50, function (err, reply) {
		var rank_device_guid_array = reply;
		var count = 0;
		async.whilst(
            function () { return count < rank_device_guid_array.length; },
			function (callback) {
				async.waterfall([
						function(callback){
						client.hget("h_rank_pvp", rank_device_guid_array[count], function (err, reply) { callback(null,reply);});
					},
						function(rank_info,callback){
						robot_rank_info.push(rank_info);
						callback(null);
					}
				],
                // optional callback
                function(err){
                    if(err){
                        console.error(err);
                    }
                    ++count;
                    callback(null);
                })
			},
			function (err) {
                //  whilst end,do nothing
                if(err){
                    console.error(err);
                }
				require("fs").writeFile('robot_rank_info.json', JSON.stringify(robot_rank_info), 'utf8', function(err){
					if(err){
						console.log('failed');
					}else{
						console.log('ok');
					}
				});
			});
	});
};

function load_data() {
	var count = 0;
	var robot_rank_info = require('./robot_rank_info.json');
	async.whilst(
		function () { return count < robot_rank_info.length; },
		function (callback) {
			async.waterfall([
				function(callback){
					client.hset("h_rank_pvp", JSON.parse(robot_rank_info[count]).device_guid,robot_rank_info[count], function (err, reply) { callback(null);});
				},
				function(callback){
					client.hset("h_rank_pvp:" + championship_id, JSON.parse(robot_rank_info[count]).device_guid,robot_rank_info[count], function (err, reply) { callback(null);});
				},
				function(callback){
					client.zadd("z_rank_pvp_score", JSON.parse(robot_rank_info[count]).score,JSON.parse(robot_rank_info[count]).device_guid, function (err, reply) { callback(null);});
				},
				function(callback){
					client.zadd("z_rank_pvp_score:" + championship_id, JSON.parse(robot_rank_info[count]).score_weekly,JSON.parse(robot_rank_info[count]).device_guid, function (err, reply) { callback(null);});
				}
			],
            // optional callback
            function(err){
                if(err){
                    console.error(err);
                }
                ++count;
                callback(null);
            })	
		},
		function (err) {
            //  whilst end,do nothing
            if(err){
                console.error(err);
            }
		}
	);
};

