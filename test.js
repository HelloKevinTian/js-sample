var buf1 = new Buffer(2);
var buf2 = new Buffer(4);
var buf3 = new Buffer(6);
var buf4 = new Buffer(8);
var buf5 = new Buffer(4);

var shortNum = 65535; //2字节最大值
var intNum = 4294967295; //4字节最大值
var timeNum = Math.floor(Date.now());
var timeDoubleNum = Date.now();
buf5[0] = 0xff;
buf5[1] = 0xff;
buf5[2] = 0xff;
buf5[3] = 0xff;

buf1.writeUInt16BE(shortNum, 0);
buf2.writeUInt32BE(intNum, 0);
buf3.writeIntBE(timeNum, 0, 6);
buf4.writeDoubleBE(timeDoubleNum, 0);

console.log(buf1, buf1.readUInt16BE(0));
console.log(buf2, buf2.readUInt32BE(0));
console.log(buf3, buf3.readUIntBE(0, 6), timeNum);
console.log(buf4, buf4.readDoubleBE(0), timeDoubleNum);
console.log(buf5, buf5.readUInt32BE(0));

return;

//-------------------------------------------------

// 读取一条记录
// buf    Buffer 对象
// offset 本条记录在 Buffer 对象的开始位置
// data   {number, lesson, score}
function writeRecord(buf, offset, data) {
	buf.writeUIntBE(data.number, offset, 3);
	buf.writeUInt16BE(data.lesson, offset + 3);
	buf.writeInt8(data.score, offset + 5);
}

// 写入一条记录
// buf    Buffer 对象
// offset 本条记录在 Buffer 对象的开始位置
function readRecord(buf, offset) {
	return {
		number: buf.readUIntBE(offset, 3),
		lesson: buf.readUInt16BE(offset + 3),
		score: buf.readInt8(offset + 5)
	};
}

// 写入记录列表
// list  记录列表，每一条包含 {number, lesson, score}
function writeList(list) {
	var buf = new Buffer(list.length * 6);
	var offset = 0;
	for (var i = 0; i < list.length; i++) {
		writeRecord(buf, offset, list[i]);
		offset += 6;
	}
	return buf;
}

// 读取记录列表
// buf  Buffer 对象
function readList(buf) {
	var offset = 0;
	var list = [];
	while (offset < buf.length) {
		list.push(readRecord(buf, offset));
		offset += 6;
	}
	return list;
}

var list = [{
	number: 100001,
	lesson: 1001,
	score: 99
}, {
	number: 100002,
	lesson: 1001,
	score: 88
}, {
	number: 100003,
	lesson: 1001,
	score: 77
}, {
	number: 100004,
	lesson: 1001,
	score: 66
}, {
	number: 100005,
	lesson: 1001,
	score: 55
}, ];
console.log(list);

var buf = writeList(list);
console.log(buf);
// 输出 <Buffer 01 86 a1 03 e9 63 01 86 a2 03 e9 58 01 86 a3 03 e9 4d 01 86 a4 03 e9 42 01 86 a5 03 e9 37>

var ret = readList(buf);
console.log(ret);
/* 输出
[ { number: 100001, lesson: 1001, score: 99 },
  { number: 100002, lesson: 1001, score: 88 },
  { number: 100003, lesson: 1001, score: 77 },
  { number: 100004, lesson: 1001, score: 66 },
  { number: 100005, lesson: 1001, score: 55 } ]
*/