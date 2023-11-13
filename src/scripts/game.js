import { Deck } from "./deck.js"
import { Player } from "./player.js"

function Game() {
    this.p1 = new Player(true, 'p1')
    this.p2 = new Player(true, 'p2')
    this.p3 = new Player(false, 'p3')
    this.p4 = new Player(false, 'p4')
    this.p5 = new Player(false, 'p5')
    this.p6 = new Player(false, 'p6')
    this.deck = new Deck(this.p1, this.p2, this.p3, this.p4, this.p5, this.p6)
    this.addDeckToPlayer(this.deck)
}

Game.prototype.addDeckToPlayer = function (deck) {
    this.p1.setDeck(deck)
    this.p2.setDeck(deck)
    this.p3.setDeck(deck)
    this.p4.setDeck(deck)
    this.p5.setDeck(deck)
    this.p6.setDeck(deck)
}
export { Game }
