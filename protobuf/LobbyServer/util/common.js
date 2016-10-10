/**
 *  公用信息
 */
var crypto = require('crypto');
var logger = require( 'ss-logger' ).getLogger( __filename );


/**
 * sha1加密
 */
function sha1Hash(salt, password) {
    return crypto.createHmac('sha1', salt + "").update(password + "").digest('hex');
};

/**
 * md5加密
 */
function md5Hash(str) {
    return crypto.createHash('md5').update(str + "").digest('hex');
};

/**
 * 导出对象
 */
module.exports = {
    'sha1Hash': sha1Hash,
    'md5Hash': md5Hash
};