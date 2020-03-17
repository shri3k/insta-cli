const os = require('os');

switch(os.platform) {
  case 'linux':
    break;
  case 'osx':
    break;
  case 'windows':
    break;
  default:
    console.info('No distro was found. Please install exiftool manually');
}

function linuxDistro() {
  
}
