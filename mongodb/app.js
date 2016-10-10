var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
  
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insert([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection, result: " + result);
    callback(result);
  });
}

var insertDocumentsNoCallback = function(db) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insert([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection, result: " + result);
  });
}

var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.update({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2, result: " + result);
    callback(result);
  });  
}

var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.remove({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    //assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3, result: " + result);
    callback(result);
  });    
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    //assert.equal(2, docs.length);
    console.log("Found the following records, result: %j" , docs);
    console.dir(docs);
    callback(docs);
  });      
}

// Connection URL
var url = 'mongodb://localhost:30000/test_mongodb';
//	reference form : http://mongodb.github.io/node-mongodb-native/2.0/tutorials/connecting/
// Use connect method to connect to the Server
//	{Number, default: 5} Number of connections in the connection pool for each server instance, set to 5 as default for legacy reasons.
MongoClient.connect(url, {db: {raw: true},server: {poolSize: 10}},function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  for(var i = 0; i < 100000; ++i){
	insertDocumentsNoCallback(db);
  }
  insertDocuments(db, function() {
	updateDocument(db, function() {
	  removeDocument(db, function() {
		findDocuments(db, function() {
		  db.close();
		});
	  });
	});
  });
});

