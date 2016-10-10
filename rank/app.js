var redis = require("redis")
	, client = redis.createClient("6380","127.0.0.1");
//	zrange z_rank:1 0 1000 withscores
var z_rank = "z_rank:2";	
var h_rank = "h_rank:2";	
var range_low = 0;
var range_high = 999;

client.on("error", function (err) {
    console.log("Error " + err);
});
 
client.on("connect", runSample);
 
var rank = [];
var score;
var phone;
function runSample() {
	var args1 = [ z_rank, range_low, range_high, 'withscores' ];
    client.zrange(args1, function (err, reply) {
		for(var i = 0; i < reply.length; ++i){
			var contact = new Object();
			contact.device_id = reply[i++];
			contact.score = reply[i];
			rank.push(contact);
		}

		var args1 = [];
		args1.push(h_rank);
		for(var j = 0; j < rank.length; ++j){
			args1.push(rank[j].device_id);
		}
		client.hmget(args1, function (err, reply1) {
			var index = 0;
			for(var v in reply1){
				rank[index].rank = index + 1;
				delete rank[index].device_id;
				rank[index++].phone = JSON.parse(reply1[v]) ? JSON.parse(reply1[v]).phone_number:null;
			}
			require("fs").writeFile('rank.json', JSON.stringify(rank), 'utf8', function(err){
				if(err){
					console.log('failed');
				}else{
					console.log('ok');
				}
			});
			console.log(rank);
		});
    });
}
