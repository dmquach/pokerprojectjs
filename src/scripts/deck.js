function Deck () {
    this.cardDeck = {
        '2c': 'deck', '3c': 'deck', '4c': 'deck', '5c': 'deck', '6c': 'deck', '7c': 'deck', '8c': 'deck', '9c': 'deck', '10c': 'deck', 'Jc': 'deck', 'Qc': 'deck', 'Kc': 'deck', 'Ac': 'deck',
        '2d': 'deck', '3d': 'deck', '4d': 'deck', '5d': 'deck', '6d': 'deck', '7d': 'deck', '8d': 'deck', '9d': 'deck', '10d': 'deck', 'Jd': 'deck', 'Qd': 'deck', 'Kd': 'deck', 'Ad': 'deck',
        '2s': 'deck', '3s': 'deck', '4s': 'deck', '5s': 'deck', '6s': 'deck', '7s': 'deck', '8s': 'deck', '9s': 'deck', '10s': 'deck', 'Js': 'deck', 'Qs': 'deck', 'Ks': 'deck', 'As': 'deck',
        '2h': 'deck', '3h': 'deck', '4h': 'deck', '5h': 'deck', '6h': 'deck', '7h': 'deck', '8h': 'deck', '9h': 'deck', '10h': 'deck', 'Jh': 'deck', 'Qh': 'deck', 'Kh': 'deck', 'Ah': 'deck'
    }
    this.boardPos = {
        'p1-1': '', 'p1-2': '', 'p1-3': '', 'p1-4': '',
        'p2-1': '', 'p2-2': '', 'p2-3': '', 'p2-4': '',
        'p3-1': '', 'p3-2': '', 'p3-3': '', 'p3-4': '',
        'p4-1': '', 'p4-2': '', 'p4-3': '', 'p4-4': '',
        'p5-1': '', 'p5-2': '', 'p5-3': '', 'p5-4': '',
        'p6-1': '', 'p6-2': '', 'p6-3': '', 'p6-4': '',
        'board1': 'open', 'board2': 'open', 'board3': 'open', 'board4': 'open', 'board5': 'open',
        'highlight': ''
    }
    this.numPlayers = 2
    this.addClickCards()
    this.addClickBoard
}

Deck.prototype.addClickCards = function () {
    for (let key in this.cardDeck) {
        const card = document.getElementById(key);
        card.addEventListener("click", () => {
            // if in deck and no next part highlighted
            if (this.cardDeck[card.id] === "deck") {
                this.addToBoard(card.id)
            } else {
                this.returnToDeck(card.id)
            }
        })
    }
}

Game.prototype.addClickBoard = function () {
    for (let pos in this.boardPos) {
        const newPos = document.getElementById(pos);
        newPos.addEventListener("click", () => {
            if (this.boardPos[newPos.id] === '') {
                this.boardPos['highlight'] = newPos.id
            } else {
                this.removeFromBoard(newPos.id)
            }
        })

    }
}

Deck.prototype.addToBoard = function (cardKey) {
    // add card to board
    if (this.boardPos['highlight'] === '') {
        
    }
}

Deck.prototype.removeFromBoard = function (boardKey) {

}

Deck.prototype.returnToDeck = function (key) {

}
