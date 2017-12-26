'use strict';
/**
 * 负载均衡算法
 */

/**
 * 轮询法：将请求按照顺序轮流的分配到服务器上,他均衡的对待每一台后端的服务器,不关心服务器的的连接数和负载情况
 */
var PoolBalance = function() {
	this.servers = new Array('192.168.0.1', '192.168.0.2', '192.168.0.3', '192.168.0.4', '192.168.0.5');
	this.pos = 0;

	this.getServer = function() {
		var server = null;

		if (this.pos >= this.servers.length) {
			this.pos = 0;
		}

		server = this.servers[this.pos];
		this.pos++;

		return server;
	}

	this.run = function() {
		console.log('==========test PoolBalance==========');
		for (var i = 0; i < 10; i++) {
			console.log(this.getServer());
		};
		console.log('==========test PoolBalance==========');
	}
}

/**
 * 随机法：通过系统的随机函数,根据后端服务器列表的大小来随机获取其中的一台来访问,
 * 	随着调用量的增大,实际效果越来越近似于平均分配到没一台服务器.和轮询的效果类似
 *  和轮询算法比较,在并发的场景下,轮询需要加锁,随机法想比而言性能好点.
 */
var RandomBalance = function() {
	this.servers = new Array('192.168.0.1', '192.168.0.2', '192.168.0.3', '192.168.0.4', '192.168.0.5');
	this.pos = 0;

	this.getServer = function() {
		var server = null;

		this.pos = Math.floor(Math.random() * this.servers.length);

		server = this.servers[this.pos];

		return server;
	}

	this.run = function() {
		console.log('==========test RandomBalance==========');
		for (var i = 0; i < 10; i++) {
			console.log(this.getServer());
		};
		console.log('==========test RandomBalance==========');
	}
}

/**
 * 源地址hash法：取客户端访问的ip地址,通过hash函数计算出一个hash值,用该hash值对
 *  服务器列表的大小进行取模运算,得到的值就是要访问的服务器的序号.
 */
var IpHashBalance = function() {
	this.servers = new Array('192.168.0.1', '192.168.0.2', '192.168.0.3', '192.168.0.4', '192.168.0.5');
	this.pos = 0;

	//same with hasCode in Java(不推荐使用)
	function hashCode(str) {
		var h = 0,
			off = 0;
		var len = str.length;
		for (var i = 0; i < len; i++) {
			h = 31 * h + str.charCodeAt(off++);
		}
		return h;
	}

	//from https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0 结果与下面hashCode2相同
	function hashCode1(s) {
		var h = 0,
			l = s.length,
			i = 0;
		if (l > 0)
			while (i < l)
				h = (h << 5) - h + s.charCodeAt(i++) | 0;
		return h;
	}

	//from https://stackoverflow.com/questions/194846/is-there-any-kind-of-hash-code-function-in-javascript
	String.prototype.hashCode2 = function() {
		var hash = 0;
		for (var i = 0; i < this.length; i++) {
			var character = this.charCodeAt(i);
			hash = ((hash << 5) - hash) + character;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	}

	this.getServer = function(ip) {
		var server = null;

		var code = hashCode(ip);

		this.pos = Math.abs(code % this.servers.length);
		// console.log(ip, code, this.pos)

		server = this.servers[this.pos];

		return server;
	}


	this.run = function() {
		console.log('==========test IpHashBalance==========');
		for (var i = 0; i < 10; i++) {
			var ip = '10.10.10.' + i % 5;
			console.log(ip + ' ' + this.getServer(ip));
		};
		console.log('==========test IpHashBalance==========');
	}
}

/**
 * 加权轮询法
 */
var WeightPoolBalance = function() {
	this.serverMap = {
		'192.168.0.1': 1,
		'192.168.0.2': 1,
		'192.168.0.3': 4,
		'192.168.0.4': 3,
		'192.168.0.5': 3,
		'192.168.0.6': 2
	};
	this.pos = 0;

	this.getServer = function() {
		var servers = [];

		for (var k in this.serverMap) {
			var weight = this.serverMap[k];
			for (var i = 0; i < weight; i++) {
				servers.push(k);
			}
		}

		var server = null;

		if (this.pos >= servers.length) {
			this.pos = 0;
		}

		server = servers[this.pos];
		this.pos++;

		return server;
	}

	this.run = function() {
		console.log('==========test WeightPoolBalance==========');
		for (var i = 0; i < 10; i++) {
			console.log(this.getServer());
		};
		console.log('==========test WeightPoolBalance==========');
	}
}

/**
 * 加权随机法
 */
var WeightRandomBalance = function() {
	this.serverMap = {
		'192.168.0.1': 1,
		'192.168.0.2': 1,
		'192.168.0.3': 4,
		'192.168.0.4': 3,
		'192.168.0.5': 3,
		'192.168.0.6': 2
	};
	this.pos = 0;

	this.getServer = function() {
		var servers = [];

		for (var k in this.serverMap) {
			var weight = this.serverMap[k];
			for (var i = 0; i < weight; i++) {
				servers.push(k);
			}
		}

		var server = null;

		this.pos = Math.floor(Math.random() * servers.length);

		server = servers[this.pos];

		return server;
	}

	this.run = function() {
		console.log('==========test WeightRandomBalance==========');
		for (var i = 0; i < 10; i++) {
			console.log(this.getServer());
		};
		console.log('==========test WeightRandomBalance==========');
	}
}

//轮询测试
var o = new PoolBalance();
o.run();

//随机测试
var o = new RandomBalance();
o.run();

//iphash测试
var o = new IpHashBalance();
o.run();

//加权轮询测试
var o = new WeightPoolBalance();
o.run();

//加权随机测试
var o = new WeightRandomBalance();
o.run();