/**
 * 奇技淫巧笔试题
 */

//数组去重
function unique(arr) {
	return Array.from(new Set(arr))
}


//给String添加一个自定义方法getLength
String.prototype.getLength = function() {
	return this.length;
};


//输出 1 undefined
var User = {
	count: 1,

	getCount: function() {
		return this.count;
	}
};
console.log(User.getCount());
var func = User.getCount;
console.log(func());


//说说你对闭包的理解，闭包的好处
//保护封闭区域内的私有变量，可以避免参数污染，创建了一块独立的引用空间
//缺点：如果闭包内的变量无法及时释放，可能导致内存泄漏


//编写代码实现，每隔一分钟异步读取一次文件，输出文件中的信息
// setInterval(function() {
// 	require('fs').readFile('sample.js', 'utf8', function(err, info) {
// 		console.log(info);
// 	});
// }, 2000);


//怎么解决 javascript 嵌套回调问题
//模块化：将回调函数分割为独立的函数 Promise async Async/Await generator


//数组扁平化 [1, [2, [ [3, 4], 5], 6]] => [1, 2, 3, 4, 5, 6]
var arr = [1, [2, [ [3, 4], 5], 6]];
function flatten(arr) {
	return arr.reduce(function(prev, next) {
		return prev.concat(Array.isArray(next) ? flatten(next) : next);
	}, [])
}
console.log(flatten(arr));

// 什么是测试金字塔？
// 测试金字塔指的是：当我们在编写测试用例时，底层的单元测试应该远比上层的端到端测试要多。

// Node 自诩异步编程是它的优势，为什么在引用外部包的时候（require()函数）是同步方法，而非异步方法
//1 麻烦。依赖次序保证需要用多次callback，嵌套太深
//2 必要性不大。 2.1 要require的肯定都是本地文件 2.2 源代码文件通常也不大 2.3 也只装在一次。 因此耗时可控。