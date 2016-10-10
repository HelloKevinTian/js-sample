var apn = require('apn');

var token = 'b2f48a11f93128bbcf0f9c1ad9d860b339e97616'; 

var options = { "gateway": "gateway.sandbox.push.apple.com" },
    apnConnection = new apn.Connection(options),
    device = new apn.Device(token),
    note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 60;
note.badge = 3;
note.alert = "you have a new message!";
note.payload = {'messageFrom': 'Caroline'};

apnConnection.pushNotification(note, device);