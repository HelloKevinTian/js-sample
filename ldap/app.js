
/**
 * @author tianwen
 * @date   2020-07-13 15:29:15
 * @description 
 * LDAP：Lightweight Directory Access Protocol，轻量目录访问协议。
 * DC：domain component一般为公司名，例如：dc=163,dc=com
 * OU：organization unit为组织单元，最多可以有四级，每级最长32个字符，可以为中文
 * CN：common name为用户名或者服务器名，最长可以到80个字符，可以为中文
 * DN：distinguished name为一条LDAP记录项的名字，有唯一性，例如：dc:"cn=admin,ou=developer,dc=163,dc=com"
 */
const ldap = require('ldapjs');

const client = ldap.createClient({
    url: 'ldap://192.168.1.51:389'
});

const opts = {
    filter: '(uid=admin)', //查询条件过滤器，查找uid=kxh的用户节点
    scope: 'sub', //查询范围
    timeLimit: 500 //查询超时
};

const dn = 'cn=admin,dc=fotoable,dc=com';
const password = 'redhat123';

client.bind(dn, password, (err, bindRes) => {
    if (err) throw new Error(err);
    // console.log(err, bindRes);

    client.search('ou=People,dc=fotoable,dc=com', opts, function(err, res2) {

        //查询结果事件响应
        res2.on('searchEntry', function(entry) {

            //获取查询的对象
            let user = entry.object;
            let userText = JSON.stringify(user, null, 2);
            console.log(userText);


            client.bind(user.dn, user.userPassword, (err, res3) => {
                if (err) {
                    console.error('认证失败');
                } else {
                    console.log('认证成功');
                }
            })

        });

        res2.on('searchReference', function(referral) {
            console.log('referral: ' + referral.uris.join());
        });

        //查询错误事件
        res2.on('error', function(err) {
            console.error('error: ' + err.message);
            //unbind操作，必须要做
            client.unbind();
        });

        //查询结束
        res2.on('end', function(result) {
            console.log('search status: ' + result.status);
            //unbind操作，必须要做
            client.unbind();
        });

    });
});