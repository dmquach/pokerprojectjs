const suits = ['♠', '♣', '♥', '♦'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push(`${value}${suit}`);
        }
    }
    return deck;
}

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
