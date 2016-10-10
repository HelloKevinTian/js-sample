var fs = require('fs');
var fullpath1 = './test1.html';
var ssTable = require('ss-globaltable');
var crypto = require('crypto');


ssTable.loadJsonByFile('./activity_center.json', 'activity_center');

console.log('me  ', md5File('./activity_center.json'));


function md5File(file_path) {
	var fileContent = fs.readFileSync(file_path, 'utf-8');
	console.log('content ', fileContent, typeof fileContent);
	var buffer = new Buffer(fileContent, 'utf8'); // 扁平化buffer
	var md5 = crypto.createHash('md5');
	md5.update(buffer);
	return md5.digest('hex');
}

var a = 5;

if (a == 1) {
	/* 最简单的监控方法，但是可能会出現兩次： file1 update
	因為 file system 的 watchFile 實做，當關注的檔案片段（data chunk）
	被更動的時候，就會觸發(trriger)，接著檔案修改完成，又會重新觸發一次事件，
	所以導致當一個檔案修改，會被觸發兩次。*/
	fs.watchFile(fullpath1, function(curr, prev) {
		console.log('file1 update');

		fs.readFile(fullpath1, 'utf-8', function(err, data) {
			console.log(err, data);
		});
	});

} else if (a == 2) {
	//只会出现一次：file2 update   推荐使用！！！
	fs.watchFile(fullpath1, function(curr, prev) {
		if (curr.mtime.getTime() !== prev.mtime.getTime()) {
			console.log('file2 update');
		}
	});

} else if (a == 3) {
	//进阶方案：可以對於此物件進行處理，同時使用事件包裝等方式，讓 listen 可以重複被使用。
	var listen = fs.watchFile(fullpath1, function(curr, prev) {});
	listen.on('change', function(curr, prev) {
		if (curr.mtime.getTime() !== prev.mtime.getTime()) {
			console.log('file3 update');
		}
	});

}