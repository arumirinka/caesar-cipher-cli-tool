const stream = require('stream');
const code = require('./code');

class CaesarTransform extends stream.Transform {
  constructor(action, shift) {
    super();
    this.action = action;
    this.shift = shift;
  }

  _transform(data, encoding, callback) {
    let result = '';

    if (this.action === 'encode' || this.action === 'decode') {
      result = code(data, this.shift, this.action);
    }

    this.push(result.concat('\n'));
    callback();
  }
}

module.exports = CaesarTransform;
