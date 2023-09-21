// console.log("hhi")
var PokerEvaluator = require("poker-evaluator");

PokerEvaluator.evalHand(["As", "Ks", "Qs", "Js", "Ts", "3c", "5h"]);
//{ handType: 9,
//  handRank: 10,
//  value: 36874,
//  handName: 'straight flush' }

const a = PokerEvaluator.evalHand(["As", "Ac", "Ad", "8h", "8s"]);

//{ handType: 7,
//  handRank: 148,
//  value: 28820,
//  handName: 'full house' }

PokerEvaluator.evalHand(["As", "Ac", "Qs"]);
