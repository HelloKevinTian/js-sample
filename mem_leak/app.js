var http = require('http');

var server = http.createServer(function(req, res) {
	for (var i = 0; i < 1000; i++) {
		server.on('request', function leakyfunc() {});
	}

	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
server.setMaxListeners(0);
console.log('Server running at http://127.0.0.1:1337/. Process PID: ', process.pid);

//while true; do curl "http://127.0.0.1:1337/"; done         执行这段shell上述代码会出现内存泄露


var memwatch = require('memwatch');
//memwatch.setup();  原文有这行代码，最新版本的memwatch已去掉这个方法（译者注）

// memwatch.on('leak', function(info) {
// 	console.error('Memory leak detected: ', info);
// });

// var hd;
// memwatch.on('leak', function(info) {
// 	console.error(info);
// 	if (!hd) {
// 		hd = new memwatch.HeapDiff();
// 	} else {
// 		var diff = hd.end();
// 		console.error(util.inspect(diff, true, null));
// 		hd = null;
// 	}
// });

var heapdump = require('heapdump');

memwatch.on('leak', function(info) {
	console.error(info);
	var file = './myapp-' + process.pid + '-' + Date.now() + '.heapsnapshot';
	heapdump.writeSnapshot(file, function(err) {
		if (err) console.error(err);
		else console.error('Wrote snapshot: ' + file);
	});
});



// var http = require('http');
// http.createServer(function(req, res) {
// 	res.writeHead(200, {
// 		'Content-Type': 'text/plain'
// 	});
// 	res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');