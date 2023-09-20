
import multiChoice from "./scripts/multiple-choice-game.js";
import * as UTIL from "./scripts/util" ;
// import GameView from "./scripts/game-view.js";

const startMessage = 'Welcome to Poker Pro! Here you can learn how to play poker. There are three distinct levels but an endless amount of rounds within each level. The goal for each level is to select the strongest hand amoung the player hands. The first level will consist of only 3 different player hands, hands that have only 2 cards. The second level will include a dealers hand, a hand of 3-4 cards, cards that player hands can use to strengthen their hand. Lastly, the final level will include the complete hand of the dealer, 5 cards, cards that player hands can also use to strengthen their hand. Again the goal is select the STRONGEST hand. Good Luck!!!                   READY?!'
let answerMessage = ['Correct!', 'Not quite.']
let level = 1;
let lost = false;
let game;

document.addEventListener("DOMContentLoaded", () => {
    startGame(level);
    const divStartMessage = document.getElementById("start-message");
    divStartMessage.innerHTML = startMessage
    // const divStartbutton = document.getElementById("start-button")
    // divStartbutton.innerHTML = ('Click Here To Start');


    // want to do something similar for my music
    // function toggleMusic(){
    //     audioButton.onclick = function () {
    //       audioButton.classList.toggle('active')
    //       if (audio.paused) {
    //         document.getElementById("play-audio").src = "./assets/darkmodeButtons/musicOn.png"
    //         audio.play()
    //       } else {
    //         document.getElementById("play-audio").src = "./assets/darkmodeButtons/musicOff.png"
    //         audio.pause();
    //       }
    //     }
    // }


    // let game = startGame(level);
    // while(!lost){
    //     let result = startGame(++level);
    //     lost = true;
    // }

})

//listener that grabs the hand the user clicks one to check
document.getElementById('players-hands').addEventListener('click', e => {
    let answer;

    if(e.target.id.slice(0,e.target.id.length-1) === 'player-hand'){
        answer = e.target.id.slice(e.target.id.length-1);
        checkAnswer(game, answer)

    }else if(e.target.parentNode.id.slice(0,e.target.parentNode.id.length-1) === 'player-hand'){
        answer = e.target.parentNode.id.slice(e.target.id.length-1);
        checkAnswer(game, answer)

    }else if(e.target.parentNode.parentNode.id.slice(0,e.target.parentNode.parentNode.id.length-1) === 'player-hand'){
        answer = e.target.parentNode.parentNode.id.slice(e.target.id.length-1);
        checkAnswer(game, answer)
    }
})


//code that creates and shows the scoring img div
const infoClick = document.getElementById("info-button")
let infoVisable = false;
const scoringDiv = document.getElementById('scoring')
const scoringImg = document.createElement('img');
const src = 'images/hand-ranking.png'
scoringImg.setAttribute('src', src);
const infoH3 = document.createElement('h3');
infoH3.innerHTML = 'Tap on info icon again to remove scoring sheet.'
infoClick.addEventListener('click', (e) => {
    // const body = document.getElementById('body')
    if(!infoVisable){
        scoringDiv.append(infoH3)
        scoringDiv.append(scoringImg);
        infoVisable = true;
    }else{
        infoH3.remove();
        scoringImg.remove();
        infoVisable = false;
    }
    // body.setAttribute('filter', 'blur')
})

//checks if the hand the user clicked on is correct, creates new game if correct
function checkAnswer(game, answer){
    if(game.winningHand === game.players[answer-1].hand){
        console.log(answerMessage[0]);
        level++;
        let div = document.getElementById("players-hands");
        div.remove();
        let body = document.getElementById('body')
        div = document.createElement('div')
        div.setAttribute('id', 'players-hands')
        body.append(div)
        lost = false;
        startGame(level);
    }else{
        console.log(answerMessage[1]);
        lost = true;
    }

}

//will create a game, find the winning hand and output the game onto the app
function startGame(level){
    game = new multiChoice();
    let gameResult = game.bestHand(level);
    game.printGame.call(game);
    console.log('Game Results', gameResult)
    let div = document.getElementById("players-hands");

    //for-loop for displaying hands of current game
    for(let i = 0; i < game.players.length; i++){
        let innerDiv = document.createElement('div')
        innerDiv.setAttribute('id', ('player-hand').concat(String(i+1)));
        // innerDiv.setAttribute("style","width:200px");
        div.append(innerDiv);
        let h3 = document.createElement('h3')
        h3.innerHTML = ('hand ').concat(String(i+1))
        innerDiv.append(h3)
        let nestedDiv = document.createElement('div');
        nestedDiv.setAttribute('id', 'cards-container')
        innerDiv.appendChild(nestedDiv);

        const playerHand = game.players[i].hand;
        const cardOne = document.createElement('img');
        const cardTwo = document.createElement('img');
        const firstCardIdx = UTIL.suits.indexOf(playerHand[0].suit);
        const secondCardIdx = UTIL.suits.indexOf(playerHand[1].suit)
        let suitArr = UTIL.cardImgs[firstCardIdx];
        let cardHash = (suitArr.findIndex(el => el.face === playerHand[0].value));
        let cardImg = UTIL.cardImgs[firstCardIdx][cardHash].img;
        cardOne.setAttribute('src', cardImg);
        nestedDiv.appendChild(cardOne);
        suitArr = UTIL.cardImgs[secondCardIdx];
        cardHash = (suitArr.findIndex(el => el.face === playerHand[1].value));
        cardImg = UTIL.cardImgs[secondCardIdx][cardHash].img;
        // console.log(cardImg)
        cardTwo.setAttribute('src', cardImg);
        nestedDiv.appendChild(cardTwo);

    }
    return gameResult // return winning card, later [card, tie, game?, idx?]
}
// function startGame(){ //will be called if user clicks start button

