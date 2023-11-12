function Player(active) {
    this.playerHand = []
    this.active = active
}

Player.prototype.active = function () {
    this.active = !this.active
}

Player.prototype.addPlayerButton = function () {

}

Player.prototype.removePlayerButton = function () {

}

Player.prototype.addToHand = function (card) {
    this.playerHand.push(card)
    console.log(this)
}

export { Player }
