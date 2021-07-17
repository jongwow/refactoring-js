import { Invoice, Plays, Play, Performance } from "./types";

export default function statement(invoice: Invoice , plays:Plays ){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD", minimumFractionDigits: 2
    }).format;
  
    for (let perf of invoice.performances){
      volumeCredits += volumeCreditFor(perf);
      
      result += `${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} 석)\n`;
      totalAmount += amountFor(perf);
    }
    result += `총액 ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;

    function amountFor(aPerformance: Performance): number{
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
          throw new Error(`known genre: ${playFor(aPerformance).type}`);
      }
      return result;
    }
    
    function playFor(aPerformance: Performance): Play{
      return plays[aPerformance.playID];
    }

    function volumeCreditFor(aPerformance: Performance){
      let result = Math.max(aPerformance.audience - 30, 0);
      if ("comedy" === playFor(aPerformance).type){
        result += Math.floor(aPerformance.audience / 5);
      }
      return result;
    }
  }