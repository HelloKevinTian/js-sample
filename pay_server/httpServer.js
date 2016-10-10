var http = require("http");
var qs = require( 'querystring' );
var log4js = require('log4js');
var json2xml = require('json2xml');
var log_json = require('./config/log.json');
log4js.configure(log_json);
var http_logger = log4js.getLogger('http-logger');
var parse_string = require('xml2js').parseString;
var pay_message = require('./config/pay_message');
/**
 * construct function
 * @param host
 * @param port
 */
var connector = function(host,port) {
	this.server = null;
	this.host = host;
	this.port = port;
};

/**
 * create a http server
 */
connector.prototype.createHttpServer = function() {
    var self = this;
	this.server = http.createServer(function(req, res) {
        var url = req.url;
		var client_ip = req.connection.remoteAddress;
        http_logger.debug("new client coming ip:" + client_ip + " method:" + req.method + " url:" + url);
		switch(req.method){
			case 'GET':{
                var args = self.parseGet(req, res);
                args && self.dispatchMessage(args[1], args[0], req, res);
				break;
			}
			case 'POST':{
                self.parsePost(req,res,function(data){
                    self.dispatchMessage(data,url,req,res);
				});
				break;
			}
			default:{
                res.end();
                break;
			}
		}
	});
	this.server.listen( this.port );
    http_logger.debug("server listen at " + this.port);
};

/**
 * paese data for http get
 * @param req
 * @param res
 * @returns {*}
 */
connector.prototype.parseGet = function(req, res){
    var str = req.url;
    if (str.indexOf('?') > -1) {
        var arr = String.prototype.split.call(req.url, '?');
        return [arr[0],qs.parse(arr[1])];
    } else {
        return [str, null];
    }
};

/**
 * parse data for http post
 * @param req
 * @param res
 * @param cb
 */
connector.prototype.parsePost = function(req,res,cb){
	var chunks = [];
    req.on('data', function(chunk) {
        chunks.push(chunk);
    });
    
    req.on('end', function() {
        //  convert array to string,delimiter is "";
        var data = chunks.join('');
        //  convert url format to normal!!
        cb(/*qs.parse(data)*/data);
    });
    req.on('error',function(err){
        http_logger.debug('problem with request: ' + err.message);
    });
};

/**
 * dispatch message for the format : account=king_lee&account=king_lee
 * @param data
 * @param url
 * @param req
 * @param res
 */
connector.prototype.dispatchMessage = function(data,url,req,res){
	http_logger.debug(data);
    if(url == "/wo_shop")
    {
		parse_string(data, function (err, result) {
			for(var v in result){
				if(v == "callbackReq"){
					var orderid = result[v].orderid;
					var pay_message_res = {};
					pay_message_res.callbackRsp = 1;
					var xml_pay_message_res = json2xml(pay_message_res,{ header: true });
					res.writeHead(200, { 'Content-Type': 'application/text/xml; charset=utf-8' });
					res.end(xml_pay_message_res);
				}
			}
		});
    }
	else if(url == "/wo_shop?serviceid=validateorderid"){
		parse_string(data, function (err, result) {
			for(var v in result){
				if(v == "checkOrderIdReq"){
					var orderid = result[v].orderid;
					var orderid_real = orderid[0].substr(33,3);
					var ordertime = format_time();
					var pay_message_res = {};
					for(var v in pay_message){
						if(orderid_real == pay_message[v].iapid){
							pay_message_res.checkOrderIdRsp = 0;
							pay_message_res.appname  = pay_message[v].appname;
							pay_message_res.feename  = pay_message[v].feename;
							pay_message_res.payfee   = pay_message[v].payfee ;
							pay_message_res.appdeveloper    = pay_message[v].appdeveloper ;
							pay_message_res.gameaccount    = "" ;
							pay_message_res.macaddress    = "" ;
							pay_message_res.appid    = pay_message[v].appid ;
							pay_message_res.ipaddress    = "" ;
							pay_message_res.serviceid    = pay_message[v].serviceid ;
							pay_message_res.channelid    = pay_message[v].channelid ;
							pay_message_res.cpid    = pay_message[v].cpid ;
							pay_message_res.ordertime    = ordertime ;
							pay_message_res.imei    = "" ;
							pay_message_res.appversion    = pay_message[v].appversion ;
						}
					}
					var json_pay_message_res = {"paymessages":pay_message_res};
					var xml_pay_message_res = json2xml(json_pay_message_res,{ header: true });
					res.writeHead(200, { 'Content-Type': 'application/text/xml; charset=utf-8' });
					res.end(xml_pay_message_res);
				}
			}
		});
	}
};

var format_time = function()
{
		var time_format = '';
		var cur_time = new Date();
		time_format += cur_time.getFullYear();
			
		if(parseInt((cur_time.getMonth() + 1)) < 10){
			time_format += '0';
		}
		time_format += (cur_time.getMonth() + 1);
			
		if(parseInt(cur_time.getDate()) < 10){
			time_format += '0';
		}
		time_format += cur_time.getDate();
			
		if(parseInt(cur_time.getHours()) < 10){
			time_format += '0';
		}
		time_format += cur_time.getHours();
			
		if(parseInt(cur_time.getMinutes()) < 10){
			time_format += '0';
		}
		time_format += cur_time.getMinutes();
			
		if(parseInt(cur_time.getSeconds()) < 10){
			time_format += '0';
		}
		time_format += cur_time.getSeconds();	
		return time_format;
};
module.exports = connector;