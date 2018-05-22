const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

let db = mongoose.createConnection('mongodb://127.0.0.1:27017/fotoable?auto_reconnect=true');

mongoose.Promise = global.Promise;

db.once('open', () => {
    console.info('Mongoose连接成功');
});

db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    db.disconnect();
});

db.on('close', function () {
    console.error('数据库断开，重新连接数据库');
});

//---------------------------定义数据模型-------------------------------
const AppItunesIncomeModel = db.model("AppItunesIncome", new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    date: String,
    appid: String,
    appname: String,
    text: String,
    income: Number
}));

const AdAppModel = db.model("AdApp", new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    appid: String,
    appname: String,
    fbid: String,
    apptype: String,
    token: String,
    itunes_enable: Boolean,
    itunes_user: String,
    itunes_pwd: String
}));

const FBCampaignModel = db.model("FBCampaign", new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    date: String,
    time: {
        type: Date,
        default: Date.now
    },
    account_id: String, //广告帐户编号
    account_name: String, //广告帐户名称
    campaign_id: String, //广告系列在报告中对应的专属编号
    campaign_name: String, //广告系列在报告中对应的名称
    appid: String,
    appname: String,
    impressions: Number, //你的广告在屏幕上展示的次数
    clicks: Number, //点击链接的用户人数 clicks
    click_rate: Number, //用户看到你的广告并点击链接的次数百分比
    spend: Number, //广告系列、广告组或广告在投放期内的预估花费总额
    cpm: Number, //每展示 1,000 次的平均费用
    installs: Number, //Mobile App Installs
    buy_num: Number, //Mobile App Purchases   购买次数
    buy_people: Number, //看到广告后，Mobile App Purchases 购买人数
    cpc: Number, //每次独立操作的平均费用：Link Clicks
    cpi: Number, //每次独立操作的平均费用：Mobile App Installs
    cpa: Number, //每次独立操作的平均费用：Mobile App Purchases
    conversion_value: Number //广告投放带来的所有转化的总价值：Mobile App Purchases
}));
//---------------------------定义数据模型-------------------------------

module.exports = {
    db: db,
    itunesModel: AppItunesIncomeModel,
    AdAppModel: AdAppModel,
    FBCampaignModel: FBCampaignModel
}