let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.querySelector("#new-game");
let restartBtn = document.querySelector("#restart");
let msgRef = document.querySelector("#message");
const exitBtn = document.querySelector('#exit');

let winningPattern = [
    [0,1,2],
    [0,3,6],
    [2,5,8], 
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
}

const enableButtons = () => {
    btnRef.forEach(element =>{
        element.innerText = ""
        element.disabled = false;
    });
    popupRef.classList.add("hide");
}



newGameBtn.addEventListener("click",()=>{
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click",() => {
  count = 0;
  enableButtons();
});

const winFunction = (letter) => {
    disableButtons();
    if(letter == "X"){
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins" ;
    }else{
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins" ;
    }
};

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
}

const winChecker = () => {
    for(let i of winningPattern){
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        if(element1 != "" && (element2 != "") && (element3 != "")){
            if(element1 == element2 && element2 == element3){
                winFunction(element1);
            }
        }
    }
}

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if(xTurn){
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
        }
        else{
            xTurn = true;
            element.innerText = "O";
            element.disabled = true;
        }
        count += 1;
        if(count == 9){
            drawFunction();
        }
        winChecker();
    });
});

exitBtn.addEventListener('click',() => {
  window.location = '../index.html';
});

window.onload = enableButtons;