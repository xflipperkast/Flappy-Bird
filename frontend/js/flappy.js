const bird = document.getElementById('bird');
const gameBox = document.getElementById('gameBox');
const obstacleTop = document.getElementsByClassName('obstacleTop');
const obstacleBottom = document.getElementsByClassName('obstacleBottom');
const scoreTag = document.getElementById('score');
const gameOverTag = document.getElementById('gameOver');
const medalBox = document.getElementById('medalBox');
const goldMedal = document.getElementById('goldMedal');
const silverMedal = document.getElementById('silverMedal');
const bronzeMedal = document.getElementById('bronzeMedal');
const pointSound = new Audio('./frontend/sounds/point.mp3');
const flySound = new Audio('./frontend/sounds/fly.mp3');
const deadSound = new Audio('./frontend/sounds/dead.mp3');
const coins = document.getElementsByClassName('coin');

for (let i = 0; i < coins.length; i++) {
    coins[i].style.display = "none";
}

const birds = getColors()[0] == "" ? [] : getColors();
let lastBird = birds.length;
let birdY = 200;
let birdX = 100;
let velocity = 0;
let isGameStarted = false;
let isDead = false;
let scoreIncremented = false;
let coinCollected = false;
let collectedCoin = 0;

const scoreData = (() => {
    let score = 0; // Encapsulated score

    return {
        incrementScore: function() {
            pointSound.play();
            score++;
        },
        getScore: function() {
            return score;
        },
        resetScore: function() {
            score = 0;
        }
    };
})();

// Generate the height for obstacles
const gapHeight = 150;
let obstacleX = [650, 1000]; // Initial positions of each obstacle

let obstacleTopHeight = [
    Math.floor(Math.random() * 200) + 50,
    Math.floor(Math.random() * 200) + 50
];
  
let obstacleBottomHeight = [
    480 - obstacleTopHeight[0] - gapHeight,
    480 - obstacleTopHeight[1] - gapHeight
];

// Data for coins
let coinY = [
    obstacleTopHeight[0] + gapHeight / 2 - 20,
    obstacleTopHeight[1] + gapHeight / 2 - 20
];
let coinX = [655, 1005]; // Initial positions of each coin

// Fps limiter
const fps = 60;
let now;
let then = Date.now();
const interval = 1000/fps;
let delta;

// Speed decider
const flyHeight = -8;
const obstacleVelocity = 6;
const gravity = 0.4;

function fly() {

    if (!isGameStarted && !isDead) {
        startGame();
    }

    // If the flySound is playing, stop it
    if (!flySound.paused) {
        flySound.currentTime = 0;
    }

    if (!isDead) { 
        flySound.play();
    }

    velocity = flyHeight;
}

function getBirdColor() {
    if (birds.length == 0) {
        bird.style.backgroundImage = `url(./frontend/images/Birds/Yellow.png)`;
        return;
    } else if (birds.length == 1) {
        bird.style.backgroundImage = `url(./frontend/images/Birds/${birds[0]}.png)`;
        return;
    }

    let birdChoice = Math.round(Math.random() * birds.length);
    
    while (birdChoice === lastBird || birdChoice === birds.length) {
        birdChoice = Math.round(Math.random() * birds.length);
    }

    bird.style.backgroundImage = `url(./frontend/images/Birds/${birds[birdChoice]}.png)`;
    lastBird = birdChoice;
}


function startGame() {
    getBirdColor();

    birdY = 200;
    birdX = 100;
    isGameStarted = true;
    bird.style.display = 'block';
    scoreTag.style.display = 'block';

    // Hide medal box and medals
    medalBox.style.display = 'none';
    goldMedal.style.display = 'none';
    silverMedal.style.display = 'none';
    bronzeMedal.style.display = 'none';

    gameOverTag.style.position = 'absolute';

    for (let i = 0; i < coins.length; i++) {
        coins[i].style.display = "block";
    }

    update()
}

