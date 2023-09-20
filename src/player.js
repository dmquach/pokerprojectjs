import Table from "./Table"

export default class Player {
  hand = null

  constructor(seat, Table, hand = null) {
    this.seat = seat
    this.Table = Table
    if (Array.isArray(hand)) this.setHand(hand)
  }

  setHand(hand) {
    const game = this.Table.getGame()
    if (
      (game.isTexasHoldem() || game.isSixPlusTexasHoldem()) &&
      hand.length !== 2
    )
      throw new Error("A Texas hold'em hand must contain exactly 2 cards!")
    if (game.isOmaha() && hand.length !== 4)
      throw new Error("An Omaha hand must contain exactly 4 cards!")
    this.hand = hand.map(c => {
      const card = this.Table.getDeck()
        .getCards()
        .find(card => card.toString() === c)
      if (!card) throw new Error(`Card "${c}" not found!`)
      return card.setOwner(this)
    })
    return this
  }

  getHand() {
    if (this.hand === null) return null
    return this.hand.map(card => card.toString()).join("")
  }

  inHand() {
    return this.hand !== null
  }

  getCards() {
    return this.hand
  }

  isEmpty() {
    return !this.inHand()
  }

  getSeat() {
    return this.seat
  }
}
