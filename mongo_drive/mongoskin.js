var mongo = require('mongoskin');

var db = mongo.db("mongodb://127.0.0.1:13600/test", {
	native_parser: true
});

//------------------------------
db.bind('blogs');

db.blogs.find().toArray(function(err, items) {
	// console.log(items);
	// db.close();
});

//-------------------------------
db.bind('blogs').bind({
	getByAuthor: function(author_id, callback) {
		this.findOne({
			author: author_id
		}, callback);
	}
});

db.blogs.getByAuthor('100', function(err, blog) {
	console.log(blog);
});