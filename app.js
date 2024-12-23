let targetNumber;
let lives;
let gameActive;

function initializeGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    lives = 5;
    gameActive = true;
    updateLives();
    document.getElementById('message').className = 'message';
    document.getElementById('message').textContent = '';
    document.getElementById('hint').textContent = '';
    document.getElementById('guess').value = '';
    document.getElementById('guess').disabled = false;
    document.getElementById('guessBtn').textContent = 'Guess';
}

function updateLives() {
    document.getElementById('lives').textContent = '❤️'.repeat(lives);
}

function checkGuess() {
    if (!gameActive) {
        initializeGame();
        return;
    }

    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value);
    const messageDiv = document.getElementById('message');
    const hintDiv = document.getElementById('hint');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageDiv.textContent = 'Please enter a valid number between 1 and 100';
        return;
    }

    if (guess === targetNumber) {
        messageDiv.textContent = '🎉 Congratulations! You won!';
        messageDiv.className = 'message win';
        endGame(true);
    } else {
        lives--;
        updateLives();
        hintDiv.textContent = guess < targetNumber ? 'Try a higher number!' : 'Try a lower number!';

        if (lives === 0) {
            messageDiv.textContent = '😞 Game Over! The number was ' + targetNumber;
            messageDiv.className = 'message lose';
            endGame(false);
        }
    }

    guessInput.value = '';
}

function endGame(won) {
    gameActive = false;
    document.getElementById('guess').disabled = true;
    document.getElementById('guessBtn').textContent = 'Play Again';
}

// Handle Enter key
document.getElementById('guess').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Initialize game on load
initializeGame();