import {
  EnrichPerformance,
  Invoice,
  Play,
  Plays,
  StatementData,
  Performance,
} from "./types";

export default function createStatementData(
  invoice: Invoice,
  plays: Plays
): StatementData {
  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    plays: plays,
    totalAmount: 0,
    totalVolumeCredits: 0,
  };
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance: Performance): EnrichPerformance {
    const calculator = new PerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    let assign1: EnrichPerformance = Object.assign(aPerformance, {
      play: calculator.play,
      amount: calculator.amount,
      volumeCredits: calculator.volumeCredits,
    });
    return assign1;
  }

  function totalVolumeCredits(data: StatementData): number {
    return data.performances.reduce(
      (total, perf) => total + perf.volumeCredits,
      0
    );
  }

  function totalAmount(data: StatementData): number {
    return data.performances.reduce((total, perf) => total + perf.amount, 0);
  }

  function playFor(aPerformance: Performance): Play {
    return plays[aPerformance.playID];
  }
}

class PerformanceCalculator {
  performance: Performance;
  play: Play;
  constructor(performance: Performance, play: Play) {
    this.performance = performance;
    this.play = play;
  }
  get amount(): number {
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`known genre: ${this.play.type}`);
    }
    return result;
  }
  get volumeCredits() {
    let result = Math.max(this.performance.audience - 30, 0);
    if ("comedy" === this.play.type) {
      result += Math.floor(this.performance.audience / 5);
    }
    return result;
  }
}
