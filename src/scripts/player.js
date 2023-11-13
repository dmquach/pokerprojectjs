function Player(active, playerNum, deck) {
    this.playerHand = []
    this.playerNum = playerNum
    this.active = active
}

Player.prototype.setDeck = function (deck) {
    this.deck = deck
    this.addPlayerButton()
}

Player.prototype.activate = function () {
    this.active = !this.active
}

Player.prototype.addPlayerButton = function () {
    const player = document.getElementById(this.playerNum)
    player.addEventListener("click", () => {
        if (!this.active) {
            this.activate()
            this.deck.board._addPlayers(this.playerNum)
            this.deck.board._createNewPlayerBorder
        } else {
            // FIX: Add different icon buttons when changed
            this.activate()
            this.deck.board._removePlayers(this.playerNum)
        }
    })
}

Player.prototype.addToHand = function (card) {
    this.playerHand.push(card)
}

export { Player }
