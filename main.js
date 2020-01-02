let gamecanvas = document.getElementById('gamecanvas');
let game_session = false;

gamecanvas.width = window.innerWidth;
gamecanvas.height = window.innerHeight;


let ctx = gamecanvas.getContext("2d");
let scores = {
    player_one: 0,
    player_two: 0
}


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



function init_canvas() {
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
    init_canvas();

    //create the balls
    balls.ball1 = new Ball(gamecanvas.width * 0.15, gamecanvas.height * 0.7 - 50, 50, "red", 1);
    balls.ball2 = new Ball(gamecanvas.width * 0.85, gamecanvas.height * 0.7 - 50, 50, "green", 2);

    gameplay();
}

function gameplay() {

    drawing();
    display_scores();
    
    //ball collision
    let minimum_dist = balls.ball1.radius * 2 + 5;
    if (balls.ball1.x - balls.ball2.x > -minimum_dist && balls.ball1.x - balls.ball2.x < minimum_dist &&
        balls.ball1.y - balls.ball2.y > -minimum_dist && balls.ball1.y - balls.ball2.y < minimum_dist) {
        ball_collision();
    }

    //ball movements
    !balls.ball1.falling ? balls.ball1.move() : balls.ball1.fall();
    !balls.ball2.falling ? balls.ball2.move() : balls.ball2.fall();

    if (game_session) {
        requestAnimationFrame(gameplay);
    } else {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Press Space Bar to restart game", gamecanvas.width / 2, 50);
    }
}

function display_scores() {
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`${scores.player_one} : ${scores.player_two}`, gamecanvas.width / 2, 150);
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
    init_canvas();
    balls.ball1.draw();
    balls.ball2.draw();

    labels();
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