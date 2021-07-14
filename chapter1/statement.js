const {createStatementData} = require('./createStatementData');

function statement(invoice, plays) {
  const statementData = createStatementData(invoice, plays);
  return renderPlainText(statementData);
}

function usd(aNumber){
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFactionDigits: 2
  }).format(aNumber/100);
}

function renderPlainText(data){
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances){
    // 청구 내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} 석)\n`;
  }

  result += `총액 ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits} 점`;
  return result;
}


exports.statement = statement; 
