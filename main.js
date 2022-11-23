let xWins = 0
let oWins = 0




const boxes = document.querySelectorAll(".box");
const restartButton = document.querySelectorAll("restartButton")

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""]
let player = "x"
let gameRunning = false

var pcPick = options[Math.floor(Math.random()*options.length)]


function startGame() {
    gameRunning = true;
    boxes.forEach(box => box.addEventListener("click", boxClicked))
    if (gameRunning != true){
        boxes.forEach(box => box.remove("click"))
        pcPick
        console.log(pcPick + "awdawd")
    }
}

function switchPlayer() {

    if (player == "x") {
        player = "o"
  
    }
    else {
        player = "x"

    }
}

function boxClicked() {
    const boxnumber = this.getAttribute("boxnum");

    if (gameRunning == true) {
        if (options[boxnumber] != "") {
           
            return;

        }
    }

    updateBox(this, boxnumber);
    checkWinner()
    switchPlayer()
}


function updateBox(box, index) {

    options[index] = player;
    box.textContent = player
}

function checkWinner() {
    let roundWon = false;


    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const boxA = options[condition[0]];
        const boxB = options[condition[1]];
        const boxC = options[condition[2]];

        if (boxA == "" || boxB == "" || boxC == "") {
            continue;
        }
        if (boxA == boxB && boxB == boxC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        
        console.log(options)
        gameRunning = false
        setTimeout( alert.bind(null,player + " Won"))
        if( player == "x" ){
            xWins++
        }
        if (player == "o"){
            oWins++
        }
        
        document.getElementById("x-wins").innerHTML = xWins
        document.getElementById("o-wins").innerHTML = oWins
        
    }

}

function Restart() {
    gameRunning = true
    options = ["", "", "", "", "", "", "", "", ""]
    boxes.forEach(box => box.textContent = "")
    player = "x"
    console.log(options)
   
}

startGame()