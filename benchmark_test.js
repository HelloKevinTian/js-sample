'use strict';
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

function Store() {}
Store.prototype = Object.create(null)

suite.add('let store = {}', function() {
        let store = {}
        store.key = 'value'
    })
    .add('let store = new Map()', function() {
        let store = new Map()
        store.set('key', 'value')
    })
    .add('let store = Object.create(null)', function() {
        let store = Object.create(null)
        store.key = 'value'
    })
    .add('EventEmitter way', function() {
        let store = new Store()
        store.key = 'value'
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