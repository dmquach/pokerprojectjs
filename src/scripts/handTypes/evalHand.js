import { NUM_VAL } from "./handConsts.js"

export function sortHand(hand) {
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

export function getPokerHand(fiveCards) {
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


export function bestHand(hand, board) {
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

export function comparingKickers(hand1, hand2) {
    // separate case for straight A-5
    // when comparing 5 high vs 6 high kicker, 5 high starts with A and 6 high starts with 6
    if (hand1[0][0] === 'A' || hand2[0][0] === 'A') {
        if (hand1[0][0] === 'A' && hand2[0][0] === 'A') {
            return 0
        } else if (hand1[0][0] === 'A') {
            // hand1 is 5 high straight so hand2 must be higher
            return [2, hand2]
        } else {
            return [1, hand1]
        }
    }

    for (let i = 0; i < 5; i++) {
        if (NUM_VAL[hand1[i][0]] > NUM_VAL[hand2[i][0]]) {
            return [1, hand1]
        } else if (NUM_VAL[hand1[i][0]] < NUM_VAL[hand2[i][0]]) {
            return [2, hand2]
        }
    }
    return 0
}
