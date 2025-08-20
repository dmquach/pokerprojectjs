import { KEY } from "./constants.js";

function Board (deck) {
    // Element ID
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
    this.winner = false
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
                    if (this.winner) this._clearWinnerBorders()
                    this.removeFromBoard(e.target.id)
                    this._addBorder(e.target)
                } else {
                    console.log("add player first!")
                }
            })
        }
    }
}

Board.prototype.full = function () {
    return this.onBoard.length === 5
}

Board.prototype.playersReady = function () {
    for (let i = 1; i < 7; i++) {
        const player = this.deck[`p${i}`]
        if (player.active && !player.handFull()) return false
    }
    return true
}

Board.prototype._countPlayers = function () {
    const i = 0
    for (let i = 1; i < 7; i++) {
        const player = this.deck[`p${i}`]
        if (player.active) i++
    }
    return i
}


Board.prototype.swapImg = function (pos1, pos2) {
    const changePos = document.getElementById(pos1)
    const tempSrc = changePos.src
    const changeNextPos = document.getElementById(pos2)
    changePos.src = changeNextPos.src
    changeNextPos.src = tempSrc
}

Board.prototype.pushOnBoard = function (cardKey) {
    this.onBoard.push(cardKey)
}

// Board.prototype.pushPlayerHand = function () {

// }

// Board.prototype.removePlayerHand = function () {

// }

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
        this._createNextBorder()
    })
}

Board.prototype.addToBoard = function (cardKey, playerNum = 0) {
    // NEXT
    // FIX THIS TO SEPARATE WINNER
    if (this.boardPos['highlight'] === '') {
        console.log('everything full')
    } else {
        this.boardPos[this.boardPos['highlight']] = 'taken'
        this.deck.cardDeck[cardKey] = 'board'
        this.swapImg(this.boardPos['highlight'], cardKey)
        if (this.boardPos.highlight[0] === 'b') {
            this.pushOnBoard(cardKey)
        }

            // FIX, update odds not just when board gets full but when a hand gets full and the board is full
        if (this.full() && this.playersReady()) {
            this.highlightWinner()
        } else if (this.playersReady()) {
            this.displayEquities(this.onBoard)
        } else {
            this.createWaitingMessages()
        }
        this._createNextBorder(playerNum)
    }
}

Board.prototype.removeFromBoard = function (boardKey) {
    const itemToRemove = document.getElementById(boardKey)
    const item = this.changeSrcToId(itemToRemove.src)
    this.swapImg(boardKey, item)
    this.boardPos[boardKey] = 'open'
    this.deck.cardDeck[item] = 'deck'
    const index = this.onBoard.indexOf(item)
    if (index !== -1) {
        this.onBoard.splice(index, 1);
    }
    for (let i = 1; i < 7; i++) {
        let player = this.deck[`p${i}`].playerHand
        let index = player.indexOf(item)
        if (index !== -1) {
            player.splice(index, 1);
        }
    }

    if (this.full() && this.playersReady()) {
        this.highlightWinner()
    } else if (this.playersReady()) {
        this.displayEquities(this.onBoard)
    } else {
        this.createWaitingMessages()
    }
}

Board.prototype.clearBoard = function () {
    for (let i = 1; i < 6; i++) {
        if (this.boardPos[`board${i}`] === 'taken') this.removeFromBoard(`board${i}`)
    }
    this._clearWinnerBorders()
}

Board.prototype._calculateBestHands = function () {
    const bestHands = {}
    for (let i = 1; i < 7; i++) {
        if (this.deck[`p${i}`].handFull()) {
            bestHands[`p${i}`] = (this.deck.handtype.bestHand(this.deck[`p${i}`].playerHand, this.onBoard))
        }
    }
    return bestHands
}

Board.prototype._addBorder = function (pos = -2) {
    // FIX ADDING PLAYER AND REMOVING PLAYERS WHEN BOARD FULL
    // When removing players a new border should update

    // TODO add all flop highlighted
    // check issues with add border

    console.log(pos)
    console.log("here 1")
    this._removeBorder()
    if (!pos || !pos.id) {
        pos = document.getElementById(pos)
    }

    // highlight entire flop
    if (['board1', 'board2', 'board3'].includes(pos.id)) {
        this._addBorder( document.getElementById('board1'))
        // document.getElementById('board1').style.border = '2px solid red';
        // document.getElementById('board2').style.border = '2px solid red';
        // document.getElementById('board3').style.border = '2px solid red';
        return this.boardPos['highlight'] = pos.id
    }

    this.boardPos['highlight'] = pos.id
    return pos.style.border = '2px solid red';
}

