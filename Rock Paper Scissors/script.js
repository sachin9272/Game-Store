let message = document.querySelector('#message');
let newGame = document.querySelector('#new-game');
let popupRef = document.querySelector(".popup");
let your_score = document.getElementById("your-score");
let opponent_score = document.getElementById("opponent-score");
let exit = document.querySelector('#exit');

let you;
let yourscore=0;
let opponent;
let opponentScore=0;
let count=0;
// popupRef.classList.remove("hide");

let choices = ["rock","paper","scissors"];

window.onload = function(){
    for(let i=0;i<3;i++){
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click",selectChoice);
        document.getElementById("choices").append(choice);
    }
}

function selectChoice() {
    you = this.id;
    document.getElementById("your-choice").src = you + ".png";
    opponent = choices[Math.floor(Math.random()*3)];
    document.getElementById("opponent-choice").src = opponent + ".png";

    if(you == opponent){
        yourscore += 1;
        opponentScore += 1;
        count+=1;
    }else{
        if(you == "rock"){
            if(opponent == "scissors"){
                yourscore += 1;
            }
            else if(opponent == "paper"){
                opponentScore += 1;
            }
            count+=1;
        }
        else if(you == "scissors"){
            if(opponent == "paper"){
                yourscore += 1;
            }
            else if(opponent == "rock"){
                opponentScore += 1;
            }
            count+=1;
        }
        else if(you == "paper"){
            if(opponent == "rock"){
                yourscore += 1;
            }
            else if(opponent == "scissors"){
                opponentScore += 1;
            }
            count+=1;
        }
    }
    your_score.innerText = yourscore;
    opponent_score.innerText = opponentScore;
    if(count==5){
        popupRef.classList.remove("hide");
        if(opponentScore>yourscore){
            message.innerHTML = "&#128577; <br> You 'Lose'";
        }
        else{
            message.innerHTML = "&#x1F389; <br> You 'Won'";
        }
        newGame.addEventListener('click',() => {
          count = 0;
          opponentScore = 0;
          yourscore = 0;
          your_score.innerHTML = 0;
          opponent_score.innerHTML = 0;
          popupRef.classList.add("hide");
        });
    }
}

exit.addEventListener('click',() => {
    window.location.href = "../index.html";
});