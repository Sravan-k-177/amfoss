const difficultyLevelMessage = document.getElementById("textDifficulty");
var difficultyLevelNow =1;
difficultyLevelMessage.innerText="1";
var computerArray = [];
var inputArray =[];
var round, can_input, delay, isgameover, playing;
let inputButtons = ["Q","W","E","R","T","Y","U","I","O"];
let computerArrayButtons = [];

const buttonOne = document.getElementById('button1');
const buttonTwo = document.getElementById('button2');
const buttonThree = document.getElementById('button3');
const buttonFour = document.getElementById('button4');
const buttonFive = document.getElementById('button5');
const buttonSix = document.getElementById('button6');
const buttonSeven = document.getElementById('button7');
const buttonEight = document.getElementById('button8');
const buttonNine = document.getElementById('button9');
const highScoreText = document.getElementById('highScoreText');

const buttons = [buttonOne, buttonTwo, buttonThree, buttonFour, buttonFive, buttonSix, buttonSeven, buttonEight, buttonNine];

const targetSequenceText = document.getElementById("targetSequence");

const scoreButton3 = document.getElementById("roundbutton2");
const scoreButton2 = document.getElementById("roundbutton3");
const scoreButton1 = document.getElementById("roundbutton4");

let highScoreDifficulty1 =0;
let highScoreDifficulty2 =0;
let highScoreDifficulty3 =0;
let score = 0;

// function highlightKey(event){
//     var key = event.key.toLowerCase();
//     switch(key){
//         case 'q':
//             //console.log('q');
//             changeColour(buttonOne);
//             break;
//         case 'w':
//             //console.log('w');
//             changeColour(buttonTwo);
//             break;
//     }
// }





document.addEventListener('keydown', handleUserInput);


function difficultyInc(){
    // console.log(Number(difficultyLevelMessage.innerText));
    switch(Number(difficultyLevelMessage.innerText)){
        case 1:
            // console.log("pass1");
            difficultyLevelMessage.innerText="2";
            difficultyLevelNow=Number(difficultyLevelMessage.innerText);
            break;
        case 2:
            // console.log("pass2");
            difficultyLevelMessage.innerText="3";
            difficultyLevelNow=Number(difficultyLevelMessage.innerText);
            break;
        case 3:
            // console.log("pass3");
            difficultyLevelMessage.innerText="1";
            difficultyLevelNow=Number(difficultyLevelMessage.innerText);
            // alert("Max level");
            break;
        
    }
    // console.log(difficultyLevelMessage.innerText+"lol");
    // console.log(difficultyLevelNow);
    highScoreUpdate();
}

function difficultyRed(){
    switch(Number(difficultyLevelMessage.innerText)){
        case 1:
            difficultyLevelMessage.innerText="3";
            difficultyLevelNow=Number(difficultyLevelMessage.innerText);
            // alert("min level!");
            break;
        case 2:
            difficultyLevelMessage.innerText="1";
            difficultyLevelNow=Number(difficultyLevelMessage.innerText);
            break;
        case 3:
            difficultyLevelMessage.innerText="2";
            difficultyLevelNow=Number(difficultyLevelMessage.innerText);
            break;
    }
    // console.log(difficultyLevelMessage.innerText+"lol");
    // console.log(difficultyLevelNow);
    highScoreUpdate();
}


function changeColour(x){
    x.style.color="white";
    if (difficultyLevelNow == 3){
    setTimeout(() => revertColour(x), 100);
    }
    else if (difficultyLevelNow == 2){
        setTimeout(()=> revertColour(x),500);
    }
    else{
        setTimeout(()=> revertColour(x),1000);
    }
}

function revertColour(x){
    x.style.color="rgb(54, 7, 104)";
}


function startGame() {
    round = 1;
    can_input = false;
    isgameover = false;
    computerArray = [];
    inputArray = [];
    nextRound();
    displayScore();
}

function nextRound() {
    inputArray = [];
    can_input = false;
    computerArray.push(Math.floor(Math.random() * 9) + 1);
    console.log(computerArray);
    displaySequence(0);
}

function displaySequence(index) {
    if (index < computerArray.length) {
        let button = buttons[computerArray[index] - 1];
        changeColour(button);

        setTimeout(function () {
            revertColour(button);
            displaySequence(index + 1);
        }, getDelay());
    } else {
        setTimeout(function () {
            can_input = true;
        }, 500);
    }
}

function handleUserInput(event) {
    if (!can_input) {
        return;
    }

    let key = event.key.toUpperCase();
    let index = inputButtons.indexOf(key);

    if (index !== -1) {
        changeColour(buttons[index]);
        setTimeout(function () {
            revertColour(buttons[index]);
        }, 300);

        inputArray.push(index + 1);
        validateInput(index + 1);
    }
}

function validateInput(input) {
    if (inputArray[inputArray.length - 1] !== computerArray[inputArray.length - 1]) {
        gameOver();
        return;
    }

    if (inputArray.length === computerArray.length) {
        setTimeout(function () {
            round+=1;
            nextRound();
            displayScore();
        }, 1000);
    }
}

function gameOver() {
    isgameover = true;
    can_input = false;
    switch (difficultyLevelNow){
        case 3:
            if((round-1)>highScoreDifficulty3){
                highScoreDifficulty3=round-1;
            }
            score = round-1;
            alert("Game Over! Score:"+ score);
            break;
        case 2:
            if((round-1)>highScoreDifficulty2){
                highScoreDifficulty2=round-1;
            }
            score = round-1;
            alert("Game Over! Score:"+ score);
            break;
        case 1:
            if((round-1)>highScoreDifficulty1){
                highScoreDifficulty1=round-1;
            }
            score = round-1;
            alert("Game Over! Score:"+ score);
            break;
    }
    // startGame();
    resetScore();
    highScoreUpdate();
}

function getDelay() {
    if (difficultyLevelNow === 3) {
        return 200;
    } else if (difficultyLevelNow === 2) {
        return 500;
    } else {
        return 1000;
    }
}

document.addEventListener('keydown', handleUserInput);

function highScoreUpdate(){
    if (difficultyLevelNow == 3){
        highScoreText.innerText="High Score: " +highScoreDifficulty3;
    }
    else if (difficultyLevelNow == 2){
    highScoreText.innerText="High Score: " + highScoreDifficulty2;
    }
    else{
    highScoreText.innerText="High Score: " + highScoreDifficulty1;
    }
}

function displayScore(){
    scoreButton1.innerText = (round-1)%10;
    scoreButton2.innerText = (Math.floor((round-1)/10))%10;
    scoreButton3.innerText = (Math.floor((round-1)/100))%10;
}

function resetScore(){
    scoreButton1.innerText=0;
    scoreButton2.innerText=0;
    scoreButton3.innerText=0;
}
//you can change the level in the middle of the game lol