import { Deck } from "./deck.js"
import { Player } from "./player.js"

function Game() {
    this.deck = new Deck()
    this.p1 = new Player(true)
}

export { Game }
