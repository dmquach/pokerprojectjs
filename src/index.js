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

cardIds.forEach(cardId => {
    const card = document.getElementById(cardId);

    card.addEventListener("click", async (e) => {
        if (!onBoard(card)) {
            await addToBoard(card);
        } else {
            await removeFromBoard(card);
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
    fullBoard = false;
    while (!fullBoard) {
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

async function removeFromBoard(card) {
    const src = await changeIdToSrc(`${card.id}`)
    for (let i = 1; i < 6; i++) {
        if (replace.src.endsWith("/images/cardback.png")) {
            card.src = src;
            const replace = document.getElementById(`board${i}`)
            replace.src = "./images/cardback.png"
            break
        }
    }
}

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
