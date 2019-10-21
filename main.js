let gamecanvas = document.getElementById('gamecanvas');
let game_session = false;

gamecanvas.width = window.innerWidth * 0.99;
gamecanvas.height = window.innerHeight * 0.95;


let ctx = gamecanvas.getContext("2d");

let ball_displacement = {
    default: 10,
    sped: 15
};

let platform = {
    x_start: gamecanvas.width * 0.1,
    x_end: gamecanvas.width * 0.9,
    y: gamecanvas.height * 0.7,
    width: gamecanvas.width * 0.8
}

//listen for keyboard input
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
        alert('space bar');
    }

    //ball1 keydown
    if (e.keyCode == 87) {
        balls.ball1.key = 'up';
    }
    if (e.keyCode == 65) {
        balls.ball1.key = 'left';
    }
    if (e.keyCode == 68) {
        balls.ball1.key = 'right';
    }

});

window.addEventListener('keydown', function (e) {

    //ball2 keydown
    if (e.keyCode == 38) {
        balls.ball2.key = 'up';
    }
    if (e.keyCode == 37) {
        balls.ball2.key = 'left';
    }
    if (e.keyCode == 39) {
        balls.ball2.key = 'right';
    }

});

window.addEventListener('keyup', function (e) {

    //ball1 keyup
    if (e.keyCode == 87) {
        balls.ball1.key = false;
        balls.ball1.velocity = ball_displacement.default;
    }
    if (e.keyCode == 65) {
        balls.ball1.key = false;
        balls.ball1.velocity = ball_displacement.default;
    }
    if (e.keyCode == 68) {
        balls.ball1.key = false;
        balls.ball1.velocity = ball_displacement.default;
    }
});

window.addEventListener('keyup', function (e) {

    //ball2 keyup
    if (e.keyCode == 38) {
        balls.ball2.key = false;
        balls.ball2.velocity = ball_displacement.default;
    }
    if (e.keyCode == 37) {
        balls.ball2.key = false;
        balls.ball2.velocity = ball_displacement.default;
    }
    if (e.keyCode == 39) {
        balls.ball2.key = false;
        balls.ball2.velocity = ball_displacement.default;
    }
});



function Ball(x, y, radius, color) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.gravity = 12;
    this.color = color;
    this.key = false;
    this.falling = false;
    this.within_platform = true;
    this.rising = false;
    this.velocity = ball_displacement.default;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    };

    this.move = () => {
        //left
        if (this.key == "left") {
            this.x -= this.velocity;
        }
        //right
        if (this.key == "right") {
            this.x += this.velocity;
        }
        //up
        if (this.key == "up" && this.falling == false) {
            this.rising = true;
        }

        if (this.key == "left" || this.key == "right") {
            setTimeout(() => {
                if (this.key != false) {
                    this.velocity = ball_displacement.sped;
                }
            }, 500);
        }



        //fall off
        if (this.x < platform.x_start || this.x > platform.x_end) {
            this.within_platform = false;
            this.rising = false;
            this.falling = true;
            this.x < platform.x_start ? this.x = platform.x_start - this.radius - 5 : this.x = platform.x_end + this.radius + 5;
        }

    };
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
    erase_canvas();

    //create the balls
    balls.ball1 = new Ball(gamecanvas.width * 0.15, gamecanvas.height * 0.7 - 50, 50, "red");
    balls.ball2 = new Ball(gamecanvas.width * 0.85, gamecanvas.height * 0.7 - 50, 50, "green");

    gameplay();
}

function gameplay() {
    mid_air();


    drawing();
    requestAnimationFrame(gameplay);
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