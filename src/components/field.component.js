class Field extends Component {
    constructor(context) {
        super(context, 0, 0);
        this.width = context.canvas.width;
        this.height = context.canvas.height;
    }

    draw() {
        //Draw background black
        this.context.fillStyle = 'black';
        this.context.fillRect(this.x, this.y, this.width, this.height);

        // Draw center line / net
        this.context.fillStyle = 'white';
        let canvasMidPoint = this.width / 2;
        for (let i = 10; i < this.context.canvas.height; i += 40) {
            this.context.fillRect(canvasMidPoint - 1, i, 2, 20);
        }
    }
}