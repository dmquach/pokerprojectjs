// import
const cardIds = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', '10c', 'Jc', 'Qc', 'Kc', 'Ac',
'2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '10d', 'Jd', 'Qd', 'Kd', 'Ad',
'2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s', 'Js', 'Qs', 'Ks', 'As',
'2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', 'Jh', 'Qh', 'Kh', 'Ah']

const boardIds = [
    'board1', 'board2', 'board3', 'board4', 'board5',
    'p1-1', 'p1-2', 'p1-3', 'p1-4',
    'p2-1', 'p2-2', 'p2-3', 'p2-4',
    'p3-1', 'p3-2', 'p3-3', 'p3-4',
    'p4-1', 'p4-2', 'p4-3', 'p4-4',
    'p5-1', 'p5-2', 'p5-3', 'p5-4',
    'p6-1', 'p6-2', 'p6-3', 'p6-4'
];



const numPlayers = 2

cardIds.forEach(cardId => {
    const card = document.getElementById(cardId);

    card.addEventListener("click", async (e) => {
        if (!onBoard(card)) {
            await addToBoard(card);
            playerHand();
        }
    })
})

boardIds.forEach(boardId => {
    const board = document.getElementById(boardId);

    board.addEventListener("click", async (e) => {
        if (!board.src.endsWith("/images/cardback.png")) {
            await removeFromBoard(board);
            playerHand();
        }
    })
})


function onBoard(card) {
    for (let i = 1; i < 6; i++) {
        const check = document.getElementById(`board${i}`)
        if (check.src == card.src) {
            return true
        }
    }
    return false
}


async function addToBoard(card) {
    let fullBoard = false;
    while (!fullBoard) {
        // place player cards first depending on player count
        for (let j = 1; j < numPlayers+1; j++) {
            for (let m = 1; m < 5; m++) {
                const replace = document.getElementById(`p${j}-${m}`)
                if (replace.src.endsWith("/images/cardback.png")) {
                    replace.src = card.src
                    card.src = "./images/cardback.png";
                    break
                }
            }
        }
        for (let i = 1; i < 6; i++) {
            // replace is the board position
            const replace = document.getElementById(`board${i}`)
            if (replace.src.endsWith("/images/cardback.png")) {
                replace.src = card.src
                card.src = "./images/cardback.png";
                break
            }
        }
        fullBoard = true
    }
}

async function removeFromBoard(board) {
    const src = board.src
    const id = await changeSrcToId(src)
    const replace = document.getElementById(`${id}`)
    board.src = "./images/cardback.png"
    replace.src = src

}

// async function removeFromBoard(card) {
//     console.log(card)
//     const src = await changeIdToSrc(`${card.id}`)
//     for (let i = 1; i < 6; i++) {
//         const replace = document.getElementById(`board${i}`)
//         if (replace.src.endsWith("/images/cardback.png")) {
//             card.src = src;
//             replace.src = "./images/cardback.png"
//             break
//         }
//     }
// }

async function changeIdToSrc(id) {
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

async function changeSrcToId(src) {
    let suit;
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
function playerHand() {
    // each player
    let handCount = 0;
    for (let i = 1; i < numPlayers + 1; i++) {
        for (let j = 1; j < 5; j++) {
            const replace = document.getElementById(`p${i}-${j}`)
            if (replace.src.endsWith("/images/cardback.png")) {
                const player = document.getElementById(`p${i}`)
                player.textContent = "incomplete hand"
                break
            }
        }
        // if reaching here the hands are complete
        handCount += 1;
    }

    if (handCount > 1) {
        equityCalc()
    }
}

function equityCalc() {
    return 100
}
