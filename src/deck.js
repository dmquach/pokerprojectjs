import Card from "./Card"
import { FullDeck, SixPlusDeck, SuitsList } from "./Interfaces"

export default class Deck {
  cards = []

  constructor(game) {
    this.game = game
    SuitsList.forEach(suit => {
      let numbers = game.isSixPlusTexasHoldem() ? SixPlusDeck : FullDeck
      numbers.forEach(num => {
        this.cards.push(new Card(suit, num, this.game))
      })
    })
  }

  getCards() {
    return this.cards
  }

  getAvailableCards() {
    return this.cards.filter(card => !card.inPlay())
  }
}
