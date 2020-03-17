const { spawn } = require('child_process');

module.exports = async function(page, photo) {
  await page.waitForSelector('nav + nav input[type="file"]');
  await page.waitForSelector('nav + nav form[method="POST"]');

  const exiftool = spawn('exiftool', ['-all=', '-filename=insta.jpg', photo]);
  exiftool.on('exit', async function() {
    try {
      const uploadBox = await page.$('nav + nav input[type="file"]');
      uploadBox.uploadFile('./insta.jpg');
      const uploadForm = await page.$('nav + nav form[method="POST"]');
      // uploadForm.submit();
    } catch (e) {
      console.error(e);
    }
  });
};
