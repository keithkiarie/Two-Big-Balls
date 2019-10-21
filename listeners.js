//listen for keyboard input
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
        alert('space bar');
    }

    //ball1 keydown
    if (e.keyCode == 87) {
        if (!balls.ball1.in_collision) {
            balls.ball1.key = 'up';
        }
    }
    if (e.keyCode == 65) {
        balls.ball1.key = 'left';
        balls.ball1.velocity = -ball_displacement.default; //left
    }
    if (e.keyCode == 68) {
        balls.ball1.key = 'right';
        balls.ball1.velocity = ball_displacement.default; //right
    }

});

window.addEventListener('keydown', function (e) {

    //ball2 keydown
    if (e.keyCode == 38) {
        if (!balls.ball2.in_collision) {
            balls.ball2.key = 'up';
        }

    }
    if (e.keyCode == 37) {
        balls.ball2.key = 'left';
        balls.ball2.velocity = -ball_displacement.default; //left
    }
    if (e.keyCode == 39) {
        balls.ball2.key = 'right';
        balls.ball2.velocity = ball_displacement.default; //right
    }

});

window.addEventListener('keyup', function (e) {

    //ball1 keyup
    if (e.keyCode == 87) {
        balls.ball1.key = false; //up
    }
    if (e.keyCode == 65) {
        balls.ball1.key = false;
        balls.ball1.velocity = 0;
        balls.ball1.sped_up = false;
    }
    if (e.keyCode == 68) {
        balls.ball1.key = false;
        balls.ball1.velocity = 0;
        balls.ball2.sped_up = false;
    }
});

window.addEventListener('keyup', function (e) {

    //ball2 keyup
    if (e.keyCode == 38) {
        balls.ball2.key = false;
    }
    if (e.keyCode == 37) {
        balls.ball2.key = false;
        balls.ball2.velocity = 0;
        balls.ball2.sped_up = false;
    }
    if (e.keyCode == 39) {
        balls.ball2.key = false;
        balls.ball2.velocity = 0;
        balls.ball2.sped_up = false;
    }
});