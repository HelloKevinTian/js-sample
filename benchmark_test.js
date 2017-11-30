'use strict';
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

function Store() {}
Store.prototype = Object.create(null)

suite.add('var store = {}', function() {
        var store = {};
        store.key = 'value';
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