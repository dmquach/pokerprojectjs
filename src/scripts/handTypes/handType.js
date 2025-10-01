import { isFlush, isStraight, isFourOfAKind, isFullHouse, isThreeOfAKind, isTwoPair, isOnePair, isNoPair, broadway } from "./handVal.js"
import { sortHand, getPokerHand, bestHand, comparingKickers } from "./evalHand.js"
import { activeHands } from "./handUtils.js"
import { equitiesPreFlop, equitiesTwoMoreCards, equitiesOneMoreCard } from "./equityCalcs.js"

function Handtype(p1, p2, p3, p4, p5, p6, deck) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.p4 = p4
    this.p5 = p5
    this.p6 = p6
    this.deck = deck
}


// eval hands
Handtype.prototype.isFlush = isFlush
Handtype.prototype.isStraight = isStraight
Handtype.prototype.isFourOfAKind = isFourOfAKind
Handtype.prototype.isFullHouse = isFullHouse
Handtype.prototype.isThreeOfAKind = isThreeOfAKind
Handtype.prototype.isTwoPair = isTwoPair
Handtype.prototype.isOnePair = isOnePair
Handtype.prototype.isNoPair = isNoPair
Handtype.prototype.broadway = broadway

// hand vals
Handtype.prototype.sortHand = sortHand
Handtype.prototype.getPokerHand = getPokerHand
Handtype.prototype.bestHand = bestHand
Handtype.prototype.comparingKickers = comparingKickers

// hand utils
Handtype.prototype.activeHands = activeHands

// equity calcs
Handtype.prototype.equitiesPreFlop = equitiesPreFlop
Handtype.prototype.equitiesTwoMoreCards = equitiesTwoMoreCards
Handtype.prototype.equitiesOneMoreCard = equitiesOneMoreCard


Handtype.prototype.winner = function (bestHandsHash) {
    // assumes best hand on board is known
    if (Object.keys(bestHandsHash).length === 0) return false
    let winner = {'empty': [0, []]}

    for (let player in bestHandsHash) {
        const currWinner = winner[Object.keys(winner)[0]]
        if (bestHandsHash[player][0] > currWinner[0]) {
            winner = {}
            winner[player] = bestHandsHash[player]
        } else if (bestHandsHash[player][0] === currWinner[0]) {
            const check = this.comparingKickers(bestHandsHash[player][1], currWinner[1])
            if (check === 0) {
                winner[player] = [bestHandsHash[player][0], bestHandsHash[player][1]]
            } else {
                if (check[0] === 1) {
                    winner = {}
                    winner[player] = bestHandsHash[player]
                }
            }
        }
    }

    return winner
}

// function showLoading() {
//   document.getElementById("loading-screen").style.display = "flex";
// }

// function hideLoading() {
//   document.getElementById("loading-screen").style.display = "none";
// }
//not async
Handtype.prototype.equities = async function (board) {
    // Show the loading spinner
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) loadingScreen.style.display = "flex";

    // Let the browser repaint so the spinner actually shows before heavy calc
    await new Promise(resolve => setTimeout(resolve, 200));

    const hands = this.activeHands();
    const deck = this.deck.inDeck();
    let totalOutcomes = 0;
    let chops = 0;
    let result = -1;
    if (board.length === 0) {
        console.log("no cards on board");
        result = this.equitiesPreFlop(hands, deck, totalOutcomes, chops);
    } else if (board.length === 1) {
        console.log("finish flop");
    } else if (board.length === 2) {
        console.log("finish flop");
    } else if (board.length === 3) {
        console.log("three cards on board");
        result = this.equitiesTwoMoreCards(board, hands, deck, totalOutcomes, chops, 0);
    } else if (board.length === 4) {
        console.log("four cards on board");
        result = this.equitiesOneMoreCard(board, hands, deck, totalOutcomes, chops, 0);
    }

    // Hide the spinner
    if (loadingScreen) loadingScreen.style.display = "none";

    return result;
}

export { Handtype }
