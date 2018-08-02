const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const log = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console()
    ]
});

const opts = {
    filename: 'access-%DATE%.log',
    dirname: './bilog',
    datePattern: 'YYYY-MM-DD-HH',
    // zippedArchive: true,
    maxSize: '1024m',
    // maxFiles: '14d'
}

log.configure({
    level: 'info',
    transports: [
        new DailyRotateFile(opts)
    ]
});

log.info(opts)