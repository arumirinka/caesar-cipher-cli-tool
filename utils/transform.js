const stream = require('stream');

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
    this.push('\n');
    callback();
  }
}

module.exports = CaesarTransform;
