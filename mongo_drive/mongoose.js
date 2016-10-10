//------------------------test mongoose---------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:13600/test');

//test connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {
	console.log('mongodb connect sucess ...');
});


// ---------------------------test 1--------------------------
var kittySchema = mongoose.Schema({
	name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({
	name: 'Silence'
});

// silence.save(function(err) {
// 	if (err)
// 		console.error('meow');
// 	console.log('meow');
// });

Kitten.find({
	name: 'Silence'
}, function(err, kittens) {
	if (err)
		console.error(err);
	console.log(kittens)
})


// //------------------------test 2--------------------------
// var blogSchema = new mongoose.Schema({
// 	title: String,
// 	author: String,
// 	body: String,
// 	comments: [{
// 		body: String,
// 		date: Date
// 	}],
// 	date: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	hidden: Boolean,
// 	meta: {
// 		votes: Number,
// 		favs: Number
// 	}
// });

// var Blog = mongoose.model('Blog', blogSchema);

// // -----insert
// var doc = new Object();
// doc.title = 'title11';
// doc.author = 'author11';
// var blog = new Blog(doc);

// blog.save(function(err) {
// 	if (err) throw err;
// 	console.log('save ok!');
// });

// // -----insert
// Blog.create({
// 	title: 'aaaaaaaa',
// 	author: 100
// }, function(err) {
// 	if (err) throw err;
// 	console.log('insert ok...');
// });

// // -----update
// Blog.update({
// 	title: 'title11'
// }, {
// 	title: 'title22',
// 	author: 'author222'
// }, function(err, ret) {
// 	if (err) throw err;
// 	console.log(ret);
// });


// // -----select
// Blog.findOne({
// 	title: 'title22'
// }, function(err, ret) {
// 	if (err) throw err;
// 	console.log(ret);
// });

// Blog.find({
// 	title: 'aaaaaaaa'
// }, function(err, ret) {
// 	if (err)
// 		console.error(err);
// 	console.log(ret)
// }).limit(2);

// // -----聚合查询(有待完善)
// Blog.aggregate({
// 	$group: {
// 		_id: null,
// 		showauthor: {
// 			$min: '$author'
// 		}
// 	}
// }, {
// 	$project: {
// 		_id: 0,
// 		showauthor: 1
// 	}
// }, function(err, res) {
// 	if (err) throw err;
// 	console.log(res); // [ { maxBalance: 98000 } ]
// });


// // -----count
// Blog.count({
// 	author: 'author222'
// }, function(err, count) {
// 	if (err) throw err;
// 	console.log('there are %d result', count);
// });

// // -----delete
// Blog.remove({
// 	title: 'title11',
// 	author: 'author22'
// }, function(err) {
// 	if (err) throw err;
// 	console.log('delete ok...');
// });