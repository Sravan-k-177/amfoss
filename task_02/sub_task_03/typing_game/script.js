// inside script.js
// all of our quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const messageElement2 = document.getElementById('message2');
const typedValueElement = document.getElementById('typed-value');
const introElement = document.getElementById('intro');
const introElement2 = document.getElementById("intro2");
const dialog = document.querySelector("dialog");
//const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const dialogMessage = document.getElementById("finaloutput");

// "Show the dialog" button opens the dialog modally
// showButton.addEventListener("click", () => {
//   dialog.showModal();
// });

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

let highScore;
//let finishFlag = 0;

// at the end of script.js
document.getElementById('start').addEventListener('click', () => {
    // get a quote
    document.getElementById('typed-value').disabled = false;
    document.getElementById('typed-value').script = "color: white;";
    enable(document.getElementById('typed-value'))

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;
  
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
    messageElement2.innerText = '';
    introElement.innerText = '';
    introElement2.innerText= '';  

  
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler
  
    // Start the timer
    startTime = new Date().getTime();
  });

// at the end of script.js
typedValueElement.addEventListener('input',  () => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // end of sentence
      // Display success
      const elapsedTime = new Date().getTime() - startTime;
      const message2 = `You have typed with a speed of ${Math.round(words.length*60000/elapsedTime)}wpm!`
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      let currentScore = Math.round(words.length*60000/elapsedTime);
      let highScoreTwo = highScore;
      let extraMessage = '';
      if (highScore = null){
        highScore = 0;
      }
      if (currentScore>highScore){
        highScore = currentScore;
        extraMessage = `you beat your last High Score of ${highScoreTwo}WPM!`
      }
      dialogMessage.innerText = `HighScore is: ${highScore}WPM!; current score is: ${currentScore}WPM! ${extraMessage} `;
      //working here brooooo
      //
      //
      //
      //working here bro
      //removeEventListener(text, typed-value);
      //finishFlag = 1;
      dialog.showModal();
      document.getElementById('typed-value').disabled = true;
      document.getElementById('typed-value').script = "color: transparent";
      messageElement.innerText = message;
      messageElement2.innerText = message2;
      quoteElement.innerText = '';
      start.innerHTML = 'retry';
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';
      // move to the next word
      wordIndex++;
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = '';
    } else {
      // error state
      typedValueElement.className = 'error';
    }
  });

// if (finishFlag == 1){
//   typedValueElement.removeEventListener('input', );
// }

function enable(x){
  x.script.color = "yellow";
}

function disable(x){
  x.script.color = "transaparent";
}