const buttons = document.querySelectorAll('button');

function getComputerChoice() {
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

function capitalize(str) {
    const firstLetter = str.charAt(0).toUpperCase();
    return firstLetter.concat(str.slice(1).toLowerCase());
}

function playRound(event, scoreboard) {
    const playerSelection = event.currentTarget.dataset.choice.toLowerCase();
    const cpuSelection = getComputerChoice();
    const result = determineWinner(playerSelection.toLowerCase(), cpuSelection);
    let updatedScore;
    if (scoreboard) {
        updatedScore = updateScore(scoreboard, result);
    }
    let message;
    if (result === 1) {
        message = `You Win! ${capitalize(playerSelection)} beats ${capitalize(cpuSelection)}.`;
    } else if (result === -1) {
        message = `You Lose! ${capitalize(cpuSelection)} beats ${capitalize(playerSelection)}.`;
    } else {
        message = `Both players put out ${cpuSelection}. A tie!`;
    }
    return {
        message: message,
        scoreboard: updatedScore
    };
}

function updateScore(scoreboard, result) {
    let playerScore = scoreboard.playerScore;
    let cpuScore = scoreboard.cpuScore;
    
    if (result === 1) {
        playerScore++;
    } else if (result === -1) {
        cpuScore++;
    }

    return {
        playerScore: playerScore,
        cpuScore: cpuScore
    }
}

function showFinalMessage(scoreboard, roundsRemaining) {
    const playerScore = scoreboard.playerScore;
    const cpuScore = scoreboard.cpuScore;
    let message = '';

    if (playerScore > cpuScore) {
        message += 'Game Over\nPlayer Wins!';
    } else if (cpuScore > playerScore) {
        message += 'Game Over\nCPU Wins!';
    } else if (roundsRemaining > 0) {
        message += 'The match reached a stalemate.\nNo one wins!';
    } else {
        message += 'This match is a tie!';
    }
    message += `\nFinal score:\nPlayer: ${playerScore} x CPU ${cpuScore}`;

    console.log(message);
}

buttons.forEach(btn => btn.addEventListener('click', playRound));

/*
function game() {
    let scoreboard = {
        playerScore: 0,
        cpuScore: 0
    };
    let roundsRemaining = 5;

    console.log('Game Start!');
    for (let round = 0; round < 5; round++) {
        const playerChoice = prompt(`Game ${round + 1} out of 5.\nPlayer:${scoreboard.playerScore} x CPU:${scoreboard.cpuScore}\nEnter your choice:`);
        const cpuChoice = getComputerChoice();
        const playerScore = scoreboard.playerScore;
        const cpuScore = scoreboard.cpuScore;
        let message;

        ({message, scoreboard} = playRound(playerChoice, cpuChoice, scoreboard));
        console.log(message);
        roundsRemaining--;

        // check for stalemate
        if (roundsRemaining + playerScore < 3 && roundsRemaining + cpuScore < 3) {
            break;
        }

        //check for win
        if (scoreboard.playerScore > 2 || scoreboard.cpuScore > 2) {
            break;
        }
    }
    showFinalMessage(scoreboard, roundsRemaining);
}
*/