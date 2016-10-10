// var now = new Date();
// var moment = require("moment");
// var async = require('async');

//----------------format date-------------------
// var date_str = "2015/5/2";
// var date = new Date(date_str);
// var year = date.getFullYear();
// var month = date.getMonth() + 1;
// var day = date.getDate();
// console.log(year.toString() + "年" + month.toString() + "月" + day.toString() + "日");

//-------------------------------test----------------------


// var Hello = require('./hello').Hello;
// var hello = new Hello();
// hello.setName('kevin');
// hello.sayHello();

// var Hello = require('./hello');
// hello = new Hello();
// hello.setName('BYVoid');
// hello.sayHello();

// var util = require('util');
// function Base() {
// 	this.name = 'base';
// 	this.base = 1991;
// 	this.sayHello = function() {
// 		console.log('Hello ' + this.name);
// 	};
// }
// Base.prototype.showName = function() {
// 	console.log(this.name);
// }

// function Sub() {
// 	this.name = 'sub';
// }
// util.inherits(Sub, Base);
// var objBase = new Base();
// objBase.showName();
// objBase.sayHello();
// console.log(objBase);
// var objSub = new Sub();
// objSub.showName();
// //objSub.sayHello(); //报错！！！！
// console.log(objSub);

// function test(name, uri) {
// 	this.name = name;
// 	this.uri = uri;
// 	this.display = function() {
// 		console.log(this.name);
// 	}
// }

// var someuser = new test('byvoid', 'http://www.byvoid.com');

// console.log(someuser);

// someuser.display();



// console.log("----------------test moment ----------")

// var time = moment().format('MMMM Do YYYY,h:mm:ss a');

// console.log(time);

// console.log("----------------test redis-----------------");

// var redis = require("redis"),
// 	client = redis.createClient();

// client.on('error', function(err) {
// 	console.log('Error ' + err);
// })

// client.on('connect', runSample);

// function runSample() {
// 	client.hgetall('test', function(err, reply) {
// 		console.log(err,reply);
// 	})
// 	client.exists('test1', function(err,reply){
// 		console.log(err,reply);
// 		if (reply) {
// 			console.log("ok111111111");
// 		} else {
// 			console.log("fail0000000000");
// 		}
// 	})
// }

// var arr = ["qa","bbbbbbbb","cccccccccccc","de"];
// for (var i = 0; i < arr.length; i++) {
//        if (arr[i].indexOf("bbb".toString()) > -1) {
//        	console.log("has ...");
//            client.hget('test',"aaa",function(reply1){
// 			if (reply1 != null) {
// 				console.log("set phone num...");
// 			}
//            });
//        } else {
//        	console.log("no  has ...");
//        }
//    };


//    console.log("next ...");

//    var async = require('async');
//    var count = 0;
//    var arr = ["qa","bbbbbbbb","cccccccccccc","de"];
// async.whilst(
//     function () { return count < 4; },
//     function (callback) {
//         if (arr[count].indexOf("bbb") > -1) {
// 	        client.hget('test',"aaa",function(err,reply1){
// 				console.log("have .............",count);
// 				count++;
// 				callback();
//             });

//         } else {
//         	console.log("no have ..............",count);
//         	count++;
//         	callback();
//         }
//     },
//     function (err) {
//     	if (err) {
//     		console.error(err);
//     	}
//         console.log("next ..............");
//     }
// );

// async.whilst(
//     function () { return count < 5; },
//     function (callback) {
//         count++;
//         console.log(count);
//         setTimeout(callback, 1000);
//     },
//     function (err) {
//         // 5 seconds have passed
//         console.log('callback ' + count);
//     }
// );
// }


// function runSample() {
//     // Set a value
//     client.set('string key', 'Hello World', redis.print);
//     // Expire in 3 seconds
//     client.expire('string key', 3);

//     // This timer is only to demo the TTL
//     // Runs every second until the timeout
//     // occurs on the value
//     var myTimer = setInterval(function() {
//         client.get('string key', function(err, reply) {
//             if (reply) {
//                 console.log('I live: ' + reply.toString());
//                 client.ttl('string key', writeTTL);
//             } else {
//                 clearTimeout(myTimer);
//                 console.log('I expired');
//                 client.quit();
//             }
//         });
//     }, 1000);
// }

// function writeTTL(err, data) {
//     console.log('I live for this long yet: ' + data);
// }

// console.log("----------------test setImmediate------------");

