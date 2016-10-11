var mongo = require('mongoskin');
var assert = require('assert');
var db = mongo.db("mongodb://localhost:30000/test_mongoskin", {native_parser:true});
db.bind('documents');


var insertDocuments = function() {
  // Get the documents collection
  var collection = db.documents; //	db.collection('documents');
  // Insert some documents
  collection.insert([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
	if(err){
		console.log(err);
	}
    console.log("Inserted 3 documents into the document collection, result: %j" , result);
  });
}

var updateDocument = function() {
  // Get the documents collection
  var collection = db.documents; //	db.collection('documents');
  // Insert some documents
  collection.update({ a : 2 }, { $set: { b : 1 } }, function(err, result) {
	if(err){
		console.log(err);
	}
    console.log("Updated the document with the field a equal to 2, result: " +  result);
  });  
}

var removeDocument = function() {
  // Get the documents collection
  var collection = db.documents; //	db.collection('documents');
  // Insert some documents
  collection.remove({ a : 3 }, function(err, result) {
  	if(err){
		console.log(err);
	}
    console.log("Removed the document with the field a equal to 3, result: " + result);
  });    
}

var findDocuments = function() {
  // Get the documents collection
  var collection = db.documents; //	db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
  	if(err){
		console.log(err);
	}
    console.log("Found the following records, result: %j", docs);
    console.dir(docs)
  });      
}
/*
db.documents.find().toArray(function(err, items) {
		if(err){
			console.log(err);
		}
		console.log(items);
		
        db.close();
});
*/

//insertDocuments();
//updateDocument();
//removeDocument();
//findDocuments();


// press test
var insertDocumentsBatch = function(loops) {
  // Get the documents collection
  var collection = db.documents; //	db.collection('documents');
  // Insert some documents
  for(var i = 0; i < loops; ++i){
	collection.insert([
		{a : 1}, {a : 2}, {a : 3}
	  ], function(err, result) {
		if(err){
			console.log(err);
		}
		console.log("Inserted 3 documents into the document collection, result: %j" , result);
	  });
  }
}
//	if the loops more than 50, it will be warning, do not care about it.
/*
(node) warning: possible EventEmitter memory leak detected. 51 listeners added. Use emitter.setMaxListeners() to increase limit.
Trace
    at EventEmitter.addListener (events.js:160:15)
    at EventEmitter.once (events.js:179:8)
    at SkinClass.open (/share/git/node.js/test/mongoskin/node_modules/mongoskin/lib/utils.js:156:23)
    at SkinClass.(anonymous function) [as insert] (/share/git/node.js/test/mongoskin/node_modules/mongoskin/lib/utils.js:116:14)
    at insertDocumentsBatch (/share/git/node.js/test/mongoskin/app.js:80:13)
    at Object.<anonymous> (/share/git/node.js/test/mongoskin/app.js:91:1)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
*/
insertDocumentsBatch(100000);