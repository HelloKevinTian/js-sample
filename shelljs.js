var shell = require('shelljs');

shell.cd('D:/work/node/simulate_itunes/screen');

// console.log('arr', shell.ls())

shell.ls().forEach(function (file) {
    console.log(file);
});

shell.exec('zip -qj -r test.zip ./rank', function (code, stdout, stderr) {
    console.log(code, stdout, stderr)
});