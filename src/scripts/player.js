function Player(active, playerNum) {
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

Player.prototype.handLength = function () {
    const length = this.playerHand.length
    return length
}

Player.prototype.addPlayerButton = function () {
    const player = document.getElementById(this.playerNum)
    player.addEventListener("click", () => {
        if (!this.active) {
            this.activate()
            this.deck.board._addPlayers(this.playerNum)
            this.deck.board._createNewPlayerBorder(this.playerNum)
        } else {
            this.activate()
            this.deck.board._removePlayers(this.playerNum)
            this.deck.board._createNextBorder()
        }
    })
}

Player.prototype.addToHand = function (card) {
    this.playerHand.push(card)
}

Player.prototype.removeFromHand = function (card) {
    this.playerHand.push(card)
}

Player.prototype.handFull = function () {
    return this.playerHand.length === 4
}

export { Player }
