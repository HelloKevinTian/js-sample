/**
 * Copyright (c) 2013 Yahoo! Inc. All rights reserved.
 *
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */

var zookeeper = require('node-zookeeper-client');
var cfg = require('./cfg.json');

var client = zookeeper.createClient(cfg.host || 'localhost:2181');
var path = cfg.path;

client.once('connected', function () {
    console.log('Connected to the server.');

    client.mkdirp(path, zookeeper.CreateMode.PERSISTENT, function (error, p) {
        if (error) {
            console.log('Failed to mkdirp: %s due to: %s: ', path, error.stack);
        } else {
            console.log('Path: %s is successfully created.', p);
        }

        client.close();
    });
});

client.connect();