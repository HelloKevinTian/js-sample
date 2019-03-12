'use strict';
let Benchmark = require('benchmark');

let suite = new Benchmark.Suite;

test_for();

function test_for() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 12, 13, 14, 15];

    suite.add('for', function () {
            for (let i = 0; i < arr.length; i++) {
                let a = arr[i];
            };
        })
        .add('for of', function () {
            for (let k of arr) {
                let a = k;
            }
        })
        .add('for in', function () {
            for (let k in arr) {
                let a = arr[k];
            }
        })
        .add('forEach', function () {
            arr.forEach(function (value) {
                let a = value;
            });
        })
        .on('cycle', function (event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        // run async
        .run({
            'async': true
        });
}