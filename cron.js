var CronJob = require('cron').CronJob;

//-------------------------------------------------------
// *　　*　　*　　*　　*　　command 
// 分　时　日　月　周　命令 
// 第1列表示分钟1～59 每分钟用*或者 */1表示 
// 第2列表示小时1～23（0表示0点） 
// 第3列表示日期1～31 
// 第4列表示月份1～12 
// 第5列标识号星期0～6（0表示星期天） 
// 第6列要运行的命令
//-------------------------------------------------------


/*
 * 每秒执行一次	
 */
// new CronJob('* * * * * *', function() {
// 	console.log('You will see this message every second');
// }, null, true, 'Asia/Shanghai');


/*
 * 指定一个时间点只执行一次	
 */
// new CronJob(new Date('2015/8/7 11:00:00'), function() {
// 		// runs once at the specified date.
// 		var a = new Date();
// 		console.log('time1: ', a);
// 	}, function() {
// 		// This function is executed when the job stops
// 		var a = new Date();
// 		console.log('over1: ', a);
// 	},
// 	true, // Start the job right now
// 	'Asia/Shanghai' // Time zone of this job.
// );


/*
 * 每周的周一至周五 11:30:05 AM 执行	
 */
// new CronJob('05 30 11 * * 1-5', function() {
// 		// Runs every weekday (Monday through Friday)
// 		// at 11:30:05 AM. It does not run on Saturday
// 		// or Sunday.
// 		var a = new Date();
// 		console.log('time: ', a);
// 	}, function() {
// 		var a = new Date();
// 		console.log('over: ', a);
// 		// This function is executed when the job stops
// 	},
// 	true, // Start the job right now
// 	'Asia/Shanghai' // Time zone of this job.
// );


/*
 * 手动启动和停止一个cron	
 */
// var job = new CronJob({
// 	cronTime: '00 30 11 * * 1-5',
// 	onTick: function() {
// 		console.log('tick');
// 	},
// 	start: false,
// 	timeZone: 'Asia/Shanghai'
// });
// job.start();
// job.stop();


//检查一个调度模式匹配是否有效
try {
	new CronJob('* * * * * *', function() {
		console.log('this should not be printed');
	})
} catch (ex) {
	console.log("cron pattern not valid");
}