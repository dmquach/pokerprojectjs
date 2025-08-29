import { NUM_VAL } from "./handConsts.js"
import { isFlush, isStraight, isFourOfAKind, isFullHouse, isThreeOfAKind, isTwoPair, isOnePair, isNoPair, broadway } from "./handVal.js"
import { sortHand, getPokerHand, bestHand, comparingKicker } from "./evalHand.js"

function Handtype(p1, p2, p3, p4, p5, p6, deck) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.p4 = p4
    this.p5 = p5
    this.p6 = p6
    this.deck = deck
}



Handtype.prototype.isFlush = isFlush
Handtype.prototype.isStraight = isStraight
Handtype.prototype.isFourOfAKind = isFourOfAKind
Handtype.prototype.isFullHouse = isFullHouse
Handtype.prototype.isThreeOfAKind = isThreeOfAKind
Handtype.prototype.isTwoPair = isTwoPair
Handtype.prototype.isOnePair = isOnePair
Handtype.prototype.isNoPair = isNoPair
Handtype.prototype.broadway = broadway

Handtype.prototype.sortHand = sortHand
Handtype.prototype.getPokerHand = getPokerHand
Handtype.prototype.bestHand = bestHand
Handtype.prototype.comparingKicker = comparingKicker


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

Handtype.prototype.activeHands = function () {
    const active = {}
    for (let i = 1; i < 6; i++) {
        if (this[`p${i}`].active) {
            active[`p${i}`] = [0, [this[`p${i}`].playerHand]]
        }
    }
    return active
}

Handtype.prototype.equities = function (board) {
    // p1: [0, [hand]]
    
    const hands = this.activeHands()
    const deck = this.deck.inDeck()
    let totalOutcomes = 0
    let chops = 0
    if (board.length === 0) {
        console.log("no cards on board")
        return this.equitiesPreFlop(board, hands, deck, totalOutcomes, chops)
    } else if (board.length === 1) {
        console.log("finish flop")
    } else if (board.length === 2) {
        console.log("finish flop")
    } else if (board.length === 3) {
        console.log("three cards on board")
        return this.equitiesTwoMoreCards(board, hands, deck, totalOutcomes, chops, 0)
    } else if (board.length === 4) {
        console.log("four cards on board")
        return this.equitiesOneMoreCard(board, hands, deck, totalOutcomes, chops, 0)
    }
    return -1
}

Handtype.prototype.equitiesOneMoreCard = function (board, hands, deck, totalOutcomes, chops, initial) {
    // totalOutcomes++
    // h++
    //FIX: maybe add a player 7 for chops
    //Fix chops, make it not add up to 100%
    for (let m = initial; m < deck.length; m++) {
        // count += 1
        const bestHands = {}
        //FIX: Can probably check for active players and pass in as argument
        for (let i = 1; i < 7; i++) {
            if (this.deck[`p${i}`].handFull()) {
                bestHands[`p${i}`] = (this.bestHand(this.deck[`p${i}`].playerHand, board.concat(deck[m])))
            }
        }
        const winner = this.winner(bestHands)
        const players = Object.keys(winner)
        if (players.length > 1) {
            chops++
        } else {
            hands[players[0]][0] += 1
        }
        // if (winner) this.highlightWinner(winner)
        totalOutcomes += 1
    }
    return [hands, totalOutcomes]
}

Handtype.prototype.equitiesTwoMoreCards = function (board, hands, deck, totalOutcomes, chops, initial) {
    // evaluate every combo of two hands
    for (let m = initial; m < deck.length; m++) {
        for (let n = m + 1; n < deck.length; n++) {

            const bestHands = {}

            // evaluate each player’s best hand with the board + 2 new cards
            for (let i = 1; i < 7; i++) {
                if (this.deck[`p${i}`].handFull()) {
                    bestHands[`p${i}`] = this.bestHand(
                        this.deck[`p${i}`].playerHand,
                        board.concat([deck[m], deck[n]])
                    )
                }
            }

            // figure out winner(s)
            const winner = this.winner(bestHands)
            const players = Object.keys(winner)

            if (players.length > 1) {
                chops++
            } else {
                hands[players[0]][0] += 1
            }

            totalOutcomes += 1
        }
    }

    return [hands, totalOutcomes]

}

Handtype.prototype.equitiesPreFlop = function (board, hands, deck, totalOutcomes, chops) {
    const trials = 2500

    for (let t = 0; t < trials; t++) {
        const boardCards = this.deck.dealCards(deck, 5);
        const bestHands = {};

        for (let i = 1; i < 7; i++) {
            if (this.deck[`p${i}`].handFull()) {
                bestHands[`p${i}`] = this.bestHand(this.deck[`p${i}`].playerHand, boardCards);
            }
        }

        const winner = this.winner(bestHands);
        const players = Object.keys(winner);

        if (players.length > 1) {
            chops++;
        } else {
            hands[players[0]][0] += 1;
        }

        totalOutcomes++;
    }

    return [hands, totalOutcomes]
}



export { Handtype }
