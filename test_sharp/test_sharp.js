const sharp = require('sharp');

const inputImg = 'git1.gif'; // './adm.jpg';
const outputImg = 'gitout.gif'; // 'output.jpg';

const inputBuffer = require('fs').readFileSync(inputImg);

sharp(inputBuffer)
  .resize(50)
  .toFile(outputImg, (err, info) => {
      console.info(err, info);
  });