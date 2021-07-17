import { EnrichPerformance, Invoice, Play, Plays, StatementData, Performance } from "./types";


export default function createStatementData(invoice:Invoice, plays:Plays): StatementData{
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
      let assign1: EnrichPerformance = Object.assign(aPerformance, {
        play: playFor(aPerformance),
        amount: 0,
        volumeCredits: 0,
      });
      assign1.amount = amountFor(assign1);
      assign1.volumeCredits = volumeCreditFor(assign1);
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
  
    function volumeCreditFor(aPerformance: EnrichPerformance) {
      let result = Math.max(aPerformance.audience - 30, 0);
      if ("comedy" === aPerformance.play.type) {
        result += Math.floor(aPerformance.audience / 5);
      }
      return result;
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