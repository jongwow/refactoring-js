import {Invoice, Performance, Play, Plays, StatementData} from "./types";

export default function statement(invoice: Invoice, plays: Plays) {
  const statementData:StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    plays: plays,
  };
  return renderPlainText(statementData);

  function enrichPerformance(aPerformance: Performance) {
    return Object.assign({}, aPerformance);
  }
}

function renderPlainText(data: StatementData) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } 석)\n`;
  }

  result += `총액 ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function amountFor(aPerformance: Performance): number {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`known genre: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function playFor(aPerformance: Performance): Play {
    return data.plays[aPerformance.playID];
  }

  function volumeCreditFor(aPerformance: Performance) {
    let result = Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function usd(aNumber: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits(): number {
    let volumeCredits = 0;
    for (let perf of data.performances) {
      volumeCredits += volumeCreditFor(perf);
    }
    return volumeCredits;
  }

  function totalAmount(): number {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}
