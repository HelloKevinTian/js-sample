'use strict';

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        //
        // Notice that both arguments have been combined into a single
        // "info" object.
        //
        winston.format(function(info, opts) {
            console.log(info);
            return info;
        })(),
        // winston.format.json()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

logger.info('my message', 'asdddd', { reason: 'whatever', promise: 'whenever' }, new Error('abc'), 12345);