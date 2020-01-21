const dotenv = require('dotenv');
// config() 将读取您的 .env 文件，解析其中的内容并将其分配给 process.env
dotenv.config({ debug: true });

module.exports = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URI,
    paypal: {
        publicKey: process.env.PAYPAL_PUBLIC_KEY,
        secretKey: process.env.PAYPAL_SECRET_KEY,
    },
    mailchimp: {
        apiKey: process.env.MAILCHIMP_API_KEY,
        sender: process.env.MAILCHIMP_SENDER,
    }
}