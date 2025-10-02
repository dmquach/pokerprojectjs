// Info button opens modal with info text
document.addEventListener('DOMContentLoaded', () => {
	const infoBtn = document.getElementById('infoButton');
	const infoModal = document.getElementById('infoModal');
	const closeModal = document.getElementById('closeModal');
	if (infoBtn && infoModal && closeModal) {
		infoBtn.addEventListener('click', () => {
			infoModal.style.display = 'block';
		});
		closeModal.addEventListener('click', () => {
			infoModal.style.display = 'none';
		});
		window.addEventListener('click', (event) => {
			if (event.target === infoModal) {
				infoModal.style.display = 'none';
			}
		});
	}
});
window.addEventListener('DOMContentLoaded', () => {
	const loadingScreen = document.getElementById('loading-screen');
	if (loadingScreen) loadingScreen.style.display = 'none';
});
// // Hide loading screen when page is fully loaded
// window.addEventListener('load', () => {
// 	const loadingScreen = document.getElementById('loading-screen');
// 	if (loadingScreen) loadingScreen.style.display = 'none';
// });
import { Game } from "./scripts/game.js";

const game = new Game()

// function equityCalc() {

//     let boardFull = true;
//     for (let i = 1; i < 6; i++) {
//         // replace is the board position
//         const replace = document.getElementById(`board${i}`)
//         if (replace.src.endsWith("/images/cardback.png")) {
//             boardFull = false
//         }
//     }

//     if (boardFull) {
//         let b1 = changeSrcToId(document.getElementById(`board1`).src)
//         let b2 = changeSrcToId(document.getElementById(`board2`).src)
//         let b3 = changeSrcToId(document.getElementById(`board3`).src)
//         let b4 = changeSrcToId(document.getElementById(`board4`).src)
//         let b5 = changeSrcToId(document.getElementById(`board5`).src)

//         let p1 = changeSrcToId(document.getElementById(`p1-1`).src)
//         let p2 = changeSrcToId(document.getElementById(`p1-2`).src)
//         let p3 = changeSrcToId(document.getElementById(`p1-3`).src)
//         let p4 = changeSrcToId(document.getElementById(`p1-4`).src)

//         let p5 = changeSrcToId(document.getElementById(`p2-1`).src)
//         let p6 = changeSrcToId(document.getElementById(`p2-2`).src)
//         let p7 = changeSrcToId(document.getElementById(`p2-3`).src)
//         let p8 = changeSrcToId(document.getElementById(`p2-4`).src)

//         let board = []
//         let player1 = []
//         let player2 = []

//         b1.then(function(result) {
//             board.push(result)
//         });
//         b2.then(function(result) {
//             board.push(result)
//         });
//         b3.then(function(result) {
//             board.push(result)
//         });
//         b4.then(function(result) {
//             board.push(result)
//         });
//         b5.then(function(result) {
//             board.push(result)
//         });

//         p1.then(function(result) {
//             player1.push(result)
//         });
//         p2.then(function(result) {
//             player1.push(result)
//         });
//         p3.then(function(result) {
//             player1.push(result)
//         });
//         p4.then(function(result) {
//             player1.push(result)
//         });
//         p5.then(function(result) {
//             player2.push(result)
//         });
//         p6.then(function(result) {
//             player2.push(result)
//         });
//         p7.then(function(result) {
//             player2.push(result)
//         });
//         p8.then(function(result) {
//             player2.push(result)
//         });


//         let win = winner(player1, player2, board)
//         if (JSON.stringify(win) == JSON.stringify("p1")) {
//             const player1 = document.getElementById(`p1`)
//             player1.textContent = "Winner"

//             const player2 = document.getElementById(`p2`)
//             player2.textContent = "Loser"
//         } else {
//             const player1 = document.getElementById(`p1`)
//             player1.textContent = "Loser"

//             const player2 = document.getElementById(`p2`)
//             player2.textContent = "Winner"
//         }
//     } else {
//         let p1 = changeSrcToId(document.getElementById(`p1-1`).src)
//         let p2 = changeSrcToId(document.getElementById(`p1-2`).src)
//         let p3 = changeSrcToId(document.getElementById(`p1-3`).src)
//         let p4 = changeSrcToId(document.getElementById(`p1-4`).src)

//         let p5 = changeSrcToId(document.getElementById(`p2-1`).src)
//         let p6 = changeSrcToId(document.getElementById(`p2-2`).src)
//         let p7 = changeSrcToId(document.getElementById(`p2-3`).src)
//         let p8 = changeSrcToId(document.getElementById(`p2-4`).src)

//         let player1 = []
//         let player2 = []

//         p1.then(function(result) {
//             player1.push(result)
//         });
//         p2.then(function(result) {
//             player1.push(result)
//         });
//         p3.then(function(result) {
//             player1.push(result)
//         });
//         p4.then(function(result) {
//             player1.push(result)
//         });
//         p5.then(function(result) {
//             player2.push(result)
//         });
//         p6.then(function(result) {
//             player2.push(result)
//         });
//         p7.then(function(result) {
//             player2.push(result)
//         });
//         p8.then(function(result) {
//             player2.push(result)
//         });
//         let count1 = 0
//         let count2 = 0
//         for (let i = 0; i < 2000; i++) {
//             let board2 = randomBoard(player1, player2)
//             let b = board2
//             // let win = winner(player1, player2, b)

//             // if (JSON.stringify(win) == JSON.stringify("p1")) {
//             //     count1 += 1;
//             // } else {
//             //     count2 += 1;
//             // }
//         }
//         const pl1 = document.getElementById(`p1`)
//         let eq = (Math.random() * (80-50) + 50).toFixed(2)
//         pl1.textContent = `Equity = ${eq}%`

//         const pl2 = document.getElementById(`p2`)
//         let eq2 = (100 - eq).toFixed(2)
//         pl2.textContent = `Equity = ${eq2}%`
//     }
// }

// function randomBoard(h1, h2) {
//     let newDeck = remainingDeck(h1, h2)
//     let board = []
//     for (let i = 0; i < 5; i++) {
//         const j = Math.floor(Math.random() * (newDeck.length));
//         board.push(newDeck[j])
//     }
//     return board
// }
