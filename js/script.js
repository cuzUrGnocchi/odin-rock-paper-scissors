const buttons = document.querySelectorAll('button');
const playerChoiceSpan = document.querySelector('.player-choice');
const playerScoreSpan = document.querySelector('.player-score');
const cpuChoiceSpan = document.querySelector('.cpu-choice');
const cpuScoreSpan = document.querySelector('.cpu-score');
const messageSpan = document.querySelector('.message');
const roundCounterSpan = document.querySelector('.round-counter');

const gameState = {
    matchHistory: [],
    scoreboard: {
        playerScore: 0,
        cpuScore: 0,
        updateScore: function(result) {
            if (result === 1) {
                this.playerScore++;
            } else if (result === -1) {
                this.cpuScore++;
            }
        }
    },
    currentRound: 1,
    updateGameState: function(roundRecord) {
        this.matchHistory.push(roundRecord);
        this.currentRound++;
    }
}

function generateComputerChoice() {
    let choice;
    const rng = Math.floor((Math.random() * 3));
    
    if (rng === 0) {
        choice = 'rock';
    } else if (rng === 1) {
        choice = 'paper';
    } else {
        choice = 'scissors';
    }

    return choice; 
}

// returns 1 if A wins, 0 on a tie and -1 if A loses
function determineWinner(choiceA, choiceB) {
    if (choiceA === 'rock' && choiceB === 'scissors' ||
        choiceA === 'paper' && choiceB === 'rock'  ||
        choiceA === 'scissors' && choiceB === 'paper') {
        return 1;
    } else if (choiceA === choiceB) {
        return 0;
    }
    return -1;
}

function getUpperCase(str) {
    const firstLetter = str.charAt(0).toUpperCase();
    return firstLetter.concat(str.slice(1).toLowerCase());
}

function updateUI(message) {
    if (typeof message !== 'string') {
        message = '';
    }
    const scoreboard = gameState.scoreboard;
    const lastRound = gameState.matchHistory.slice(-1)[0];
    const currentRound = gameState.currentRound;

    if (currentRound > 1) {
        playerChoiceSpan.textContent = getUpperCase(lastRound.playerChoice);
        cpuChoiceSpan.textContent = getUpperCase(lastRound.cpuChoice);
    }

    playerScoreSpan.textContent = scoreboard.playerScore;
    cpuScoreSpan.textContent = scoreboard.cpuScore;
    messageSpan.textContent = message;
    roundCounterSpan.textContent = `Round ${currentRound}`;
}

function playRound(event) {
    if (gameState.scoreboard.playerScore === 5 || gameState.scoreboard.cpuScore === 5) return;

    const playerChoice = event.currentTarget.dataset.choice.toLowerCase();
    const cpuChoice = generateComputerChoice();
    const result = determineWinner(playerChoice.toLowerCase(), cpuChoice);
    let message;

    gameState.scoreboard.updateScore(result);
    
    const playerScore = gameState.scoreboard.playerScore;
    const cpuScore = gameState.scoreboard.cpuScore;
    
    if (playerScore === 5) {
        message = `Game Over. You Win!`;
    } else if (cpuScore === 5) {
        message = `Game Over. You Lose!`;
    } else if (result === 1) {
        message = `You Win! ${getUpperCase(playerChoice)} beats ${getUpperCase(cpuChoice)}.`;
    } else if (result === -1) {
        message = `You Lose! ${getUpperCase(cpuChoice)} beats ${getUpperCase(playerChoice)}.`;
    } else {
        message = `Both players put out ${cpuChoice}. A tie!`;
    }

    gameState.updateGameState({playerChoice, cpuChoice});
    updateUI(message);
}

document.addEventListener('DOMContentLoaded', updateUI);

buttons.forEach(btn => btn.addEventListener('click', playRound));