const log4js = require('log4js');

log4js.addLayout('json', config => function (logEvent) {
  return JSON.stringify(logEvent) + config.separator;
});

log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: { type: 'json', separator: ',' } }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' }
  }
});

const logger = log4js.getLogger('json-test');
let e = new Error('qwe')
logger.info('this is just a test', 123, e, new Date(), [1,23],{age:12});
logger.error('of a custom appender',e);
logger.warn('that outputs json');
log4js.shutdown(() => {});