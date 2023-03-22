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