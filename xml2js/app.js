var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
var xml1 = '<?xml version="1.0" encoding="UTF-8"?><callbackReq><orderid>wwcs15012919504000000000000000000104</orderid><ordertime>0080CF4167C189</ordertime><cpid>86008955</cpid><appid></appid><fid>00018756</fid><consumeCode></consumeCode><payfee>0</payfee><payType>2</payType><hRet>1</hRet><status>35109</status><signMsg>0954edd9538ac065d1101745db06f6db</signMsg></callbackReq>';
var json_res;
parseString(xml1, function (err, result) {
	json_res = result;
    console.log(result);
});

var xml_digester = require("xml-digester");
var digester = xml_digester.XmlDigester({});
digester.digest(xml1, function(err, result) {
	console.log(result);
});

var json2xml = require('json2xml');
var xml_res = json2xml(json_res,{ header: true });
console.log(xml_res);