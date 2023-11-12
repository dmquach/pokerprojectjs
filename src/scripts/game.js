import { Deck } from "./deck.js"
import { Player } from "./player.js"

function Game() {
    this.deck = new Deck()
    this.p1 = new Player(true)
    this.p2 = new Player(true)
    this.p3 = new Player(false)
    this.p4 = new Player(false)
    this.p5 = new Player(false)
    this.p6 = new Player(false)
}

export { Game }
