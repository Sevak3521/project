module.exports = class tGrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = 10;
        this.color = "#74ff11";
        this.multiply = 0;
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
    yntrelVandak(ch) {
        var found = [];
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
    bazmanal() {
        this.multiply++;
        var norVandak = this.yntrelVandak(0)[Math.floor(Math.random() * this.yntrelVandak(0).length)];
        if (this.multiply >= this.s && norVandak) {
            var nortXot = new tGrass(norVandak[0], norVandak[1]);
            tgrassArr.push(nortXot);
            matrix[norVandak[1]][norVandak[0]] = 4;
            this.multiply = 0;
        }
    }

}