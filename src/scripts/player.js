function Player(active, playerNum, deck) {
    this.playerHand = []
    this.playerNum = playerNum
    this.active = active
}

Player.prototype.activate = function () {
    this.active = true
}

Player.prototype.setDeck = function (deck) {
    this.deck = deck
    this.addPlayerButton()
}


// Player.prototype.addPlayer

Player.prototype.addPlayerButton = function () {
    const player = document.getElementById(this.playerNum)
    player.addEventListener("click", () => {
        if (!this.active) {
            this.activate()
            this.deck.board._addPlayers(this.playerNum)
        }
    })
}

// CREATE EVENT LISTENER WHICH IN TURN REMOVES EVENT LISTENER

// Deck.prototype.addClickCards = function () {
//     for (let key in this.cardDeck) {
//         const card = document.getElementById(key);
//         card.addEventListener("click", () => {
//             // if in deck and no next part highlighted
//             if (this.cardDeck[card.id] === "deck") {
//                 const player = this.board._getHighlightedPos()
//                 if (player !== -1) this[player].addToHand(card.id)
//                 this.board.addToBoard(card.id)
//                 // add this.playerH
//             }
//         })
//     }
// }

Player.prototype.removePlayerButton = function () {

}

Player.prototype.addToHand = function (card) {
    this.playerHand.push(card)
}

export { Player }
