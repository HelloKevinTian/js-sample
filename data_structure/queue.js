/**
 * 先进先出的队列
 */
module.exports = Queue;

var Queue = function() {
    var items = [];

    this.enqueue = function(element) {
        items.push(element);
    }

    this.dequeue = function() {
        return items.shift();
    }

    this.front = function() {
        return items[0];
    }

    this.isEmpty = function() {
        return items.length === 0;
    }

    this.clear = function() {
        items = [];
    }

    this.size = function() {
        return items.length;
    }

    this.print = function() {
        console.log(items.toString());
    }
}


// var queue = new Queue();
// console.log(queue.isEmpty()); // 输出 true
// queue.enqueue('John'); // 添加元素 John
// queue.enqueue('Jam'); // 添加元素 Jam
// queue.enqueue('Camila'); // 添加元素 Camila
// queue.print();
// console.log(queue.size()); // 输出 3
// console.log(queue.isEmpty()); // 输出 false
// queue.dequeue(); // 移除元素
// queue.dequeue();
// queue.print();


function hotPotato(namelist, num) {
    var queue = new Queue();
    for (var i = 0; i < namelist.length; i++) { // {1}
        queue.enqueue(namelist[i]);
    }
    var eliminated = "";
    while (queue.size() > 1) { // {2}
        for (var i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue()); // {3}
            queue.print();
        }
        eliminated = queue.dequeue(); // {4}
        console.log(eliminated + "在击鼓传花游戏中被淘汰");
    }
    return queue.dequeue(); // {5}
}
var names = ['john', 'jack', 'camila', 'ingrid', 'carl'];
var winner = hotPotato(names, 7);
console.log("胜利者： " + winner); //john