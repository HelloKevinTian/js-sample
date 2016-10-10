var http_server = require('./httpServer');

var server = new http_server("127.0.0.1",20003);
server.createHttpServer();