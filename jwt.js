var jwt = require('jsonwebtoken');
var token = jwt.sign({
    iss: 'auth-center',
    aud: 'admin-web',
    exp: Math.floor(Date.now() / 1000) + 5,
    username: 'admin',
    time: Date.now().toString()
}, 'shhhhh');

console.log(token);
console.log(jwt.verify(token, 'shhhhh', {
    audience: 'admin-web',
    issuer: 'auth-center'
}));
setTimeout(function () {
    try {
        console.log(jwt.verify(token, 'shhhhh'));
    } catch (error) {
        console.error('>>>>>>>', error, typeof error);
    }
}, 10000);