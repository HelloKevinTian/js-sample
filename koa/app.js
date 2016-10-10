var koa = require('koa');
var app = koa();

// x-response-time

app.use(function*(next) {
	var start = new Date;
	yield next;
	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function*(next) {
	var start = new Date;
	yield next;
	var ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function*() {
	this.body = 'Hello World';
});

app.name = 'test.koa';

app.listen(3000);
console.log('--------listen 127.0.0.1:3000', app.name, app.env, app.proxy, app.subdomainOffset);