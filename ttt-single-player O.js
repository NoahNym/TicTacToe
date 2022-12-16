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
player = "o"
clicker = "o"
let gameRunning = false
let roundwon = false


function startGame() {
    gameRunning = true;
    boxes.forEach(box => box.addEventListener("click", boxClicked))
    if (gameRunning != true) {
        boxes.forEach(box => box.remove("click"))
    }
}



function boxClicked() {
    const boxnumber = this.getAttribute("boxnum");
    if (gameRunning == true) {
        if (options[boxnumber] != "") {

            return;

        }
        else {




            updateBox(this, boxnumber);
            checkWinner()

            setTimeout(pcClick(), 1000)


        }
    }

}

function switchClicker() {

    if (clicker == "o") {
        clicker = "x"

    }
    else {
        clicker = "o"

    }


}




function random() {
    const randomItem = Math.floor(Math.random() * 9)
    pcClick(randomItem)

}



function pcClick(randomItem) {
    console.log(options)

    if (gameRunning == true) {
        switchClicker()
        box = document.getElementById(randomItem)

        console.log(randomItem)


        if (options[randomItem] == "") {
            options[randomItem] = "x"
            box.innerHTML = "x"
        }
        else {
            random()
        }



        checkWinner()

        switchClicker()
    }

}









function updateBox(box, index) {

    options[index] = "o";
    box.innerHTML = "o"



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
            if (document.innerText == player) {
                forEach(box => box.AddA)
            }
            break;
        }
    }

    if (roundWon) {


        gameRunning = false

        if (clicker == "o") {
            if (roundwon == false) {
                oWins++
                roundwon = true
                document.getElementById("winner").innerText = "O" + " Won"
                console.log(options)
            }
        }
        else {
            if (roundwon == false) {
                xWins++
                roundwon = true
                document.getElementById("winner").innerText = "X" + " Won"
                console.log(options)
            }
        }

        document.getElementById("x-wins").innerHTML = xWins
        document.getElementById("o-wins").innerHTML = oWins

    }

}

function Restart() {
    gameRunning = true
    options = ["", "", "", "", "", "", "", "", ""]
    boxes.forEach(box => box.textContent = "")
    player = "o"
    clicker = "o"
    roundwon = false
    document.getElementById("winner").innerText = ""
}
startGame()