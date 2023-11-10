function Deck () {
    this.cardDeck = {
        '2c': 'deck', '3c': 'deck', '4c': 'deck', '5c': 'deck', '6c': 'deck', '7c': 'deck', '8c': 'deck', '9c': 'deck', '10c': 'deck', 'Jc': 'deck', 'Qc': 'deck', 'Kc': 'deck', 'Ac': 'deck',
        '2d': 'deck', '3d': 'deck', '4d': 'deck', '5d': 'deck', '6d': 'deck', '7d': 'deck', '8d': 'deck', '9d': 'deck', '10d': 'deck', 'Jd': 'deck', 'Qd': 'deck', 'Kd': 'deck', 'Ad': 'deck',
        '2s': 'deck', '3s': 'deck', '4s': 'deck', '5s': 'deck', '6s': 'deck', '7s': 'deck', '8s': 'deck', '9s': 'deck', '10s': 'deck', 'Js': 'deck', 'Qs': 'deck', 'Ks': 'deck', 'As': 'deck',
        '2h': 'deck', '3h': 'deck', '4h': 'deck', '5h': 'deck', '6h': 'deck', '7h': 'deck', '8h': 'deck', '9h': 'deck', '10h': 'deck', 'Jh': 'deck', 'Qh': 'deck', 'Kh': 'deck', 'Ah': 'deck'
    }
    this.boardPos = {
        'p1-1': 'open', 'p1-2': 'open', 'p1-3': 'open', 'p1-4': 'open',
        'p2-1': 'open', 'p2-2': 'open', 'p2-3': 'open', 'p2-4': 'open',
        'p3-1': '', 'p3-2': '', 'p3-3': '', 'p3-4': '',
        'p4-1': '', 'p4-2': '', 'p4-3': '', 'p4-4': '',
        'p5-1': '', 'p5-2': '', 'p5-3': '', 'p5-4': '',
        'p6-1': '', 'p6-2': '', 'p6-3': '', 'p6-4': '',
        'board1': 'open', 'board2': 'open', 'board3': 'open', 'board4': 'open', 'board5': 'open',
        'highlight': ''
    }
    this.numPlayers = 2
    this.addClickCards()
    this.addClickBoard()
}

Deck.prototype.addClickCards = function () {
    for (let key in this.cardDeck) {
        const card = document.getElementById(key);
        card.addEventListener("click", () => {
            // if in deck and no next part highlighted
            if (this.cardDeck[card.id] === "deck") {
                this.addToBoard(card.id)
            } else {
                this.returnToDeck(card.id)
            }
        })
    }
}

Game.prototype.addClickBoard = function () {
    for (let pos in this.boardPos) {
        const newPos = document.getElementById(pos);
        // newPos.id = p1-1
        newPos.addEventListener("click", () => {
            if (this.boardPos[newPos.id] === '') {
                this.boardPos['highlight'] = newPos.id
            } else {
                this.removeFromBoard(newPos.id)
            }
        })

    }
}

Deck.prototype.addToBoard = function (cardKey) {
    // add card to board
    if (this.boardPos['highlight'] === '') {
        for (let pos in this.boardPos) {
            if (this.boardPos[pos] === 'open') {
                // pos = first open pos p1-1
                // cardKey = "2c"
                this.boardPos[pos] = 'taken'
                this.cardDeck[cardKey] = 'board'
                //  <img src="./images/cardback.png" id="p1-1">
                const changePos = document.getElementById(pos);
                const tempSrc = changePos.src;
                //  <img src="./images/2_of_hearts.png" id="2h">
                const changeCard = document.getElementById(key);
                changePos.src = changeCard.src;
                changeCard.src = tempSrc;
                return console.log("switched")
            }
        }
        // if none open
        return console.log("no open spaces")
    }
}

Deck.prototype.removeFromBoard = function (boardKey) {
    // boardKey = p1-1
    const changePos = document.getElementById(boardKey);
    const tempSrc = changePos.src;

    this.boardPos[changePos.id] = 'open'
    // cardKey "2h"
    const cardKey = this.changeSrcToId(tempSrc)
    this.cardDeck[cardKey] = 'deck'

    const changeCard = document.getElementById(cardKey);
    changePos.src = changeCard.src;
    changeCard.src = tempSrc;
    return console.log("switched")
}

Deck.prototype.changeSrcToId = function (src) {
    let val;
    let word;
    if (src.includes('spades')) {
        suit = "s"
        word = src.slice(-16)
    } else if (src.includes('diamonds')) {
        suit = "d"
        word = src.slice(-18)
    } else if (src.includes('hearts')) {
        suit = "h"
        word = src.slice(-16)
    } else if (src.includes('clubs')) {
        suit = "c"
        word = src.slice(-15)
    }

    if (word.includes('2')) {
        val = "2"
    } else if (word.includes('3')) {
        val = "3"
    } else if (word.includes('4')) {
        val = "4"
    } else if (word.includes('5')) {
        val = "5"
    } else if (word.includes('6')) {
        val = "6"
    } else if (word.includes('7')) {
        val = "7"
    } else if (word.includes('8')) {
        val = "8"
    } else if (word.includes('9')) {
        val = "9"
    } else if (word.includes('10')) {
        val = "10"
    } else if (word.includes('J')) {
        val = "J"
    } else if (word.includes('Q')) {
        val = "Q"
    } else if (word.includes('K')) {
        val = "K"
    } else if (word.includes('A')) {
        val = "A"
    }
    return `${val}${suit}`
}
