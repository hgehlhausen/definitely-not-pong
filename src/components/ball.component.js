class Ball extends Component {
    constructor(context, x, y) {
        super(context, x, y);
        this.size = 4;
        this.speedX = 2;
        this.speedY = 1;
    }

    draw() {
        this.context.fillStyle = 'white';
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.context.fill();
    }

    update() {
        let viewport = new CollisionBox(0, 0, this.context.canvas.width, this.context.canvas.height, true);

        if (!viewport.containsX(this.x, this.size * 2)) {
            this.bounceHorizontal();
        }

        if (!viewport.containsY(this.y, this.size * 2)) {
            this.bounceVertical();
        }

        // Move ball
        this.x += this.speedX;
        this.y += this.speedY;
    }

    bounceHorizontal(updateY) {
        this.speedX *= -1;
        this.speedY += updateY || 0;
        beeper.beep();
    }

    bounceVertical() {
        this.speedY *= -1;
        beeper.beep();
    }

    reset() {
        this.x = this.context.canvas.width / 2;
        this.y = this.context.canvas.height / 2;
        this.bounceHorizontal();
    }

    toString() {
        return `[object Ball] (${this.x}, ${this.y}) [ ${this.speedX} , ${this.speedY} ]`;
    }
}