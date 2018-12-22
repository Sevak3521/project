var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var tact = 0;

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

var Cow = require("./class-cow.js");
var Wolf = require("./class-wolf.js");
var tGrass = require("./class-tgrass.js");
var Grass = require("./class-grass.js");

matrix = [];
CowArr = [];
grassArr = [];
tgrassArr = [];
//var vorsord = [];
//var takardArr = [];
WolfArr = [];

for (var y = 0; y < 30; y++) {
    matrix[y] = [];
    for (var x = 0; x < 30; x++) {
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

io.on('connection', function (socket) {
    socket.on("eventCordinat", function(c){
        x = c[0];
        y = c[1];
        if(matrix[y][x]==2)
        {
            for (var i in CowArr) {
                if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
                    CowArr.splice(i, 1);
                    break;
                }
            }
        }

        else if(matrix[y][x]==1)
        {
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                }
            }
        }

        else if(matrix[y][x]==4)
        {
            for (var i in tgrassArr) {
                if (this.x == tgrassArr[i].x && this.y == tgrassArr[i].y) {
                    tgrassArr.splice(i, 1);
                    break;
                }
            }
        }
        else if(matrix[y][x]==3)
        {
            for (var i in WolfArr) {
                if (this.x == WolfArr[i].x && this.y == WolfArr[i].y) {
                    WolfArr.splice(i, 1);
                    break;
                }
            }
        }

        matrix[y][x] = 2;
        CowArr.push(new Cow(x*1, y*1, 2));
    });
 });

var season;

function spring(){
    season="spring";
}

function summer(){
    season="summer";
}

function autumn(){
    season="autumn";
}

function winter(){
    season="winter";
}



function draw() {
    if(tact%20>=0 && tact%20<5)
        spring();
    else if(tact%20>=5 && tact%20<10) 
        summer();
    else if(tact%20>=10 && tact%20<15)  
        autumn();
    else if(tact%20>=15 && tact%20<20)
        winter();
    
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

    io.sockets.emit("season", season);
    io.sockets.emit("matrix", matrix);
    tact++;
}

setInterval(draw, 1000);


