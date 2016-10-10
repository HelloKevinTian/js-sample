var amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {

		//声明和sender相同的队列
		var q = 'task_queue';

		//设置持久化
		ch.assertQueue(q, {
			durable: true
		});

		//确保任务繁重时不会一次收到多个message
		ch.prefetch(1);

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
		ch.consume(q, function(msg) {
			var secs = msg.content.toString().split('.').length - 1;

			console.log(" [x] Received %s", msg.content.toString());
			setTimeout(function() {
				console.log(" [x] Done");

				//发送给RabbitMQ 确认完成该message
				ch.ack(msg);
			}, secs * 1000);
		}, {
			noAck: false
		});
	});
});