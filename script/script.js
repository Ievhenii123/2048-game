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
let buttonPressed = {
    up: false,
    down: false,
    left: false,
    right: false
};
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    brick.draw();
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