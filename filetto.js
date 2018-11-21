var cswitch = document.getElementById("playComputer");
var playXorO = document.getElementById("playXorO");
var onLabel = document.querySelector("#on");
var offLabel = document.querySelector("#off");
var playButton = document.getElementById("play");
var xOrO = document.getElementById("xOrO");

var grid = {
    A: [],
    B: [],
    C: []
};



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


playButton.addEventListener ("click", function(){
    gameInit();
});


// if (playComputer.checked === true ){
    
// }

// if (playXorO.checked === true ){
    
// }

function gameInit(){
    for (let i = 1; i <= 3; i++) {
        grid.A[i] = document.getElementById("A"+ String(i));
        
    }
    for (let i = 1; i <= 3; i++) {
        grid.B[i] = document.getElementById("B"+ String(i));
        
    }
    for (let i = 1; i <= 3; i++) {
        grid.C[i] = document.getElementById("C"+ String(i));
        
    }
    
}

function populateGrid(){

}