const {
    Client
} = require('pg');
const client = new Client({
    user: 'tw',
    host: '52.15.112.93',
    database: 'twtest',
    password: 'Tw12345678',
    port: 5439
});

const {
    Pool
} = require('pg');
const pool = new Pool({
    user: 'tw',
    password: 'Tw12345678',
    database: 'twtest',
    host: '52.15.112.93',
    port: 5439
});

// insertDB();
// queryDB();

async function queryDB() {
    if (0) {
        client.connect();

        client.query('SELECT * From ad', (err, res) => {
            console.log(err, res.rows);
            client.end();
        });
    } else {
        await client.connect()

        const res = await client.query('SELECT * From ad')
        console.log(res.rows)
        // await client.end()
    }
}

async function insertDB() {
    const data = {
        text: 'INSERT INTO ad(id, address) VALUES($1, $2)',
        values: [2, 'Shanghai']
    };
    await client.query(data);
}





(async (pool) => {

    const {
        rows
    } = await pool.query('SELECT * FROM ad WHERE id = $1', [1])
    console.log('user:', rows);

    const newUser = {
        email: 'brian.m.carlson@gmail.com'
    };
    await pool.query('INSERT INTO ad(data) VALUES($1)', [newUser]);

    // const client = await pool.connect()
    // try {
    //     const res = await client.query('SELECT * FROM ad WHERE id = $1', [1])
    //     console.log(res.rows)
    // } finally {
    //     client.release()
    // }

    // console.log('starting async query')
    // const result = await pool.query('SELECT NOW()')
    // console.log('async query finished')

    // console.log('starting callback query')
    // pool.query('SELECT NOW()', (err, res) => {
    //     console.log('callback query finished')
    // })

    // console.log('calling end')
    // await pool.end()
    // console.log('pool has drained')

})(pool).catch(e => setImmediate(() => {
    throw e
}))