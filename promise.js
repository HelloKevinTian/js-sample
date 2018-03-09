//---------------------then
var a = 10;
var p1 = new Promise(function(resolve, reject) {
	resolve(a);
	a += 10;
	// or
	// reject("Error!");
});

p1.then(function(value) {
	console.log(value); // Success!
	console.log(a);
}, function(reason) {
	console.log(reason); // Error!
});

return;
//--------------------catch

// var p1 = new Promise(function(resolve, reject) {
// 	resolve('Success');
// });

// p1.then(function(value) {
// 	console.log(value); // "成功!"
// 	throw 'oh, no!';
// }).catch(function(e) {
// 	console.log(e); // "oh, no!"
// }).then(function() {
// 	console.log('after a catch the chain is restored');
// }, function() {
// 	console.log('Not fired due to the catch');
// });

// // 以下行为与上述相同
// p1.then(function(value) {
// 	console.log(value); // "成功!"
// 	return Promise.reject('oh, no!');
// }).catch(function(e) {
// 	console.log(e); // "oh, no!"
// }).then(function() {
// 	console.log('after a catch the chain is restored');
// }, function() {
// 	console.log('Not fired due to the catch');
// });

// // 抛出一个错误，大多数时候将调用catch方法
// var p1 = new Promise(function(resolve, reject) {
// 	throw 'Uh-oh!';
// });

// p1.catch(function(e) {
// 	console.log(e); // "Uh-oh!"
// });

// // 在异步函数中抛出的错误不会被catch捕获到
// var p2 = new Promise(function(resolve, reject) {
// 	setTimeout(function() {
// 		throw 'Uncaught Exception!';
// 	}, 1000);
// });

// p2.catch(function(e) {
// 	console.log(e); // 不会执行
// });

// // 在resolve()后面抛出的错误会被忽略
// var p3 = new Promise(function(resolve, reject) {
// 	resolve();
// 	throw 'Silenced Exception!';
// });

// p3.catch(function(e) {
// 	console.log(e); // 不会执行
// });


//创建一个新的 Promise ，且已决议
var p1 = Promise.resolve("calling next");

var p2 = p1.catch(function(reason) {
	//这个方法永远不会调用
	console.log("catch p1!");
	console.log(reason);
});

p2.then(function(value) {
	console.log("next promise's onFulfilled"); /* next promise's onFulfilled */
	console.log(value); /* calling next */
}, function(reason) {
	console.log("next promise's onRejected");
	console.log(reason);
});


//------------------------------

var val = 1;

// 我们假设step1, step2, step3都是ajax调用后端或者是
// 在Node.js上查询数据库的异步操作
// 每个步骤都有对应的失败和成功处理回调
// 需求是这样，step1、step2、step3必须按顺序执行
function step1(resolve, reject) {
	console.log('步骤一：执行');
	if (val >= 1) {
		resolve('Hello I am No.1');
	} else if (val === 0) {
		reject(val);
	}
}

function step2(resolve, reject) {
	console.log('步骤二：执行');
	if (val === 1) {
		resolve('Hello I am No.2');
	} else if (val === 0) {
		reject(val);
	}
}

function step3(resolve, reject) {
	console.log('步骤三：执行');
	if (val === 1) {
		resolve('Hello I am No.3');
	} else if (val === 0) {
		reject(val);
	}
}

new Promise(step1).then(function(val) {
	console.info(val);
	return new Promise(step2);
}).then(function(val) {
	console.info(val);
	return new Promise(step3);
}).then(function(val) {
	console.info(val);
	return val;
}).then(function(val) {
	console.info(val);
	return val;
});

// 执行之后将会打印
// 步骤一：执行
// Hello I am No.1
// 步骤二：执行
// Hello I am No.2
// 步骤三：执行
// Hello I am No.3
// Hello I am No.3