// function recurse(i, end) {
//     if (i > end) {
//         console.log('Done!');
//     } else {
//         console.log(i);
//         setImmediate(recurse, i + 1, end);
//     }
// }

// recurse(1, 100);
// console.log("----------------test getweek-----------------");

//以周三为一周开始的一年累积所属周数
// function getWeek(date) {
//     var first_day_in_year = new Date(date.getFullYear(), 0, 1);
//     //  delay_day ,such as 3,that means wednesday is the first day of new week
//     var mircosecond_in_one_day = 24 * 3600 * 1000;
//     console.log((date - first_day_in_year) / mircosecond_in_one_day);
//     console.log(first_day_in_year.getDay())
//     var delay_day = 3;
//     return Math.ceil((((date - first_day_in_year) / mircosecond_in_one_day) + first_day_in_year.getDay() + 1 + delay_day) / 7);
// };

// console.log("cur week is :" + getWeek(now));

// console.log("----------------test getmac-----------------");

// // Fetch the computer's mac address
// require('getmac').getMac(function(err, macAddress) {
//     if (err) throw err
//     console.log("mac addr is: " + macAddress);
// })

// // Validate that an address is a mac address
// if (require('getmac').isMac("e4:ce:8f:5b:a7:fc")) {
//     console.log('valid mac');
// } else {
//     console.log('invalid mac');
// }

// console.log("----------------test jieba------------------");

// var segment = require("nodejieba");

// segment.loadDict("./node_modules/nodejieba/dict/jieba.dict.utf8", "./node_modules/nodejieba/dict/hmm_model.utf8");

// var wordList = segment.cutSync("阻塞模式分词尼玛");
// if (wordList.constructor == Array) // just for tutorial, this is always be true  
// {
//     wordList.forEach(function(word) {
//         console.log(word);     
//     });
// }

// console.log("----------------test nodemailer-----------");

// var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport();
// transporter.sendMail({
//     from: 'tianwen@chukong-inc.com',
//     to: 'sunny_kevin@qq.com',
//     subject: 'hellochukong',
//     text: 'hello kevin honey ! www.baidu.com'
// });
// console.log("----------------test underscore--------------");

// var _ = require('underscore');
// var val = _.random(1,100);
// console.log(val);

// console.log("----------------test async-----------------");

// var async = require('async');
//------------test1------------
// async.series([
//     function(callback){
//         // do some stuff ...
//         console.log('fun 1 ...');
//         callback(null, 'one');
//     },
//     function(callback){
//         // do some more stuff ...
//         console.log('fun 2 ...');
//         callback(null, 'two');
//     }
// ],
// // optional callback
// function(err, results){
// 	console.log(err);
// 	console.log(results);
//     // results is now equal to ['one', 'two']
// });
//--------------test2--------------
// var count = 0;

// async.whilst(
//     function () { return count < 5; },
//     function (callback) {
//         count++;
//         console.log(count);
//         setTimeout(callback, 1000);
//     },
//     function (err) {
//         // 5 seconds have passed
//         console.log('callback ' + count);
//     }
// );
// //--------------test3----------------
// async.parallel([
//     function(callback){
//         setTimeout(function(){
//             console.log('parallel 111 ...');
//             callback(null, 'one');
//         }, 200);
//     },
//     function(callback){
//         setTimeout(function(){
//         	console.log('parallel 222 ...');
//             callback(null, 'two');
//         }, 100);
//     }
// ],
// // optional callback
// function(err, results){
// 	console.log('parallel result ...' + results);
// 	console.log(results[0]);
// 	console.log(results[1]);
//     // the results array will equal ['one','two'] even though
//     // the second function had a shorter timeout.
// });

//----------------------test log4js-----------------

// var log4js = require('log4js');
// var log1 = log4js.getLogger();
// log1.debug("test log4js...");
// log4js.loadAppender('console'); //默认是命令行打印

//--------------
// //log4js.loadAppender('console');
// log4js.loadAppender('file');
// //log4js.addAppender(log4js.appenders.console());
// log4js.addAppender(log4js.appenders.file('logs/cheese.log'), 'cheese');

// log4js.configure({
// 	appenders: [{
// 		type: 'console'
// 	}, {
// 		type: 'file',
// 		filename: 'logs/cheese.log',
// 		category: 'cheese'
// 	}, {
// 		"type": "dateFile",
// 		"filename": "logs/date_log.log",
// 		"pattern": "-yyyy-MM-dd",
// 		"alwaysIncludePattern": false,
// 		"category": "date_logger"
// 	}]
// });
// //----------------

