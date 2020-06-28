'use strict';

const winston = require('winston');

const logger = module.exports = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    )
});

logger.info('This is an information message.');
logger.debug('This is an information message.');
logger.warn('This is an information message.');
logger.error('This is an information message.');