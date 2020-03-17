module.exports = async function(page) {
  await page.goto('https://www.instagram.com/accounts/login');
  await page.addScriptTag({
    path: './script.js',
  });
};
