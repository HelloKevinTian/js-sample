var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "faterace2014@gmail.com",
		pass: "abcd.1234"
	}
});

var mailOptions = {
	from: "faterace2014@gmail.com",
	to: "tianwen@chukong-inc.com",
	subject: "hello",
	text: "hello world!",
	html: "<h1>HELLO WORLD.</h1>"
};
console.warn(mailOptions);
transporter.sendMail(mailOptions, function(err, info) {
	if (err) {
		return console.error(err);
	}
	console.info('Message sent: ' + info.message);
});

