var mongodb_pools = require("./mongodb_pools");
var mongodb_json = require("./mongodb");
var assert = require('assert');
mongodb_pools.configure(mongodb_json);

var insert = function()
{
	mongodb_pools.execute("pool_1",function(client, release){
	  // Get the documents collection
	  var collection = client.collection('documents');
	  // Insert some documents
	  collection.insert([
		{a : 1}, {a : 2}, {a : 3},{a : 4}, {a : 5}, {a : 6}
	  ], function(err, result) {
		//assert.equal(err, null);
		/*
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		*/
		console.log("Inserted 3 documents into the document collection, result: " + result);
		release();
	  });
	});
};

var update = function()
{
	mongodb_pools.execute("pool_1",function(client, release){
	  // Get the documents collection
	  var collection = client.collection('documents');
	  // Insert some documents
	  collection.update({ a : 2 }
		, { $set: { b : 1 } }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Updated the document with the field a equal to 2, result: " + result);
		release();
	  });  
	});
};

var remove = function(){
	mongodb_pools.execute("pool_1",function(client, release){
	  // Get the documents collection
	  var collection = client.collection('documents');
	  // Insert some documents
	  collection.remove({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed the document with the field a equal to 3, result: " + result);
		release();
	  });    
	});
};

var find = function(){
	mongodb_pools.execute("pool_1",function(client, release){
	  // Get the documents collection
	  var collection = client.collection('documents');
	  // Find some documents
	  collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		//assert.equal(2, docs.length);
		console.log("Found the following records, result: %j" , docs);
		console.dir(docs);
		 release();
	  });      
	});
};

//	it running ok if not use shards.
for(var i = 0; i < 1000000; ++i)
{
	insert();
}