import { Card } from "./card";

export function deck(){
    const suits = ['h', 'c', 'd', 's'];
    const deck = [];

    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        const suit = suits[suitIdx];

        for (let value = 1; value <= 13; value++) {
            let cardName = value;

            // Assign card names for special cards (Ace, Jack, Queen, King)
            if (value === 1) cardName = 'A';
            else if (value === 11) cardName = 'J';
            else if (value === 12) cardName = 'Q';
            else if (value === 13) cardName = 'K';

            // Construct the imagePath for the card
            const imagePath = `../images/card-${cardName}${suit}.png`;

            // Add the card object to the deck
            cardObject.push({ id: cardObject.length + 1, imagePath, suit, value });
        }
    }
    return deck
}
