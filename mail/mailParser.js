/**
 * @author tianwen
 * @date   2020-05-13 20:32:43
 * @description TODO
 * https://myaccount.google.com/lesssecureapps  开启谷歌低安全性访问权限
 * https://mail.google.com/mail/u/0/#settings/fwdandpop  开启imap
 */
const Imap = require('imap');
const MailParser = require("mailparser").MailParser;
const fs = require("fs");

const imap = new Imap({
    user: 'xxx',
    password: 'xxx',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

function openInbox(cb) {
    imap.openBox('INBOX', false, cb); //第2个参数为只读模式，需要设置为false才能设置已读
}

imap.once('ready', function() {

    openInbox(function(err, box) {

        console.log("打开邮箱")

        if (err) throw err;

        imap.search(['UNSEEN', ['SINCE', 'May 01, 2020']], function(err, results) { //搜寻2020-05-01以后未读的邮件

            if (err) {
                return console.error(err);
            }

            try {
                const f = imap.fetch(results, { bodies: '', markSeen: true }); //抓取邮件（默认情况下邮件服务器的邮件是未读状态）

                f.on('message', function(msg, seqno) {

                    const mailparser = new MailParser();

                    msg.on('body', function(stream, info) {

                        stream.pipe(mailparser); //将为解析的数据流pipe到mailparser

                        //邮件头内容
                        mailparser.on("headers", function(headers) {
                            console.log("邮件头信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                            console.log("邮件主题: " + headers.get('subject'));
                            console.log("发件人: " + headers.get('from').text);
                            console.log("收件人: " + headers.get('to').text);
                        });

                        //邮件内容
                        mailparser.on("data", function(data) {
                            if (data.type === 'text') { //邮件正文
                                console.log("邮件内容信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                // console.log("邮件内容: " + data.html);
                            }
                            if (data.type === 'attachment') { //附件
                                console.log("邮件附件信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                console.log("附件名称:" + data.filename); //打印附件的名称
                                data.content.pipe(fs.createWriteStream(data.filename)); //保存附件到当前目录下
                                data.release();
                            }
                        });

                    });
                    msg.once('end', function() {
                        console.log(seqno + '完成');
                    });
                });
                f.once('error', function(err) {
                    console.log('抓取出现错误: ' + err);
                });
                f.once('end', function() {
                    console.log('所有邮件抓取完成!');
                    imap.end();
                });
            } catch (err) {
                console.error('======>', err)
            }

        });
    });
});

imap.once('error', function(err) {
    console.log('>>>>>', err);
});

imap.once('end', function() {
    console.log('Connection ended');
});

imap.connect();