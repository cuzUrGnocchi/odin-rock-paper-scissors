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