var xlsx = require('node-xlsx');

var redis = require("redis")
	, client = redis.createClient("6379","192.168.22.61");

client.on("connect", load_data);
 
function load_data() {
	var obj = xlsx.parse('robot_rank_data.xlsx'); // parses a file
	if(0){
		console.log(obj.worksheets[0].name);
		console.log(obj.worksheets[0].data[0]);
		console.log(obj.worksheets[0].data[1]);
		}
	console.log(obj.worksheets[0].data.length);
	for(var i = 1; i < obj.worksheets[0].data.length; ++i)
	{
		if(0){
			console.log(obj.worksheets[0].data[i][0].value);
			console.log(obj.worksheets[0].data[i][1].value);
			}
		// Set a value
		client.zadd("z_rank:1", obj.worksheets[0].data[i][1].value, obj.worksheets[0].data[i][0].value,function (err, reply) {
        console.log(reply.toString());
    });
	}

}
	
client.on("error", function (err) {
    console.log("Error " + err);
});
 