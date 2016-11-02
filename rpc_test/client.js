var dnode = require('dnode');

var d = dnode.connect(5004);
d.on('remote', function(remote) {
	remote.transform('beep', function(s) {
		console.log('beep => ' + s);
		// d.end();
	});

	remote.plus(12, 23, function(r) {
		console.log('plus:', r);
	});

	remote.concat('kevin', function(r) {
		console.log('concat:', r);
	})
});