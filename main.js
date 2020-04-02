var canvas,
    canvasContext,
    ballSize,
    ballX,
    ballY,
    ballSpeedX,
    ballSpeedY,
    playerOneY,
    playerTwoY,
    padSize;



const padWeight = 10;

window.onload = function () {
    canvas = document.getElementById("pongCourt");
    canvasContext = canvas.getContext("2d");
    //
    ballSize = 10;
    padSize = 100;

    playerOneY = (canvas.height / 2) - (padSize / 2);
    playerTwoY = (canvas.height / 2) - (padSize / 2);

    ballReset();

    // TODO - introduce some randomness at start
    ballSpeedX = 8;
    ballSpeedY = 4;

    let fps = 30;

    setInterval(function () {
        drawAll();
        moveAll();
    }, 1000 / fps);

    this.canvas.addEventListener("mousemove",
        function (e) {
            var mousePosition = calcMouse(e);
            playerOneY = mousePosition.y - (padSize / 2);
        }
    )
}

function calcMouse(e) {
    var base = canvas.getBoundingClientRect();
    var dom = document.documentElement;

    // get mouse position on the canvas not the browser
    var mX = e.clientX - base.left - dom.scrollLeft;
    var mY = e.clientY - base.top - dom.scrollTop;

    return {
        x: mX,
        y: mY
    };
}

function ballReset() {
    // ball starts at court center
    // TODO - start at paddle and do different types of serve for speed
    ballX = (canvas.width / 2) - (ballSize / 2);
    ballY = (canvas.height / 2) - (ballSize / 2);
}

function botPlay() {
    padCenter = playerTwoY + padSize / 2;

    // padSize devided by some number to an area more usefull than 1 pixel to avoid glitchy movement
    if (padCenter < ballY - padSize / 4) {
        playerTwoY += 8;

    } else if (padCenter > ballY + padSize / 4) {
        playerTwoY -= 8;
    }
}

function moveAll() {
    // animate ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width) {
        if (ballY > playerTwoY && ballY < playerTwoY + padSize) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }
    if (ballX < 0) {
        if (ballY > playerOneY && ballY < playerOneY + padSize) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }

    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }

    botPlay();
}

function drawAll() {

    // draw background
    solidRect(0, 0, canvas.width, canvas.height, "black");

    // draw ball
    solidRect(ballX, ballY, ballSize, ballSize, "white");

    // draw pad P1
    solidRect(0, playerOneY, padWeight, padSize, "white");

    // draw pad P2
    solidRect(canvas.width - padWeight, playerTwoY, padWeight, padSize, "gray");
}

function solidRect(startX, startY, width, height, colour) {
    canvasContext.beginPath();
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(startX, startY, width, height);
}