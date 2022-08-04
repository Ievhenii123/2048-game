var canvas = document.getElementById("2048-field");
var ctx = canvas.getContext("2d");

let logicArrMatrix = [
   [ [ {a: 2} ], [ {a: 2} ], [ {a: 2} ], [ {a: 4} ] ],
   [ [], [], [], [] ],
   [ [], [], [], [] ],
   [ [], [], [], [] ]
];

let calcSameElems = {
    fromRight: function(logicArrMatrix) {
        moveArrElems.right(logicArrMatrix);
        for (let i = 3; i >= 1; i--) {
            let curElem = logicArrMatrix[0][i][0],
                prevElem = logicArrMatrix[0][i-1][0];
            if (typeof curElem !== 'undefined' && typeof prevElem !== 'undefined' && curElem.a == prevElem.a) {
                logicArrMatrix[0][i][0].a = curElem.a + prevElem.a;
                logicArrMatrix[0].splice(i-1, 1, []);
                moveArrElems.right(logicArrMatrix);
            }
        }
        return logicArrMatrix;
    }
}

let moveArrElems = {
    right: function(logicArrMatrix) {
        for (let j = 0; j <= 3; j++) {
            for (let i = 3; i >= 1; i--) {
                if (typeof logicArrMatrix[j][i][0] === 'undefined') {
                    logicArrMatrix[j].splice(i, 1);
                }
            }
            if (logicArrMatrix[j].length < 4) {
                let toFill = 4 - logicArrMatrix[j].length;
                for (let i = 1; i <= toFill; i++) {
                    logicArrMatrix[j].unshift([]);
                }
            }
        }
        return logicArrMatrix;
    },
    left: function(logicArrMatrix) {

    }
}
calcSameElems.fromRight(logicArrMatrix);
console.log(logicArrMatrix);

// Рисуем квадрат, и тестируем его перемещение по полю по нажатию клавиш клавиатуры (стрелки или WASD)
let brick = {
    x: 0,
    y: 0,
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 98, 98);
        ctx.fillStyle = "#eee4da";
        ctx.fill();
        ctx.closePath();
    }
};

let grid = {
    marginBetweenCells: 12,
    cellStartPosX: 12,
    cellStartPosY: 12,
    cellHeight: 97.5,
    cellWidth: 97.5,
    // Вычисления координат сетки игрового поля 
    // (в будущем подумать над оптимизацией вычислений, так как выполяняются повторные вычисления уже вычисленных значений)
    calcGridCoords: function() {
        let coordsArr = [],
            coordX = 0, 
            coordY = 0;
        for (let row = 1; row <= 4; row++) {
            for (let col = 1; col <= 4; col++) {
                if (col <= 1) {
                    coordX = this.cellStartPosX;
                    if (row <= 1) {
                        coordY = this.cellStartPosY;
                    } else {
                        coordY = this.cellHeight * (row-1) + this.marginBetweenCells * row
                    }
                } else {
                    coordX = this.cellWidth * (col-1) + this.marginBetweenCells * col
                }
                coordsArr.push( {x: coordX, y: coordY} );
            }
        }
        return coordsArr;
    },
    // Рисуем сетку по полученным координатам
    draw: function(coordsArr) {
        for (coord of coordsArr) {
            ctx.beginPath();
            ctx.rect(coord.x, coord.y, this.cellWidth, this.cellHeight);
            ctx.fillStyle = "rgba(238,228,218,.35)";
            ctx.fill();
            ctx.closePath();
        }

        /*ctx.beginPath();
        ctx.rect(97.5 + 12*2, 12, 97.5, 97.5);
        ctx.fillStyle = "rgba(238,228,218,.35)";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(97.5*2 + 12*3, 12, 97.5, 97.5);
        ctx.fillStyle = "rgba(238,228,218,.35)";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(97.5*3 + 12*4, 12, 97.5, 97.5);
        ctx.fillStyle = "rgba(238,228,218,.35)";
        ctx.fill();
        ctx.closePath();


        ctx.beginPath();
        ctx.rect(this.gridCellStartPosX, 97.5 + 12*2, 97.5, 97.5);
        ctx.fillStyle = "rgba(238,228,218,.35)";
        ctx.fill();
        ctx.closePath();*/
    }
}
let gridCoordsArr = grid.calcGridCoords();
grid.draw(gridCoordsArr);
console.log(gridCoordsArr);

let buttonPressed = {
    up: false,
    down: false,
    left: false,
    right: false
};

function brickMovementByButtonPress() {
    if (buttonPressed.down && brick.y < canvas.height-98) {
        brick.y += 70.4;
        console.log(brick.y);
    }
    if (buttonPressed.up && brick.y > 0) {
        brick.y -= 70.4;
        console.log(brick.y);
    }
    if (buttonPressed.right && brick.x < canvas.width-98) {
        brick.x += 70.4;
        console.log(brick.x);
    }
    if (buttonPressed.left && brick.x > 0) {
        brick.x -= 70.4;
        console.log(brick.x);
    }
}

// Функция отрисовки игры в окне браузера
function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //brick.draw();
    //brickMovementByButtonPress();
    //grid.draw();
    window.requestAnimationFrame(draw);
}

// Обработка нажатий кнопок клавиатуры: стрелочки (или альтернативные - WASD)
function keyPressesHandler(e) {
    // Вниз (или S)
    if (e.keyCode == 40 || e.keyCode == 83) {
        buttonPressed.down = true;
        buttonPressed.up = false;
    }
    // Вверх (или W)
    if (e.keyCode == 38 || e.keyCode == 87) {
        buttonPressed.up = true;
        buttonPressed.down = false;
    }
    // Вправо (или D)
    if (e.keyCode == 39 || e.keyCode == 68) {
        buttonPressed.right = true;
        buttonPressed.left = false;
    }
    // Влево (или A)
    if (e.keyCode == 37 || e.keyCode == 65) {
        buttonPressed.left = true;
        buttonPressed.right = false;
    }
    
}

document.addEventListener('keydown', keyPressesHandler);
window.requestAnimationFrame(draw);