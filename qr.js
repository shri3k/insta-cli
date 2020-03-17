const qr = require('qrcode');
qr.toString('I am a pony!?', { type: 'terminal' }, function(err, url) {
  if (err) {
    console.error('error', err);
  }
  console.log(url);
});
