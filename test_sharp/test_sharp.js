const sharp = require('sharp');

const inputBuffer = require('fs').readFileSync('./adm.jpg');

sharp(inputBuffer)
  .resize(124, 220)
  .toFile('output.jpg', (err, info) => {
      console.info(err, info);
  });