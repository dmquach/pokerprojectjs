function Board (deck) {
    this.boardPos = {
        'p1-1': 'open', 'p1-2': 'open', 'p1-3': 'open', 'p1-4': 'open',
        'p2-1': 'open', 'p2-2': 'open', 'p2-3': 'open', 'p2-4': 'open',
        'p3-1': '', 'p3-2': '', 'p3-3': '', 'p3-4': '',
        'p4-1': '', 'p4-2': '', 'p4-3': '', 'p4-4': '',
        'p5-1': '', 'p5-2': '', 'p5-3': '', 'p5-4': '',
        'p6-1': '', 'p6-2': '', 'p6-3': '', 'p6-4': '',
        'board1': 'open', 'board2': 'open', 'board3': 'open', 'board4': 'open', 'board5': 'open',
        'highlight': 'p1-1'
    }
    this.deck = deck
    this.onBoard = []
    this.addClickBoard()
    this.createReset()
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

Board.prototype.createReset = function () {
    const res = document.getElementById('resetButton')
    res.addEventListener("click", () => {
        for (let i = 1; i < 7; i++) {
            if (this.deck[`p${i}`].active) this._removePlayers(`p${i}`)
            if (i < 3) {
                this._addPlayers(`p${i}`)
            }
        }
        this.clearBoard()
    })
}

Board.prototype.addToBoard = function (cardKey, playerNum = 0) {
    // add card to board Qh
    if (this.boardPos['highlight'] === '') {

    } else {
        this.boardPos[this.boardPos['highlight']] = 'taken'
        this.deck.cardDeck[cardKey] = 'board'
        if (this.boardPos.highlight[0] === 'b') {
            this.onBoard.push(cardKey)
            if (this.full()) {
                // FIX: Just being used to test hands, should test entire board
                // this.deck.handtype.isFullHouse(this.onBoard)
            }
        }
        //  <img src="./images/cardback.png" id="p1-1">
        const changePos = document.getElementById(this.boardPos['highlight']);
        const tempSrc = changePos.src;
        //  <img src="./images/2_of_hearts.png" id="2h">
        const changeCard = document.getElementById(cardKey);
        changePos.src = changeCard.src;
        changeCard.src = tempSrc;
        this._createNextBorder(playerNum)
    }
}

Board.prototype.full = function () {
    return this.onBoard.length === 5
}

Board.prototype.removeFromBoard = function (boardKey) {
    // boardKey = p1-1
    const itemToRemove = document.getElementById(boardKey) // Item to remove from the array
    const item = this.changeSrcToId(itemToRemove.src)
    let index = this.onBoard.indexOf(item); // Find the index of the item
    if (index !== -1) {
        this.onBoard.splice(index, 1); // Remove one element at the found index
    }
    const changePos = document.getElementById(boardKey);
    const tempSrc = changePos.src;

    this.boardPos[changePos.id] = 'open'
    // cardKey "2h"
    const cardKey = this.changeSrcToId(tempSrc)
    this.deck.cardDeck[cardKey] = 'deck'

    const changeCard = document.getElementById(cardKey);
    changePos.src = changeCard.src;
    changeCard.src = tempSrc;
}

Board.prototype.clearBoard = function () {
    for (let i = 1; i < 6; i++) {
        if (this.boardPos[`board${i}`] === 'taken') this.removeFromBoard(`board${i}`)
    }
}

Board.prototype.boardCards = function () {
    const b1 = document.getElementById('board1');
    const b2 = document.getElementById('board2');
    const b3 = document.getElementById('board3');
    const b4 = document.getElementById('board4');
    const b5 = document.getElementById('board5');
    if (b1 && b2 && b3 && b4 && b5) {
        const pos1 = this.changeSrcToId(b1.src)
        const pos2 = this.changeSrcToId(b2.src)
        const pos3 = this.changeSrcToId(b3.src)
        const pos4 = this.changeSrcToId(b4.src)
        const pos5 = this.changeSrcToId(b5.src)
    }
}

Board.prototype._addBorder = function (pos) {
    this._removeBorder()
    this.boardPos['highlight'] = pos.id
    pos.style.border = '2px solid red';
}

Board.prototype._removeBorder = function() {
    const prevBorder = document.getElementById(this.boardPos['highlight'])
    if (prevBorder) prevBorder.removeAttribute('style')
    this.boardPos.highlight = ''
}

Board.prototype._createNextBorder = function(playerNum = 0) {
    // playerNum should tell what player to make next border for
    // 0 means add to next available space
    // -1 means add to board
    // num means add to that player
    if((playerNum > 0 && this.deck['p' + playerNum].handLength() === 4) || (playerNum === -1 && this.full())) {
        for (let pos in this.boardPos) {
            if (this.boardPos[pos] === 'open') {
                const nextBorder = document.getElementById(pos)
                return this._addBorder(nextBorder)
            }
        }
    } else if (playerNum === -1) {
        for (let pos in this.boardPos) {
            if (pos[0] === 'b' && this.boardPos[pos] === 'open') {
                const nextBorder = document.getElementById(pos)
                return this._addBorder(nextBorder)
            }
        }
    } else if (playerNum !== 0) {
        for (let pos in this.boardPos) {
            if (Number(pos[1]) === playerNum && this.boardPos[pos] === 'open') {
                const nextBorder = document.getElementById(pos)
                return this._addBorder(nextBorder)
            }
        }
    } else {
        for (let pos in this.boardPos) {
            if (this.boardPos[pos] === 'open') {
                const nextBorder = document.getElementById(pos)
                return this._addBorder(nextBorder)
            }
        }
    }
    // if no open spaces
    this._removeBorder()
    this.boardPos.highlight = ''
    // -1 when no empty spaces
    return -1
}


Board.prototype._createNewPlayerBorder = function (playerNum) {
    const nextBorder = document.getElementById(`${playerNum}-1`)
    this._addBorder(nextBorder)
}

Board.prototype._initialBorder = function () {
    const initial = document.getElementById('p1-1');
    this._addBorder(initial)
}

Board.prototype._getHighlightedPos = function () {
    const pos = this.boardPos.highlight
    if (pos[0] === 'p') {
        // returns player
        return pos.slice(0, 2)
    } else {
        return -1
    }
}

Board.prototype._addPlayers = function (playerNum) {
    //p1 boardPos[0-3], p2 [4-7]
    for (let key in this.boardPos) {
        if (key[1] === playerNum[1]) {
            const pos = document.querySelector(`.${key}`)
            pos.classList.remove('blur')
            this.boardPos[key] = 'open'
        }
    }
}

Board.prototype._removePlayers = function (playerNum) {
    //p1 boardPos[0-3], p2 [4-7]
    for (let key in this.boardPos) {
        if (key[1] === playerNum[1]) {
            const pos = document.querySelector(`.${key}`)
            pos.classList.add('blur')
            if (this.boardPos[key] !== 'open') this.removeFromBoard(key)
            this.boardPos[key] = ''
            this._createNextBorder()
    }
}
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

export { Board }
