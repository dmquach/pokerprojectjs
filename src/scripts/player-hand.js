
export default class PlayerHand{ // fine, dont touch
    constructor(deck){
        this.deck = deck; // reference to the game's card deck
        this.hand = []; // array that will hold this player's cards
    }


    addToHand(num){ // maybe add a random way either pop/shift
        //take a card from deck and add to hand, remove card from deck
        while(num > 0){
            this.hand.push(this.deck.shift());
            num--;
        }
    }

}
