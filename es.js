var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '192.168.1.66:9200',
    // log: 'trace'
});

// client.ping({
//     // ping usually has a 3000ms timeout
//     requestTimeout: 1000
// }, function (error) {
//     if (error) {
//         console.trace('elasticsearch cluster is down!');
//     } else {
//         console.log('All is well');
//     }
// });

(async () => {
    try {
        const response = await client.search({
            index: 'my_index',
            body: {
                query: {
                    match: {
                        last_name: 'Tian'
                    }
                }
            }
        });
        console.log(response.hits.hits)
        // [{
        //     _index: 'my_index',
        //     _type: 'user',
        //     _id: '3',
        //     _score: 0.2876821,
        //     _source: {
        //         first_name: 'Kevin',
        //         last_name: 'Tian',
        //         age: 25,
        //         about: 'I love to go rock climbing',
        //         interests: [Array]
        //     }
        // }]
    } catch (error) {
        console.trace(error.message)
    }
})()