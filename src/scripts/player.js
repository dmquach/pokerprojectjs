function Player(active) {
    this.playerHands = []
    this.active = active
}

Player.prototype.active = function () {
    this.active = !this.active
}

export { Player }
