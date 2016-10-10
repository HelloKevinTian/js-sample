var http = require("http");
var qs = require( 'querystring' );

http.createServer(function(request, response) {
    var chunks = [];
    request.on('data', function(chunk) {
        chunks.push(chunk);
    });

    request.on('end', function() {
        //  convert array to string,delimiter is "";
        var data = chunks.join('');
        //  convert url format to normal!!
        console.log(qs.parse(data));
    });
    request.on('error',function(err){
        console.log('problem with request: ' + err.message);
    });
	console.log('request received');
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
}).listen(8888);
console.log('server started');