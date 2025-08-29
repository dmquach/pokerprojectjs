import { NUM_VAL } from "./handConsts.js"
import { isFlush } from "./handVal.js"

function Handtype(p1, p2, p3, p4, p5, p6, deck) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.p4 = p4
    this.p5 = p5
    this.p6 = p6
    this.deck = deck
}

Handtype.prototype.sortHand = function (hand) {
    hand.sort((cardA, cardB) => {
         const valueA = NUM_VAL[cardA.slice(0, -1)];
         const valueB = NUM_VAL[cardB.slice(0, -1)];

         return valueB - valueA; // Sort in descending order based on card values
     });
    const cards = {}
    const newHand = []
    hand.forEach(item => {
        cards[item[0]] = (cards[item[0]] || 0) + 1
    })

    hand.forEach(item => {
        if (cards[item[0]] >= 3) {
            newHand.push(item)
        }
    })
    hand.forEach(item => {
        if (cards[item[0]] === 2) {
            newHand.push(item)
        }
    })
    hand.forEach(item => {
        if (!(newHand.includes(item))) newHand.push(item)
    })

    return newHand
}

Handtype.prototype.isFlush = isFlush


// Handtype.prototype.isFlush = function (fiveCards) {
//     const suit = fiveCards[0].slice(-1)
//     for (let i = 0; i < 5; i++) {
//         if (fiveCards[i].slice(-1) !== suit) {
//             return false
//         }
//     }
//     const sortedHand = this.sortHand(fiveCards)
//     return [true, sortedHand]
// }


