function amountFor(aPerformance, play){
  let result = 0;
  switch(play.type){
    case "tragedy":
      result = 40000;
      if(aPerformance.audience > 30){
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
      case "comedy":
        result = 30000;
        if(aPerformance.audience > 20){
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown genre: ${play.type}`);
  }
  return result;
}

function statement(invoice, plays ){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFactionDigits: 2
  }).format;

  for (let perf of invoice.performances){
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type){
      volumeCredits += Math.floor(perf.audience / 5);
    }
    
    // 청구 내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} 석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액 ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits} 점`;
  return result;
}

const invoices = require('./invoices.json');
const plays = require('./plays.json');

console.log(statement(invoices[0], plays));
