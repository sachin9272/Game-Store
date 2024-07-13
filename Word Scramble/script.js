const wordText = document.querySelector(".word");
const Hint = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".Check-word");
const inputField = document.querySelector('input');
const timeText = document.querySelector('.time b');
const exit = document.querySelector('.exit');

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(()=>{
        if(maxTime > 0){
            maxTime--;
            return timeText.innerHTML = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    },1000)
}
 
const initGame = () => {
    initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for(let i = wordArray.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i+1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerHTML= wordArray.join("");
  Hint.innerHTML = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength",correctWord.length);
}
initGame();
const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) return alert('Please enter a word check')
    if(userWord !== correctWord){
        alert(`Oops! ${userWord} is not a correct word`);
        inputField.value = "";
    }
    else {
        alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
        initGame();
    }
}
refreshBtn.addEventListener('click',initGame);
checkBtn.addEventListener('click',checkWord);


exit.addEventListener('click',() => {
    window.location = '../index.html';
})