Handtype.prototype.isStraight = function (fiveCards) {
    let sortedRanks = []
    const sortedHand = this.sortHand(fiveCards)
    for (let i = 0; i < 5; i++) {
        sortedRanks.push(sortedHand[i][0])
    }

    if (JSON.stringify(sortedRanks) == JSON.stringify(["A", "5", "4", "3", "2"])) {
        return [true, sortedHand]
    }

    if (
    JSON.stringify(sortedRanks) == JSON.stringify(["6", "5", "4", "3", "2"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["7","6","5","4","3"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["8","7","6","5","4"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["9","8","7","6","5"]) ||
    // 1 is equivalent to 10
    JSON.stringify(sortedRanks) == JSON.stringify(["1","9","8","7","6"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["J","1","9","8","7"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["Q","J","1","9","8"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["K","Q","J","1","9"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["A","K", "Q","J","1",])
    ) {
        return [true, sortedHand]
    } else {
        return false
    }
}

Handtype.prototype.isFourOfAKind = function (fiveCards) {
    let count = 0;
    const sortedHand = this.sortHand(fiveCards)
    let pair = sortedHand[0][0]

    if (sortedHand[0][0] !== sortedHand[1][0]) {
        pair = sortedHand[1][0]
    }
    for (let i = 0; i < sortedHand.length; i++) {
        if (sortedHand[i][0] == pair) {
            count += 1;
        }
    }
    if (count === 4) {
        return [true, sortedHand]
    }
    return false
}

Handtype.prototype.isFullHouse = function (fiveCards) {
    const sortedHand = this.sortHand(fiveCards)
    if (sortedHand[0][0] === sortedHand[1][0] && sortedHand[1][0] === sortedHand[2][0] && sortedHand[3][0] === sortedHand[4][0]) {
        return [true, sortedHand]
    }
    if (sortedHand[0][0] === sortedHand[1][0] && sortedHand[2][0] === sortedHand[3][0] && sortedHand[3][0] === sortedHand[4][0]) {
        return [true, sortedHand]
    }
    return false
}

Handtype.prototype.isThreeOfAKind = function (fiveCards) {
    const sortedHand = this.sortHand(fiveCards)
    if (sortedHand[0][0] === sortedHand[1][0] && sortedHand[1][0] == sortedHand[2][0]) {
        return [true, sortedHand]
    } else if (sortedHand[1][0] === sortedHand[2][0] && sortedHand[2][0] == sortedHand[3][0]) {
        return [true, sortedHand]
    } else if (sortedHand[2][0] === sortedHand[3][0] && sortedHand[3][0] == sortedHand[4][0]) {
        return [true, sortedHand]
    } else {
        return false
    }
}

Handtype.prototype.isTwoPair = function (fiveCards) {
    const sortedHand = this.sortHand(fiveCards)
    if (sortedHand[0][0] === sortedHand[1][0] && sortedHand[2][0] === sortedHand[3][0]) {
        return [true, sortedHand]
    } else if (sortedHand[0][0] === sortedHand[1][0] && sortedHand[3][0] === sortedHand[4][0]) {
        return [true, sortedHand]
    } else if (sortedHand[1][0] === sortedHand[2][0] && sortedHand[3][0] === sortedHand[4][0]) {
        return [true, sortedHand]
    } else {
        return false
    }
}

Handtype.prototype.isOnePair = function (fiveCards) {
    const sortedHand = this.sortHand(fiveCards)
    if (sortedHand[0][0] === sortedHand[1][0]) {
        return [true, sortedHand]
    } else if (sortedHand[1][0] === sortedHand[2][0]) {
        return [true, sortedHand]
    } else if (sortedHand[2][0] === sortedHand[3][0]) {
        return [true, sortedHand]
    } else if (sortedHand[3][0] === sortedHand[4][0]) {
        return [true, sortedHand]
    } else {
        return false
    }
}

Handtype.prototype.isNoPair = function (fiveCards) {
    const sortedHand = this.sortHand(fiveCards)
    if (sortedHand[0][0] === sortedHand[1][0]) {
        return false
    } else if (sortedHand[1][0] === sortedHand[2][0]) {
        return false
    } else if (sortedHand[2][0] === sortedHand[3][0]) {
        return false
    } else if (sortedHand[3][0] === sortedHand[4][0]) {
        return false
    } else {
        return [true, sortedHand]
    }
}

Handtype.prototype.broadway = function (fiveCards) {
    fiveCards.sort()
    if (fiveCards[0].slice(0, 2) !== '10') return false
    if (fiveCards[1].slice(0, 1) !== 'A') return false
    if (fiveCards[2].slice(0, 1) !== 'J') return false
    if (fiveCards[3].slice(0, 1) !== 'K') return false
    if (fiveCards[4].slice(0, 1) !== 'Q') return false
    return true
}

Handtype.prototype.getPokerHand = function (fiveCards) {
    const flush = this.isFlush(fiveCards)
    const straight = this.isStraight(fiveCards)
    if (flush[0] && straight[0]) {
        if (this.broadway(fiveCards)) {
            return [10, this.sortHand(fiveCards)];
        } else {
            return [9, this.sortHand(fiveCards)];
        }
    }
    const isFourOfAKind = this.isFourOfAKind(fiveCards)
    if (isFourOfAKind[0]) {
        return [8, isFourOfAKind[1]]
    }
    const isFullHouse = this.isFullHouse(fiveCards)
    if (isFullHouse[0]) {
        return [7, isFullHouse[1]]
    }
    const isFlush = this.isFlush(fiveCards);
    if (isFlush[0]) {
        return [6, isFlush[1]];
    }
    const isStraight = this.isStraight(fiveCards);
    if (isStraight[0]) {
        return [5, isStraight[1]];
    }
    const isThreeOfAKind = this.isThreeOfAKind(fiveCards);
    if (isThreeOfAKind[0]) {
        return [4, isThreeOfAKind[1]];
    }
    const isTwoPair = this.isTwoPair(fiveCards);
    if (isTwoPair[0]) {
        return [3, isTwoPair[1]];
    }
    const isOnePair = this.isOnePair(fiveCards);
    if (isOnePair[0]) {
        return [2, isOnePair[1]];
    }

    const isNoPair = this.isNoPair(fiveCards);
    if (isNoPair[0]) {
        return [1, isNoPair[1]];
    }
}

Handtype.prototype.bestHand = function (hand, board) {
    // console.log("bestHand board", board)
    const twoCardCombos = []
    const threeCardCombos = []

    for (let i = 0; i < hand.length - 1; i++) {
        for (let j = i+1; j < hand.length; j++) {
            twoCardCombos.push([hand[i], hand[j]])
        }
    }
    for (let i = 0; i < board.length - 2; i++) {
        for (let j = i + 1; j < board.length - 1; j++) {
          for (let k = j + 1; k < board.length; k++) {
            const combination = [board[i], board[j], board[k]];
            threeCardCombos.push(combination);
          }
        }
    }
    let top = [0];
    for (let i = 0; i < threeCardCombos.length; i++) {
        for (let j = 0; j < twoCardCombos.length; j++) {
            const newRank = this.getPokerHand([
                twoCardCombos[j][0],
                twoCardCombos[j][1],
                threeCardCombos[i][0],
                threeCardCombos[i][1],
                threeCardCombos[i][2]
            ])
            if (newRank[0] > top[0]) {
                top = newRank
            } else if (newRank[0] === top[0]) {
                const bestHand = this.comparingKickers(newRank[1], top[1])
                if (bestHand !== 0) {
                    top = [newRank[0], bestHand[1]]
                }
            }
        }
    }
    return top
}

Handtype.prototype.comparingKickers = function (hand1, hand2) {
    // FIX TWO PAIR,
    // console.log("test", hand1, hand2)
    for (let i = 0; i < 5; i++) {
        if (NUM_VAL[hand1[i][0]] > NUM_VAL[hand2[i][0]]) {
            return [1, hand1]
        } else if (NUM_VAL[hand1[i][0]] < NUM_VAL[hand2[i][0]]) {
            return [2, hand2]
        }
    }
    return 0
}

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
            // console.log(bestHandsHash, currWinner)
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
    // const str = JSON.stringify(winner); // (Optional) beautiful indented output.
    // console.log(str);
    // console.log(winner)
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

    //TODO: Fix equities to be called after flop and if players are ready

    const hands = this.activeHands()
    const deck = this.deck.inDeck()
    let totalOutcomes = 0
    let chops = 0
    console.log(board)
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
    // console.log("1", totalOutcomes)
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
    // console.log("2", totalOutcomes, h)
    console.log([hands, totalOutcomes])
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
    console.log([hands, totalOutcomes, chops])
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
