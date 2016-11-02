var dnode = require('dnode');
var server = dnode({
	transform: function(s, cb) {
		cb(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase());
	},
	plus: function(a, b, cb) {
		cb(a + b);
	},
	concat: function(s, cb) {
		cb('hello ' + s);
	}
});
server.listen(5004);