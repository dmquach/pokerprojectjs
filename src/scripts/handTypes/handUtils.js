export function activeHands() {
    const active = {}
    for (let i = 1; i < 6; i++) {
        if (this[`p${i}`].active) {
            active[`p${i}`] = [0, [this[`p${i}`].playerHand]]
        }
    }
    return active
}
