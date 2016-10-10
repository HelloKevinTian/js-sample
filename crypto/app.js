var crypto = require('crypto');
var md5sum = crypto.createHash('md5');
var key = '_ck_fatalrace_20150202';
var plaintext = '{"msg_id":"6","coco":"c4309eb91a2877a6c8a28341e3fdd611","token":"ad3b6abcf09","flowid":"2","socialsdk":"weibo","channel":"000013","version":"2.3.0","deviceid":"c4309eb91a2877a6c8a28341e3fdd611","player_guid":"7a094251-4be8-106c-8000-792900007829"}';
var crypto_src = plaintext + key;
md5sum.update(crypto_src);
console.log(md5sum.digest('hex'));