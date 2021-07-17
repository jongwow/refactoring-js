import {EnrichPerformance, Invoice, Performance, Play, Plays, StatementData} from "./types";

export default function statement(invoice: Invoice, plays: Plays) {
  const statementData:StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    plays: plays,
  };
  return renderPlainText(statementData);

  function enrichPerformance(aPerformance: Performance): EnrichPerformance {
    let assign1:EnrichPerformance = Object.assign(aPerformance, {
      play: playFor(aPerformance),
      amount: 0,
    });
    return Object.assign(assign1, {
        amount: amountFor(assign1),
    });
  }

  function playFor(aPerformance: Performance): Play {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance: EnrichPerformance): number {
    let result = 0;
    switch (aPerformance.play.type) {
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
        throw new Error(`known genre: ${aPerformance.play.type}`);
    }
    return result;
  }
}

function renderPlainText(data: StatementData) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } 석)\n`;
  }

  result += `총액 ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function volumeCreditFor(aPerformance: EnrichPerformance) {
    let result = Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type) {
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
      result += perf.amount;
    }
    return result;
  }
}
