const WinstonLogger = require('./winston');

WinstonLogger.init({
    // console: false,
    child_system: 'test-server',
    // error_path: './error.log',
    log_path: './combined.log'
});

const logger = WinstonLogger.getLogger(__filename);

logger.info('info info info');

logger.debug('debug debug debug');

logger.warn('warn warn warn');

function foo() {
    console.log('bar')
}
let a = 'hello'
let b = 123000000999
let c = ['100075', '100080']
let d = { name: 'joe', rank: [1, 2, 3] }
let e = new Date()
let f = new Error('must be cool')
let g = new RegExp('a')
let h = Symbol('123')
let args = [a, b, c, d, e, f, foo, g, h]
logger.info(...args);

logger.info('aaa %s %s', 123, 456)
logger.error({ message: 'err msh', age: 18 });
logger.error('aaa', { message: '000', age: 18 }, { message: 'bbb', age: 12008 });

logger.error({ msg: 'aaa', age: 1111 });
logger.error('aaaa', { message: 'bbb', age: 2222 }, { message: 'ccc', age: 12008 });

return;

setTimeout(async () => {
    const axios = require('axios');
    try {
        const res = await axios.get('https://graph.facebook.com/v7.0/act_544544542683134/campaigns?fields=id,name,status,account_id&level=ad');
        logger.info(res.data);
    } catch (err) {
        // logger.error(WinstonLogger.makeError(err));
        // err.msg = err.message;
        // delete err.message
        // console.log(Reflect.ownKeys(err), err['message']);
        logger.error(err);
        logger.error(logger.makeError(err));
    }
}, 100);