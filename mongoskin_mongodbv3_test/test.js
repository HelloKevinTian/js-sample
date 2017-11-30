/**
 * 使用mongskin2.1.0 测试mongod3.4.5的接口
 */
var mongo = require('mongoskin');
var host = '127.0.0.1';
var port = 13600;
var db = 'test';
var dbName = ('mongodb://' + host + ':' + port + '/' + db + '?auto_reconnect=true');
var mm = mongo.db(dbName, {
	native_parser: true
});

if (0) {
	mm.collection('cs2_account').insert({
		'_id': '10973544',
		'token': '7a25d001df14d08e369e656ae287ac30',
		'account': {
			'uid': 10973544,
			'platform': 'guest_000000',
			'login': 1,
			'time': 1
		},
		'sdk': 'anysdk'
	}, function(err, info) {
		console.log('insert:', err, info);
	});
} else if (0) {
	mm.collection('cs2_account').findOne({
		'_id': '10973544',
		'token': '7a25d001df14d08e369e656ae287ac30'
	}, function(err, info) {
		console.log('findOne:', err, info);
	});
} else if (0) {
	mm.command({
		findAndModify: 'cs2_account',
		query: {
			'_id': '10973544'
		},
		new: true, //返回更新后的数据
		upsert: true, //没有该条记录时会insert一条（默认是false）
		update: {
			$set: {
				'sdk': 'quicksdk'
			}
		}
	}, function(err, info) { // null { value: null, ok: 1 }
		console.log('command update:', err, info);
	});
} else if (0) {
	mm.collection('cs2_account').update({
		'_id': '10973544'
	}, {
		$inc: {
			num: 1
		}
	}, {
		upsert: true
	}, function(err, info) { // null { value: null, ok: 1 }
		console.log('update:', err, info.result);
	})
} else if (0) {
	mm.collection('cs2_account').insertOne({
		'_id': '333',
		'token': '7a25d001df14d08e369e656ae287ac30',
		'account': {
			'uid': 10973544,
			'platform': 'guest_000000',
			'login': 1,
			'time': 1
		},
		'sdk': 'anysdk'
	}, function(err, info) {
		console.log('insertOne:', err, info.result);
	});
} else if (0) {
	mm.collection('cs2_account').aggregate([{
		$match: {
			'num': {
				$gt: 0
			}
		}
	}, {
		$project: {
			'_id': 1,
			'sdk': 1
		}
	}, {
		$sample: {
			size: 2
		}
	}], function(err, info) {
		console.log('aggregate:', err, info);
	});
} else if (1) {
	mm.collection('cs2_account').find({}).sort({
		'num': -1
	}).skip(0).limit(3).toArray(function(err, info) {
		console.log('insert:', err, info);
	});
} else if (1) {
	mm.collection('cs2_account').insertMany([{
		'_id': '444',
		'token': '7a25d001df14d08e369e656ae287ac30',
		'account': {
			'uid': 10973544,
			'platform': 'guest_000000',
			'login': 1,
			'time': 1
		},
		'sdk': 'anysdk',
		"num": 10
	}, {
		'_id': '555',
		'token': '7a25d001df14d08e369e656ae287ac30',
		'account': {
			'uid': 10973544,
			'platform': 'guest_000000',
			'login': 1,
			'time': 1
		},
		'sdk': 'anysdk',
		"num": 7
	}, {
		'_id': '666',
		'token': '7a25d001df14d08e369e656ae287ac30',
		'account': {
			'uid': 10973544,
			'platform': 'guest_000000',
			'login': 1,
			'time': 1
		},
		'sdk': 'anysdk',
		"num": 30
	}], function(err, info) {
		console.log('insertMany:', err, info.result);
	});
}