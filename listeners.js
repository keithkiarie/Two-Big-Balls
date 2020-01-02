//listen for keyboard input

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32 && !game_session) {
        //space bar to begin game
        start_game();
    }

    //ball1 keydown
    if (e.keyCode == 87 && game_session && !balls.ball1.mid_air) {
            balls.ball1.key = 'up';
            balls.ball1.unit_y = balls.ball1.jump_displacement;
    }
    if (e.keyCode == 65 && game_session) {
        balls.ball1.key = 'left';
        balls.ball1.unit_x = -ball_displacement.default; //left
    }
    if (e.keyCode == 68 && game_session) {
        balls.ball1.key = 'right';
        balls.ball1.unit_x = ball_displacement.default; //right
    }

});

window.addEventListener('keydown', function (e) {

    //ball2 keydown
    if (e.keyCode == 38 && game_session && !balls.ball2.mid_air) {
            balls.ball2.key = 'up';
            balls.ball2.unit_y = balls.ball2jump_displacement;
    }
    if (e.keyCode == 37  && game_session) {
        balls.ball2.key = 'left';
        balls.ball2.unit_x = -ball_displacement.default; //left
    }
    if (e.keyCode == 39  && game_session) {
        balls.ball2.key = 'right';
        balls.ball2.unit_x = ball_displacement.default; //right
    }

});

window.addEventListener('keyup', function (e) {

    //ball1 keyup
    if (e.keyCode == 87  && game_session) {
        balls.ball1.key = false; //up
    }
    if (e.keyCode == 65 && game_session) {
        balls.ball1.key = false;
        balls.ball1.sped_up = false;
    }
    if (e.keyCode == 68 && game_session) {
        balls.ball1.key = false;
        balls.ball2.sped_up = false;
    }
});

window.addEventListener('keyup', function (e) {

    //ball2 keyup
    if (e.keyCode == 38 && game_session) {
        balls.ball2.key = false;
    }
    if (e.keyCode == 37 && game_session) {
        balls.ball2.key = false;
        balls.ball2.sped_up = false;
    }
    if (e.keyCode == 39 && game_session) {
        balls.ball2.key = false;
        balls.ball2.sped_up = false;
    }
});