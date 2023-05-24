var bird = document.getElementById('bird');
var obstacleTop = document.getElementById('obstacleTop');
var obstacleBottom = document.getElementById('obstacleBottom');
var scoreTag = document.getElementById('score');
var gameOverTag = document.getElementById('gameOver');
var medalBox = document.getElementById('medalBox');
var goldMedal = document.getElementById('goldMedal');
var silverMedal = document.getElementById('silverMedal');
var bronzeMedal = document.getElementById('bronzeMedal');

var birdX = 100;
var birdY = 200;
var obstacleX = 650;
var score = 0;
var gravity = 0.2;
var velocity = 0;
var isGameStarted = false;
var isGameOver = false;

var gapHeight = 150;
var obstacleTopHeight = Math.floor(Math.random() * 200) + 50;
var obstacleBottomHeight = 480 - obstacleTopHeight - gapHeight;

function updateDOMElements() {
    bird.style.transform = velocity > 0 ? `rotate(${Math.min(velocity * 3, 90)}deg)` : 'rotate(-20deg)';
    bird.style.top = birdY + 'px';
    bird.style.left = birdX + 'px';
    bird.style.display = isGameStarted ? 'block' : 'none';

    obstacleTop.style.left = obstacleBottom.style.left = obstacleX + 'px';
    obstacleTop.style.height = obstacleTopHeight + 'px';
    obstacleBottom.style.height = obstacleBottomHeight + 'px';
    obstacleBottom.style.bottom = 0;

    scoreTag.innerHTML = 'Score: ' + score;
    gameOverTag.innerHTML = isGameOver
        ? "Game Over. Score: " + score + "<br> Click to try again."
        : "Click to start the game";
}


function fly() {
    if (!isGameStarted) {
        startGame();
    }
    velocity = -6;
}

function startGame() {
    birdY = 200;
    birdX = 100;
    isGameStarted = true;
    isGameOver = false; // Set game over to false when the game starts

    medalBox.style.display = 'none';
    goldMedal.style.display = 'none';
    silverMedal.style.display = 'none';
    bronzeMedal.style.display = 'none';
    gameOverTag.style.position = 'absolute';

    updateDOMElements();
}

function gameOver() {
    isGameStarted = false;
    isGameOver = true; // Set game over to true when the game ends

    function fallToGround() {
        if (birdY < 480) {
            birdY += 10;
            requestAnimationFrame(fallToGround);
        } else {
            if (score >= 100) {
                goldMedal.style.display = 'block';
            } else if (score >= 50) {
                silverMedal.style.display = 'block';
            } else {
                bronzeMedal.style.display = 'block';
            }
            score = 0;
            medalBox.style.display = 'block';
            birdY = 200;
            obstacleX = 650;
            velocity = 0;

            updateDOMElements();
        }
    }
    fallToGround();
}

function update() {
    birdY += velocity;
    velocity += gravity;

    if(isGameStarted) {
        obstacleX -= 5;
    }

    if(isGameStarted && obstacleX < -50) {
        obstacleX = 650;
        obstacleTopHeight = Math.floor(Math.random() * 200) + 50;
        obstacleBottomHeight = 480 - obstacleTopHeight - gapHeight;
        score++;
    }

    if(isGameStarted && (birdY > 480 || birdY < 0 || 
      (obstacleX < birdX + 20 && obstacleX + 50 > birdX && 
      (birdY < obstacleTopHeight || birdY + 20 > obstacleTopHeight + gapHeight)))) {
        gameOver();
    }
    updateDOMElements();
    requestAnimationFrame(update);
}

window.addEventListener('click', fly);
window.addEventListener('touchstart', fly);
window.addEventListener('keydown', function(e){
    if(e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') fly();
});

// Initially, hide bird and score, show game over message
bird.style.display = 'none';
scoreTag.style.display = 'none';
gameOverTag.style.display = 'block';
updateDOMElements();

update();
