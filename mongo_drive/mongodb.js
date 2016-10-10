console.log('test mongodb');

var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var host = '127.0.0.1';
var port = '13600';
var database = 'test';

// Connection URL
var url = 'mongodb://' + host + ':' + port + '/' + database;
// Use connect method to connect to the Server
mongo.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("###=> Connected sucess to server on " + host + ":" + port);

	// insertDocuments(db, function() {
	// 	db.close();
	// });

	// updateDocument(db, function() {
	// 	db.close();
	// });

	// removeDocument(db, function() {
	// 	db.close();
	// });

	findDocuments(db, function() {
		db.close();
	});
});

var findDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find some documents
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log(docs.length);
		console.log("Found the following records");
		console.dir(docs);
		callback(docs);
	});
}

var insertDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.insert([{
		a: 1
	}, {
		a: 2
	}, {
		a: 3
	}], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the document collection");
		callback(result);
	});
}

var updateDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Update document where a is 2, set b equal to 1
	collection.update({
		a: 2
	}, {
		$set: {
			b: 1
		}
	}, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Updated the document with the field a equal to 2");
		callback(result);
	});
}

var removeDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.remove({
		a: 3
	}, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed the document with the field a equal to 3");
		callback(result);
	});
}