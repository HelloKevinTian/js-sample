/**
 * Copyright (c) 2013 Yahoo! Inc. All rights reserved.
 *
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */

var zookeeper = require('node-zookeeper-client');
var cfg = require('./cfg.json');

var client = zookeeper.createClient(cfg.host, {
    retries: 2
});
var path = cfg.path;
var data = new Buffer(cfg.data);

client.once('connected', function () {
    console.log('Connected to the server.');

    client.setData(path, data, function (error, stat) {
        if (error) {
            console.log('Got error when setting data: ' + error);
            return;
        }

        console.log(
            'Set data "%s" on node %s, version: %d.',
            data.toString(),
            path,
            stat.version
        );
        client.close();
    });
});

client.connect();