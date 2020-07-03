'use strict';
let Benchmark = require('benchmark');
const _ = require('lodash');

const arr = [
    { a: 1, b: 2, c: 3, d: 4, e: 5 },
    { a: 1, b: 2, c: 33, d: 4, e: 5 },
    { a: 1, b: 2, c: 3, d: 4, e: 5 },
    { a: 1, b: 2, c: 333, d: 4, e: 5 },
    { a: 1, b: 2, c: 3, d: 4, e: 5 },
];
const filterObj = { a: 1, c: 3 };

let suite = new Benchmark.Suite;

test_for();

function test_for() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 12, 13, 14, 15];

    suite.add('_.filter', function() {
            const r1 = _.filter(arr, filterObj);
        })
        .add('obj.filter', function() {
            const r2 = arr.filter((o) => {
                for (let i in filterObj) {
                    if (o[i] != filterObj[i]) return false;
                }
                return true;
            });
        })
        .add('obj.filter1', function() {
            const r3 = arr.filter((o) => {
                let keys = Object.keys(filterObj);
                for (const v of keys) {
                    if (o[v] != filterObj[v]) return false;
                }
                return true;
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