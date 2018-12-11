/*class vd {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = 0;
        this.life = 3;
        this.color = "blue";
        this.takardmult = 0;
        
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
        this.stanalNorKordinatner();
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
    toxtakard(ss)
        {
            var xotiVandak = random(this.chooseCell(1));
            this.takardmult++;
            if(xotiVandak && this.takardmult >= 8)
            {
                for (var i in grassArr) {
                    if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                    }
                }
                var tk = new takard(ss[0],ss[1]);
                takardArr.push(tk);
                this.takardmult = 0;
                return true;
            }
            else 
                return false;
        }   
        move() {
            var cell = random(this.chooseCell(0));
            var lcell = random(this.chooseCell(1));
            var tcell = random(this.chooseCell(4));
            var stugel;
            if(lcell)
            {
                stugel = this.toxtakard(lcell);
                if(!stugel)
                {
                    matrix[this.y][this.x] = 0;
                    this.y = lcell[1];
                    this.x = lcell[0];
                    for (var i in grassArr) {
                        if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                        }
                    }
                    matrix[lcell[1]][lcell[0]] = 5;
                }
            }
            else if(cell)
            {
                stugel = this.toxtakard(cell);
                if(!stugel)
                {
                    matrix[this.y][this.x] = 0;
                    this.y = cell[1];
                    this.x = cell[0];
                    matrix[cell[1]][cell[0]] = 5;
    
                }
            }
            else if(tcell)
            {
                stugel = this.toxtakard(tcell);
                if(!stugel)
                {
                    matrix[this.y][this.x] = 0;
                    this.y = tcell[1];
                    this.x = tcell[0];
                    for (var i in tgrassArr) {
                        if (this.x == tgrassArr[i].x && this.y == tgrassArr[i].y) {
                            tgrassArr.splice(i, 1);
                        }
                    }
                    matrix[this.y][this.x] = 5;
                }

            }
        }

}
class takard{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
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
    traqcnel()
    {
        matrix[this.y][this.x] = 6;
        var CowCell = random(this.chooseCell(2));
        var GishCell = random(this.chooseCell(3));
        if(GishCell)
        {
            for (var i in WolfArr) {
                if (GishCell[0] == WolfArr[i].x && GishCell[1] == WolfArr[i].y) {
                    WolfArr.splice(i, 1);
                    matrix[GishCell[1]][GishCell[0]] = 0;
                }
            }

            for (var i in takardArr) {
                if (this.x == takardArr[i].x && this.y == takardArr[i].y) {
                    takardArr.splice(i, 1);
                    matrix[this.x][this.y] = 0;
                }
            }           
        }
        else if(CowCell)
        {
            for (var i in CowArr) {
                if (CowCell[0] == CowArr[i].x && CowCell[1] == CowArr[i].y) {
                    CowArr.splice(i, 1);
                    matrix[CowCell[1]][CowCell[0]] = 0;
                }
            }

            for (var i in takardArr) {
                if (this.x == takardArr[i].x && this.y == takardArr[i].y) {
                    takardArr.splice(i, 1);
                    matrix[this.x][this.y] = 0;
                }
            }               
        }
    }
}*/