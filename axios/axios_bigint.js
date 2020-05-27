const axios = require('axios');
const JSONBigInt = require('json-bigint');

setTimeout(async () => {
    try {
        const res = await axios({
            url: 'https://ads.tiktok.com/open_api/oauth2/advertiser/get/',
            method: 'GET',
            transformResponse: [data => data]
        });
        console.log(res.data);
        // [{
        //     "advertiser_id": 6826986154831642629,
        //     "advertiser_name": "Fotoable_townest_3-SINO-TT"
        // }, {
        //     "advertiser_id": 6826980754052874246,
        //     "advertiser_name": "Fotoable_Mergical_3-SINO-TT"
        // }]
        let newData = JSONBigInt.parse(res.data);
        console.log(newData.data.list, newData.data.list[0].advertiser_id, newData.data.list[0].advertiser_id.toString())
    } catch (err) {
        console.error(err);
    }
}, 10);