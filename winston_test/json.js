'use strict';

const winston = require('winston');

//
// As of winston@3, the default logging format is JSON.
//
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: '/Users/tianwen/work/etc/filebeat/filebeat_logs/error.log',
            level: 'info'
        }),
    ]
});

// logger.log('info', 'Hello, this is a raw logging event',   { 'foo': 'bar' });
// logger.log('info', 'Hello, this is a raw logging event 2', { 'foo': 'bar' });

let a = 'hello'
let b = 123000000999
let c = ['100075', '100080']
let d = { name: 'joe', rank: [1, 2, 3] }
let e = new Date()
let f = new Error('must be cool')

const util = require('util');
// let formatLog = util.format(1, 2, 3, a, b, c, d, e, f);
// logger.info({ message: formatLog })

setTimeout(async () => {
    const axios = require('axios');
    try {
        const res = await axios.get('https://graph.facebook.com/v6.0/act_544544542683134/campaign?fields=id,name,status,account_id&level=ad&access_token=EAAfp9m3RitYBAKDtgbbOlgjUc7KB9SZAcoZCrLLZCLi9LRnoKgZCay4Ueev3aecZCtH6TgAZBHrz9PDeqrJg6xeUIond34rkg66itqP8NbPyxh7U6Oux8iR6ZADkNUFH9T0hzdUwv9iXPOuWl6ZAZCo2BZCk5pZAOrJUPJEkvkFWMdE4IQusfFGnql7');
        // logger.info(res.data);
    } catch (err) {
        let formatLog = util.format(1, 2, 3, a, b, c, d, e, f, err);
        logger.info({ message: formatLog })
        return;
        console.log(_.isError(err), typeof err, err instanceof Error, Reflect.ownKeys(err), Reflect.ownKeys(err.response))
        logger.error(makeError(err));
    }
}, 100);