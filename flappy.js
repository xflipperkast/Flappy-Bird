const bird = document.getElementById('bird');
const gameBox = document.getElementById('gameBox');
const obstacleTop = [document.getElementById('obstacleTop0'), document.getElementById('obstacleTop1')];
const obstacleBottom = [document.getElementById('obstacleBottom0'), document.getElementById('obstacleBottom1')];
const scoreTag = document.getElementById('score');
const gameOverTag = document.getElementById('gameOver');
const medalBox = document.getElementById('medalBox');
const goldMedal = document.getElementById('goldMedal');
const silverMedal = document.getElementById('silverMedal');
const bronzeMedal = document.getElementById('bronzeMedal');
const pointSound = new Audio('sounds/point.mp3');
const flySound = new Audio('sounds/fly.mp3');



const birds = ["Yellow", "Blue", "Red"];
let lastBird = birds.length;
let birdY = 200;
let birdX = 100;
let velocity = 0;
let isGameStarted = false;
let isDead = false;


// Generate the height for obstacles
const gapHeight = 150;

let obstacleX = [650, 1050]; // Initial positions of each obstacle

let obstacleTopHeight = [
    Math.floor(Math.random() * 200) + 50,
    Math.floor(Math.random() * 200) + 50,
  ];
  
  let obstacleBottomHeight = [
    480 - obstacleTopHeight[0] - gapHeight,
    480 - obstacleTopHeight[1] - gapHeight,
  ];

let getScore = (function() {
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


// Fps limiter
const fps = 60;
let now;
let then = Date.now();
const interval = 1000/fps;
let delta;

// Speed decider
const flyHeight = -8;
const obstacleVelocity = 8;
const gravity = 0.4;

function fly() {
    if (!isGameStarted && !isDead) {
        startGame();
    }
    // If the flySound is playing, stop it
    if (!flySound.paused) {
        flySound.currentTime = flySound.duration;
    }
    // Then, start it again
    flySound.play();
    velocity = flyHeight;
}


function startGame() {
    let birdChoice = Math.round(Math.random() * birds.length);
    
    while (birdChoice === lastBird || birdChoice === birds.length) {
        birdChoice = Math.round(Math.random() * birds.length);
    }

    console.log(birdChoice);
    bird.style.backgroundImage = `url(Birds/${birds[birdChoice]}.png)`;
    lastBird = birdChoice;

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

    update()
}

function gameOver() {
    isGameStarted = false;
    isDead = true;

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
        
    } else {
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
        }

        if (getScore.getScore() >= 100) {
            goldMedal.style.display = 'block';
        } else if (getScore.getScore() >= 50) {
            silverMedal.style.display = 'block';
        } else {
            bronzeMedal.style.display = 'block';
        }
        
        getScore.resetScore();
        medalBox.style.display = 'block';

        setTimeout(() => { isDead = false }, 2000);
    }
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
  
      bird.style.top = birdY + 'px';
      bird.style.left = birdX + 'px';
  
      bird.style.transform = `rotate(${Math.min(velocity * 4, 90)}deg)`;
  
      obstacleTop[i].style.left = obstacleX[i] + 'px';
      obstacleTop[i].style.height = obstacleTopHeight[i] + 'px';
  
      obstacleBottom[i].style.left = obstacleX[i] + 'px';
      obstacleBottom[i].style.height = obstacleBottomHeight[i] + 'px';
      obstacleBottom[i].style.bottom = 0;
  
      if (obstacleX[i] < -50) {
        obstacleX[i] = 650;
        obstacleTopHeight[i] = Math.floor(Math.random() * 200) + 50;
        obstacleBottomHeight[i] = 480 - obstacleTopHeight[i] - gapHeight;
        getScore.incrementScore();
      }
  
      if (birdY > 480 || birdY < 0 || 
         (obstacleX[i] < birdX + 20 && obstacleX[i] + 50 > birdX && 
         (birdY < obstacleTopHeight[i] || birdY + 20 > obstacleTopHeight[i] + gapHeight))) {
           gameOverTag.innerHTML = "Game Over. Score: " + getScore.getScore() + "<br> Click to try again.";
           gameOver();
      }
    }
  
    scoreTag.innerHTML = 'Score: ' + getScore.getScore();
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
console.log("Made By xFlippy");
console.log("Hhttps://github.com/xflipperkast");
console.log("https://github.com/xflipperkast/Flappy-Bird");
