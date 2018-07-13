var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'foo',
    streams: [{
        type: 'rotating-file',
        path: './foo.log',
        period: '1d', // daily rotation
        count: 3 // keep 3 back copies
    }]
});
log.info('hi');
log.error({
    lang: 'fr'
}, 'au revoir');