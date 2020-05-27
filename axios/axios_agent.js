const fs = require('fs');
const https = require('https');
const axios = require('axios');
const request = require('request');
const _ = require('lodash');

const httpsAgent = new https.Agent({
    key: fs.readFileSync('./certificate.key'),
    cert: fs.readFileSync('./certificate.pem')
});
if (1) {
    const data = {
        startTime: '2020-05-14',
        endTime: '2020-05-14',
        selector: {
            fields: ['campaignName'],
            orderBy: [{ field: 'countryCode', sortOrder: 'ASCENDING' }],
            pagination: { offset: 0, limit: 100 }
        },
        groupBy: ['countryCode'],
        timeZone: 'UTC',
        returnRecordsWithNoMetrics: true,
        returnRowTotals: true,
        returnGrandTotals: true
    };
    setTimeout(async () => {
        try {
            //report
            const ret = await axios({
                url: 'https://api.searchads.apple.com/api/v3/reports/campaigns',
                method: 'POST',
                httpsAgent,
                headers: { 'Authorization': `orgId=62810`, 'Content-Type': 'application/json' },
                data
            });
            let campainIds = [];
            const list = ret.data.data.reportingDataResponse.row;
            for (const o of list) {
                campainIds.push(o.metadata.campaignId);
            }
            console.log('----', campainIds)
            campainIds = _.uniq(campainIds);
            return console.log(ret.data, campainIds, campainIds.length);
            return console.log(list)

            //campaigns
            const resp = await axios({
                url: 'https://api.searchads.apple.com/api/v2/campaigns',
                method: 'GET',
                httpsAgent,
                headers: { 'Authorization': `orgId=62810`, 'Content-Type': 'application/json' }
            });
            console.log(resp.data)
        } catch (err) {
            if (err.response) {
                console.error(err.response.status, err.response.data.error)
            } else {
                console.error(err)
            }
        }
    }, 100);
} else {
    let query = {
        startTime: '2020-05-14',
        endTime: '2020-05-14',
        selector: {
            orderBy: [{
                field: "countryCode",
                sortOrder: "ASCENDING"
            }],
            pagination: {
                offset: 0,
                limit: 1
            }
        },
        groupBy: [
            'countryCode'
        ],
        timeZone: "UTC",
        returnRecordsWithNoMetrics: true,
        returnRowTotals: true,
        returnGrandTotals: true
    }
    let postData = JSON.stringify(query)
    request.post({
        url: 'https://api.searchads.apple.com/api/v2/reports/campaigns',
        key: fs.readFileSync('./certificate.key'),
        cert: fs.readFileSync('./certificate.pem'),
        headers: {
            'Authorization': `orgId=62810`,
            'Content-Type': 'application/json'
        },
        body: postData
    }, (err, res, body) => {
        console.log(err, body)
    })
}