// // var logger = log4js.getLogger('cheese');
// // logger.setLevel('ERROR');
// var datelogger = log4js.getLogger('date_logger');
// var val = {date:1,name:"aaa"};
// setInterval(function() {
// 	datelogger.debug(JSON.stringify(val) + 'test date file log....');
// }, 1000);

// console.log("log over...");
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');


//----------------开源中国test begin-----------------------------
// console.log('开源中国test');

// //============================1===================================
// var times = 10;

// function countdown() {
// 	var days = Math.floor(times / 86400);
// 	var hourtime = times - days * 86400;
// 	var hours = Math.floor(hourtime / 3600);
// 	var mintime = hourtime - hours * 3600;
// 	var minutes = Math.floor(mintime / 60);
// 	var second = mintime - minutes * 60;

// 	if (times <= 0) {
// 		console.log("正在进行中");
// 	} else {
// 		console.log(days + "天" + hours + "小时" + minutes + "分" + second + "秒");
// 	}
// }

// function timer() {
// 	times--;
// 	if (times <= 0) {
// 		clearInterval(a);
// 	}
// 	countdown();
// }

// var a = setInterval(timer, 1000);

//============================2===================================


//----------------开源中国test end-----------------------------

//------------------------test crpto------------------------
// var crypto = require('crypto');

// // var msg = {"msg_id":"5","activity_type":"5","user_data":"0","player_guid":"67764881-e724-d600-8000-31f3000031f3","coco":"9fd2f7a4f8c20c6f2099b4510b97f436","token":"ad3b6abcf09","flowid":"22","socialsdk":"weibo","channel":"000023","version":"1.0.2","deviceid":"9fd2f7a4f8c20c6f2099b4510b97f436"};
// // var token = '53e8fed17c992dc4abcfdc2e6c4c60c2';

// var msg = {"msg_id":"6","coco":"5e0c5a8361aaee7b5ce1d20d87c460e0","token":"ad3b6abcf09","flowid":"2","socialsdk":"weibo","channel":"000116","version":"2.6.0","deviceid":"5e0c5a8361aaee7b5ce1d20d87c460e0","player_guid":"8458fbf1-a2e7-d1cf-8000-299500002895"};
// var token = '4c7564d0f5b629e66d50cfbad955fc46';

// var md5key = '_ck_fatalrace_20150202';

// var md5str = JSON.stringify(msg) + md5key;

// var md5sum = crypto.createHash('md5');
// md5sum.update(md5str); //默认是binary
// // md5sum.update(md5str,'binary');
// // md5sum.update(md5str,'ascii');
// // md5sum.update(md5str,'utf8');
// var str = md5sum.digest('hex'); // The encoding can be 'hex', 'binary' or 'base64'

// console.log("server md5 str is: " + str);
// console.log("client md5 str is: " + token);


// // server md5 str is: 7c3f9ceb7a18ac1b254188f02fc6df13
// // client md5 str is: 53e8fed17c992dc4abcfdc2e6c4c60c2

//=========================================================


// setInterval(function() {
// 	var a = [1,2,3,4,5,6,7,8,9]
// 	for (var i = 0,len = a.length; i < len; i++) {
// 		console.log(a[i]);
// 	};
// }, 1000);


// var cluster = require('cluster');
// var cpu_num = require('os').cpus().length;


// if (cluster.isMaster) {
// 	console.log('I am master');
// 	cluster.fork();
// 	cluster.fork();
// } else if (cluster.isWorker) {
// 	console.log('I am worker #' + cluster.worker.id);
// }

// console.log('11111111111111   ',cpu_num);

// process.exit(0);

// console.log(require.extensions);
// console.log(module.paths);
// console.log(module);
// { '.js': [Function], '.json': [Function], '.node': [Function] }
// [ '/share/temp/test/node_modules',
//   '/share/temp/node_modules',
//   '/share/node_modules',
//   '/node_modules' ]
// { id: '.',
//   exports: {},
//   parent: null,
//   filename: '/share/temp/test/app.js',
//   loaded: false,
//   children: [],
//   paths: 
//    [ '/share/temp/test/node_modules',
//      '/share/temp/node_modules',
//      '/share/node_modules',
//      '/node_modules' ] }
