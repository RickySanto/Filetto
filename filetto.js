// Tic-Tac-Toe game written by Riccardo Santoni
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
var cPlay = ""; //variable representing the sign that the computer plays between x and o

// grid is object array which associate each html object with an element element A1,A2..B1,B2 in order to control the display of the game on the screen
var grid = {
    A: [],
    B: [],
    C: []
};

//the gridMap array of array is the logical representation of the X and O in the html matrix 
var gridMap = {
    A: ["","",""],
    B: ["","",""],
    C: ["","",""]
};

//display or hide switches to select symbols and enable AI
cswitch.addEventListener ("click", function(){
    onLabel.classList.toggle('notDisplay');
    offLabel.classList.toggle('notDisplay');
    xOrO.classList.toggle('notVisible');
});


//This initialize the variables for initial play
function gameInit(){
    nPlays = 0;
    for (let row in grid){
        for (let i = 0; i < 3; i++) {
            grid[row][i] = document.getElementById(row + String(i+1));
        }
    }
    turn = "x";
    winner = "";
    cPlay = "";
    gridMap = {
        A: ["","",""],
        B: ["","",""],
        C: ["","",""]
    };
};


// the game starts when the play button is clicked
playButton.addEventListener ("click", function(){
    gameInit();
    populateGrid();
    document.getElementById("textInfo").innerHTML = turn.toUpperCase() + " Turn";
    for (let row in grid){
        for (let i = 0; i < 3; i++) {
            grid[row][i].addEventListener('click', function(){
                play(row, i);
            });
        };
    };

    if (cswitch.checked === true ){
        if (playXorO.checked === false ){
            cPlay = "o"
        } else { 
            cPlay = "x";
            playComputer();
        }
    }
}); 

//this function is called every time a new move is made by any player - is the main function where the logic of the main play is based
function play(row, col){
    if (gridMap[row][col] === "" && winner === ""){
        gridMap[row][col] = turn;
        populateGrid();
        nPlays++;
        winner = checkWin();
        if (winner === "") {
            if (turn == "x") {turn = "o"} else {turn = "x"};
            document.getElementById("textInfo").innerHTML = turn.toUpperCase() + " Turn";
            if (turn == cPlay) {playComputer()};
        } else {
            if (winner === "draw") {
                document.getElementById("textInfo").innerHTML = "DRAW!";
            } else {
                document.getElementById("textInfo").innerHTML = "The Winner is " + winner.toUpperCase();
            };
        };
    };
};

//function that popolates the grid based on the values of gridmap
function populateGrid(){
    for (let row in grid){
        for (let i = 0; i < 3; i++) {
            if (gridMap[row][i] === "x") {
                grid[row][i].classList.add("cross");
                grid[row][i].classList.remove("circle");
            }
            if (gridMap[row][i] === "o") {
                grid[row][i].classList.add("circle");
                grid[row][i].classList.remove("cross");
            } else if (gridMap[row][i] === ""){
                grid[row][i].classList.remove("cross");
                grid[row][i].classList.remove("circle");
            }
        }
    } 
}

//this function generates the next move for the computer player - if it is enabled
function playComputer(){
    let move;
    let col;
    let row;
    let manualPlay;
    let rows = ["A","B","C"];
    // set manual play opposite from cPlay
    if (cPlay == "x") {manualPlay = "o"} else {manualPlay = "x"};

    // if it's the first play select random choise
    if (nPlays === 0) {
        row = rows[Math.floor(Math.random()*rows.length)];
        col = Math.floor(Math.random()*3);
        play(row, col);
    } else {
        // find two in a line for computer sign
        move = checkTwoInLine(cPlay, manualPlay);
        
        if (move != null){
            console.log("Function PlayComputer, See move:" + move[0] + " " + move[1]);
            play(move[0], move[1]);
        } else {
            // find two in a row for opponent sign to stop him from win
            move = checkTwoInLine(manualPlay, cPlay);
            if (move != null){
                play(move[0], move[1])
            }
            else {
                // if no two same sign in a line are found it call the function to calculate the best move
                move = findBestMove(cPlay, manualPlay);
                play(move[0], move[1]);
            };
        };
    };
};

//this function calculate the best move - at the moment has been left with little logic to make the game not very hard - MinMax algorithm not used
function findBestMove(main, opponent){
    let moveArray = [];
    let move;
    if (gridMap["B"][1] === ""){
        move = ["B", 1];
        return move;
    } else {
    for (let row in grid){
        for (let i = 0; i < 3; i++) {
            if (gridMap[row][i] === ""){
                move = [row, i];
                moveArray.push(move);
            }
        }
    }
    move = moveArray[Math.floor(Math.random()*moveArray.length)];
    return move;
    }
}

//check if there are two simbols of the same type on any line - orizontal, vertical or diagonal
function checkTwoInLine(main, opponent) {
    let move = [];
    let rowSet;
    let col;
    let count = 0;
    //check two in a Line on rows 
    for (let row in grid){
        for (let i = 0; i < 3; i++) {
            if (gridMap[row][i] === main) {count++};
            if (gridMap[row][i] === opponent) {count--};
            if (gridMap[row][i] === "") {col = i};
        }
        if (count === 2) {
            move = [row, col];
            console.log("checktwoinLine rows" + move[0] + move[1]);
            return move;
        }
        count = 0;
    }

    //check two in a Line on columns
    for (let i = 0; i < 3; i++) {
        count = 0;
        for (let row in grid){
            if (gridMap[row][i] === main) {count++};
            if (gridMap[row][i] === opponent) {count--};
            if (gridMap[row][i] === "") {rowSet = row};    
        }
        if (count === 2) {
            move = [rowSet, i];
            console.log("checktwoinLine colums" + move[0] + move[1]);
            return move;
        }   
    }

    // Check diagonal lines
    count = 0;
    for (let row in grid){   
        for (let i = 0; i < 3; i++) {
            if (row === "A" && i === 0 || row === "B" && i === 1 || row === "C" && i === 2) {
                if (gridMap[row][i] === main) {count++};
                if (gridMap[row][i] === opponent) {count--};
                if (gridMap[row][i] === "") {
                    col = i;
                    rowSet = row;
                };
            }
        }
    };
    if (count === 2) {
        move = [rowSet, col];
        console.log("checktwoinLine diagonal 1" + move[0] + move[1]);
        return move;
    };

    //check other diagonal
    count = 0;
    for (let row in grid){
        for (let i = 0; i < 3; i++) {
            if (row === "C" && i === 0 || row === "B" && i === 1 || row === "A" && i === 2) {
                if (gridMap[row][i] === main) {count++};
                if (gridMap[row][i] === opponent) {count--};
                if (gridMap[row][i] === "") {
                    col = i;
                    rowSet = row;
                };
            }
        }
    };
    if (count === 2) {
        move = [rowSet, col];
        console.log("checktwoinLine diagonal 2" + move[0] + move[1]);
        return move;
    }

    if (move.length == 0) return null;
}
    


//this function calculate if any player won the game
function checkWin(){
    let winner = "";
    for (let row in grid){
            if (gridMap[row][0] === gridMap[row][1] && gridMap[row][0] === gridMap[row][2]){
                winner = gridMap[row][0];
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