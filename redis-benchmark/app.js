var redis = require("redis")
var client = redis.createClient("6379","127.0.0.1");

client.on("error", function (err) {
    console.log("Error " + err);
});

var rand_int = 0;
var time_start = Date.now();
for(var i = 0; ; ++i){
	client.set("key:__rand_int__", ++rand_int, function (err, reply) {
		if(err){
			console.log(err);
		}
		console.log(i);
	});		
	
	if(Date.now() - time_start >= 1000){
		console.log("hset rand_int:" + rand_int);
		rand_int = 0;
		return;
	}
}