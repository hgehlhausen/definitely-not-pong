window.onload = onReady;

//Audio feedback
let beeper;

// Game Canvas / Render engine
let canvas;
let canvasContext;
let gameCanvas;

//Components
let field;
let leftBumper;
let rightBumper;
let ball;
let playerScore;
let computerScore;

let gameState = {
    leftBumperControlHeight: 0,
    rightBumperControlHeight: 0
};

function onReady() {
    initialize();
}

function initialize() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    //Generate game canvas
    gameCanvas = new GameCanvas(canvasContext, update);

    beeper = new Beeper();

    //Instantiate components
    field = new Field(canvasContext);
    playerScore = new ScoreBox(canvasContext, canvas.width / 4, canvas.height / 4, 'Player', 0);
    computerScore = new ScoreBox(canvasContext, 3 * canvas.width / 4, canvas.height / 4, 'Computer', 0);

    leftBumper = new Bumper(canvasContext, 5, function () {
        this.y = gameState.leftBumperControlHeight;
    });
    rightBumper = new Bumper(canvasContext, canvas.width - leftBumper.width - 5, moveComputerPlayer);

    ball = new Ball(canvasContext, canvas.width / 2, canvas.height / 2);

    // Background
    gameCanvas.insertComponent(field);
    gameCanvas.insertComponent(playerScore);
    gameCanvas.insertComponent(computerScore);

    // Foreground
    gameCanvas.insertComponent(leftBumper);
    gameCanvas.insertComponent(rightBumper);
    gameCanvas.insertComponent(ball);

    //Controls
    document.documentElement.addEventListener('keyup', (event) => {
        if (event.keyCode === 32) {
            gameCanvas.doPause();
        }
    });

    canvas.addEventListener('mousemove', (evt) => {
        gameState.leftBumperControlHeight = Math.max(Math.min(calcaulateRelativeMousePosition(evt).y - (leftBumper.height / 2), canvas.height - leftBumper.height), 0);
    });

    gameCanvas.start();
}


function update() {
    let viewport = new CollisionBox(0, 0, canvas.width, canvas.height, true);

    // Handle score keeping, match reset
    if (!viewport.containsX(ball.x, ball.size * 2)) {
        resetBall();
    }
    // Handle bumper collision
    if (leftBumper.collidesWith(ball)) {
        ball.bounceHorizontal((ball.y - (leftBumper.y + (leftBumper.height / 2))) / 7)
    } else if (rightBumper.collidesWith(ball)) {
        ball.bounceHorizontal((ball.y - (rightBumper.y + (rightBumper.height / 2))) / 7)
    }
}

function calcaulateRelativeMousePosition(mouseEvent) {
    let canvasRect = canvas.getBoundingClientRect();
    let rootElement = document.documentElement;
    let mouseX = mouseEvent.clientX - canvasRect.left - rootElement.scrollLeft;
    let mouseY = mouseEvent.clientY - canvasRect.top - rootElement.scrollTop;

    return {x: mouseX, y: mouseY};
}

function resetBall() {
    if (ball.x < (canvas.width / 2)) {
        computerScore.increment();
    } else {
        playerScore.increment();
    }
    ball.reset();
    beeper.boop();
}

function moveComputerPlayer() {
    let me = this;

    let ballBelow = false;
    let ballAbove = false;
    const TOLERANCE = 40;
    const SPEED = 4;

    let midpoint = (this.y + (this.height / 2));
    if (ball.y > midpoint + TOLERANCE) {
        ballBelow = true;
    }
    if (ball.y < midpoint - TOLERANCE) {
        ballAbove = true;
    }

    if (ballBelow) {
        me.y += SPEED;
    } else if (ballAbove) {
        me.y -= SPEED;
    }
}