/**
 * 先进先出的队列
 */
var Queue = function(size) {
    this.size = size || 20;
    this.queue = [];
    this.end = -1;

    this.setSize = function(size) {
        this.size = size;
    }

    this.in = function(element) {
        if (this.end < this.size - 1) {
            this.queue.push(element);
            this.end++;
        } else {
            console.error('queue full');
        }
    }

    this.out = function() {
        if (this.end != -1) {
            var element = this.queue[0];
            this.queue = this.queue.slice(1);
            this.end--;
            return element;
        } else {
            console.error('queue empty');
        }
    }

    this.front = function() {
        return this.queue[0];
    }

    this.getEnd = function() {
        return this.end;
    }

    this.empty = function() {
        this.queue = [];
        this.end = -1;
    }

    this.isEmpty = function() {
        return this.end === -1;
    }
}

var q = new Queue();

for (var i = 0; i < 10; i++) {
    q.in(i);
};

console.log('end: ', q.getEnd());

for (var i = 0; i < 10; i++) {
    console.log(q.out());
};

module.exports = Queue;