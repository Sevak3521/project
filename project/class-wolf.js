module.exports = class Wolf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s=0;
        this.color = "red";
        this.energy = 6;
        this.s = 0;

    }
    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        var found = [];
        this.stanalNorKordinatner()
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var cell = random(this.chooseCell(0));
        var lcell = random(this.chooseCell(1));
        var tcell = random(this.chooseCell(4));
        if (lcell) {
            matrix[this.y][this.x] = 0;
            this.y = lcell[1];
            this.x = lcell[0];
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 3;
        }   
        else if (tcell) {
            matrix[this.y][this.x] = 0;
            this.y = tcell[1];
            this.x = tcell[0];
            for (var i in tgrassArr) {
                if (this.x == tgrassArr[i].x && this.y == tgrassArr[i].y) {
                    tgrassArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 3;

        }
        else if (cell) {
            matrix[this.y][this.x] = 0;
            this.y = cell[1];
            this.x = cell[0];
            matrix[this.y][this.x] = 3;

        }
    
        this.energy--;
        if (this.energy < 1) {
            this.die();
        }
    }
    spread() {
        var newCell = this.chooseCell(0);
        var newLCell = this.chooseCell(1);
        var newCellRand = random(newCell);
        var newLCellRand = random(newLCell);
        if (newLCellRand) {
            var nwx = newLCellRand[1];
            var wy = newLCellRand[0];
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[wy][nwx] = 3;
            var newWolf = new Wolf(nwx, wy);
            WolfArr.push(newWolf);
        }
        else if (newCellRand) {
            var nwx = newCellRand[1];
            var wy = newCellRand[0];
            matrix[wy][nwx] = 3;
            var newWolf = new Wolf(nwx, wy);
            WolfArr.push(newWolf);
        }
    }
    eat() {
        var ecell = random(this.chooseCell(2));
        var takard = random(this.chooseCell(6));
        if (ecell) {
            matrix[this.y][this.x] = 0;
            this.y = ecell[1];
            this.x = ecell[0];
            for (var i in CowArr) {
                if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
                    CowArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 3;
            this.energy++;
            if (this.energy == 10) {
                this.energy--;
            }
            this.s++;
            if (this.s == 4 ) {
                this.spread();
                this.s=0;
            }
        }
        else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in WolfArr) {
            if (this.x == WolfArr[i].x && this.y == WolfArr[i].y) {
                WolfArr.splice(i, 1);
                break;
            }
        }
    }
}
