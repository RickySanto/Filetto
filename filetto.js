// var c = document.getElementById("Canvas");
// var ctx = c.getContext("2d");
// ctx.beginPath();
// ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.stroke();

var cswitch = document.querySelector("input");
var onLabel = document.querySelector("#on");
var offLabel = document.querySelector("#off");


cswitch.addEventListener ("click", function(){
    onLabel.classList.toggle('notDisplay');
    offLabel.classList.toggle('notDisplay');
});