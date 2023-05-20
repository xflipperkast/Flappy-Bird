var bird = document.getElementById('bird');
var gameBox = document.getElementById('gameBox');
var obstacleTop = document.getElementById('obstacleTop');
var obstacleBottom = document.getElementById('obstacleBottom');
var scoreTag = document.getElementById('score');
var gameOverTag = document.getElementById('gameOver');

var birdY = 200;
var birdX = 100;
var obstacleX = 650; // Set initial pipe position outside of the game area
var score = 0;
var gravity = 0.2; // Modify this to adjust the falling speed
var velocity = 0;
var isGameStarted = false;

// Generate the height for obstacles
var gapHeight = 150;
var obstacleTopHeight = Math.floor(Math.random() * 200) + 50;
var obstacleBottomHeight = 480 - obstacleTopHeight - gapHeight;

function fly() {
    if (!isGameStarted) {
        startGame();
    }
    velocity = -6;
    bird.style.transform = 'rotate(-20deg)'; // Rotate the bird upward
}

function startGame() {
    birdY = 200;
    birdX = 100;
    isGameStarted = true;
    gameOverTag.style.display = 'none';
    bird.style.display = 'block';
    scoreTag.style.display = 'block';
}

function gameOver() {
    isGameStarted = false;
    gameOverTag.style.display = 'block';
    bird.style.display = 'none';
    scoreTag.style.display = 'none';
    birdY = 200;
    obstacleX = 650;
    score = 0;
    velocity = 0;
}

function update() {
    birdY += velocity;
    velocity += gravity;

    if(isGameStarted) {
        obstacleX -= 5; // This makes the pipe move from right to left
    }

    bird.style.top = birdY + 'px';
    bird.style.left = birdX + 'px';
    if(velocity > 0) {
        bird.style.transform = `rotate(${Math.min(velocity * 3, 90)}deg)`;
    }
    obstacleTop.style.left = obstacleX + 'px';
    obstacleTop.style.height = obstacleTopHeight + 'px';

    obstacleBottom.style.left = obstacleX + 'px';
    obstacleBottom.style.height = obstacleBottomHeight + 'px';
    obstacleBottom.style.bottom = 0;

    if(isGameStarted && obstacleX < -50) {
        obstacleX = 650; // Reset the pipe position outside of the game area
        obstacleTopHeight = Math.floor(Math.random() * 200) + 50;
        obstacleBottomHeight = 480 - obstacleTopHeight - gapHeight;
        score++;
    }

    if(isGameStarted && (birdY > 480 || birdY < 0 || 
      (obstacleX < birdX + 20 && obstacleX + 50 > birdX && 
      (birdY < obstacleTopHeight || birdY + 20 > obstacleTopHeight + gapHeight)))) {
        gameOverTag.innerHTML = "Game Over. Score: " + score + "<br> Click to try again.";
        gameOver();
    }

    if(isGameStarted) {
        scoreTag.innerHTML = 'Score: ' + score;
    }
    requestAnimationFrame(update);
}

window.addEventListener('click', fly);
window.addEventListener('touchstart', fly);
window.addEventListener('keydown', function(e){
    if(e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') fly();
});

// Initially, hide bird and score, show game over message
gameOverTag.innerHTML = "Click to start the game";
bird.style.display = 'none';
scoreTag.style.display = 'none';

update();
