function isFlush(cards) {
    const suit = cards[0].slice(-1)
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].slice(-1) !== suit) {
            return false
        }
    }
    return true
}


function isStraight(cards) {
    let sortedRanks = []
    cards.sort()
    for (let i = 0; i < cards.length; i++) {
        sortedRanks.push(cards[i][0])
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

function isFourOfAKind(cards) {
    let count = 0;
    let pair = cards[0][0]
    cards.sort()
    if (cards[0][0] !== cards[1][0]) {
        pair = cards[1][0]
    }
    for (let i = 0; i < cards.length; i++) {
        if (cards[i][0] == pair) {
            count += 1;
        }
    }
    return count === 4
}

function isFullHouse(cards) {
    cards.sort()
    if (cards[0][0] === cards[1][0] && cards[1][0] === cards[2][0] && cards[3][0] === cards[4][0]) {
        return true
    }
    if (cards[0][0] === cards[1][0] && cards[2][0] === cards[3][0] && cards[3][0] === cards[4][0]) {
        return true
    }
    return false
}

function isThreeOfAKind(cards){
    let pair = cards[0][0]
    cards.sort()
    if (cards[0][0] === cards[1][0] && cards[1][0] == cards[2][0]) {
        return true
    } else if (cards[1][0] === cards[2][0] && cards[2][0] == cards[3][0]) {
        return true
    } else if (cards[2][0] === cards[3][0] && cards[3][0] == cards[4][0]) {
        return true
    } else {
        return false
    }
}

function isTwoPair(cards) {
    cards.sort()
    if (cards[0][0] === cards[1][0] && cards[2][0] === cards[3][0]) {
        return true
    } else if (cards[0][0] === cards[1][0] && cards[3][0] === cards[4][0]) {
        return true
    } else if (cards[1][0] === cards[2][0] && cards[3][0] === cards[4][0]) {
        return true
    } else {
        return false
    }
}

function isOnePair(cards) {
    cards.sort()
    if (cards[0][0] === cards[1][0]) {
        return true
    } else if (cards[1][0] === cards[2][0]) {
        return true
    } else if (cards[2][0] === cards[3][0]) {
        return true
    } else if (cards[3][0] === cards[4][0]) {
        return true
    } else {
        return false
    }
}

function isNoPair(cards) {
    cards.sort()
    if (cards[0][0] === cards[1][0]) {
        return false
    } else if (cards[1][0] === cards[2][0]) {
        return false
    } else if (cards[2][0] === cards[3][0]) {
        return false
    } else if (cards[3][0] === cards[4][0]) {
        return false
    } else {
        return true
    }
}

function getPokerHand(cards) {
    if (isFlush(cards) && isStraight(cards)) {
        return "Straight Flush";
    }
    if (isStraight(cards)) {
        return "Straight";
    }
    if (isFlush(cards)) {
        return "Flush"
    }

    if (isFourOfAKind(cards)) {
        return "Four Of A Kind"
    }

    if (isFullHouse(cards)) {
        return "Full House"
    }

    if (isThreeOfAKind(cards)){
        return "Three Of A Kind"
    }

    if (isTwoPair(cards)) {
        return "Two Pair"
    }

    if (isOnePair(cards)) {
        return "One Pair"
    }

    if (isNoPair(cards)) {
        return "High Card"
    }
}

function bestHand(hand1, hand2, hand3, hand4, board1, board2, board3, board4, board5) {
    let handCombos = []
    let boardCombos = []
    for (let i = 1; i < 4; i++) {
        for (let j = i+1; j < 5; j++) {
            handCombos.push([i, j])
        }
    }

    return arr
}

function winner(p1, p2) {
    
}

console.log(bestHand())
