var side = 24;
var socket = io();
var w=30, h=30;

socket.on("season", sezon);
var backgroundcolor = "#acacac";

function sezon(season){
    console.log(season);
     if(season=="spring")
        backgroundcolor = "#996633";
    else if(season=="summer")
        backgroundcolor="#ffff99";
    else if(season=="autumn")
        backgroundcolor="#ff8000";
    else if(season=="winter")
        backgroundcolor="#ffffff";
}

function setup() {
    createCanvas(side * w, side * h);
    background("#acacac");
}

function drawMatrix(matrix) {
    background("#acacac");
    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 0) {
                fill(backgroundcolor);
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#1aff1a");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('matrix', drawMatrix);