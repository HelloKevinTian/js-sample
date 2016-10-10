var amqp = require('amqplib/callback_api');


//连接mqserver
amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		//声明一个队列
		var q = 'task_queue';

		var msg = process.argv.slice(2).join(' ') || "Hello World!";

		//设置持久化
		ch.assertQueue(q, {
			durable: true
		});

		//发送message到队列
		ch.sendToQueue(q, new Buffer(msg), {
			persistent: true
		});
		console.log(" [x] Sent '%s'", msg);
	});
	setTimeout(function() {
		conn.close();
		process.exit(0);
	}, 500);
});