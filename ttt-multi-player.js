import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
    getDatabase,
    ref,
    
    set,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDjFRgoTGxsFqb_EwvcGACOkzeVnUivK2c",
    authDomain: "games-9a0ad.firebaseapp.com",
    databaseURL: "https://games-9a0ad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "games-9a0ad",
    storageBucket: "games-9a0ad.appspot.com",
    messagingSenderId: "683547381745",
    appId: "1:683547381745:web:2c329373f0e276c310fe50",

};



const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


















let xWins = 0
let oWins = 0




const boxes = document.querySelectorAll(".box");


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
let roundwon = false
let boxnumber



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

            switchPlayer(boxnumber)

        }

    }
}




function switchPlayer(boxnumber) {

    set(ref(db, "input" + boxnumber), player)
    let log = (ref(db, "input" + boxnumber), player)
    if (player == "x") {

        set(ref(db, "player/"), "o")
        player = "o"

    }
    else if (player == "o") {

        set(ref(db, "player/"), "x")
        player = "x"

    }


    console.log(log)
}



function updateBox(box, index) {

    options[index] = (ref(db, "input" + boxnumber), player);
    box.textContent = (ref(db, "input" + boxnumber), player)
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

        if (player == "x") {
            if (roundwon == false) {
                xWins++
                set(ref(db, "xWins/"), xWins)
                roundwon = true
                document.getElementById("winner").innerText = "X" + " Won"
            }
        }
        if (player == "o") {
            if (roundwon == false) {
                oWins++
                set(ref(db, "oWins/"), oWins)
                roundwon = true
                document.getElementById("winner").innerText = "O" + " Won"
            }
        }

        document.getElementById("x-wins").innerHTML = xWins
        document.getElementById("o-wins").innerHTML = oWins

    }
}

document.getElementById("restartButton").addEventListener("click", function () {
    gameRunning = true
    options = ["", "", "", "", "", "", "", "", ""]
    boxes.forEach(box => box.textContent = "")
    player = "x"
    roundwon = false
    document.getElementById("winner").innerText = ""
    set(ref(db, "input0"), "")
    set(ref(db, "input1"), "")
    set(ref(db, "input2"), "")
    set(ref(db, "input3"), "")
    set(ref(db, "input4"), "")
    set(ref(db, "input5"), "")
    set(ref(db, "input6"), "")
    set(ref(db, "input7"), "")
    set(ref(db, "input8"), "")
})



startGame()