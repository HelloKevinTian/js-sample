const CryptoJS = require('crypto-js');
const crypto = require('crypto');

let key = 'f1be18c667e9706317b96fd141817611';
let md5key = 'fotoable';
let urlpath = '/user/userDict';
let sct = 'hongjie1021';

function md5(str, encode) {
	let encode = encode || 'utf8';
	let md5 = crypto.createHash('md5');
	md5.update(str, encode); //默认是binary,可选：ascii  utf8
	return md5.digest('hex'); // The encoding can be 'hex', 'binary' or 'base64'
}

function bmd5(str) {
	let buffer = new Buffer(str, 'utf8');
	let md5 = crypto.createHash('md5');
	md5.update(buffer);
	return md5.digest('hex');
}
let str = md5key + urlpath + sct;
console.log('f1be18c667e9706317b96fd141817611');
console.log(CryptoJS.MD5(str).toString());
console.log(md5(str));
console.log(bmd5(str));