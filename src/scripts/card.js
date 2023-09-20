import * as UTIL from "./util"
//I think im done with this portion, cards have two attributes their suit and number/value
//I dont think I need any methods for the card class
class Card {
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }
}

// returning a generated deck of cards
export function deckCreation(){
    //flatten method with map
    let deck = UTIL.suits.flatMap(suit => {
        return UTIL.values.map(value => { // returns an array of cards of a suit paried with each value in values array
            return new Card(suit,value)
        })
    })

    return deck.sort(() => 0.5 - Math.random()) // shuffling deck array randomly
}
