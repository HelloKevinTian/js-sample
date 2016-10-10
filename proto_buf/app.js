/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ Date 	2015-5-26
 */
// require.config({
//     ...
//     "paths": {
//         "Long": "./to/Long.js",
//         "ByteBuffer": "./to/ByteBufferAB.js",
//         "ProtoBuf": "./to/ProtoBuf.js"
//     },
//     ...
// });
// require(["ProtoBuf"], function(ProtoBuf) {
//     ...
// });

// define("MyModule", ["ProtoBuf"], function(ProtoBuf) {
//     ...
// });


// 1 .proto file: ProtoBuf.loadProtoFile
// 2 .proto string: ProtoBuf.loadProto
// 3 JSON file: ProtoBuf.loadJsonFile
// 4 JSON definition or string: ProtoBuf.loadJson
// 5 created manually: ProtoBuf.newBuilder, Builder#define/create (see)

// Synchronously
// var builder = ProtoBuf.loadProtoFile("path/to/file.proto");

// Asynchronously
// ProtoBuf.loadProtoFile("./to/file.proto", function(err, builder) {
//     ...
// });


//---------------------------例子proto---------------------------------
var ProtoBuf = require("protobufjs");

var builder = ProtoBuf.loadProtoFile("tests/complex.proto"),
    Game = builder.build("Game"),
    Car = Game.Cars.Car;

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

// And send it over the wire:
var socket = ...;
socket.send(buffer.toArrayBuffer()); // node.js: buffer.toBuffer()

// OR: Short...
socket.send(car.toArrayBuffer()); // node.js: car.toBuffer()


//---------------------------------例子json--------------------------
var ProtoBuf = require("protobufjs");

var builder = ProtoBuf.loadJsonFile("tests/complex.json");

var Game = builder.build("Game")；
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

// And send it over the wire:
var socket = ...;
socket.send(buffer.toArrayBuffer()); // node.js: buffer.toBuffer()

// OR: Short...
socket.send(car.toArrayBuffer()); // node.js: car.toBuffer()



//--------------------例子string-------------------------------------
var ProtoBuf = require("protobufjs");

// Creates a new empty Builder pointing at the root namespace:
var builder = ProtoBuf.newBuilder();
// Defines namespace Game and adjusts the pointer to it:
builder.define("Game");
// Creates messages etc. at the current pointer position:
builder.create([
      {
          "name": "Car",
          "fields": [
              {
                  "rule": "required",
                  "type": "string",
                  "name": "model",
                  "id": 1
              },
              ...
          ],
          "messages": [
              {
                  "name": "Vendor",
                  "fields": ...,
              },
              ...
          ],
          "enums": [
              {
                  "name": "Speed",
                  "values": [
                      {
                          "name": "FAST",
                          "id": 1
                      },
                      ...
                  ]
              }
          ]
      }
]);
// Resets the pointer to the root namespace:
builder.reset();

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

// And send it over the wire:
var socket = ...;
socket.send(buffer.toArrayBuffer()); // node.js: buffer.toBuffer()

// OR: Short...
socket.send(car.toArrayBuffer()); // node.js: car.toBuffer()