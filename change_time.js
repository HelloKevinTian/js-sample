var exec = require('child_process').exec;
var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    var args = req.url.split("=");
    console.log(req.url, args[1]);
    var cmdStr = "date -s " + args[1];
    exec(cmdStr, function(err, stdout, stderr) {
        var now = new Date();
        console.log(stdout);
        if (err) {
            res.end('modify time ERROR!!! ' + now.toString());
        } else {
            res.end('modify time OK,The time now is ' + now.toString());
        }
    });
    
}).listen(20009, '0.0.0.0');
console.log('Server running at http://127.0.0.1:20009/');
