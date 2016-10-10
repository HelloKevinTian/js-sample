sendmail = require('sendmail')();

sendmail({
    from: 'sx@chukong-inc.com',
    to: 'sunny_kevin@qq.com',
    subject: 'test sendmail',
    content: '你好中国,Mail of test sendmail  sbsbsbsbsb ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});

