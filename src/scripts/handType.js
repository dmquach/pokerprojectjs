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
        console.log("returning true")
        return true
    }
    if (fiveCards[0][0] === fiveCards[1][0] && fiveCards[2][0] === cards[3][0] && fiveCards[3][0] === fiveCards[4][0]) {
        console.log("returning false")
        return true
    }
    return false
}

Handtype.prototype.isThreeOfAKind = function (fiveCards) {
    let pair = fiveCards[0][0]
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

Handtype.prototype.getPokerHand = function (fiveCards) {
    if (isFlush(fiveCards) && isStraight(fiveCards)) {
        return "8";
    }
    if (isStraight(fiveCards)) {
        return "4";
    }
    if (isFlush(fiveCards)) {
        return "5"
    }

    if (isFourOfAKind(fiveCards)) {
        return "7"
    }

    if (isFullHouse(fiveCards)) {
        return "6"
    }

    if (isThreeOfAKind(fiveCards)){
        return "3"
    }

    if (isTwoPair(fiveCards)) {
        return "2"
    }

    if (isOnePair(fiveCards)) {
        return "1"
    }

    if (isNoPair(fiveCards)) {
        return "0"
    }
}

Handtype.prototype.bestHand = function (hand, board) {
    let handCombos = []
    let boardCombos = []
    let nhand = hand

    for (let i = 1; i < 4; i++) {
        for (let j = i+1; j < 5; j++) {
            handCombos.push([i, j])
        }
    }
    for (let k = 0; k < board.length - 2; k++) {
        for (let l = k + 1; l < board.length - 1; l++) {
          for (let m = l + 1; m < board.length; m++) {
            const combination = [board[k], board[l], board[m]];
            boardCombos.push(combination);
          }
        }
    }
    let top = 0;
    for (let i = 0; i < boardCombos.length; i++) {
        for (let j = 0; j < handCombos.length - 1; j++) {
            const hand2 = getPokerHand([nhand[handCombos[j][0]], nhand[handCombos[j][0]], boardCombos[i][0], boardCombos[i][1], boardCombos[i][2]])
            if (hand2 > top) {
                top = hand2
            }
        }
    }
    return top
}

// export function winner(p1, p2, board) {
//     const p1type = bestHand(p1, board)
//     const p2type = bestHand(p2, board)

//     if (p1type < p2type) {
//         return "p2"
//     } else {
//         return "p1"
//     }
// }

// export function remainingDeck(hand1, hand2) {
//     const deck = [
//         "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc", "Kc", "Ac",
//         "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "Jd", "Qd", "Kd", "Ad",
//         "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh", "Qh", "Kh", "Ah",
//         "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks", "As"
//     ];
//     const newDeck = []
//     for (let i = 0; i < 44; i++) {
//         if (!hand1.includes(deck[i]) && !hand2.includes(deck[i])) {
//             newDeck.push(deck[i])
//         }
//     }
//     return newDeck
// }

export { Handtype }
