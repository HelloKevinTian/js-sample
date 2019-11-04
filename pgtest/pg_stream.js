const pg = require('pg')
const { Pool } = require('pg');
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')
const { AsyncParser } = require('json2csv');
const transformOpts = { highWaterMark: 8192 };
const { createReadStream, createWriteStream } = require('fs');
const pgCfg = {
    user: 'xxxxx',
    password: 'xxxxxxx',
    database: 'xxx',
    host: 'yyyyy', //东京
    port: 5439,
    max: 20, //default 10
};

const pool = new Pool(pgCfg);

setTimeout(async () => {
    const client = await pool.connect();
    const query = new QueryStream('SELECT * FROM data_dim.dim_app limit 3')
    const stream = client.query(query)

    // stream.on('end', client.release)
    // // stream.pipe(process.stdout)
    // stream.pipe(JSONStream.stringify()).pipe(process.stdout)
    let outName = './rows.csv';
    let fields = ['app_id', 'app_name', 'app_name_eng', 'os_id', 'app_edition', 'app_type', 'app_node', 'app_mode']

    const output = createWriteStream(outName, { encoding: 'utf8' });
    const asyncParser = new AsyncParser({ fields }, transformOpts);
    asyncParser.fromInput(stream.pipe(JSONStream.stringify())).toOutput(output).promise()
        .then(function(csv) {
            console.log('转换结束');
        })
        .catch(function(err) {
            console.error(err);
        });
}, 100);


// //pipe 1,000,000 rows to stdout without blowing up your memory usage
// pg.connect((err, client, done) => {
//     if (err) throw err;
//     const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000000])
//     const stream = client.query(query)
//     //release the client when the stream is finished
//     stream.on('end', done)
//     stream.pipe(JSONStream.stringify()).pipe(process.stdout)
// })