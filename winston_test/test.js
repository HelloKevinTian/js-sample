const { createLogger, transports, format, config } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
    levels: config.syslog.levels,
    // level: 'info',
    // format: format.simple(), //splat json simple colorize
    format: format.combine(
        format.splat(),
        format.simple(),
        // format.colorize(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'combined.log',
            level: 'info'
        }),
    ]
});

const opts = {
    filename: 'access-%DATE%.log',
    dirname: './',
    datePattern: 'YYYY-MM-DD-HH',
    // zippedArchive: true,
    maxSize: '1024m',
    // maxFiles: '14d'
}

logger.configure({
    level: 'info',
    transports: [
        new DailyRotateFile(opts)
    ]
});

logger.info(opts)

try {
    // logger.info(opts)
    throw new Error('is not null')
} catch (err) {
    // console.log(err);
    logger.info(err)
}