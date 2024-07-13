const moves = document.querySelector('#moves-count');
const timeValue = document.querySelector('#time');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const gameContainer = document.querySelector('.game-container');
const result = document.querySelector('#result');
const controls = document.querySelector('.controls-container');
let cards;
let interval;
let firstCard = false;
let secondCard = false;


const items = [
    {name:"bee", image: "animal.png"},
    {name:"chameleon", image:"chameleon.png"},
    {name:"crocodile", image:"crocodile.png"},
    {name:"elephant", image:"elephant.png"},
    {name:"fish", image:"fish.png"},
    {name:"gorilla", image:"gorilla.png"},
    {name:"lion", image:"lion.png"},
    {name:"monkey", image:"monkey.png"},
    {name:"ostrich", image:"ostrich.png"},
    {name:"snake", image:"snake.png"},
    {name:"tiger", image:"tiger.png"},
    {name:"scarlet-macaw", image:"scarlet-macaw.png"},
];
let seconds = 0, minutes = 0;
let movesCount = 0, winCount = 0;

const timeGenerator = () => {
    seconds += 1;
    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }

    let secondsValue = seconds < 10 ? `0${seconds}`:seconds;
    let minutesValue = minutes < 10 ? `0${minutes}`:minutes;

    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`
};

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
}

const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];

    size  = (size*size)/2;
    for(let i=0;i<size;i++){
        const randomIndex = Math.floor(Math.random()*tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex,1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size=4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(()=>Math.random()-0.5);
    for(let i=0;i<size*size;i++){
        gameContainer.innerHTML += `
        <div class = "card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
                <img src="${cardValues[i].image}" class="image"/>
            </div>

        </div>`;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card)=>{
        card.addEventListener('click', ()=>{
            if(!card.classList.contains("matched")){
                card.classList.add("flipped")
                if(!firstCard){
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else{
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if(firstCardValue === secondCardValue){
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;
                        if(winCount == Math.floor(cardValues.length/2)){
                            result.innerHTML = `<h2>You won</h2>
                            <h4>Moves: ${movesCount}</h4>`
                            stopGame();
                        }
                    }
                    else{
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(()=>{
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        },900)
                    }
                }
            }
            
        });
    });
};

startBtn.addEventListener('click',()=>{
    movesCount = 0;
    time = 0;
    seconds = 0;
    minutes = 0;
    controls.classList.add("hide");
    stopBtn.classList.remove("hide");
    startBtn.classList.add("hide");

    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
});

stopBtn.addEventListener('click',(stopGame = () => {
//   controls.classList.remove("hide");
//   stopBtn.classList.add("hide");
//   startBtn.classList.remove("hide");
//   clearInterval(interval);
    window.location = '../index.html';
}));

const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};
