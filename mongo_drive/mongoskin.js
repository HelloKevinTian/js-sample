var mongo = require('mongoskin');

var dbOptions = {
    // native_parser: true
};

var _dbName = 'mongodb://127.0.0.1:27017/fotoable?auto_reconnect=true';

var _db = mongo.db(_dbName, dbOptions);

_db.collection('apps').find({}).toArray(function (err, reply) {
    console.log(err,reply);
});

module.exports = {
    'db': _db
};