var async = require('async');
var redis_pools = require("./redis_pools");
var redis_json = require("./redis");
redis_pools.configure(redis_json);
var redis_rank_pvp_wrapper = require('./redis_rank_pvp_wrapper');

var test = function()
{
	redis_rank_pvp_wrapper.get_score_rank_partial(function(reply){
		console.log(reply);
	});
};

var memory_leak_check = function()
{
	var count = 0;
	async.whilst(
        function () { return count < 1000000000; },
		function (callback) {
			 async.waterfall([
					function(callback){
					    redis_pools.execute('memory_leak',function(client, release) {
							var random_val = Math.floor(100 + Math.random()*(500000 - 100));
							client.zrevrange("z_rank_pvp_score",random_val,(random_val + 99),function (err, reply) {
								if (err) {
									//  some thing log
									console.log(err);
								}
								callback(null,reply);
								release();
							});
						});
					},
					function(rank_array,callback){
						redis_rank_pvp_wrapper.get_rank_info_weekly_batch(7,rank_array,function(reply){
							//console.log(rank_array);
							callback(null);
						});
					},
					function(callback){callback(null);},
					function(callback){callback(null);}
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
		}
	);
};

var get_rank = function(){
	redis_pools.execute('memory_leak',function(client, release) {
		client.zrevrange("z_rank_pvp_score",0,25000,function (err, reply) {
			if (err) {
			//  some thing log
				console.log(err);
			}
			console.log(reply);
			require("fs").writeFile('user.json', JSON.stringify(reply), 'utf8', function(err){
				if(err){
					console.log('failed');
				}else{
					console.log('ok');
				}
			});
			release();
		});
	});
};
//memory_leak_check();
get_rank();