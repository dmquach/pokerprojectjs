// const cardObject = [
//     {id:1, imagePath:'../images/c, suit: h, value 13},
//     {id:2, imagePath:'../images/', suit: c, value: 10},
//     {id:3, imagePath:'../images/', suit: d, value: 12},
//     {id:4, imagePath:'../images/', suit: s, value: 14}
// ]

const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
const cardObject = [];

for (let suitIdx = 0; suitIdx < 4; suitIdx++) {
    const suit = suits[suitIdx];

    for (let value = 1; value <= 13; value++) {
        let cardName = value;
        // set value of card
        if (value === 1) {
            cardName = 'A'
        } else if (value === 11) {
            cardName = 'J'
        } else if (value === 12) {
            cardName = 'Q'
        } else if (value === 13) {
            cardName = 'K'
        }

        const imagePath = `/images/card-${cardName}${suit}.png`;

        cardObject.push({ id: cardObject.length + 1, imagePath, suit, value });
    }
}

console.log(cardObject);
