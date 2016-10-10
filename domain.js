var domain = require('domain');
var EventEmitter = require('events').EventEmitter;

var e = new EventEmitter();

var timer = setTimeout(function () {
  e.emit('data');  
}, 10);

function next() {
  e.once('data', function () {
    throw new Error('something wrong here');
  });
}

var d = domain.create();
d.on('error', function () {
  console.log('cache by domain');
});

d.add(timer);
//or
d.add(e);

d.run(next);