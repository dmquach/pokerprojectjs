import Result from "./Result"
import { clone, sampleSize } from "lodash"
import { type as HandValueTypes } from "./HandValue/index"

export default class Board {
  cards = []
  dead_cards = []

  constructor(table) {
    this.table = table
  }

  checkGameRules(action) {
    if (
      this.getGame().isTexasHoldem() ||
      this.getGame().isSixPlusTexasHoldem() ||
      this.getGame().isOmaha()
    ) {
      if (
        (action === "flop" && this.cards.length !== 0) ||
        (action === "turn" && this.cards.length !== 3) ||
        (action === "river" && this.cards.length !== 4)
      )
        throw new Error(`Cannot set ${action}`)
    } else if (~["flop", "turn", "river"].indexOf(action))
      throw new Error(
        `Game ${this.getGame().getGame()} cannot have a ${action}!`
      )
  }

  setFlop(cards) {
    this.checkGameRules("flop")
    if (cards.length !== 3)
      throw new Error(`A flop takes exactly 3 cards, ${cards.length} given!`)
    cards.forEach(card => this.setCard(card))
    return this
  }

  dead(cards) {
    if (!Array.isArray(cards)) cards = [cards]
    cards.forEach(card => {
      this.dead_cards.push(
        this.table
          .getDeck()
          .getCards()
          .find(c => card === c.toString())
          .setOwner(this)
      )
    })
    return this
  }

  getDeadCards() {
    return this.dead_cards
  }

  setTurn(card) {
    this.checkGameRules("turn")
    this.setCard(card)
    return this
  }

  setRiver(card) {
    this.checkGameRules("river")
    this.setCard(card)
    return this
  }

  setCard(card) {
    const c = this.table
      .getDeck()
      .getCards()
      .find(c => card === c.toString())
    if (!c) throw new Error(`Card ${card} not found!`)
    this.cards.push(c.setOwner(this))
    return this
  }

  getGame() {
    return this.table.getGame()
  }

  getCards() {
    return this.cards
  }

  getResult() {
    let ts = Date.now()
    let ranks = {}
    for (let type in HandValueTypes) ranks[type] = 0

    const players = this.table.getPlayersInHand()
    const _players = players.map((p, i) => {
      return {
        wins: 0,
        ties: 0,
        ranks: clone(ranks),
        player: players[i]
      }
    })
    let iterations = 0

    const approximate = !this.table.runExhaustive() && this.cards.length <= 2
    const cards = this.table.getDeck().getAvailableCards()

    let getResult = (players, board) => {
      let result = this.table.getGame().getResult(players, board)

      const top_score = result.slice(0).sort((a, b) => b.points - a.points)[0]
        .points
      const tie = result.filter(rank => rank.points === top_score).length > 1

      for (let i = 0, j = _players.length; i < j; i++) {
        _players[i].ranks[result[i].rank.str]++
        if (result[i].points === top_score) {
          if (tie) _players[i].ties++
          else _players[i].wins++
        }
      }
      iterations++
    }

    let completeBoard = (board, pi, l) => {
      if (approximate) {
        for (let i = 0; i < this.table.getLimit(); i++) {
          getResult(players, sampleSize(cards, 5))
        }
      } else {
        if (!l) getResult(players, board)
        else {
          cards.forEach((card, i) => {
            if (i < pi) return

            const cardStr = card.toString()
            if (board.find(c => c.toString() === cardStr)) return

            completeBoard([...board, card], i, l - 1)
          })
        }
      }
    }

    completeBoard(this.cards, 0, 5 - this.cards.length)

    return new Result({
      players: _players,
      iterations,
      approximate,
      time: Date.now() - ts,
      board: this
    })
  }
}
