export function isFlush(fiveCards) {
    const suit = fiveCards[0].slice(-1)
    for (let i = 0; i < 5; i++) {
        if (fiveCards[i].slice(-1) !== suit) {
            return false
        }
    }
    const sortedHand = this.sortHand(fiveCards)
    return [true, sortedHand]
}

export function isStraight(fiveCards) {
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


export function isFourOfAKind(fiveCards) {
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
