import { Board } from "./board/board.js"
import { Handtype } from "./handType.js"

function Deck (p1, p2, p3, p4, p5, p6) {
    this.cardDeck = {
        '2c': 'deck', '3c': 'deck', '4c': 'deck', '5c': 'deck', '6c': 'deck', '7c': 'deck', '8c': 'deck', '9c': 'deck', '10c': 'deck', 'Jc': 'deck', 'Qc': 'deck', 'Kc': 'deck', 'Ac': 'deck',
        '2d': 'deck', '3d': 'deck', '4d': 'deck', '5d': 'deck', '6d': 'deck', '7d': 'deck', '8d': 'deck', '9d': 'deck', '10d': 'deck', 'Jd': 'deck', 'Qd': 'deck', 'Kd': 'deck', 'Ad': 'deck',
        '2s': 'deck', '3s': 'deck', '4s': 'deck', '5s': 'deck', '6s': 'deck', '7s': 'deck', '8s': 'deck', '9s': 'deck', '10s': 'deck', 'Js': 'deck', 'Qs': 'deck', 'Ks': 'deck', 'As': 'deck',
        '2h': 'deck', '3h': 'deck', '4h': 'deck', '5h': 'deck', '6h': 'deck', '7h': 'deck', '8h': 'deck', '9h': 'deck', '10h': 'deck', 'Jh': 'deck', 'Qh': 'deck', 'Kh': 'deck', 'Ah': 'deck'
    }
    this.board = new Board(this)
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.p4 = p4
    this.p5 = p5
    this.p6 = p6

    this.addClickCards()
    this.handtype = new Handtype(this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this)
}

Deck.prototype.lastPlayerAdded = function (lastPlayer) {
    this.lastPlayer = lastPlayer
}


Deck.prototype.addClickCards = function () {
    for (let key in this.cardDeck) {
        const card = document.getElementById(key);
        card.addEventListener("click", () => {
            if (this.cardDeck[card.id] === "deck") {
                const player = this.board._getHighlightedPos()
                if (player !== -1) {
                    this[player].addToHand(card.id)
                    this.lastPlayer = player
                    this.board.addToBoard(card.id, Number(player[1]))
                } else {
                    this.board.addToBoard(card.id, -1)
                }
            } else {
                console.log("not in deck")
            }
        })
    }
}

Deck.prototype.inDeck = function () {
    const deck = []
    for (const key in this.cardDeck) {
        if (this.cardDeck[key] === 'deck') deck.push(key)
    }
    return deck
}

Deck.prototype.dealFiveCards = function () {
    const availableCards = Object.keys(cardDeck).filter(card => cardDeck[card] === "deck");
    console.log(availableCards)
}

export { Deck }
