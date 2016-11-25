var net = require("net");

var HOST = "127.0.0.1"
var PORT = 9876
var BUFSIZE = 256
var BUFSIZE = 256
var buf = new Buffer(BUFSIZE);

function onConnection(sock) {
	console.log("connected :" + sock.remoteAddress + " " + sock.remotePort);
	//	add a 'data' event handler to this instance of socker
	sock.on("data", function(buf) {
		console.log("data from clinet: " + sock.remoteAddress + " : " + buf.toString('utf8', 0, buf.length));
		//	write back data to the connection of socket
		sock.write(buf);
	});
	//	add a 'close' event handler to this instance of socker
	sock.on("close", function(data) {
		console.log("closed " + sock.remoteAddress + " " + sock.remotePort);
	});
}

//	create a server instance, you also can use another way,
/*
	var server = net.createServer();
	server.listen(PORT,HOST);
	server.on('connection',function(sock){...} );
*/
var server = net.createServer(false, onConnection);
//	listen at PORT HOST
server.listen(PORT, HOST);

console.log("server listen on " + HOST + " : " + PORT);