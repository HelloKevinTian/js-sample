var Redis = require("ioredis");
var redis = new Redis(6379, "192.168.1.38");

var pipeline = redis.pipeline();
pipeline.set("foo", "bar");
pipeline.set("foo1", "bar");
pipeline.set("foo2", "bar");
pipeline.set("foo3", "bar");
pipeline.set("foo4", "bar");
pipeline.del("cc");
pipeline.exec(function(err, results) {
    console.log(err, results);
  // `err` is always null, and `results` is an array of responses
  // corresponding to the sequence of queued commands.
  // Each response follows the format `[err, result]`.
});

return;

// You can even chain the commands:
redis
  .pipeline()
  .set("foo", "bar")
  .del("cc")
  .exec(function(err, results) {});

// `exec` also returns a Promise:
var promise = redis
  .pipeline()
  .set("foo", "bar")
  .get("foo")
  .exec();
promise.then(function(result) {
  // result === [[null, 'OK'], [null, 'bar']]
});