function gameOver() {
    isGameStarted = false;

    // New game over animation
    if (birdY < 480) { // 480 is the height of the game area
        now = Date.now();
        delta = now - then;
        requestAnimationFrame(gameOver);

        if (delta > interval) {
            then = now - (delta % interval);
            birdY += 10; // This moves the bird down
            bird.style.top = birdY + 'px';
        }

        if (!isDead) { // !isDead means "if isDead is false"
            deadSound.play();
            isDead = true;
        }

        return;
    }

    bird.style.display = 'none';
    gameOverTag.style.display = 'block';
    scoreTag.style.display = 'block';
    birdY = 200;
    velocity = 0;

    // Reset obstacle positions and heights
    for(let i = 0; i < obstacleX.length; i++) {
        obstacleX[i] = 650 + (400 * i);
        obstacleTopHeight[i] = Math.floor(Math.random() * 200) + 50;
        obstacleBottomHeight[i] = 480 - obstacleTopHeight[i] - gapHeight;
        scoreIncremented = false;
    }

    // Reset coin positions and heights
    for(let i = 0; i < coinY.length; i++) {
        coinY[i] = obstacleTopHeight[i] + gapHeight / 2 - 20;
        coinX[i] = 655 + (400 * i);
        coinCollected = false;
    }

    if (scoreData.getScore() >= 100) {
        goldMedal.style.display = 'block';
    } else if (scoreData.getScore() >= 50) {
        silverMedal.style.display = 'block';
    } else {
        bronzeMedal.style.display = 'block';
    }

    checkMaxScoreCookie(scoreData.getScore());
    scoreData.resetScore();
    medalBox.style.display = 'block';
    setTimeout(() => { isDead = false }, 2000);
}

function update() {
    if (!isGameStarted) return;

    requestAnimationFrame(update);

    now = Date.now();
    delta = now - then;

    if (delta < interval) return;

    then = now - (delta % interval);

    birdY += velocity;
    velocity += gravity;

    for (let i = 0; i < 2; i++) { // Update for each set of obstacles
        obstacleX[i] -= obstacleVelocity;
        coinX[i] -= obstacleVelocity;
    
        bird.style.top = birdY + 'px';
        bird.style.left = birdX + 'px';
    
        bird.style.transform = `rotate(${Math.min(velocity * 4, 90)}deg)`;
    
        obstacleTop[i].style.left = obstacleX[i] + 'px';
        obstacleTop[i].style.height = obstacleTopHeight[i] + 'px';

        coins[i].style.left = coinX[i] + 'px';
    
        obstacleBottom[i].style.left = obstacleX[i] + 'px';
        obstacleBottom[i].style.height = obstacleBottomHeight[i] + 'px';
        obstacleBottom[i].style.bottom = 0;

        if (obstacleX[i] < 75 && !scoreIncremented) {
            scoreIncremented = true;
            scoreData.incrementScore();
            coinCollected = true;
            collectedCoin = i;
        }

        if (obstacleX[i] < -50) {
            obstacleX[i] = 650;
            coinX[i] = 655;
            obstacleTopHeight[i] = Math.floor(Math.random() * 200) + 50;
            obstacleBottomHeight[i] = 480 - obstacleTopHeight[i] - gapHeight;
            coinY[i] = obstacleTopHeight[i] + gapHeight / 2 - 20;
            scoreIncremented = false;
            coinCollected = false;
        }

        if (coinCollected) {
            coinY[collectedCoin] += 3; 
        }

        coins[i].style.top = coinY[i] + 'px';

        if (birdY > 480|| 
          (obstacleX[i] < birdX + 20 && obstacleX[i] + 50 > birdX && 
          (birdY < obstacleTopHeight[i] || birdY + 20 > obstacleTopHeight[i] + gapHeight))) {
            gameOverTag.innerHTML = "Game Over. Score: " + scoreData.getScore() + "<br> Best: " + getCookieData("maxScore");
            gameOver();
        }

    }

    scoreTag.innerHTML = 'Score: ' + scoreData.getScore();
}

window.addEventListener('click', fly);
window.addEventListener('touchstart', fly);
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') fly();
});

// Initially, hide bird and score, show game over message
gameOverTag.innerHTML = "Click to start the game";
bird.style.display = 'none';
scoreTag.style.display = 'none';

update();
