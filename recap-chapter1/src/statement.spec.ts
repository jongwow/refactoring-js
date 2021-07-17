import assert from 'assert';
import statement from './statement';

describe('refactoring recap chapter 1', () => {
    it('statement', () => {
        // Arrange
        const invoices = require('./invoices.json');
        const plays = require('./play.json');
        const expected = `청구 내역 (고객명: BigCo)\n`
            +`Hamlet: $650.00 (55 석)\n`
            +`As You Like It: $580.00 (35 석)\n`
            +`Othello: $500.00 (40 석)\n`
            +`총액 $1,730.00\n`
            +`적립 포인트: 47점\n`;

        // Act
        const output = statement(invoices[0], plays);

        // Assert
        assert.strictEqual(output, expected);
    })
})