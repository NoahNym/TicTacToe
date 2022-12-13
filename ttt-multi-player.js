import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onChildAdded,
    set,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
let roundwon = false
var sak = Text
if ( sak == "click"){
    console.log(sak)
}

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
           console.log(options)
        }

    }
}
    console.log(sak)
    //add another option value for firebase


    function switchPlayer(boxnumber) {

        if (player == "x") {
            set(ref(db, "x/"), Text = boxnumber)
            player = "o"

        }
        else if (player == "o") {
            set(ref(db, "o/"), Text = boxnumber)
            player = "x"

        }
        set(ref(db, "click/"), Text = boxnumber)

       

        console.log(Text)
        
        
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

        if (player == "x") {
            if (roundwon == false) {
                xWins++
                roundwon = true
                setTimeout(alert.bind(null, "x" + " Won"))
            }
        }
        if (player == "o") {
            if (roundwon == false) {
                oWins++
                roundwon = true
                setTimeout(alert.bind(null, "o" + " Won"))
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
})



startGame()