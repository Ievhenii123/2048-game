var canvas = document.getElementById("2048-field");
var ctx = canvas.getContext("2d");

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
    gridCellStartPosX: 12,
    gridCellStartPosY: 12,
    gridCellHeight: 97.5,
    gridCellWidth: 97.5,
    calcGridCoords: function() {
        let coordsArr = [],
            coordX = 0, 
            coordY = 0;
        for (let row = 1; row <= 4; row++) {
            for (let col = 1; col <= 4; col++) {
                if (col <= 1) {
                    coordX = this.gridCellStartPosX;
                    if (row <= 1) {
                        coordY = this.gridCellStartPosY;
                    } else {
                        coordY = this.gridCellHeight * (row-1) + this.marginBetweenCells * row
                    }
                } else {
                    coordX = this.gridCellWidth * (col-1) + this.marginBetweenCells * col
                }
                coordsArr.push( {x: coordX, y: coordY} );
            }
        }
        return coordsArr;
    },
    draw: function(coordsArr) {
        for (coord of coordsArr) {
            ctx.beginPath();
            ctx.rect(coord.x, coord.y, this.gridCellWidth, this.gridCellHeight);
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