import { Handtype } from "./handType.js"

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
