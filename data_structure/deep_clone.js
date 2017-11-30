/**
 * 简单的深拷贝方法，不支持函数，不支持正则表达式
 */

Object.prototype.clone = function() {
	var Constructor = this.constructor;
	var obj = new Constructor();

	for (var attr in this) {
		if (this.hasOwnProperty(attr)) {
			if (typeof(this[attr]) !== "function") {
				if (this[attr] === null) {
					obj[attr] = null;
				} else {
					obj[attr] = this[attr].clone();
				}
			}
		}
	}
	return obj;
};

/* Method of Array */
Array.prototype.clone = function() {
	var thisArr = this.valueOf();
	var newArr = [];
	for (var i = 0; i < thisArr.length; i++) {
		newArr.push(thisArr[i].clone());
	}
	return newArr;
};

/* Method of Boolean, Number, String*/
Boolean.prototype.clone = function() {
	return this.valueOf();
};
Number.prototype.clone = function() {
	return this.valueOf();
};
String.prototype.clone = function() {
	return this.valueOf();
};

/* Method of Date*/
Date.prototype.clone = function() {
	return new Date(this.valueOf());
};

/* Method of RegExp*/
RegExp.prototype.clone = function() {
	var pattern = this.valueOf();
	var flags = '';
	flags += pattern.global ? 'g' : '';
	flags += pattern.ignoreCase ? 'i' : '';
	flags += pattern.multiline ? 'm' : '';
	return new RegExp(pattern.source, flags);
};

var a = [{
	name: 'kevin',
	age: 20,
	car_list: [1, 2, 3]
}];

var b = a;

var c = a.clone();

a[0].name = 'jam';

console.log(a);
console.log(b);
console.log(c);

a[0].car_list.push(4);

console.log(a);
console.log(b);
console.log(c);