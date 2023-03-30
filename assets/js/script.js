// ELEMENTS
const main        = document.querySelector('main-wrapper');
const playBtn     = document.getElementById('play');
const resetBtn    = document.getElementById('reset');
const levelSelect = document.querySelector('select');

// DATA
const gameLevels  = [100, 81, 49];




// PLAY GAME
playBtn.addEventListener('click', play)

function play (){
        console.log('play');
}

// RESET GAME
resetBtn.addEventListener('click', reset)

function reset () {
        console.log('reset');
}
