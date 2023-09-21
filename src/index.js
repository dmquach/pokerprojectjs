// import

const card2c = document.getElementById('2c')
card2c.addEventListener("click", async (e) => {
    if (!card2c.hidden) {
        await addToBoard(card2c)
    } else {
        await removeFromBoard(card2c)
    }
    card2c.src = "./images/cardback.png";
})

const card3c = document.getElementById('3c')
card3c.addEventListener("click", async (e) => {
    await addToBoard(card3c)
    card3c.src = "./images/cardback.png";
})

async function addToBoard(card) {
    fullBoard = false;
    while (!fullBoard) {
        for (let i = 1; i < 6; i++) {
            const check = document.getElementsByClassName(`board${i}`)
            if (!check[0].hidden) {
                const replace = document.getElementById(`board${i}`)
                replace.src = card.src
                card.classList.toggle("hidden")
                console.log(card)
                break
            }
        }
        fullBoard = true
    }
}

async function removeFromBoard(card) {
    for (let i = 1; i < 6; i++) {
        const check = document.getElementsByClassName(`board${i}`)
        if (!check[0].src == card.src) {
            console.log(card)
            break
        }
    }
}
