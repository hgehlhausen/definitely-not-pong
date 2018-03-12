class GameCanvas {
    constructor(context, updateFn) {
        this.context = context;
        this.paused = false;
        this.components = [];

        if (updateFn) {
            this.updateFn = updateFn;
        } else {
            this.updateFn = function () {
            };
        }
    }

    width() {
        return this.context.canvas.width;
    }

    height() {
        return this.context.canvas.height;
    }

    start() {
        this.frame();
    }

    frame() {
        if (!this.paused) {
            this.update();
            this.render();
        } else {
            this.renderPauseScreen();
        }
        requestAnimationFrame(this.frame.bind(this));
    }

    update() {
        this.updateFn(); // call external logic
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update();
        }
    }

    render() {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].draw();
        }
    }

    insertComponent(component, position) {
        if (position || position === 0) {
            this.components.splice(position, 0, component);
        } else {
            this.components.push(component);
        }
    }

    renderPauseScreen() {
        // Could be its own component, but this works effectively
        this.context.fillStyle = 'white';
        this.context.fillText('Paused', canvas.width / 2 - 20, canvas.height / 2);
    }

    doPause(pauseConfig) {
        if (!!pauseConfig === pauseConfig) {
            this.paused = pauseConfig;
        } else {
            this.paused = !this.paused;
        }
    }
}