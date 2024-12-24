const playerScoreElem = document.querySelector('.player-score');
const computerScoreElem = document.querySelector('.computer-score');
const playerChoiceElem = document.getElementById('player-choice');
const computerChoiceElem = document.getElementById('computer-choice');
const resultMessageElem = document.getElementById('result-message');
const playAgainBtn = document.createElement('button');
const replayBtn = document.createElement('button');
const logocontainer = document.querySelector('.logocontainer');
const rulesBtn = document.getElementById('rules-btn');
const popupRules = document.getElementById('popup-rules');
const closeBtn = document.querySelector('.close-btn');
const nextBtn = document.getElementById('next-btn');


let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;


updateScoreDisplay();


playAgainBtn.textContent = 'Play Again';
playAgainBtn.classList.add('btn', 'hidden');

replayBtn.textContent = 'Replay';
replayBtn.classList.add('hidden');


document.querySelector('.buttons').appendChild(playAgainBtn);
document.querySelector('.buttons').appendChild(replayBtn);

// Add event listeners to choice images
document.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.id;
        const computerChoice = getRandomChoice();
        logocontainer.classList.add('hidden'); // Hide choices after selection
        displayChoices(playerChoice, computerChoice);
        determineWinner(playerChoice, computerChoice);
    });
});

function getRandomChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function displayChoices(player, computer) {
    playerChoiceElem.innerHTML = `
        <p margin-bottom:25px;>You: ${player}</p>
        <img src="./${player}.png" alt="${player}" height="100" width="100">
    `;

    computerChoiceElem.innerHTML = `
        <p>Computer: ${computer}</p>
        <img src="./${computer}.png" alt="${computer}" height="100" width=100">
    `;
}

function determineWinner(player, computer) {
    if (player === computer) {
        resultMessageElem.textContent = 'It\'s a Tie!';
        replayBtn.classList.add('btn');
        playAgainBtn.classList.remove('btn');
        playAgainBtn.classList.add('hidden');
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        resultMessageElem.textContent = 'You Won!';
        playerScore++;
        saveScoreToLocalStorage();
        updateScoreDisplay();
        playAgainBtn.classList.remove('hidden');  // Show Play Again button
        playAgainBtn.classList.add('btn');
        replayBtn.classList.remove('btn');
    } else {
        resultMessageElem.textContent = 'You Lost!';
        computerScore++;
        saveScoreToLocalStorage();
        updateScoreDisplay();
        playAgainBtn.classList.remove('hidden');  // Show Play Again button
        playAgainBtn.classList.add('btn');
        replayBtn.classList.remove('btn');
        replayBtn.classList.add('hidden');
    }
}

function updateScoreDisplay() {
    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
}

function saveScoreToLocalStorage() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}

// Reset round without resetting the scores
playAgainBtn.addEventListener('click', () => {
    resetRound();
    playAgainBtn.classList.add('hidden');
});

// Allow replay if it’s a tie
replayBtn.addEventListener('click', () => {
    resetRound();
    replayBtn.classList.add('hidden');
});

function resetRound() {
    logocontainer.classList.remove('hidden'); // Show choices again
    playerChoiceElem.innerHTML = ''; // Clear player choice
    computerChoiceElem.innerHTML = ''; // Clear computer choice
    resultMessageElem.textContent = ''; // Clear result message
}

// Event listeners for rules and close button
rulesBtn.addEventListener('click', () => {
    popupRules.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    popupRules.classList.add('hidden');
});

nextBtn.addEventListener('click', () => {
    window.location.href = 'winner.html';  // Redirect to winner page
});

