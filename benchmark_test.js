'use strict';
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

// test_for();
test_object();

function test_object() {
    function Store() {}
    Store.prototype = Object.create(null);

    suite.add('var store = {}', function() {
            var store = {};
            store.key = 'value';
        })
        .add('var set = new Set()', function() {
            var set = new Set();
            set.add('value');
        })
        .add('var store = new Map()', function() {
            var store = new Map();
            store.set('key', 'value');
        })
        .add('var store = Object.create(null)', function() {
            var store = Object.create(null);
            store.key = 'value';
        })
        .add('EventEmitter way', function() {
            var store = new Store();
            store.key = 'value';
        })
        .on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        // run async
        .run({
            'async': true
        });
}

function test_for() {
    var arr = [1, 2, 3, 4, , 5, 6, 7, 8, 9, 0, 10, 12, 13];

    suite.add('for', function() {
            for (var i = 0; i < arr.length; i++) {
                var a = arr[i];
            };
        })
        .add('for in', function() {
            for (var k in arr) {
                var a = arr[k];
            }
        })
        .add('forEach', function() {
            arr.forEach(function(value) {
                var a = value;
            });
        })
        .on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        // run async
        .run({
            'async': true
        });
}