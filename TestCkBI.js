var https = require('https');
var http = require('http');
var zlib = require('zlib');

var data = {
    "time": 1426231769, // * 日志上传时客户端时间
    "app": {
        "7": 459488303, // * appId
        "8": "1.0.1", // * 应用版本
        "9": "800026" // * 渠道ID
    },
    "com": {
        "3": "192.168.10.6" // * ip地址(服务器生 成)
    },
    "device": {
        "11": "ios" // * 平台
    },
    "events": [{
        "u": {
            "24": "", // * 角色ID
            "28": "60", // * 账号ID
            "30": "crq6", // 账户名
            "34": "1" // * 所在服
        },
        "p": {
            "orderId": "3268", // 订单ID
            "iapId": "com.cogamedigitalXX", // 充值包Id
            "cAmount": 99, // * 充值金额 (单位统一为:分)
            "vcAmount": 30, // 虚拟币金额
            "type": "CNY", // 货币类型(使用 ISO4217国际标注,如人民币 CNY)
            "paymentType": "taobao" // paymentType:支付方式 (如短代,详参《集成指南》)
        },
        "s": 1426231769, // 会话id 时间戳
        "e": "cc_payRequest", // * 事件ID
        "t": 1426231744 // * 事件发生时客户端时间
    }, {
        "u": {
            "28": 60, // * 账号ID
            "34": 1 // * 所在服
        },
        "p": {
            "orderId": "3268" // 订单ID(与cc_payRequest事件中orderId相匹配)
        },
        "s": 1426231769, // 会话id 时间戳
        "e": "cc_paySucc", // * 事件ID
        "t": 1426231769 // * 事件发生时客户端时间
    }, {
        "e": "XXXXX", // * 事件id,每个事件都有其唯一的id
        "s": 1426231769, // 会话id 时间戳
        "t": 1426231769, // * 事件发生时客户端时间
        "u": {
            "28": 60, // * 账号ID
            "34": 1 // * 所在服
        },
        "p": {
            "duration": 1426231769,
            "level": true
        }
    }]
}

var postData = JSON.stringify(data);
console.log("data: ", postData);
var buf = new Buffer(postData);
var compressedBuf = zlib.deflateSync(buf);

console.log('compressedBuf: ' + compressedBuf.toString('base64'));

var opts = {
    host: 'ark.cocounion.com',
    port: 80,
    path: '/as',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': compressedBuf.length
    }
}
var postRequest = http.request(opts, function(res) {
    res.on('data', function(chunk) {
        console.log('response: ' + chunk);
    });

    res.on('error', (err) => {
        console.log("error occurred")
    })
});

postRequest.write(compressedBuf);
postRequest.end();

process.on('uncaughtException', function(err) {
    console.error('未知异常: ' + err.stack);
});