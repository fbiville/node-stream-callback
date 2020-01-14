const {Transform} = require('stream');

module.exports = class SquareStream extends Transform {

    constructor(opts) {
        super({ ...opts, autoDestroy: true });
    }

    _transform(data, _, callback) {
        if (typeof data !== 'number') {
            callback(new Error(`NaNNaNNaNNaNNaN: ${data} is not a number!`));
            return;
        }
        callback(null, data ** 2);
    }
};
