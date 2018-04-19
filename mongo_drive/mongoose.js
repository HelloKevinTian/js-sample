var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/test_mongo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('mongodb connect sucess ...');
});

var CarSchema = new Schema({
    _id: String,
    name: {
        type: String
    },
    partIds: [{
        type: String,
        ref: 'Part'
    }],
    date: {
        type: Date,
        default: Date.now,
        // get: v => moment(v).format("YYYY-MM-DD")
    }
});

var PartSchema = new Schema({
    _id: String,
    name: {
        type: String
    },
    otherIds: [{
        type: String,
        ref: 'Other'
    }],
});

var OtherSchema = new Schema({
    _id: String,
    name: {
        type: String
    }
});

CarSchema.set('toJSON', { getters: true, virtuals: true});
CarSchema.set('toObject', { getters: true, virtuals: true });

// CarSchema.virtual('date_v').get(function () {
//     console.log('--------- ', this.date)
//     return moment(this.date).format("YYYY-MM-DD");
// });

CarSchema.path('date').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

var Car = mongoose.model("Car", CarSchema);
var Part = mongoose.model("Part", PartSchema);
var Other = mongoose.model("Other", OtherSchema);

//first insert some data-----------------------------------
// var newCar = new Car({
//     _id: 'Audi',
//     name: 'Audi',
//     partIds: ['tireboss', 'engine', 'gearbox']
// });
// newCar.save(function (err, doc) {
//     console.log(err, doc);
// });

// Part.insertMany([{
//     _id: 'tireboss',
//     name: 'tireboss1',
//     otherIds: ['color1', 'print1']
// }, {
//     _id: 'engine',
//     name: 'engine1',
//     otherIds: ['color2', 'print2']
// }, {
//     _id: 'gearbox',
//     name: 'gearbox1',
//     otherIds: ['color1', 'print1']
// }], function (err, doc) {
//     console.log(err, doc);
// });

// Other.insertMany([{
//     _id:'color1',
//     name: 'color1'
// }, {
//     _id:'color2',
//     name: 'color2'
// }, {
//     _id:'print1',
//     name: 'print1'
// }, {
//     _id:'print2',
//     name: 'print2'
// }], function(err, doc) {});
//first insert some data-----------------------------------

//test virtual-------------------------------------------
Car.find({_id:'Audi'}).exec(function(err, doc) {
    console.log(doc);
    console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
})


//test virtual-------------------------------------------

//second--------------------------------------------------
// Car.find().populate({
//     path: 'partIds',
//     select: 'otherIds -_id',
//     model: 'Part',
//     populate: {
//         path: 'otherIds',
//         select: 'name -_id',
//         model: 'Other'
//     }
// }).lean().exec(function (err, doc) {
//     console.log(JSON.stringify(doc));
// });

// var output = [{
//     "_id": "Benz",
//     "partIds": [{
//         "otherIds": [{
//             "name": "color1"
//         }, {
//             "name": "print1"
//         }]
//     }, {
//         "otherIds": [{
//             "name": "color2"
//         }, {
//             "name": "print2"
//         }]
//     }, {
//         "otherIds": [{
//             "name": "color1"
//         }, {
//             "name": "print1"
//         }]
//     }],
//     "name": "Benz",
//     "__v": 0
// }]
//second--------------------------------------------------