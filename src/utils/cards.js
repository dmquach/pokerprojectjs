function renderDeck(deck) {
    const deckElement = document.getElementById('deck');
    deckElement.innerHTML = '';
    for (const card of deck) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerText = card;
        deckElement.appendChild(cardElement);
    }
}

function shuffleDeck() {
    const deck = createDeck();
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    renderDeck(deck);
}

// Initial deck rendering
const initialDeck = createDeck();
renderDeck(initialDeck);

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
