class USSAssembly {
    constructor() {
        this.hull = 20,
        this.firepower = 5,
        this.accuracy = 0.7
    }
    attack(enemy) {
        if (this.accuracy >= Math.random()) {
            console.log(`You have hit the alien spaceship!`);
            enemy.hull -= this.firepower;
            if (enemy.hull < 0) {
                enemy.hull = 0;
            }
            console.log(`Alien Hull: ${enemy.hull}`);
        } else {
            console.log(`Sorry, human, but you missed!`);
        }
    }
}

class AlienSpaceship {
    constructor() {
        this.hull = Math.floor(Math.random() * 4) + 3,
        this.firepower = Math.floor(Math.random() * 2) + 2,
        this.accuracy = ((Math.random() * 0.3) + 0.6).toFixed(1)
    }
    attack(enemy) {
        if (this.accuracy >= Math.random()) {
            console.log(`The alien has hit your spaceship!`);
            enemy.hull -= this.firepower;
            if (enemy.hull < 0) {
                enemy.hull = 0;
            }
            console.log(`Human Hull: ${enemy.hull}`);
        } else {
            console.log(`Sorry, alien, but you missed!`);
        }
    }
}

const attackButton = document.querySelector('.attack-next-ship');
const retreatButton = document.querySelector('.retreat');
const restartButton = document.querySelector('.restart');

let human = new USSAssembly();
let aliens = [new AlienSpaceship(), new AlienSpaceship(), new AlienSpaceship(), new AlienSpaceship(), new AlienSpaceship(), new AlienSpaceship()];

let round = document.querySelector('.round');
let roundNumber = 1;
let remainingAlienShips = document.querySelector('.remaining-alien-ships');
let remainingAlienShipsNumber = aliens.length;
let humanHull = document.querySelector('.human-hull');
let alienHull = document.querySelector('.alien-hull');
let winner = document.querySelector('.winner');

round.innerHTML = `Round: ${roundNumber}`;
remainingAlienShips.innerHTML = `Remaining Alien Ships: ${remainingAlienShipsNumber}`;
humanHull.innerHTML = `Human's Hull: ${human.hull}`;
alienHull.innerHTML = `Alien's Hull: ${aliens[0].hull}`;

attackButton.addEventListener('click', humanAttack);
retreatButton.addEventListener('click', humanRetreat);
restartButton.addEventListener('click', restartGame);

function humanAttack() {
    if (aliens[0].hull > 0) {
            human.attack(aliens[0]);
            alienHull.innerHTML = `Alien's Hull: ${aliens[0].hull}`;
            hideAttackButton();
        }
        if (aliens[0].hull === 0) {
            console.log('You won this round!');
            aliens.shift();
            if (roundNumber < 6 && remainingAlienShipsNumber > 0) {
                roundNumber += 1;
                round.innerHTML = `Round: ${roundNumber}`;
                remainingAlienShipsNumber -= 1;
                remainingAlienShips.innerHTML = `Remaining Alien Ships: ${remainingAlienShipsNumber}`;
            }
            if (aliens.length === 0) {
                console.log('You won the game!');
                winner.innerHTML = `Winner: Human`
                hideAttackButton();
                hideRetreatButton();
            } else {
                showAttackButton();
                showRetreatButton();
            }
        } else {
            alienAttack();
            humanHull.innerHTML = `Human's Hull: ${human.hull}`;
        }
}

function humanRetreat() {
    console.log('You have retreated!');
    hideAttackButton();
    hideRetreatButton();
}

function alienAttack() {
    if (human.hull > 0) {
        aliens[0].attack(human);
        showAttackButton();
    }
    if (human.hull === 0) {
        console.log('You lost the game!');
        winner.innerHTML = `Winner: Alien`
        hideAttackButton();
        hideRetreatButton();
    }
}

function restartGame() {
    human = new USSAssembly;
    aliens = [new AlienSpaceship(), new AlienSpaceship(), new AlienSpaceship(), new AlienSpaceship(), new AlienSpaceship(), new AlienSpaceship()];
    roundNumber = 1;
    round.innerHTML = `Round: ${roundNumber}`;
    remainingAlienShipsNumber = aliens.length;
    remainingAlienShips.innerHTML = `Remaining Alien Ships: ${remainingAlienShipsNumber}`;
    humanHull.innerHTML = `Human's Hull: ${human.hull}`;
    alienHull.innerHTML = `Alien's Hull: ${aliens[0].hull}`;
    winner.innerHTML = `Winner:`
    showAttackButton();
    hideRetreatButton();
}

function showAttackButton() {
    document.querySelector('.attack-next-ship').style.display = 'inline-block';
}

function showRetreatButton() {
    document.querySelector('.retreat').style.display = 'inline-block';
}

function hideAttackButton() {
    document.querySelector('.attack-next-ship').style.display = 'none';
}

function hideRetreatButton() {
    document.querySelector('.retreat').style.display = 'none';
}