class Bumper extends Component {
    constructor(context, x, updateFn) {
        super(context, x, 0);
        this.height = 100;
        this.width = 15;

        if (updateFn && (typeof updateFn) === 'function') {
            this.update = updateFn;
        }
    }

    draw() {
        this.context.fillStyle = 'white';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    getCollisionBox(fromCenter) {
        return new CollisionBox(this.x, this.y, this.width, this.height, !!fromCenter);
    }

    collidesWith(ball) {
        let box = this.getCollisionBox(true);

        if (box.contains(ball.x, ball.y, ball.size * 2, ball.size * 2)) {
            return true;
        }

        return false;
    }
}