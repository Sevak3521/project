module.exports = class Cow {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = 0;
        this.color = "yellow";
        this.multiply = 0;
        this.energy = 4;

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
        if (cell) {
            matrix[this.y][this.x] = 0;
            this.y = cell[1];
            this.x = cell[0];
            matrix[this.y][this.x] = 2;
            this.energy--;
            if (this.energy < 1) {
                this.die();
            }
        }
    }

    spread() {
        var newCell = this.chooseCell(0);
        var newCellRand = random(newCell);
        this.multiply++;
        if (newCellRand) {
            var nwx = newCellRand[1];
            var wy = newCellRand[0];
            matrix[wy][nwx] = 2;
            var newHerb = new Cow(nwx, wy);
            CowArr.push(newHerb);

        }
    }

    eat() {
        var ecell = random(this.chooseCell(1));
        var tecell = random(this.chooseCell(4));
        var takard = random(this.chooseCell(6));
        if (ecell) {
            matrix[this.y][this.x] = 0;
            this.y = ecell[1];
            this.x = ecell[0];
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 2;
            this.energy++;
            if (this.energy == 10) {
                this.energy--;
            }
            this.s++;
            if (this.s == 2) {
                this.spread();
                this.s = 0;
            }


        }
        else if (tecell) {
            matrix[this.y][this.x] = 0;
            this.y = tecell[1];
            this.x = tecell[0];
            for (var i in tgrassArr) {
                if (this.x == tgrassArr[i].x && this.y == tgrassArr[i].y) {
                    tgrassArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 2;
            this.energy++;
            this.die();

        }
        else {
            this.move();
        }

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in CowArr) {
            if (this.x == CowArr[i].x && this.y == CowArr[i].y) {
                CowArr.splice(i, 1);
                break;
            }


        }
    }

}