const { pipeline } = require('stream');
const { program } = require('commander');
const CaesarTransform = require('./utils/transform');

program
  .requiredOption('-s, --shift <num>', 'a shift')
  .requiredOption('-a, --action <action>', 'an action: encode/decode')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .parse(process.argv);

const options = program.opts();

const handleError = (err) => {
  if (err) {
    process.stderr.write('Error:', err.message);
    process.exit(1);
  } else {
    process.stdout.write('Success!');
  }
}

const read = process.stdin;

const write = process.stdout;

pipeline(
  read,
  new CaesarTransform(options.action, options.shift),
  write,
  handleError,
);
