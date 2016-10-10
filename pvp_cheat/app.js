var redis_pools = require("./redis_pools");
var redis_json = require("./redis");
redis_pools.configure(redis_json);
var cheat_list = [];

redis_pools.execute("pool_1",function(client, release){
		client.hgetall("h_rank_pvp_cheat", function (err, reply) {
			for(var v in reply){
				if(reply[v]){
					cheat_list.push(JSON.parse(reply[v]));
				}
			}
			require("fs").writeFile('cheat_list.json', JSON.stringify(cheat_list), 'utf8', function(err){
				if(err){
					console.log('failed');
				}else{
					console.log('ok');
				}
			});
			release();
    });
});

