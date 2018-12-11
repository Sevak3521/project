var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

var Cow = require("./class-cow.js");
var Wolf = require("./class-wolf.js");
var tGrass = require("./class-tgrass.js");
var Grass = require("./class-grass.js");

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
        else {
            matrix[y][x] = 0;
        }
    }
}


for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {

            grassArr.push(new Grass(x, y));
        }
        else if (matrix[y][x] == 2) {

            CowArr.push(new Cow(x, y));
        }
        else if (matrix[y][x] == 3) {

            WolfArr.push(new Wolf(x, y));
        }
        else if (matrix[y][x] == 0) {
        }
        else if (matrix[y][x] == 4) {
            tgrassArr.push(new tGrass(x, y));
        }

    }
}



function draw() {
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

setInterval(draw, 1000);