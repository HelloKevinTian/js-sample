var memwatch = require('memwatch');

memwatch.on('leak', function(info) { 
	console.log(info); 
});
memwatch.on('stats', function(stats) {
	// do something with post-gc memory usage stats
	console.log(stats);
});

var leakArray = [];  
for(var i = 0; i < 10000; ++i){
	var date = new Date();
	var object = new Object();
	object.name = 'king lee';
	leakArray.push(object);
	
	leakArray.push("leak" + Math.random()); 
}

memwatch.on('gc', function(d) {
  if (d.compacted) {
    console.log('current base memory usage:', memwatch.stats().current_base);
  }
});

setInterval(function() {
  memwatch.gc();
}, 1000);