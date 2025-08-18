function Player(active, playerNum) {
    this.playerHand = []
    this.playerNum = playerNum
    this.active = active
}

Player.prototype.setDeck = function (deck) {
    this.deck = deck
    this.addAndRemovePlayerButton()
}

Player.prototype.activate = function () {
    this.active = !this.active
}

Player.prototype.handLength = function () {
    const length = this.playerHand.length
    return length
}

Player.prototype.addAndRemovePlayerButton = function () {
    const player = document.getElementById(this.playerNum)
    player.addEventListener("click", () => {
        if (!this.active) {
            // adding player
            this.activate()
            this.deck.board._addPlayers(this.playerNum)
            this.deck.board._createNewPlayerBorder(this.playerNum)
            this.deck.board._clearWinnerBorders()
            this.deck.board._addBorder(`${this.playerNum}-1`)
            this.deck.board.createWaitingMessages()
        } else {
            // removing player
            this.activate()
            this.deck.board._removePlayers(this.playerNum)
            this.deck.board._createNextBorder()
            this.deck.board._clearWinnerBorders()
            this.deck.board._createNextBorder()
            // if removing the winner crown a new winner
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
