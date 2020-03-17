const dotenv = require('dotenv');
const ArgumentParser = require('argparse').ArgumentParser;
const { version } = require('./package.json');

const { parsed } = dotenv.config();

const parser = new ArgumentParser({
  version,
  addHelp: true,
  description: 'Insta CLI: Upload photos w/o needing a phone',
});

parser.addArgument('photo', {
  help: 'Add Photo',
});

const envflags = require('envflags')(parser, parsed);

module.exports = function cli() {
  console.log(envflags.parseArgs());
  return envflags.parseArgs();
};
