var http = require('http');

http.createServer(function(req, res) {
	console.log("req.method " + req.method);
	console.log("req.connection.remoteAddress " + req.connection.remoteAddress);
	var post = '';
	req.on('data', function(chuck) {
		post += chuck;
		console.log(post);
	});
	req.on('end', function(chuck) {
		console.log("end...");
	});
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	if (0) {
		res.write('<h1>I have get data. many thanks</h1>');
		res.end();
	} else {
		res.end('<h1>I have get data. many thanks</h1>');
	}
}).listen(3000);

console.log("HTTP server is listening at port 3000.");