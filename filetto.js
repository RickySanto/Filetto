var cswitch = document.getElementById("playComputer");
var playXorO = document.getElementById("playXorO");
var onLabel = document.querySelector("#on");
var offLabel = document.querySelector("#off");
var playButton = document.getElementById("play");
var xOrO = document.getElementById("xOrO");
var textInfo = document.getElementById("textInfo");
var turn = "";

// grid is object array which associate at each element A1,A2..B1,B2 and so on each span element in the html section
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
}

var player1 = {
    manual: true,
    playing: 'x'
}

var player1 = {
    manual: computer,
    playing: 'o'
}

cswitch.addEventListener ("click", function(){
    onLabel.classList.toggle('notDisplay');
    offLabel.classList.toggle('notDisplay');
    xOrO.classList.toggle('notVisible');
});

//Inizialize the screen associating grid and gridMap

gameInit();

document.getElementById("textInfo").innerHTML = "X Turn";

function gameInit(){
    for (let raw in grid){
        for (let i = 0; i < 3; i++) {
            grid[raw][i] = document.getElementById(raw + String(i+1));
        }
    } 
}


playButton.addEventListener ("click", function(){
    turn = "x"
    for (let raw in grid){
        for (let i = 0; i < 3; i++) {
            grid[raw][i].addEventListener('click', function(){
                play(raw, i, turn);
            });
        };
    };

    playGame(turn);    

}); 


function play(raw, i, turn){
    gridMap[raw][i] = turn;
    populateGrid();
    console.log("Clicked");
}


function testGrid(){
    for (let raw in grid){
        for (let i = 0; i < 3; i++) {
            grid[raw][i].addEventListener('click', function(){
                play(raw, i);
            });
        };
    };
};


function playGame(turn){

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