const FixedSource = require('../fixed-source');
const SquareStream = require('../square-stream');

describe('square stream =>', () => {

    let squareStream;

    beforeEach(() => {
        squareStream = new SquareStream({objectMode: true});
    });

    it('squares numbers', (done) => {
        const fixedSource = new FixedSource([1, 2], {objectMode: true});
        const expectedData = [1, 4];
        let index = 0;

        squareStream.on('data', (data) => {
            expect(data).toEqual(expectedData[index++]);
        });
        squareStream.on('finish', () => {
            expect(index).toEqual(
                expectedData.length,
                `${expectedData.length} element(s) to process, but was ${index}`
            );
            done();
        });

        fixedSource.pipe(squareStream);
    });

    it('rejects non-numbers', (done) => {
        const fixedSource = new FixedSource(["batman"], {objectMode: true});

        squareStream.on('data', () => {
            done(new Error("should not have received data"));
        });
        let errored = false;
        squareStream.prependListener('error', (err) => {
            expect(err.message).toEqual('NaNNaNNaNNaNNaN: batman is not a number!');
            errored = true;
        });
        squareStream.on('finish', () => {
            expect(errored).toBeTruthy('should have errored');
            done();
        });

        fixedSource.pipe(squareStream);
    });
});
