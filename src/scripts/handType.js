function Handtype() {

}

Handtype.prototype.isFlush = function (fiveCards) {
    const suit = fiveCards[0].slice(-1)
    for (let i = 0; i < 5; i++) {
        if (fiveCards[i].slice(-1) !== suit) {
            return false
        }
    }
    return true
}


Handtype.prototype.isStraight = function (fiveCards) {
    let sortedRanks = []
    fiveCards.sort()
    for (let i = 0; i < 5; i++) {
        sortedRanks.push(fiveCards[i][0])
    }

    if (JSON.stringify(sortedRanks) == JSON.stringify(["2", "3", "4", "5", "A"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["2", "3", "4", "5", "6"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["3","4","5","6","7"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["4","5","6","7","8"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["5","6","7","8","9"]) ||
    // 1 is equivalent to 10
    JSON.stringify(sortedRanks) == JSON.stringify(["1","6","7","8","9"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["1","7","8","9","J"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["1","8","9","J","Q"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["1","9","J","K","Q"]) ||
    JSON.stringify(sortedRanks) == JSON.stringify(["1","A", "J","K","Q",])) {
        return true
    } else {
        return false
    }
}

Handtype.prototype.isFourOfAKind = function (fiveCards) {
    let count = 0;
    let pair = fiveCards[0][0]
    fiveCards.sort()
    if (fiveCards[0][0] !== fiveCards[1][0]) {
        pair = fiveCards[1][0]
    }
    for (let i = 0; i < fiveCards.length; i++) {
        if (fiveCards[i][0] == pair) {
            count += 1;
        }
    }
    return count === 4
}

Handtype.prototype.isFullHouse = function (fiveCards) {
    fiveCards.sort()
    if (fiveCards[0][0] === fiveCards[1][0] && fiveCards[1][0] === fiveCards[2][0] && fiveCards[3][0] === fiveCards[4][0]) {
        return true
    }
    if (fiveCards[0][0] === fiveCards[1][0] && fiveCards[2][0] === fiveCards[3][0] && fiveCards[3][0] === fiveCards[4][0]) {
        return true
    }
    return false
}

Handtype.prototype.isThreeOfAKind = function (fiveCards) {
    fiveCards.sort()
    if (fiveCards[0][0] === fiveCards[1][0] && fiveCards[1][0] == fiveCards[2][0]) {
        return true
    } else if (fiveCards[1][0] === fiveCards[2][0] && fiveCards[2][0] == fiveCards[3][0]) {
        return true
    } else if (fiveCards[2][0] === fiveCards[3][0] && fiveCards[3][0] == fiveCards[4][0]) {
        return true
    } else {
        return false
    }
}

Handtype.prototype.isTwoPair = function (fiveCards) {
    fiveCards.sort()
    if (fiveCards[0][0] === fiveCards[1][0] && fiveCards[2][0] === fiveCards[3][0]) {
        return true
    } else if (fiveCards[0][0] === fiveCards[1][0] && fiveCards[3][0] === fiveCards[4][0]) {
        return true
    } else if (fiveCards[1][0] === fiveCards[2][0] && fiveCards[3][0] === fiveCards[4][0]) {
        return true
    } else {
        return false
    }
}

Handtype.prototype.isOnePair = function (fiveCards) {
    fiveCards.sort()
    if (fiveCards[0][0] === fiveCards[1][0]) {
        return true
    } else if (fiveCards[1][0] === fiveCards[2][0]) {
        return true
    } else if (fiveCards[2][0] === fiveCards[3][0]) {
        return true
    } else if (fiveCards[3][0] === fiveCards[4][0]) {
        return true
    } else {
        return false
    }
}

Handtype.prototype.isNoPair = function (fiveCards) {
    fiveCards.sort()
    if (fiveCards[0][0] === fiveCards[1][0]) {
        return false
    } else if (fiveCards[1][0] === fiveCards[2][0]) {
        return false
    } else if (fiveCards[2][0] === fiveCards[3][0]) {
        return false
    } else if (fiveCards[3][0] === fiveCards[4][0]) {
        return false
    } else {
        return true
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

const KEY = {
    1: "No Pair",
    2: "One Pair",
    3: "Two Pair",
    4: "Three of a Kind",
    5: "Straight",
    6: "Flush",
    7: "Full House!",
    8: "Four of a Kind!!",
    9: "Straight Flush!!!",
    10: "ROYAL FLUSH!!!"
}

Handtype.prototype.getPokerHand = function (fiveCards) {
    if (this.isFlush(fiveCards) && this.isStraight(fiveCards)) {
        if (this.broadway(fiveCards)) {
            return 10
        } else {
            return 9;
        }
    } else if (this.isFourOfAKind(fiveCards)) {
        return 8
    } else if (this.isFullHouse(fiveCards)) {
        return 7
    } else if (this.isFlush(fiveCards)) {
        return 6
    } else if (this.isStraight(fiveCards)) {
        return 5;
    } else if (this.isThreeOfAKind(fiveCards)){
        return 4
    } else if (this.isTwoPair(fiveCards)) {
        return 3
    } else if (this.isOnePair(fiveCards)) {
        return 2
    } else if (this.isNoPair(fiveCards)) {
        return 1
    }
}

Handtype.prototype.bestHand = function (hand, board) {
    const twoCardCombos = []
    const threeCardCombos = []

    for (let i = 0; i < 3; i++) {
        for (let j = i+1; j < 4; j++) {
            twoCardCombos.push([hand[i], hand[j]])
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 4; j++) {
          for (let k = j + 1; k < 5; k++) {
            const combination = [board[i], board[j], board[k]];
            threeCardCombos.push(combination);
          }
        }
    }
    let top = 0;
    for (let i = 0; i < threeCardCombos.length; i++) {
        for (let j = 0; j < twoCardCombos.length; j++) {
            const newRank = this.getPokerHand([
                twoCardCombos[j][0],
                twoCardCombos[j][1],
                threeCardCombos[i][0],
                threeCardCombos[i][1],
                threeCardCombos[i][2]
            ])
            if (newRank > top) {
                top = newRank
            }
        }
    }
    console.log(top)
    return top
}

Handtype.prototype.winner = function (bestHandsHash) {
    // check if empty first
    console.log(bestHandsHash)
    // const p1type = bestHand(p1, board)
    // const p2type = bestHand(p2, board)

    // if (p1type < p2type) {
    //     return "p2"
    // } else {
    //     return "p1"
    // }
}

export { Handtype }
