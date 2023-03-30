// ELEMENTS
const main        = document.querySelector('.grid-wrapper');
const playBtn     = document.getElementById('play');
const resetBtn    = document.getElementById('reset');
const levelSelect = document.querySelector('select');

// DATA
const gameLevels  = [100, 81, 49];




// PLAY GAME
playBtn.addEventListener('click', play)

function play() {
        // console.log('play');

    const squareNumbers = gameLevels[levelSelect.value];
        // console.log('square numbers -->', squareNumbers);
    playGroundGenerator(squareNumbers)

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
        // console.log('valore dello square -->', this.squareId);
    this.classList.toggle('clicked');
}