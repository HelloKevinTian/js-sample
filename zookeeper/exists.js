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

function exists(client, path) {
    client.exists(
        path,
        function (event) {
            console.log('Got event: %s.', event);
            exists(client, path);
        },
        function (error, stat) {
            if (error) {
                console.log(
                    'Failed to check existence of node: %s due to: %s.',
                    path,
                    error
                );
                return;
            }

            if (stat) {
                console.log(
                    'Node: %s exists and its version is: %j',
                    path,
                    stat.version
                );
            } else {
                console.log('Node %s does not exist.', path);
            }
        }
    );
}

client.once('connected', function () {
    console.log('Connected to ZooKeeper.');
    exists(client, path);
});

client.connect();