var parseString = require('xml2js').parseString;
var async = require('async');
var fs = require('fs');
var mongo = require('../mongo');


// var xml = "<root>Hello xml2js!</root>"
// var xml1 = '<?xml version="1.0" encoding="UTF-8"?><callbackReq><orderid>wwcs15012919504000000000000000000104</orderid><ordertime>0080CF4167C189</ordertime><cpid>86008955</cpid><appid></appid><fid>00018756</fid><consumeCode></consumeCode><payfee>0</payfee><payType>2</payType><hRet>1</hRet><status>35109</status><signMsg>0954edd9538ac065d1101745db06f6db</signMsg></callbackReq>';
// var json_res;
// parseString(xml1, function (err, result) {
//     json_res = result;
//     console.log(result);
// });


var xmlFile = fs.readFileSync('./zfput_campaign.xml', 'utf8');

parseString(xmlFile, function (err, result) {
    // console.log(result.RECORDS.RECORD.length, result.RECORDS.RECORD[0]);

    async.eachSeries(result.RECORDS.RECORD, function (tmp, ecb) {
        var newInfo = new mongo.FBCampaignModel();
        newInfo.campaign_id = tmp.campaign_id[0];
        newInfo.campaign_name = tmp.campaign_name[0];
        newInfo.account_id = tmp.account_id[0];
        newInfo.account_name = tmp.account_name[0];
        newInfo.date = tmp.date[0];
        newInfo.impressions = tmp.impressions[0];
        newInfo.clicks = tmp.unique_clicks[0];
        newInfo.click_rate = tmp.unique_click_ctr[0];
        newInfo.spend = tmp.spend[0];
        newInfo.cpm = tmp.ecpm[0];
        newInfo.installs = tmp.action_app_install[0];
        newInfo.buy_num = tmp.action_purchase[0];
        newInfo.buy_people = tmp.unique_purchase[0];
        newInfo.cpc = tmp.costper_unique_linkclick[0];
        newInfo.cpi = tmp.costper_appinstall[0];
        newInfo.cpa = tmp.costper_unique_purchase[0];
        newInfo.conversion_value = tmp.actionvalue_purchase[0];
        ecb(null);
    
        // mongo.AdAppModel.findOne({
        //     fbid: tmp.fbid[0]
        // }, 'appid appname -_id').then(function (obj) {
        //     newInfo.appid = obj.appid;
        //     newInfo.appname = obj.appname;
        //     newInfo.save().then(function (ret) {
        //         console.log(ret.campaign_id, ret.date);
        //         ecb(null);
        //     }).catch(function (err) {
        //         console.error(err);
        //         ecb(null);
        //     });
        // });
    }, function (err) {
        console.log('ALL Completed..');
    });

});