/**
 * Copyright (c) 2013 Yahoo! Inc. All rights reserved.
 *
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */

var zookeeper = require('node-zookeeper-client');
var cfg = require('./cfg.json');

var client = zookeeper.createClient(cfg.host || 'localhost:2181');

client.once('connected', function () {
    console.log('Connected to the server.');

    client.transaction().
    create('/txn').
    create('/txn/1', new Buffer('transaction')).
    setData('/txn/1', new Buffer('test'), -1).
    check('/txn/1').
    remove('/txn/1', -1).
    remove('/txn').
    commit(function (error, results) {
        if (error) {
            console.log(
                'Failed to execute the transaction: %s, results: %j',
                error,
                results
            );

            return;
        }

        console.log('Transaction completed.');
        client.close();
    });
});

client.connect();