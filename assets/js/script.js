// ELEMENTS
const main         = document.querySelector('.grid-wrapper');
const playBtn      = document.getElementById('play');
const resetBtn     = document.getElementById('reset');
const levelSelect  = document.querySelector('select');
const soundLoose   = new Audio('assets/sound/gameover.wav');
const soundWin     = new Audio('assets/sound/winner.wav');

// DATA
const gameLevels    = [100, 81, 49];
let mines           = [];
const MINES_NUMBER  = 16;
let points          =  0;
let isPlaying       = false;


// PLAY GAME
playBtn.addEventListener('click', play)

//FIXME: rimuovere aggiunta nuova griglia cliccando su play

function play() {
    // // se sto gia giocando
    //     // alert stai gia giocando
    //     // return
    // if (isPlaying) return

    // isPlaying= true;
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
    points         = 0;
    mines          = 0;
    document.getElementById('end-game-message').innerHTML = '';
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

    // square.innerHTML = `<span>${id}</span>`

    square.addEventListener('click', clickedSquare)

    return square;
}
/////////////////////////////////////////////////////////////////////////
/**
 * this function make squares change color by clicking on them
 */
function clickedSquare() {

    //FIXME:colorazione della prima mina cliccata!!
    

    if (mines.includes(this.squareId)) {
        endGame(false);
    } else {

        this.classList.add('clicked');

        const numMines = getNearlyMines(this.squareId);
        // getNearlySquares(this.squareId)
        
        this.innerHTML = `<span>${numMines}</span>`

        points++;

        this.removeEventListener('click', clickedSquare)
            console.log('punti accumulati -->', points);

        const squares = document.getElementsByClassName('square');

        if (points === squares.length - MINES_NUMBER) {
            endGame(true);
        }
    }
}
/////////////////////////////////////////////////////////////////////////
/**
 * this function generate mines in random position
 * @param {position} squareNumbers 
 * @returns 
 */
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
/**
 * this function determine the win/lose condition
 * @param {condition} endGame 
 */
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
/**
 * this function gives back the behaviour when *player* click on a mine
 */
function clickedMine() {
    const squares = document.getElementsByClassName('square');

    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
            // console.log(square.squareId);
        if (mines.includes(square.squareId)) {
                console.log('cliccato mina -->', square.squareId);
            square.classList.add('mine');
            soundLoose.play();
        }
    }
}
/////////////////////////////////////////////////////////////////////////
function getNearlySquares(idSquare) {

    const squarePerRow = Math.sqrt(document.getElementsByClassName('square').length)

    let nearlySquare = [
        idSquare + 1,
        idSquare - 1,
        idSquare - squarePerRow,
        idSquare - squarePerRow - 1,
        idSquare - squarePerRow + 1,
        idSquare + squarePerRow,
        idSquare + squarePerRow - 1,
        idSquare + squarePerRow + 1,
    ];

    if (idSquare % squarePerRow === 1) {
        nearlySquare = [
            idSquare + 1,
            idSquare - squarePerRow,
            idSquare - squarePerRow + 1,
            idSquare + squarePerRow,
            idSquare + squarePerRow + 1,
        ]
    } else if (idSquare % squarePerRow === 0) {
        nearlySquare = [
            idSquare - 1,
            idSquare - squarePerRow,
            idSquare - squarePerRow - 1,
            idSquare + squarePerRow,
            idSquare + squarePerRow - 1
        ]
        
    } else {
        nearlySquare [
            idSquare + 1,
            idSquare - 1,
            idSquare - squarePerRow,
            idSquare - squarePerRow - 1,
            idSquare - squarePerRow + 1,
            idSquare + squarePerRow,
            idSquare + squarePerRow - 1,
            idSquare + squarePerRow + 1
        ]
    }

    return nearlySquare
}
/////////////////////////////////////////////////////////////////////////
function getNearlyMines(idSquare) {
    const nearlySquare = getNearlySquares(idSquare)
    let numMines = 0;
    
    for (let i = 0; i < nearlySquare.length; i++) {
        
        if (mines.includes(nearlySquare[i])) numMines++;
    }

    return numMines
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
