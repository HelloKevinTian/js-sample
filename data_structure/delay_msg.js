/**
 * 延时消息系统
 */

var queue = {};
var curIndex = 1;
var INTERVAL_TIME = 3600;

setInterval(function() {
	if (curIndex >= INTERVAL_TIME) {
		curIndex = 1;
	} else {
		curIndex++;
	}
	console.log(Date.now(), curIndex, queue);

	if (queue[curIndex]) {
		if (queue[curIndex].cycelNum <= 0) {
			queue[curIndex].func.call(null);
			delete queue[curIndex];
		} else {
			queue[curIndex].cycelNum--;
		}
	}
}, 1000);

function addMsg(time, func) {
	var targetIndex = (curIndex + time) % INTERVAL_TIME;
	var cycelNum = Math.floor((curIndex + time) / INTERVAL_TIME);
	queue[targetIndex] = {
		'cycelNum': cycelNum,
		'func': func
	};

	console.log('addMsg', time, queue[targetIndex]);
}

addMsg(12, function() {
	console.log('func1111111111111111111');
	setTimeout(function() {
		addMsg(13, function() {
			console.log('func22222222222222222');
		});
	}, 3000);
});