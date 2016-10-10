var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

//--------------------------protobuf begin---
var ProtoBuf = require("protobufjs");

var builder = ProtoBuf.loadProtoFile("proto/complex.proto");
// console.log(builder);
var Game = builder.build("Game");
var Car = Game.Cars.Car;

// Construct with arguments list in field order:
var car = new Car("Rusty", new Car.Vendor("Iron Inc.", new Car.Vendor.Address("US")), Car.Speed.SUPERFAST);

// OR: Construct with values from an object, implicit message creation (address) and enum values as strings:
var car = new Car({
	"model": "Rusty",
	"vendor": {
		"name": "Iron Inc.",
		"address": {
			"country": "US"
		}
	},
	"speed": "SUPERFAST" // also equivalent to "speed": 2
});

// OR: It's also possible to mix all of this!

// Afterwards, just encode your message:
var buffer = car.encode();

//--------------------------protobuf end-----

var client = new net.Socket();
client.connect(PORT, HOST, function() {

	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	// 建立连接后立即向服务器发送数据，服务器将收到这些数据 
	client.write('I am Chuck Norris!');
	client.write('Then What!');

	//test protobufjs
	// console.log(JSON.stringify(buffer.toArrayBuffer()));
	// client.write(JSON.stringify(buffer.toArrayBuffer()));

});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {

	console.log('DATA: ' + data);
	// 完全关闭连接
	// client.destroy();

});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
	console.log('Connection closed');
});