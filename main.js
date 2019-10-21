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

function collision() {
    let ball1 = balls.ball1;
    let ball2 = balls.ball2;

    //one ball falling on another
    if (ball1.y != ball2.y && ball1.within_platform == true && ball2.within_platform == true) {
        if (ball1.x == ball2.x) {
            //falling directly on top of another
            if (ball1.y + ball1.radius >= ball2.y && ball1.falling == true) {
                ball1.falling = false;
                ball1.y = ball2.y - ball2.radius;
            } else if (ball2.y + ball2.radius >= ball1.y && ball2.falling == true) {
                ball2.falling = false;
                ball2.y = ball1.y - ball1.radius;
            }
        } else if (ball1.x < ball2.x && ball2.x - ball1.x <= ball2.radius * 2) {
            if (ball1.y + ball1.radius >= ball2.y && ball1.falling == true) {
                ball1.velocity = -ball_displacement.default;
                ball2.velocity = ball_displacement.default;
            } else if (ball2.y + ball2.radius >= ball1.y && ball2.falling == true) {
                ball2.velocity = ball_displacement.default;
                ball1.velocity = -ball_displacement.default;
            }
        } else if (ball1.x > ball2.x && ball1.x - ball2.x <= ball1.radius * 2) {
            if (ball1.y + ball1.radius >= ball2.y && ball1.falling == true) {
                ball1.velocity = ball_displacement.default;
                ball2.velocity = -ball_displacement.default;
            } else if (ball2.y + ball2.radius >= ball1.y && ball2.falling == true) {
                ball2.velocity = ball_displacement.default;
                ball1.velocity = -ball_displacement.default;
            }
        }
    }

    if (
        (ball1.right_edge + ball1.velocity > ball2.left_edge + ball2.velocity && ball1.x < ball2.x && ball1.y == ball2.y) ||
        (ball2.right_edge + ball2.velocity > ball1.left_edge + ball1.velocity && ball2.x < ball1.x && ball1.y == ball2.y) ||
        (ball1.left_edge + ball1.velocity < ball2.right_edge + ball2.velocity && ball1.x > ball2.x && ball1.y == ball2.y) ||
        (ball2.left_edge + ball2.velocity < ball1.right_edge + ball1.velocity && ball2.x > ball1.x && ball1.y == ball2.y)
    ) {

        let temp = ball1.velocity;
        ball1.velocity = ball2.velocity;
        ball2.velocity = temp;
    }

    //if they're stuck
    if (balls.ball1.x < balls.ball2.x && balls.ball2.x - balls.ball1.x <= balls.ball1.radius * 2 && balls.ball1.y == balls.ball2.y) {
        balls.ball1.x -= balls.ball1.radius / 2;
        balls.ball2.x += balls.ball2.radius / 2;
    } else if (balls.ball1.x > balls.ball2.x && balls.ball1.x - balls.ball2.x <= balls.ball1.radius * 2 && balls.ball1.y == balls.ball2.y) {
        balls.ball1.x -= balls.ball1.radius / 2;
        balls.ball2.x += balls.ball2.radius / 2;
    }

}

function mid_air() {
    for (const i in balls) {
        if (balls[i].rising == true) {
            if (balls[i].y < platform.y - balls[i].radius * 6) {
                balls[i].rising = false;
                balls[i].falling = true;
            }
            balls[i].y -= balls[i].gravity;
        }

        if (balls[i].falling == true) {
            if ((balls[i].within_platform && balls[i].y + balls[i].radius < platform.y) ||
                !balls[i].within_platform) {
                balls[i].y += balls[i].gravity;
            }
            if (balls[i].y + balls[i].radius >= platform.y && balls[i].within_platform) {
                balls[i].y = platform.y - balls[i].radius;
                balls[i].falling = false;
            }
        }
        balls[i].move();
    }
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
    ctx.textAlign = "center";
    ctx.fillText("Push your oppenent off the platform", gamecanvas.width / 2, 150);

    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Press Space Bar to begin", gamecanvas.width / 2, 250);
}
welcome();