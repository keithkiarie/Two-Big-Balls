let gamecanvas = document.getElementById('gamecanvas');
let game_session = false;

gamecanvas.width = window.innerWidth;
gamecanvas.height = window.innerHeight;


let ctx = gamecanvas.getContext("2d");


let ball_displacement = {
    default: 10,
    speed_factor: 1.5
};

let platform = {
    x_start: gamecanvas.width * 0.1,
    x_end: gamecanvas.width * 0.9,
    y: gamecanvas.height * 0.7,
    width: gamecanvas.width * 0.8
}



function erase_canvas() {
    //paint the canvas black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, gamecanvas.width, gamecanvas.height);

    //draw the platform
    ctx.fillStyle = "gray";
    ctx.fillRect(platform.x_start, platform.y, platform.width, gamecanvas.height);
}

let balls = {
    ball1: null,
    ball2: null
};

function start_game() {
    game_session = true;
    erase_canvas();

    //create the balls
    balls.ball1 = new Ball(gamecanvas.width * 0.15, gamecanvas.height * 0.7 - 50, 50, "red");
    balls.ball2 = new Ball(gamecanvas.width * 0.85, gamecanvas.height * 0.7 - 50, 50, "green");

    gameplay();
}

function gameplay() {
    mid_air();
    collision();
    friction();

    drawing();
    labels();
    if (game_session) {
        requestAnimationFrame(gameplay);
    } else {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("Press Space Bar to restart game", gamecanvas.width / 2, 50);
    }
}

function friction() {
    for (const i in balls) {
        if (balls[i].key == false) {
            balls[i].velocity *= 0.99;
        }
    }
}

function labels() {
    //draw labels
    ctx.beginPath();
    ctx.arc(gamecanvas.width * 0.05, gamecanvas.height * 0.05, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(gamecanvas.width * 0.95, gamecanvas.height * 0.05, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();
}


function drawing() {
    erase_canvas();
    balls.ball1.draw();
    balls.ball2.draw();
}



function welcome() {
    //paint the canvas black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, gamecanvas.width, gamecanvas.height);

    ctx.font = "60px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("Two Big Balls", gamecanvas.width / 2, 75);

    ctx.font = "30px Arial";
    ctx.fillText("Push your oppenent off the platform", gamecanvas.width / 2, 150);

    ctx.font = "15px Arial";
    ctx.textAlign = "center";

    ctx.fillText("Player One:", gamecanvas.width / 2, 250);
    ctx.fillText("UP: w    LEFT: a    RIGHT: d", gamecanvas.width / 2, 280);

    ctx.fillText("Player Two:", gamecanvas.width / 2, 340);
    ctx.fillText("UP: up arrow    LEFT: left arrow    RIGHT: right arrow", gamecanvas.width / 2, 370);


    ctx.fillText("Press Space Bar to begin", gamecanvas.width / 2, 450);
}
welcome();