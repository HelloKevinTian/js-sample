var crypto = require('crypto');

function getSortedSignStr(params) {
	var sortKeys = Object.keys(params).sort();
	var sortedResult = sortKeys.map(function(key) {
		var value = params[key];
		return [encodeURIComponent(key), encodeURIComponent(value)].join('=');
	});

	return sortedResult.join('&');
}

function hmacSha1(str, key) {
	return crypto.createHmac('sha1', key).update(str).digest('base64'); //base64
	// return crypto.createHmac('sha1', key).update(str).digest('hex'); //16进制
}

function urlencode(decoded) {
	if (!decoded) {
		return '';
	}
	return encodeURIComponent(decoded)
		.replace(/[!'()]/g, escape)
		.replace(/\*/g, '%2A');
}

var obj = {
	oauth_version: '1.0',
	oauth_nonce: 'c8cbc072147fab9bd889b08ffade03d9',
	oauth_timestamp: '1511921221',
	oauth_consumer_key: 'AIuiu4dx15r1PujK',
	oauth_signature_method: 'HMAC-SHA1',
	PAYMENT_ID: '968000-0003940491-20171129110701-0026050300',
	ORDERED_TIME: 1511921221,
	PAYMENT_TYPE: 'payment',
	AMOUNT: 200,
	ITEMS: JSON.stringify([{
		SKU_ID: 'XA123',
		NAME: 'Machine-gun',
		PRICE: 100,
		COUNT: 2,
		IMAGE_URL: 'http://example.com/item.gif',
		DESCRIPTION: 'Description'
	}])
}

var sign1 = 'MVDkzr5WRggZSGYZIeXh1UQ2kSk%3D';
var sign2 = 'ccIsSbrq035TxPDqwL09PW/spbQ=';

var str1 = 'POST';
//2移除URL中的所有请求参数
var str2 = 'http://211.152.2.68:30888/dmm/payment';

var signStr = str1 + '&' + encodeURIComponent(str2) + '&' + getSortedSignStr(obj);

// console.log('signStr: ', signStr);

var consumerKey = 'AIuiu4dx15r1PujK';
var consumerSecret = encodeURIComponent('[5JJK5E[MS[qmBVQ@_0u-4V2Z@SCt3_r' + '&' + consumerKey);
sign2 = hmacSha1(signStr, consumerSecret);

// console.log('\nsign1', sign1);
// console.log('sign2', encodeURIComponent(sign2));


//--------------------------------------
var oauthSignature = require('oauth-signature');
var httpMethod = 'POST', // 'GET',
	// url = 'http://211.152.2.68:30888/dmm/payment',
	url = 'http://211.152.2.68:30888/dmm/payment',
	parameters = {
		oauth_version: '1.0',
		oauth_nonce: 'bee7b6e048df2f4ff3d4bb80349f4f27',
		oauth_timestamp: '1511937898',
		oauth_consumer_key: 'AIuiu4dx15r1PujK',
		oauth_signature_method: 'HMAC-SHA1',
		// opensocial_app_id: '968000',
		// opensocial_app_url: 'http://211.152.2.68:30888/gadgets/sand-g.xml',
		// opensocial_viewer_id: '3940491',
		// opensocial_owner_id: '3940491',
		PAYMENT_ID: '968000-0003940491-20171129154458-0041201200',
		ORDERED_TIME: 1511937898,
		PAYMENT_TYPE: 'payment',
		AMOUNT: 2,
		ITEMS: [{
			SKU_ID: 'XA123',
			NAME: 'Machine-gun',
			PRICE: 1,
			COUNT: 2,
			IMAGE_URL: 'http://pics.dmm.com/freegame/profile/m/male1/male1_mb.gif',
			DESCRIPTION: 'description'
		}]
	},

	// parameters = {
	// 	oauth_version: '1.0',
	// 	oauth_nonce: '167bbfc728b1f759327458b480309ec5',
	// 	oauth_timestamp: '1511922054',
	// 	oauth_consumer_key: 'AIuiu4dx15r1PujK',
	// 	oauth_signature_method: 'HMAC-SHA1',
	// 	payment_id: '968000-0003940491-20171129112051-0074143000',
	// 	opensocial_app_id: '968000',
	// 	opensocial_app_url: 'http://211.152.2.68:30888/gadgets/sand-g.xml',
	// 	opensocial_viewer_id: '3940491',
	// 	opensocial_owner_id: '3940491'
	// },

	consumerSecret = '[5JJK5E[MS[qmBVQ@_0u-4V2Z@SCt3_r',
	tokenSecret = '',
	// generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash 
	encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
	// generates a BASE64 encode HMAC-SHA1 hash 
	signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, {
		encodeSignature: false
	});

// console.log('\nsign1 FIc3M0RED1tjG4qDCidmn4EIEzs%3D'); //GET
console.log('\nsign1 toiQR6vr74NPJmhhbFWWFmnDItM%3D');
console.log('sign3', encodedSignature);