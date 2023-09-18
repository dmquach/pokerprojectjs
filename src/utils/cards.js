// const cardObject = [
//     {id:1, imagePath:'../images/c, suit: h, value 13},
//     {id:2, imagePath:'../images/', suit: c, value: 10},
//     {id:3, imagePath:'../images/', suit: d, value: 12},
//     {id:4, imagePath:'../images/', suit: s, value: 14}
// ]

const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const suits = ['hearts', 'clubs', 'diamonds', 'spades'];
const cardObject = [];

for (let i = 0; i < 4; i++) {
    const suit = suits[i];

    for (let j = 1; j <= 13; j++) {
        let cardName = j;
        // set value of card
        if (j === 1) {
            cardName = 'A'
        } else if (j === 11) {
            cardName = 'J'
        } else if (j === 12) {
            cardName = 'Q'
        } else if (j === 13) {
            cardName = 'K'
        }

        const imagePath = `/images/${cardName}_of_${suit}.png`;

        cardObject.push({ id: cardObject.length + 1, imagePath, suit, cardName});
    }
}

console.log(cardObject);
