let gamecanvas = document.getElementById('gamecanvas');
let game_session = false;

gamecanvas.width = window.innerWidth * 0.99;
gamecanvas.height = window.innerHeight * 0.95;


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
    requestAnimationFrame(gameplay);
}

function friction() {
    for (const i in balls) {
        if (balls[i].key == false) {
            balls[i].velocity *= 0.99;
        }
    }
}

function collision() {
    let ball1 = balls.ball1;
    let ball2 = balls.ball2;

    //one ball falling on another
    if (ball1.y != ball2.y && ball1.within_platform == true && ball2.within_platform == true) {
        if (ball1.x == ball2.x) {
            if (ball1.y + ball1.radius >= ball2.y && ball1.falling == true) {
                ball1.falling = false;
                ball1.y = ball2.y - ball2.radius;
            } else if (ball2.y + ball2.radius >= ball1.y && ball2.falling == true) {
                ball2.falling = false;
                ball2.y = ball1.y - ball1.radius;
            }
        } else if (ball1.x < ball2.x && ball2.x - ball1.x <= ball2.radius + 5) {
            ball1.in_collision = true;
            ball2.in_collision = true;
            if (ball1.y + ball1.radius >= ball2.y && ball1.falling == true) {
                ball1.velocity = -ball_displacement.default;
                ball2.velocity = ball_displacement.default;
            } else if (ball2.y + ball2.radius >= ball1.y && ball2.falling == true) {
                ball2.velocity = ball_displacement.default;
                ball1.velocity = -ball_displacement.default;
            }
        } else if (ball1.x > ball2.x && ball1.x - ball2.x <= ball1.radius + 5) {
            ball1.in_collision = true;
            ball2.in_collision = true;
            if (ball1.y + ball1.radius >= ball2.y && ball1.falling == true) {
                ball1.velocity = ball_displacement.default;
                ball2.velocity = -ball_displacement.default;
            } else if (ball2.y + ball2.radius >= ball1.y && ball2.falling == true) {
                ball2.velocity = ball_displacement.default;
                ball1.velocity = -ball_displacement.default;
            }
        } else {
            ball1.in_collision = false;
            ball2.in_collision = false;
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


start_game();