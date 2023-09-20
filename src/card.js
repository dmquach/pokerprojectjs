import { Suits } from "./Interfaces"

export default class Card {
  owner = null

  constructor(suit, num, game) {
    this.suit = suit
    this.num = num
    this.game = game
    this.rank =
      [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"].indexOf(this.num) + 2
    this.str = num + suit
  }

  toString() {
    return this.str
  }

  color() {
    switch (this.suit) {
      case Suits.SPADES:
      case Suits.CLUBS:
        return "white"
      case Suits.HEARTS:
      case Suits.DIAMONDS:
        return "red"
    }
  }

  inPlay() {
    return this.owner !== null
  }

  setOwner(owner) {
    if (this.inPlay())
      throw new Error(`Card ${this.toString()} already in play!`)
    this.owner = owner
    return this
  }

  isAce() {
    return this.num === "A"
  }

  isLowAce() {
    return this.num === "A" && this.rank !== 14
  }

  setAsLowAce() {
    if (!this.isAce()) throw new Error("Only Ace can have a rank of 1")
    this.rank = this.game.isSixPlusTexasHoldem() ? 5 : 1
    return this
  }

  getRank(leading_zero = false) {
    if (leading_zero) return `${this.rank < 10 ? "0" : ""}${this.rank}`
    return this.rank
  }

  getSuit() {
    return this.suit
  }

  getNum() {
    return this.num
  }
}
