var redis_pools = require("./redis_pools");
var redis_json = require("./redis");
redis_pools.configure(redis_json);

redis_pools.execute("pool_dump_load",function(client, release){
		client.set("pool_dump_load_key", "pool_dump_load_val", function (err, reply) {
		console.log(reply.toString());
		release();
    });
});

redis_pools.execute("pool_dump_load",function(client, release){
		client.get("pool_dump_load_key", function (err, reply) {
		console.log(reply.toString());
		release();
    });
});
