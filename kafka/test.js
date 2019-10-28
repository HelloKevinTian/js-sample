const kafka = require('kafka-node');

const client = new kafka.KafkaClient({
    kafkaHost: 'vpc-kafka.nuclearport.com:9092'
    // kafkaHost: 'kafka.nuclearport.com:9092'
    // kafkaHost: 'testkfk.ftsview.com:9092'
});

// 'my-kafka-topic': [Object],
//        test: [Object],
//        cql: [Object],
//        UserLayer002: [Object],
//        UserLayerInfo23: [Object],
//        AppLogConfigUpdate: [Object],
//        UserLayerInfo22: [Object],
//        UserLayer001: [Object],
//        'DingDingSend-Ad': [Object],
//        __consumer_offsets: [Object],
//        twtest1: [Object],
//        DingDingSend: [Object],
//        Layer001: [Object],
//        test01: [Object],
//        Layer002: [Object],
//        twtest: [Object],
//        arlingtonNotice: [Object],
//        UserLayerInfo2: [Object],
//        UserLayerInfo: [Object],
//        platform: [Object],
//        UserLayerInfo21: [Object],
//        MailSend: [Object]

// test: [Object],
//        test1: [Object],
//        AppLogConfigUpdate: [Object],
//        FortuneLog: [Object],
//        DefaultLog: [Object],
//        GameServerLog: [Object],
//        NginxClientLog: [Object],
//        __consumer_offsets: [Object],
//        Layer001: [Object],
//        Layer002: [Object],
//        ArlingtonLog: [Object],
//        platform: [Object],
//        test2: [Object] 

let func = process.argv[2];

const funcObj = {
    list: () => {
        const admin = new kafka.Admin(client);
        admin.listTopics((err, res) => {
            console.log('topics', res);
        });
    }
}

if (func && funcObj[func]) {
    funcObj[func]();
} else {
    console.warn('no func');
}