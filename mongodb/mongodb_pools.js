/**
 * Created by King Lee on 14-11-28.
 * some more about generic pool,read https://github.com/yuyunliuhen/node-pool.
 */
var fs = require('fs');
var mongodb = require('mongodb')
var generic_pool = require('generic-pool');

//  store the map of mongodb connect pool,{db_name:pool}
var pools = {};

function createMongodbPool(db_name,config_file){
    var opts = {
        "no_ready_check" : config_file.proxy
    };
    // create a mongodb connection pool with
    // a max of config_file.max connections, and a config_file.idleTimeoutMillis second max idle time
    return generic_pool.Pool({
        name : db_name,
        dbIndex : 0,
        create : function(cb) {
			var url = 'mongodb://' + config_file.hostname + ':' + config_file.port + '/' + config_file.db;
			var client = mongodb.MongoClient;
			console.log(url);
			client.connect(url, {db: {raw: true},server: {poolSize: 100}},function(err, db) {
				cb(null, db);
			});
        },
        destroy : function(db) {
			db.close();
        },
        max : config_file.max,
        // optional. if you set this, make sure to drain() (see step 3)
        //  min      : 2,
        // specifies how long a resource can stay idle in pool before being removed
        idleTimeoutMillis : config_file.idleTimeoutMillis,
        // if true, logs via console.log - can also be a function
        log : true
    });
}

//  read config file and initialize generic pool
function initMongodbPool(config_file) {
    for (var item in config_file) {
        var _pool = createMongodbPool(item, config_file[item]);
        pools[item] = _pool;
    }
}

//  special the address of config file
function configure(config_file) {
    config_file = config_file || process.env.MONGODB_CONFIG;

    if (typeof config_file === 'string') {
        config_file = JSON.parse(fs.readFileSync(config_file, 'utf8'));
    }

    if (config_file) {
        initMongodbPool(config_file);
    }
}

//  do mongodb command
function execute(db_name, execb) {
    var pool = pools[db_name];
    pool.acquire(function(err, client) {
        var release = function() { pool.release(client); };
        if (err) {
            console.error('error at execute command: %s', err.stack);
            release();
        } else {
            execb(client, release);
        }
    }, 0);
}

//  print current status info
function info() {
    return Object.keys(pools).map(function(k) {
        var item = pools[k];
        return {
            name : item.getName(),
            total : item.getPoolSize(),
            available : item.availableObjectsCount(),
            waiting : item.waitingClientsCount()
        };
    });
}

function show(){
    setInterval(function() {
        console.debug('mongod pool is %j', info());
    }, 5000);
}

//show();

module.exports = {
    configure : configure,
    execute : execute,
    info : info
};