Board.prototype._removeBorder = function() {
    const prevBorder = document.getElementById(this.boardPos['highlight'])

    console.log("here 2")
    console.log(this.boardPos['highlight'])
    console.log(prevBorder)
    // if (['board1', 'board2', 'board3'].includes(prevBorder.id)) {
    //     console.log("hereree")
    //     document.getElementById('board1').removeAttribute('style')
    //     document.getElementById('board2').removeAttribute('style')
    //     document.getElementById('board3').removeAttribute('style')
    // }

    // remove the previous border only if it was red
    if (prevBorder && prevBorder.style.border !== '4px solid blue') {
        prevBorder.removeAttribute('style')
    }

    this.boardPos.highlight = ''
}

Board.prototype._clearWinnerBorders = function () {
    for (let pos in this.boardPos) {
        const nextBorder = document.getElementById(pos)
        if (nextBorder) nextBorder.removeAttribute('style')
    }
}

Board.prototype._findNextBorder = function() {
    for (let pos in this.boardPos) {
        if (this.boardPos[pos] === 'open') {
            const nextBorder = document.getElementById(pos)
            return this._addBorder(nextBorder)
        }
    }
    return this.highlightWinner()
}

Board.prototype._createNextBorder = function(playerNum = 0) {
    // playerNum should tell what player to make next border for
    // 0 means add to next available space
    // -1 means add to board
    // num means add to that player

    // first case if board full find next spot/highlight winner if hands full
    // second case if player gets last slot filled, find next border
    // third case if players full continue on board or where clicked
    // fourth case is filling a players hand

    if (playerNum === -1 && this.full()) {
        return this._findNextBorder()
    } else if((playerNum > 0 && this.deck['p' + playerNum].handLength() === 4)) {
        return this._findNextBorder()
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
        return this._findNextBorder()
    }
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
    const player = document.getElementById(playerNum)
    const text = player.childNodes[2]
    const img = player.querySelector('img');
    img.src = "./images/icons8-minus-50.png"
    text.nodeValue += ' equity: '
}

Board.prototype._removePlayers = function (playerNum) {
    for (let key in this.boardPos) {
        if (key[1] === playerNum[1]) {
            const pos = document.querySelector(`.${key}`)
            pos.classList.add('blur')
            if (this.boardPos[key] !== 'open') this.removeFromBoard(key)
            this.boardPos[key] = ''
            this._createNextBorder()
        }
    }
    const player = document.getElementById(playerNum)
    const text = player.childNodes[2]
    const img = player.querySelector('img');
    img.src = "./images/icons8-plus-button-50.png"
    text.nodeValue = `P${playerNum[1]}`
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
    if (word) {
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
    } else {
        return false
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

Board.prototype.highlightWinner = function () {
    if (!this.full() || !this.playersReady()) return -1

    this._removeBorder()
    this.boardPos.highlight = ''
    this.winner = true
    const bestHands = this._calculateBestHands()
    const winner = this.deck.handtype.winner(bestHands)
    const players = Object.keys(winner)
    let hand = []
    for (let i = 1; i < 7; i++) {
        const player = `p${i}`
        if (players.includes(player)) {
            //TODO, show losing hand with hover
            const handVal = winner[player][0]
            const handString = KEY[handVal]
            hand = hand.concat(winner[player][1].filter(card => !hand.includes(card)))

            const p = document.getElementById(player)
            const text = p.childNodes[2]
            text.nodeValue = `WINNER: ${handString}`
        } else if (this.deck[player].active) {
            const p = document.getElementById(player)
            const text = p.childNodes[2]
            // console.log(bestHands)
            text.nodeValue = `${KEY[bestHands[player][0]]}`
        }
    }

    const allImages = document.querySelectorAll('img');
    // console.log(allImages)
    allImages.forEach(img => {
        const id = this.changeSrcToId(img.src)
        // console.log(id, img)
        if (hand.indexOf(id) !== -1) {
            img.style.border = '4px solid blue';
        }
    });
}

Board.prototype.createWaitingMessages = function () {
    for (let i = 1; i < 7; i++) {
        if (this.deck[`p${i}`].active) {
            const player = document.getElementById(`p${i}`)
            const text = player.childNodes[2]

            text.nodeValue = "Waiting on unfilled hands"
        }
    }
}

Board.prototype.displayEquities = function (board) {
    //[{p1: [wins, hand], p2: [wins, hand]}, totalOutcomes]
    // hash of players and total outcomes

    //if players not ready or no players break out
    if (!this.playersReady() || this._countPlayers() === 0) return -1

    const players = this.deck.handtype.equities(board)
    // console.log(players)



    if (this.onBoard.length === 4) {
        for (const p in players[0]) {
            const player = document.getElementById(p)
            // console.log(player, p)
            const text = player.childNodes[2]
            // console.log(players)
            // console.log(players[1])
            text.nodeValue = `${p} equity: ${((players[0][p][0] / players[1]) * 100).toFixed(2)}%`
        }
    }
    // console.log("players", players)
}

export { Board }
