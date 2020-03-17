module.exports = async function(page, { username, password }) {
  await page.waitFor('input[name="username"]');
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  const login = await page.$('[type="submit"]');
  await login.click();
};
