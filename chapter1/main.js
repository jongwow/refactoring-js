function usd(aNumber){
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFactionDigits: 2
  }).format(aNumber/100);
}

function volumeCreditsFor(aPerformance) {
  let result = 0;
  // 포인트를 적립한다.
  result += Math.max(aPerformance.audience - 30, 0);

  // 희극 관객 5명마다 추가 포인트를 제공한다.
  if ("comedy" === playFor(aPerformance).type){
    result += Math.floor(aPerformance.audience / 5);
  }
  return result;
}


function playFor(aPerformance){
  return plays[aPerformance.playID];
}

function amountFor(aPerformance){
  let result = 0;
  switch(playFor(aPerformance).type){
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
        throw new Error(`unknown genre: ${playFor(aPerformance).type}`);
  }
  return result;
}

function statement(invoice, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances){
    volumeCredits += volumeCreditsFor(perf);
    
    // 청구 내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} 석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액 ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits} 점`;
  return result;
}

const invoices = require('./invoices.json');
const plays = require('./plays.json');

console.log(statement(invoices[0], plays));
