var jwt = require('jsonwebtoken');
var token = jwt.sign({
    iss: 'user-center',
    sub: 'fotoable',
    exp: Math.floor(Date.now() / 1000) + 5,
    iat: Math.floor(Date.now() / 1000),
    username: 'tianww',
    rolelist: []
}, 'shhhhh');

console.log(token);
console.log(jwt.verify(token, 'shhhhh', {
    issuer: 'user-center',
    subject: 'fotoable'
}));
setTimeout(function () {
    try {
        console.log(jwt.verify(token, 'shhhhh'));
    } catch (error) {
        console.error('>>>>>>>', error, typeof error);
    }
}, 6000);