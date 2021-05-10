const { pipeline } = require('stream');
const CaesarTransform = require('./utils/transform');
const { action, shift, inputSrc, outputSrc } = require('./utils/args-parser');

const handleError = (err) => {
  if (err) {
    process.stderr.write('Error:', err.message);
    process.exit(1);
  } else {
    process.stdout.write('Success!');
  }
}

pipeline(
  inputSrc,
  new CaesarTransform(action, shift),
  outputSrc,
  handleError,
);
