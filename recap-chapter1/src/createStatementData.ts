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
    const calculator = createPerformanceCalculator(
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

function createPerformanceCalculator(
  performance: Performance,
  play: Play
): PerformanceCalculator {
  switch (play.type) {
    case "comedy":
      return new ComedyCalculator(performance, play);
    case "tragedy":
      return new TragedyCalculator(performance, play);
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
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
    throw new Error(`known genre: ${this.play.type}`);
  }

  //ES5에선 안돼서 ES6로 바꿈. https://github.com/microsoft/TypeScript/issues/338
  get volumeCredits(): number {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
