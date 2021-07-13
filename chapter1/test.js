const {statement} = require('./statement');
const mock = require('./mock');
const invoices = mock.invoices;
const plays = mock.plays;
const assert = require('assert');

const expectedPlainText = `청구 내역 (고객명: BigCo)
 Hamlet: $650.00 (55 석)
 As You Like It: $580.00 (35 석)
 Othello: $500.00 (40 석)
총액 $1,730.00
적립 포인트: 47 점`;


describe('Chapter1', () => {
  describe('plainText', () => {
    it('should return formatted string', () => { 
    
      assert.equal(statement(invoices[0], plays), expectedPlainText); 
    });
  });
});
