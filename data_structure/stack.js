/**
 * 后进先出的栈
 */
'use strict';

var Stack = function(size) {
	this.size = size || 20;
	this.stack = [];
	this.top = -1;

	this.setSize = function(size) {
		this.size = size;
	}

	this.push = function(element) {
		if (this.isFull()) {
			console.error('stack full');
		} else {
			this.stack.push(element);
			this.top++;
		}
	}

	this.pop = function() {
		if (this.isEmpty()) {
			console.error('stack empty');
		} else {
			this.top--;
			var element = this.stack.pop();
			return element;
		}
	}

	this.getTop = function() {
		return this.top;
	}

	this.empty = function() {
		this.stack = [];
		this.top = -1;
	}

	this.isEmpty = function() {
		return (this.top === -1) ? true : false;
	}

	this.isFull = function() {
		return (this.top === this.size - 1) ? true : false;
	}

}

var s = new Stack();

for (var i = 0; i < 10; i++) {
	s.push(i);
};

console.log('top: ', s.getTop());

for (var i = 0; i < 10; i++) {
	console.log(s.pop());
};

s.empty();

console.log('top: ', s.getTop());       