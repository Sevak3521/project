var matrix = [];
var CowArr = [];
var grassArr = [];
var tgrassArr = [];
//var vorsord = [];
//var takardArr = [];
var WolfArr = [];
for (var y = 0; y < 26; y++) {
    matrix[y] = [];
    for (var x = 0; x < 26; x++) {
        ra = Math.round(Math.random() * 100);
        if (ra < 70) {
            matrix[y][x] = 1;
        }
        else if (ra >= 70 && ra <= 75) {
            matrix[y][x] = 2;
        }
        else if (ra > 50 && ra <= 80) {
            matrix[y][x] = 3;
        }
        else if (ra > 80 && ra < 90) {
            matrix[y][x] = 4;
        }
        else{
            matrix[y][x] = 0;
        }
    }
}

var side = 5;
function setup() {
    frameRate(5);
    createCanvas(135, 135);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(y * side, x * side, side, side);
                grassArr.push(new Grass(x, y));
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(y * side, x * side, side, side);
                CowArr.push(new Cow(x, y));
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(y * side, x * side, side, side);
                WolfArr.push(new Wolf(x, y));
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("#74ff11");
                rect(y * side, x * side, side, side);
                tgrassArr.push(new tGrass(x, y));
            }
            
        }
    }


}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
              else if (matrix[y][x] == 4) {
                fill("#74ff11");
                rect(x * side, y * side, side, side);
            }

        }



    }
    for (var i in grassArr) {

        grassArr[i].bazmanal();

    }
    for (var i in CowArr) {

        CowArr[i].eat();

    }
    for (var i in WolfArr) {

        WolfArr[i].eat();

    }
    for (var i in tgrassArr) {

        tgrassArr[i].bazmanal();

    }
    
}
