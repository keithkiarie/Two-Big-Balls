function Ball(x, y, radius, color) {
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.right_edge = this.x + this.radius;
    this.left_edge = this.x - this.radius;

    this.gravity = 12;
    this.color = color;
    this.key = false;
    this.falling = false;
    this.within_platform = true;
    this.rising = false;
    this.velocity = 0;

    this.sped_up = false;


    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    };

    this.move = () => {

        this.x += this.velocity;
        this.left_edge = this.x - this.radius;
        this.right_edge = this.x + this.radius;

        //up
        if (this.key == "up" && this.falling == false) {
            this.rising = true;
        }

        if (this.key == "left" || this.key == "right") {
            setTimeout(() => {
                if (this.key != false && !this.sped_up) {
                    this.velocity *= ball_displacement.speed_factor;
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
        }

    };
}