//     while(!lost){
//         let game = new multiChoice();
//         game.printGame.call(game);
//         let div = document.getElementById("players-hands");


//         for(let i = 0; i < game.players.length; i++){
//             let innerDiv = document.createElement('div')
//             innerDiv.setAttribute('id', 'player-hand');
//             // innerDiv.setAttribute("style","width:200px");
//             div.append(innerDiv);
//             let h3 = document.createElement('h3')
//             h3.innerHTML = ('hand ').concat(String(i+1))
//             innerDiv.append(h3)
//             let nestedDiv = document.createElement('div');
//             nestedDiv.setAttribute('id', 'cards-container')
//             innerDiv.appendChild(nestedDiv);

//             const playerHand = game.players[i].hand;
//             const cardOne = document.createElement('img');
//             const cardTwo = document.createElement('img');
//             const firstCardIdx = UTIL.suits.indexOf(playerHand[0].suit);
//             const secondCardIdx = UTIL.suits.indexOf(playerHand[1].suit)
//             let suitArr = UTIL.cardImgs[firstCardIdx];
//             let cardHash = (suitArr.findIndex(el => el.face === playerHand[0].value));
//             let cardImg = UTIL.cardImgs[firstCardIdx][cardHash].img;
//             cardOne.setAttribute('src', cardImg);
//             nestedDiv.appendChild(cardOne);
//             suitArr = UTIL.cardImgs[secondCardIdx];
//             cardHash = (suitArr.findIndex(el => el.face === playerHand[1].value));
//             cardImg = UTIL.cardImgs[secondCardIdx][cardHash].img;
//             console.log(cardImg)
//             cardTwo.setAttribute('src', cardImg);
//             nestedDiv.appendChild(cardTwo);

//         }
//         if(level < 3){
//             let winner = game.roundOneToTwo.call(game)
//             console.log('winner card')
//             console.log(winner)
//             level++;
//             if(level === 2) lost = true;
//         }
//     }

// }

// // document.addEventListener("DOMContentLoaded", () => {

// //     const ctx = canvasEl.getContext("2d");
// //     const game = new multiChoice();
// //     // new GameView(game, ctx).start();
// //   });
// // const canvas = document.getElementById("canvas")
// // canvas.width = 500;
// // canvas.height = 500;


// //have a do loop to create new multChoice games/questions, condition: answer must be right

// // let game = new multiChoice();
// // // game.hands.call(game, 5);
// // console.log(game);
// // game.printGame.call(game, 5);
// // game.dealer.addToHand.call(game.dealer, 1)
// // // console.log("dealer hand")
// // // console.log(game.dealer.hand)
// // console.log('Winner Hand')
// // console.log(game.bestHand.call(game, 3));

// // startGame();

// ///build a database with possible questions to query for to use during each round


// // createTable(game);

// // function createTable(game){
//     // const canvas = document.querySelector('#canvas');
//     // const ctx = canvas.getContext('2d');
//     // for(let i = 0; i < 1; i++){

//     //     const playerHand = game.players[i].hand
//     //     const cardOne = document.createElement('img');
//     //     const firstCardIdx = UTIL.suits.indexOf(playerHand[0].suit);
//     //     let suitArr = UTIL.cardImgs[firstCardIdx];
//     //     let cardHash = (suitArr.findIndex(el => el.face === playerHand[0].value));
//     //     let cardImg = UTIL.cardImgs[firstCardIdx][cardHash].img;
//     //     console.log(cardImg);
//     //     cardOne.setAttribute('src', cardImg);
//     //     cardOne.setAttribute('data-id', 'player'.concat(i+1))
//     //     // canvas.append(cardOne);
//     //     // const img = new Image();
//     //     // img.src = cardImg;
//     //     // ctx.drawImage(
//     //     //     cardImg, 0,0
//     //     // )

//     //     const cardTwo = document.createElement('img');
//     //     const secondCardIdx = UTIL.suits.indexOf(playerHand[1].suit)
//     //     suitArr = UTIL.cardImgs[secondCardIdx];
//     //     cardHash = (suitArr.findIndex(el => el.face === playerHand[1].value));
//     //     cardImg = UTIL.cardImgs[secondCardIdx][cardHash].img;
//     //     console.log(cardImg);
//     //     cardTwo.setAttribute('src', cardImg);
//     //     cardTwo.setAttribute('data-id', 'player'.concat(i+1))

//     //     console.log(cardOne, 1);
//     //     console.log(cardTwo, 2);
//     // }
// // }

// // function draw(){

// // }
