var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
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
merac_wolf=0;
merac_cow=0;
arajacac_grass=0;
kovi_kerac=0;
klikov_kow=0;

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
            arajacac_grass++;
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
            merac_cow++;
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
            merac_wolf++;
        }

        matrix[y][x] = 2;
        CowArr.push(new Cow(x*1, y*1, 2));
        klikov_kow++;
    });
 });

var season;

function spring(){
    season="spring";
    for (var i in grassArr) {
        grassArr[i].s=1;
    }

    for (var i in tgrassArr) {
        tgrassArr[i].s=5;
    }

    for (var i in WolfArr) {
        WolfArr[i].ss=2;
    }

    for (var i in CowArr) {
        CowArr[i].ss=2;
    }
}

function summer(){
    season="summer";
    for (var i in grassArr) {
        grassArr[i].s=2;
    }

    for (var i in tgrassArr) {
        tgrassArr[i].s=10;
    }

    for (var i in WolfArr) {
        WolfArr[i].ss=4;
        WolfArr[i].energy+=2;
    }

    for (var i in CowArr) {
        CowArr[i].ss=3;
        CowArr[i].energy+=2;
    }
}

function autumn(){
    season="autumn";
    for (var i in grassArr) {
        grassArr[i].s=3;
    }

    for (var i in tgrassArr) {
        tgrassArr[i].s=11;
    }

    for (var i in WolfArr) {
        WolfArr[i].ss=5;
    }

    for (var i in CowArr) {
        CowArr[i].ss=4;
    }
}

function winter(){
    season="winter";
    for (var i in CowArr) {
        CowArr[i].energy-=2;
    }
    for (var i in CowArr) {
        CowArr[i].energy--;
    }
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

function stats() {

    var stat = { dead_wolf_number : merac_wolf,
                 dead_cow_number : merac_cow,
                 appeared_grass_number : arajacac_grass,
                 cow_grass_number : kovi_kerac,
                 click_cow_number: klikov_kow
    };
    var myJSON = JSON.stringify(stat);
    
    fs.writeFileSync("statistics.json", myJSON+"\n");
}

setInterval(draw, 1000);
setInterval(stats, 100);


