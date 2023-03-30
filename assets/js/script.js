// ELEMENTS
const main         = document.querySelector('.grid-wrapper');
const playBtn      = document.getElementById('play');
const resetBtn     = document.getElementById('reset');
const levelSelect  = document.querySelector('select');

// DATA
const gameLevels   = [100, 81, 49];
let mines          = [];
const MINES_NUMBER = 16;
let points         = 0;



// PLAY GAME
playBtn.addEventListener('click', play)

function play() {
        // console.log('play');

    const squareNumbers = gameLevels[levelSelect.value];
        // console.log('square numbers -->', squareNumbers);
    playGroundGenerator(squareNumbers)

    mines = minesGenerator(squareNumbers);
        console.log('posizione delle mine in griglia -->', mines);
}

// RESET GAME
resetBtn.addEventListener('click', reset)

function reset() {
        // console.log('reset');
    main.innerHTML = '';
}


// FUNCTIONS
/**
 * this function generates the playground of the game
 * @param {squares amount based on level of difficulty} squareNumbers 
 */
function playGroundGenerator(squareNumbers){
    const grid = document.createElement('div');
    grid.className = 'grid';
        // console.log(grid);
    for (let i = 1; i <= squareNumbers; i++) {
        const square = squareGenerator(squareNumbers, i);
        grid.append(square);
    }

    main.append(grid);
}
/////////////////////////////////////////////////////////////////////////
/**
 * this function generate a new square
 * @param {square amount based on level of difficulty} squareNumbers 
 * @param {square value} id 
 * @returns generate a new square
 */
function squareGenerator(squareNumbers, id) {
    const square = document.createElement('div');
    square.className = 'square';
    square.classList.add('square' + squareNumbers)
    square.squareId = id;

    square.innerHTML = `<span>${id}</span>`

    square.addEventListener('click', clickedSquare)

    return square;
}
/////////////////////////////////////////////////////////////////////////
/**
 * this function make squares change color by clicking on them
 */
function clickedSquare() {
    this.classList.toggle('clicked');

    if(mines.includes(this.squareId)) {
        endGame(false);
    } else {
        points++;
        this.removeEventListener('click', clickedSquare)
            console.log(points);

        const squares = document.querySelectorAll('.square');

        if (points === squares.length - MINES_NUMBER) {
            endGame(true);
        }
    }
}
/////////////////////////////////////////////////////////////////////////
function minesGenerator(squareNumbers) {
    
    const mines = [];
    
    while (mines.length < MINES_NUMBER) {
        const mine = getRandomNumber(1, squareNumbers);

        if (!mines.includes(mine))
        mines.push(mine)
    }

    return mines;
}
/////////////////////////////////////////////////////////////////////////
function endGame(winCondition) {

    clickedMine ();

    const gameOver = document.createElement('div');
        gameOver.className = 'end-game'

    main.append(gameOver)

            console.log('You Loose');
    
    let endMessage = '';
    
    if (winCondition) {
        endMessage = `YOU WIN! Your Score is: ${points}`
    } else {
        endMessage = `YOU LOOSE! Your Score is: ${points}`
    }

    document.getElementById('end-game-message').innerHTML = endMessage;
}
/////////////////////////////////////////////////////////////////////////
function clickedMine() {

    const squares = document.querySelectorAll('.square');

    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
            // console.log(square.squareId);
        if (mines.includes(square.squareId)) {
            // console.log('cliccato mina -->', square.squareId);
            square.classList.add('mine');
        }
    }
}
/////////////////////////////////////////////////////////////////////////
/**
 * this function generates a random number
 * @param {number} min 
 * @param {number} max 
 * @returns a random number
 */
function getRandomNumber(min, max) {
    let error = false;
    let errorMsg;
    //controllo che gli estremi siano numeri
    if (isNaN(min) || isNaN(max)) {
        error = true;
        errorMsg = 'min e max devono essere numeri'
    }

    if (min >= max) {
        error = true;
        errorMsg = 'min deve esser inferiore a max'
    }

    if (error) {
        console.error(errorMsg)
        // con il return la funzione si interrompe (si può evitare l'else)
        return;
    }

    return Math.floor(Math.random() * (max - min +1) + min)
}
