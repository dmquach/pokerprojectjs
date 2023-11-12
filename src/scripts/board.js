function Board (deck) {
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
    this.deck = deck
    this.addClickBoard()
    this._initialBorder()
}

Board.prototype.addClickBoard = function () {
    for (let pos in this.boardPos) {
        if (pos !== 'highlight') {
            const newPos = document.getElementById(pos);
            newPos.addEventListener("click", (e) => {
                if (this.boardPos[e.target.id] === 'open') {
                    this._removeBorder()
                    this._addBorder(e.target)
                } else if (!(this.boardPos[e.target.id] === '')) {
                    this.removeFromBoard(e.target.id)
                    this._addBorder(e.target)
                } else {
                    console.log("add player first!")
                }
            })
        }
        // newPos.id = p1-1
    }
}

Board.prototype.addToBoard = function (cardKey) {
    // add card to board Qh
    if (this.boardPos['highlight'] === '') {
        return console.log("no open spaces")
    } else {
        this.boardPos[this.boardPos['highlight']] = 'taken'
        this.deck.cardDeck[cardKey] = 'board'
        //  <img src="./images/cardback.png" id="p1-1">
        const changePos = document.getElementById(this.boardPos['highlight']);
        const tempSrc = changePos.src;
        //  <img src="./images/2_of_hearts.png" id="2h">
        const changeCard = document.getElementById(cardKey);
        changePos.src = changeCard.src;
        changeCard.src = tempSrc;
        this._createNextBorder()
        return console.log("switched highlighted area")
    }
}

Board.prototype.removeFromBoard = function (boardKey) {
    // boardKey = p1-1
    const changePos = document.getElementById(boardKey);
    const tempSrc = changePos.src;

    this.boardPos[changePos.id] = 'open'
    // cardKey "2h"
    const cardKey = this.changeSrcToId(tempSrc)
    this.deck.cardDeck[cardKey] = 'deck'

    const changeCard = document.getElementById(cardKey);
    changePos.src = changeCard.src;
    changeCard.src = tempSrc;
    return console.log("switched")
}

Board.prototype.changeSrcToId = function (src) {
    let val;
    let word;
    let suit;
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

Board.prototype.changeIdToSrc = function (id) {
    let v;
    let s;

    if (id.length == 2) {
        v = id[0]
        s = id[1]
    } else {
        v = 10
        s = id[2]
    }

    let suit;
    if (s == "c") {
        suit = "clubs"
    } else if (s == "d") {
        suit = "diamonds"
    } else if (s == "s") {
        suit = "spades"
    } else if (s == "h") {
        suit = "hearts"
    }
    return `./images/${v}_of_${suit}.png`
}

Board.prototype._addBorder = function (pos) {
    this._removeBorder()
    this.boardPos['highlight'] = pos.id
    pos.style.border = '2px solid red';
}

Board.prototype._removeBorder = function() {
    const prevBorder = document.getElementById(this.boardPos['highlight'])
    if (prevBorder) prevBorder.removeAttribute('style')
    // this._createNextBorder()
}

Board.prototype._createNextBorder = function() {
    for (let pos in this.boardPos) {
        if (this.boardPos[pos] === 'open') {
            const nextBorder = document.getElementById(pos)
            return this._addBorder(nextBorder)
        }
        // newPos.id = p1-1
    }
}

Board.prototype._initialBorder = function () {
    const initial = document.getElementById('p1-1');
    this._addBorder(initial)
}

export { Board }