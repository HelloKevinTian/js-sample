/**
 * @author tianwen
 * @date   2020-06-24 14:29:30
 * @description winston 日志集成，配合Elasticsearch、Filebeat、Kibana使用
 */
const { createLogger, format, transports, config, loggers } = require('winston');
const { combine, errors, json, simple, timestamp, printf, label, colorize, prettyPrint } = format;
const _ = require('lodash');
const util = require('util');

//用于控制台日志格式化的format函数
const consoleFormat = printf((info, opts) => {
    // console.log('======>consoleFormat: ', info);
    const { level, message, label, timestamp } = info;
    const msg = _toMessage(info);
    return `[${timestamp}] [${level.toUpperCase()}] ${label} - ${msg}`;
});

//用于文件日志格式化的format函数
// const fileFormat = format((info, opts) => {
//     // console.log('======>fileFormat: ', info);
//     info.message = _toMessage(info);
//     return info;
// });

/**
 * 组装多参数message
 * @param {Object} info 
 */
function _toMessage(info) {
    const { level, message, label, timestamp } = info;
    const args = [message];
    if (info[Symbol.for('splat')]) args.push(...info[Symbol.for('splat')]);
    return util.format(...args);
}

/**
 * levels: 比指定level小的level都会被log
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6

 * 默认指定3类transport
        控制台打印
        错误日志记录
        普通日志记录（包含错误日志）

 * 加入策略多logger支持
        策略选用文件名
 */
class WinstonLogger {

    constructor() {
        this._options = {};
        this._categoryLogger = {};
        this.inited = false;
    }

    /**
     * @param {Object} options 
     *  @param {String} options.child_system 服务名称/子系统名称
     *  @param {String} options.error_path 错误日志路径
     *  @param {String} options.log_path 所有级别的日志路径
     *  @param {String} options.level 日志level，默认debug
     *  @param {Boolean} options.console 是否开启控制台打印，默认开启
     *  @param {Boolean} options.silent 是否禁用日志
     */
    init(options) {
        if (!options.child_system) throw new Error('Please specify child_system');
        if (!options.log_path) throw new Error('Please specify log_path');
        this._options = options;
        this._options.level = this._options.level || 'debug'; //默认debug level 科技路
        this._options.console = _.isBoolean(this._options.console) ? this._options.console : true; //默认开启控制台打印

        this.inited = true;
    }

    /**
     * 获取logger transport
     * @param {String} category 策略
     * @return {Array}
     */
    getTransports(category) {
        const transportArr = [
            new transports.File({ //记录所有level日志
                filename: this._options.log_path,
                level: this._options.level,
                format: combine(
                    label({ label: category }),
                    timestamp(),
                    // fileFormat(),
                    json()
                )
            }),
        ];
        if (this._options.error_path) {
            const errTrans = new transports.File({ //记录错误日志
                filename: this._options.error_path,
                level: 'error',
                handleExceptions: true,
                handleRejections: true,
                format: combine(
                    label({ label: category }),
                    timestamp(),
                    // fileFormat(),
                    json()
                )
            });
            transportArr.push(errTrans);
        }
        if (this._options.console) {
            const consoleTrans = new transports.Console({ //控制台输出
                format: combine(
                    simple(),
                    label({ label: category }),
                    timestamp(),
                    consoleFormat
                ),
                level: 'debug'
            });
            transportArr.push(consoleTrans);
        }
        return transportArr;
    }

    /**
     * 获取logger默认配置
     * @param {String} category 
     * @return {Object}
     */
    getLoggerOptions(category) {
        return {
            defaultMeta: { child_system: this._options.child_system },
            transports: this.getTransports(category),
            exitOnError: false,
            silent: !!this._options.silent
        };
    }

    // /**
    //  * 添加策略logger
    //  * @param {String} category 
    //  */
    // addCategory(category) {
    //     if (!this.inited) throw new Error('Please config winston first');
    //     if (this._categoryLogger[category]) return;

    //     loggers.add(category, this.getLoggerOptions(category));
    //     this._categoryLogger[category] = true;
    // }

    // /**
    //  * 获取策略logger 直接暴露loggers
    //  * @param {String} category 一般为__filename
    //  */
    // getLogger(category) {
    //     this.addCategory(category);
    //     return loggers.get(category);
    // }

    /**
     * 获取策略logger 暴露封装了loggers的WinstonCategory
     * @param {String} category 一般为__filename
     * @return {WinstonCategory}
     */
    getLogger(category) {
        if (!this.inited) throw new Error('Please config winston first');
        if (!this._categoryLogger[category]) {
            this._categoryLogger[category] = new WinstonCategory(this, category);
        }
        return this._categoryLogger[category];
    }

}

class WinstonCategory {

    constructor(winstonLogger, category) {
        if (!(winstonLogger instanceof WinstonLogger)) throw new Error('WinstonLogger instance error');
        this._category = category;
        this.winstonLogger = winstonLogger;

        this._addCategory();
    }

    /**
     * Error format
     * @param {Error} err 
     * @return {Object}
     */
    makeError(err) {
        const errmsg = { title: err.message, stack: err.stack };
        if (err.code) errmsg.code = err.code;
        if (_.isObject(err.response)) {
            errmsg.data = JSON.stringify(err.response.data);
            errmsg.status = err.response.status;
            errmsg.statusText = err.response.statusText;
            errmsg.config = JSON.stringify(err.response.config);
            errmsg.headers = JSON.stringify(err.response.headers);
        }
        return { errmsg };
    }

    /**
     * 添加策略logger
     */
    _addCategory() {
        loggers.add(this._category, this.winstonLogger.getLoggerOptions(this._category));
    }

    _write(...args) {
        if (args.length <= 0) throw new Error('no logger argument');
        // console.log(args, util.format(...args));
        return util.format(...args);
    }

    get log() {
        return loggers.get(this._category);
    }

    error(...args) {
        this.log.error(this._write(...args));
    }
    warn(...args) {
        this.log.warn(this._write(...args));
    }
    info(...args) {
        this.log.info(this._write(...args));
    }
    http(...args) {
        this.log.http(this._write(...args));
    }
    verbose(...args) {
        this.log.verbose(this._write(...args));
    }
    debug(...args) {
        this.log.debug(this._write(...args));
    }
    silly(...args) {
        this.log.silly(this._write(...args));
    }

}

module.exports = new WinstonLogger();

/**
 * logger options:
    Name	    Default	                    Description
    level	    'info'	                    Log only if info.level less than or equal to this level
    levels	    winston.config.npm.levels	Levels (and colors) representing log priorities
    format	    winston.format.json	        Formatting for info messages (see: Formats)
    transports	[] (No transports)	        Set of logging targets for info messages
    exitOnError	true	                    If false, handled exceptions will not cause process.exit
    silent	    false	                    If true, all logs are suppressed(禁用)
 */