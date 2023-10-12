// state
//     score
//     player pick
//     house pick

const playerWinsLSKey = 'playerWins'; // Klucz do przechowywania liczby wygranych gracza w localStorage
const houseWinsLSKey = 'houseWins';

let state = {
    playerWins: parseInt(localStorage.getItem(playerWinsLSKey)) || 0,
    houseWins: parseInt(localStorage.getItem(houseWinsLSKey)) || 0,
};

const renderScore = () => {
    const pointsElement = document.querySelector('.points');

    pointsElement.innerText = state.playerWins - state.houseWins;
};

const init = () => {
    renderScore ();
};

init();