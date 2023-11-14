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
            const player = document.getElementById(this.playerNum)
            const text = player.childNodes[2]
            const img = player.querySelector('img');
            img.src = "./images/icons8-minus-50.png"
            text.nodeValue += ' equity: '
            this.deck.board._addPlayers(this.playerNum)
            this.deck.board._createNewPlayerBorder(this.playerNum)
        } else {
            const player = document.getElementById(this.playerNum)
            const text = player.childNodes[2]
            const img = player.querySelector('img');
            img.src = "./images/icons8-minus-50.png"
            text.nodeValue = `P${this.playerNum[1]}`
            this.activate()
            this.deck.board._removePlayers(this.playerNum)
        }
    })
}

Player.prototype.addToHand = function (card) {
    this.playerHand.push(card)
}

Player.prototype.handFull = function () {
    return this.playerHand.length === 4
}

export { Player }
