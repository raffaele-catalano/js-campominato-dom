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

function squareGenerator(squareNumbers, id) {
    const square = document.createElement('div');
    square.className = 'square';
    square.classList.add('square' + squareNumbers)
    square.squareId = id;

    return square;
}
