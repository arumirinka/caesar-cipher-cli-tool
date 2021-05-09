const path = require('path');
const fs = require('fs');
const { program } = require('commander');

program
  .requiredOption('-s, --shift <num>', 'a shift')
  .requiredOption('-a, --action <action>', 'an action: encode/decode')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .parse(process.argv);

const options = program.opts();

if (options.action !== 'decode' && options.action !== 'encode') {
  process.stderr.write('Error: action should be either decode or encode!');
  process.exit(1);
}

if (!Number.isInteger(Number(options.shift))) {
  process.stderr.write('Error: shift should be an integer!');
  process.exit(1);
}

const inputFile = options.input ? path.resolve(options.input) : '';

if (inputFile) {
  fs.access(inputFile, fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) {
      process.stderr.write(`Input file ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}.`);
      process.exit(1);
    }
  });
}

const outputFile = options.output ? path.resolve(options.output) : '';

if (outputFile) {
  fs.access(outputFile, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
      process.stderr.write(`Output file ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}.`);
      process.exit(1);
    }
  });
}

const inputSrc = inputFile
  ? fs.createReadStream(inputFile)
  : process.stdin;

const outputSrc = outputFile
  ? fs.createWriteStream(outputFile, { flags: 'a' })
  : process.stdout;

module.exports = {
  action: options.action,
  shift: options.shift,
  inputSrc,
  outputSrc,
};
