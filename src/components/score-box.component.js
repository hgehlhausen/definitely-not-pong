class ScoreBox extends Component {
    constructor(context, x, y, label, initialScore) {
        super(context, x, y);
        this.score = initialScore || 0;
        this.label = label || '';
        this.width = 50;
        this.height = 30;
    }

    increment(byAmount) {
        if (!byAmount) {
            this.score++;
        } else {
            this.score += byAmount;
        }
    }

    decrement(byAmount) {
        if (!byAmount) {
            this.score--;
        } else {
            this.score -= byAmount;
        }
    }

    draw() {
        this.context.fillStyle = 'white';
        this.context.strokeStyle = 'white';
        this.context.lineWidth = 1;

        this.context.beginPath();
        this.context.rect(this.x - (this.width / 2), this.y, this.width, this.height);
        this.context.stroke();

        this.context.fillText(this.label, this.x - (this.width / 2) + 10, this.y + 10, this.width - 20);
        this.context.fillText(this.score, this.x - (this.width / 2) + 20, this.y + 25, this.width - 40);

        this.context.strokeStyle = 'black';
        this.context.lineWidth = 0;
    }
}