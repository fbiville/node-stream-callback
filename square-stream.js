const {Transform} = require('stream');

module.exports = class SquareStream extends Transform {

    constructor(opts) {
        super(opts);
        this.on('error', () => {
            this.end();
        });
    }

    _transform(data, _, callback) {
        if (typeof data !== 'number') {
            callback(new Error(`NaNNaNNaNNaNNaN: ${data} is not a number!`));
            return;
        }
        callback(null, data ** 2);
    }
};
