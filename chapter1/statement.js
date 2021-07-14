function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);;
  return renderPlainText(statementData, plays);
}

function enrichPerformance(aPerformance){
  // 가변 데이터는 금방 상하기 때문에 데이터는 최대한 불변처럼 취급한다.
  const result = Object.assign({}, aPerformance);
  result.play = playFor(result);
  return result;
}

function playFor(aPerformance){
  return plays[aPerformance.playID];
}

function renderPlainText(data, plays){
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances){
    // 청구 내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} 석)\n`;
  }

  result += `총액 ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()} 점`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let perf of data.performances){
      result += amountFor(perf);
    }
    return result;
  }

  function usd(aNumber){
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD", minimumFactionDigits: 2
    }).format(aNumber/100);
  }

  function totalVolumeCredits(){
    let result = 0;
    for(let perf of data.performances){
      result += volumeCreditsFor(perf);
    }
    return result;
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
}

const invoices = require('./invoices.json');
const plays = require('./plays.json');

exports.statement = statement; 
