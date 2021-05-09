const { pipeline } = require('stream');
const { program } = require('commander');
const stream = require('stream');

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

class CaesarTransform extends stream.Transform {
  constructor(action, shift) {
    super();
    this.action = action;
    this.shift = shift;
  }

  _transform(data, encoding, callback) {
    let result = '';
    if (!Number.isInteger(Number(this.shift))) {
      process.stderr.write(`Error: Oops... Shift should be an integer!`);
      process.exit(1);
    }
    if (this.action === 'encode' || this.action === 'decode') {
      result = data;
    } else {
      process.stderr.write('Error: Oops... Action not found!');
      process.exit(1);
    }
    this.push(result);
    callback();
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
