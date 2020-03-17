const pup = require('puppeteer');
const cli = require('./cli');
const actions = require('./actions');

const args = cli();
const username = args.username;
const password = args.password;

const ERROR = {
  loginFailed: Error('Login Failed. Try again'),
};

(async () => {
  try {
    const browser = await pup.launch({
      headless: false,
      devtools: true,
    });
    const page = await browser.newPage();
    await page.emulate(pup.devices['iPhone X']);

    await actions.goLogin(page);
    await actions.userpass(page, {
      username,
      password,
    });

    const state = await Promise.race([
      new Promise(async (res, rej) => {
        const ok = await page.waitFor('[role="dialog"]');
        console.log('---dialog---');
        res('error');
      }),
      new Promise(async (res, rej) => {
        const changedPage = await page.waitForRequest((r) => {
          return /.*instagram\.com\/accounts\/onetap\/.*/.test(r.url());
        });

        const saveInfoDialog = await page.waitForSelector('main button');
        const ok = await page.evaluate(() => {
          const btns = document.querySelectorAll('main button');
          console.log('btns', btns);
          for (let i = 0; i < btns.length; i++) {
            if (btns[i].textContent.toLowerCase() === 'save info') {
              console.log('btns', btns[i].textContent);
              return true;
            }
          }
          console.log('---login save info---');
        });

        if (ok) {
          res('save_now');
        }
      }),
      new Promise(async (res, rej) => {
        const ok = await page.waitFor('[aria-label="new-post-button"]');
        console.log('---in home---');
      }),
    ]);

    switch (state) {
      case 'error':
        throw ERROR.loginFailed;
        break;
      case 'save_now':
        const saveNowBox = await page.$$('main button');
        await saveNowBox[1].click();
        await actions.uploadImage(page, args.photo);
        break;
      default:
        await actions.uploadImage(page, args.photo);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
