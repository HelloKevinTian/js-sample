var async = require('async'),
    kafka = require('kafka-node'),
    ConsumerGroup = kafka.ConsumerGroup;

var topic = 'topic-foo';

var options = {
    // host: '52.194.110.149:2181',
    kafkaHost: 'testkfk.ftsview.com:9092',
    groupId: 'group-test',
    sessionTimeout: 15000,
    autoCommit: true
};
var options1 = {
    // host: '52.194.110.149:2181',
    kafkaHost: 'testkfk.ftsview.com:9092',
    groupId: 'group-test111',
    sessionTimeout: 15000,
    autoCommit: true
};

var c1 = new ConsumerGroup(Object.assign({
    id: 'c1'
}, options), topic);
c1.on('message', onMessage);
c1.on('error', onError);

var c2 = new ConsumerGroup(Object.assign({
    id: 'c2'
}, options), topic);
c2.on('message', onMessage);
c2.on('error', onError);

var c3 = new ConsumerGroup(Object.assign({
    id: 'c3'
}, options1), topic);
c3.on('message', onMessage);
c3.on('error', onError);

function onMessage(message) {
    console.log(this.client.clientId);
    console.log(message);
}

function onError(err) {
    console.log(err);
}

process.once('SIGINT', function () {
    async.each([c1, c2, c3], function (c, cb) {
        c.close(true, cb);
    })
});