var http = require('http');
var body1 = '<?xml version="1.0" encoding="UTF-8"?>' + 
		'<checkOrderIdReq>' +
		'<orderid>wwcs15013012462000000000000000000104</orderid>' +
		'<signMsg>e22d7786b2d860e511a7e357c00d7eba</signMsg>' +
		'<usercode>c0472308e8824962387d81b155149822</usercode>' +
		'<provinceid>4043</provinceid>' +
		'<cityid>10</cityid>' +
		'</checkOrderIdReq>';

var body2 = '<?xml version="1.0" encoding="UTF-8"?>' +
		'<callbackReq>' +
		'<orderid>wwcs15013012462000000000000000000104</orderid>' +
		'<ordertime>0080CF4167C189</ordertime>' +
		'<cpid>86008955</cpid>' +
		'<appid></appid>' +
		'<fid>00018756</fid>' +
		'<consumeCode></consumeCode>' +
		'<payfee>0</payfee>' +
		'<payType>2</payType>' +
		'<hRet>1</hRet>' +
		'<status>35116</status>' +
		'<signMsg>9b0d4783f8658aef3b5a5f5e9a8345cb</signMsg>' +
		'</callbackReq>';

var postRequest1 = {
    host: "192.168.22.66",
    path: "/wo_shop?serviceid=validateorderid",
    port: 20003,
    method: "POST",
    headers: {
        'Cookie': "cookie",
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body1)
    }
};

var postRequest2 = {
    host: "192.168.22.66",
    path: "/wo_shop",
    port: 20003,
    method: "POST",
    headers: {
        'Cookie': "cookie",
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body2)
    }
};

var buffer = "";

var req1 = http.request( postRequest1, function( res )    {
   console.log( res.statusCode );
   var buffer = "";
   res.on( "data", function( data ) { buffer = buffer + data;} );
   res.on( "end", function( data ) { console.log( buffer ); } );
});

req1.write( body1 );
req1.end();

buffer = "";

var req2 = http.request( postRequest2, function( res )    {
   console.log( res.statusCode );
   var buffer = "";
   res.on( "data", function( data ) { buffer = buffer + data;} );
   res.on( "end", function( data ) { console.log( buffer ); } );
});

req2.write( body2 );
req2.end();