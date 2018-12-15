var cswitch = document.getElementById("playComputer");
var playXorO = document.getElementById("playXorO");
var onLabel = document.querySelector("#on");
var offLabel = document.querySelector("#off");
var playButton = document.getElementById("play");
var xOrO = document.getElementById("xOrO");
var textInfo = document.getElementById("textInfo");
var turn = "";
var nPlays = 0;
var winner = "";

// grid is object array which associate each element A1,A2..B1,B2 and so on each span element in the html section, A B and C represent raws while 1 2 3 coloms
var grid = {
    A: [],
    B: [],
    C: []
};

//the gridMap is the logical representation of the X and O in the html matrix it gets updated at every user choice 
var gridMap = {
    A: ["","",""],
    B: ["","",""],
    C: ["","",""]
};


cswitch.addEventListener ("click", function(){
    onLabel.classList.toggle('notDisplay');
    offLabel.classList.toggle('notDisplay');
    xOrO.classList.toggle('notVisible');
});



function gameInit(){
    nPlays = 0;
    for (let raw in grid){
        for (let i = 0; i < 3; i++) {
            grid[raw][i] = document.getElementById(raw + String(i+1));
        }
    }
    turn = "x";
    winner = "";
};

function clearGrids(){
    gridMap = {
        A: ["","",""],
        B: ["","",""],
        C: ["","",""]
    };
};


playButton.addEventListener ("click", function(){
    gameInit();
    clearGrids();
    populateGrid();
    document.getElementById("textInfo").innerHTML = turn.toUpperCase() + " Turn";
    for (let raw in grid){
        for (let i = 0; i < 3; i++) {
            grid[raw][i].addEventListener('click', function(){
                play(raw, i);
            });
        };
    };
}); 


function play(raw, col){   
    if (gridMap[raw][col] === "" && winner === ""){
        gridMap[raw][col] = turn;
        populateGrid();
        nPlays++;
        //console.log("Clicked");
        winner = checkWin();
        if (winner === "") {
            if (turn === "x") {turn = "o"} else turn = "x";
            document.getElementById("textInfo").innerHTML = turn.toUpperCase() + " Turn";
        } else gameOver(winner);
    }
}


function gameOver(winner){
    if (winner === "draw") {
        document.getElementById("textInfo").innerHTML = "DRAW!";
    } else {
        document.getElementById("textInfo").innerHTML = "The Winner is " + winner.toUpperCase();
    }
};


function checkWin(){
    let winner = "";
    for (let raw in grid){
            if (gridMap[raw][0] === gridMap[raw][1] && gridMap[raw][0] === gridMap[raw][2]){
                winner = gridMap[raw][0];
                if (winner != "") return(winner);
            };
    }
        
    for (let i = 0; i < 3; i++) {
        if (gridMap["A"][i] === gridMap["B"][i] && gridMap["A"][i] === gridMap["C"][i]){
            winner = gridMap["A"][i];
            if (winner != "") return(winner);
        };
    }

    if (gridMap["A"][0] === gridMap["B"][1] && gridMap["A"][0] === gridMap["C"][2]){
        winner = gridMap["A"][0];
        if (winner != "") return(winner);
    };

    if (gridMap["C"][0] === gridMap["B"][1] && gridMap["C"][0] === gridMap["A"][2]){
        winner = gridMap["C"][0];
        if (winner != "") return(winner);
    };

    if (nPlays === 9 && winner === "") {return "draw"} else {return winner}
     
};

// if (playComputer.checked === true ){
    
// }

// if (playXorO.checked === true ){
    
// }


//function that popolates the grid based on the values of gridmap

function populateGrid(){
    for (let raw in grid){
        for (let i = 0; i < 3; i++) {
            if (gridMap[raw][i] === "x") {
                grid[raw][i].classList.add("cross");
                grid[raw][i].classList.remove("circle");
            }
            if (gridMap[raw][i] === "o") {
                grid[raw][i].classList.add("circle");
                grid[raw][i].classList.remove("cross");
            } else if (gridMap[raw][i] === ""){
                grid[raw][i].classList.remove("cross");
                grid[raw][i].classList.remove("circle");
            }
        }
    } 
}