'use strict';
//---------------function-----------------
var human = {
    breathe(name) { //不需要function也能定义breathe函数。
        console.log(name + ' is breathing...');
    }
};
human.breathe('jarson'); //输出 'jarson is breathing...'


var human = {
    breathe: function(name) {
        console.log(name + ' is breathing...');
    }
};
human.breathe('jarson');
//---------------class-----------------
class Human {
    constructor(name) {
        this.name = name;
    }
    breathe() {
        console.log(this.name + " is breathing...");
    }
}
var man = new Human("jarson");
man.breathe(); //jarson is breathing


function Human1(name) {
    this.name = name;
    this.breathe = function() {
        console.log(this.name + ' is breathing...');
    }
}
var man1 = new Human1('jarson');
man1.breathe(); //jarson is breathing


class Man extends Human {
    constructor(name, sex) {
        super(name);
        this.sex = sex;
    }
    info() {
        console.log(this.name + ' is ' + this.sex);
    }
}
var xx = new Man('jarson', 'boy');
xx.breathe(); //jarson is breathing
xx.info(); //jarson is boy


//产生一个随机数
let num = Math.random();
//将这个数字输出到console
console.log(`your num is ${num}`);
