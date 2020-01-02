function Ball(x, y, radius, color, player) {
    this.player = player
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.right_edge = () => {
        return this.x + this.radius; //right-most part of the ball
    }
    this.left_edge = () => {
        return this.x - this.radius; //left-most part of the ball
    }

    this.jump_displacement = 12; // not yet integrated
    this.gravity = 0.2; //brings the ball down
    this.color = color;
    this.key = false; // if a key is being pressed
    this.within_platform = true;
    this.mid_air = false; //if the ball is mid air (jump)

    //velocities of the ball
    this.unit_x = 0;
    this.unit_y = 0;

    this.sped_up = false; // to increase the velocity of the ball during longpress 


    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    };

    this.move = () => {

        this.x += this.unit_x;
        this.y += this.unit_y;
        
        this.unit_y < 0 ? this.unit_y += this.gravity : this.unit_y = 0;
        

        //up
        if (this.key == "up" && !this.mid_air) {
            this.mid_air = true;
            this.unit_y = this.jump_displacement;
        }

        if (this.key == "left" || this.key == "right") {
            setTimeout(() => {
                if (this.key != false && !this.sped_up) {
                    this.unit_x *= ball_displacement.speed_factor;
                    this.sped_up = true;
                }
            }, 500);
        }



        //fall off
        if (this.x < platform.x_start || this.x > platform.x_end) {
            this.within_platform = false;
            this.rising = false;
            this.falling = true;
            this.x < platform.x_start ? this.x = platform.x_start - this.radius - 5 : this.x = platform.x_end + this.radius + 5;
            if (this.y - this.radius > gamecanvas.height) {
                game_session = false;

                this.player == 1 ? scores.player_two++ : scores.player_one++;
            }
        }

    };
}