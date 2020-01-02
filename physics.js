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
                ball1.unit_x = -ball_displacement.default;
                ball2.unit_x = ball_displacement.default;
            } else if (ball2.y + ball2.radius >= ball1.y && ball2.falling == true) {
                ball2.unit_x = ball_displacement.default;
                ball1.unit_x = -ball_displacement.default;
            }
        } else if (ball1.x > ball2.x && ball1.x - ball2.x <= ball1.radius * 2) {
            if (ball1.y + ball1.radius >= ball2.y && ball1.falling == true) {
                ball1.unit_x = ball_displacement.default;
                ball2.unit_x = -ball_displacement.default;
            } else if (ball2.y + ball2.radius >= ball1.y && ball2.falling == true) {
                ball2.unit_x = ball_displacement.default;
                ball1.unit_x = -ball_displacement.default;
            }
        }
    }

    if (
        (ball1.right_edge + ball1.unit_x > ball2.left_edge + ball2.unit_x && ball1.x < ball2.x && ball1.y == ball2.y) ||
        (ball2.right_edge + ball2.unit_x > ball1.left_edge + ball1.unit_x && ball2.x < ball1.x && ball1.y == ball2.y) ||
        (ball1.left_edge + ball1.unit_x < ball2.right_edge + ball2.unit_x && ball1.x > ball2.x && ball1.y == ball2.y) ||
        (ball2.left_edge + ball2.unit_x < ball1.right_edge + ball1.unit_x && ball2.x > ball1.x && ball1.y == ball2.y)
    ) {

        let temp = ball1.unit_x;
        ball1.unit_x = ball2.unit_x;
        ball2.unit_x = temp;
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
            
            //change the rising velocity here
            balls[i].y -= balls[i].unit_y;
        }

        if (balls[i].falling == true) {
            if ((balls[i].within_platform && balls[i].y + balls[i].radius < platform.y) ||
                !balls[i].within_platform) {
                balls[i].y -= balls[i].gravity;
            }
            if (balls[i].y + balls[i].radius >= platform.y && balls[i].within_platform) {
                balls[i].y = platform.y - balls[i].radius;
                balls[i].falling = false;
            }
        }
        balls[i].move();
    }
}