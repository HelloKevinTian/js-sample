var kafka = require('kafka-node');

// var client = new kafka.Client('52.194.110.149:2181', 'producer-test');
var client = new kafka.KafkaClient({
    kafkaHost: 'testkfk.ftsview.com:9092'
});

var KeyedMessage = kafka.KeyedMessage;

var producer = new kafka.Producer(client);
// var producer = new kafka.HighLevelProducer(client);

var topic = 'twtest';

var message = 'hello consumer';
var keyedMessage = new KeyedMessage('keyed', 'a keyed message');

var payloads = [{
    topic,
    messages: [message, keyedMessage]
}];

producer.on('ready', function() {
    console.log('ready');
    // producer.createTopics([topic], function (err, result) {
    // result is an array of any errors if a given topic could not be created
    // producer.send(payloads, function (err, data) {
    //     console.log(err || data);
    // })
    setInterval(() => {
        producer.send(payloads, function (err, data) {
            console.log(err || data);
        })
    }, 5000);
    // })
})

producer.on('error', function(err) {
    console.log('error', err);
})