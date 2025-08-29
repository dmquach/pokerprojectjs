export function equitiesPreFlop(hands, deck, totalOutcomes, chops) {
    const trials = 2500

    for (let t = 0; t < trials; t++) {
        const boardCards = this.deck.dealCards(deck, 5);
        const bestHands = {};

        for (let i = 1; i < 7; i++) {
            if (this.deck[`p${i}`].handFull()) {
                bestHands[`p${i}`] = this.bestHand(this.deck[`p${i}`].playerHand, boardCards);
            }
        }

        const winner = this.winner(bestHands);
        const players = Object.keys(winner);

        if (players.length > 1) {
            chops++;
        } else {
            hands[players[0]][0] += 1;
        }

        totalOutcomes++;
    }

    return [hands, totalOutcomes]
}

export function equitiesTwoMoreCards(board, hands, deck, totalOutcomes, chops, initial) {
    // evaluate every combo of two hands
    for (let m = initial; m < deck.length; m++) {
        for (let n = m + 1; n < deck.length; n++) {

            const bestHands = {}

            // evaluate each player’s best hand with the board + 2 new cards
            for (let i = 1; i < 7; i++) {
                if (this.deck[`p${i}`].handFull()) {
                    bestHands[`p${i}`] = this.bestHand(
                        this.deck[`p${i}`].playerHand,
                        board.concat([deck[m], deck[n]])
                    )
                }
            }

            // figure out winner(s)
            const winner = this.winner(bestHands)
            const players = Object.keys(winner)

            if (players.length > 1) {
                chops++
            } else {
                hands[players[0]][0] += 1
            }
            totalOutcomes += 1
        }
    }

    return [hands, totalOutcomes]
}

export function equitiesOneMoreCard(board, hands, deck, totalOutcomes, chops, initial) {
    // totalOutcomes++
    // h++
    //FIX: maybe add a player 7 for chops
    //Fix chops, make it not add up to 100%
    for (let m = initial; m < deck.length; m++) {
        // count += 1
        const bestHands = {}
        //FIX: Can probably check for active players and pass in as argument
        for (let i = 1; i < 7; i++) {
            if (this.deck[`p${i}`].handFull()) {
                bestHands[`p${i}`] = (this.bestHand(this.deck[`p${i}`].playerHand, board.concat(deck[m])))
            }
        }
        const winner = this.winner(bestHands)
        const players = Object.keys(winner)
        if (players.length > 1) {
            chops++
        } else {
            hands[players[0]][0] += 1
        }
        // if (winner) this.highlightWinner(winner)
        totalOutcomes += 1
    }
    return [hands, totalOutcomes]
}
