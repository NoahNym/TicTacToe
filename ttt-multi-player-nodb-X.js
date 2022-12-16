import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onChildAdded,
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

let options = [
    (ref(db, "input0"), ""),
    (ref(db, "input1"), ""),
    (ref(db, "input2"), ""),
    (ref(db, "input3"), ""),
    (ref(db, "input4"), ""),
    (ref(db, "input5"), ""),
    (ref(db, "input6"), ""),
    (ref(db, "input7"), ""),
    (ref(db, "input8"), "")]
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
    updateBox(this, boxnumber)
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


            set(ref(db, "input" + boxnumber), player)

        }

    }

}












function updateBox( index, boxnumber) {

    options[index] = (ref(db, "input" + boxnumber), player);
    document.getElementById("0").innerText = options[0] 
document.getElementById("1").innerText = options[1] 
document.getElementById("2").innerText = options[2] 
document.getElementById("3").innerText = options[3] 
document.getElementById("4").innerText = options[4] 
document.getElementById("5").innerText = options[5] 
document.getElementById("6").innerText = options[6] 
document.getElementById("7").innerText = options[7] 
document.getElementById("8").innerText = options[8] 

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
                set(ref(db, "xWins"), xWins)
                roundwon = true
                document.getElementById("winner").innerText = "X" + " Won"
            }
        }
        if (player == "o") {
            if (roundwon == false) {
                oWins++
                set(ref(db, "oWins"), oWins)
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