// state
//     score
//     player pick
//     house pick

const playerWinsLSKey = 'playerWins'; 
const houseWinsLSKey = 'houseWins';

const winningCombinations = {
    paper: ['rock'],
    rock: ['scissors'],
    scissors: ['paper'],
}

let state = {
    playerWins: parseInt(localStorage.getItem(playerWinsLSKey)) || 0,
    houseWins: parseInt(localStorage.getItem(houseWinsLSKey)) || 0,
    playerPick: null,
    housePick: null,
};

const renderScore = () => {
    const pointsElement = document.querySelector('.points');

    pointsElement.innerText = state.playerWins - state.houseWins;
};

const pickEvents = () => {
    document.querySelectorAll('.options button').forEach(button => {
        button.addEventListener('click', pick);
    });
};

const pick = (e) => {
    pickByPlayer(e.currentTarget.dataset.pick);
    pickByHouse();
    hideOptions();
    showFight();
};

const pickByPlayer = (pickedOption) => {
    state = {
        ...state,
        playerPick: pickedOption,
    };
};

const pickByHouse = () => {
    const options = ['rock', 'paper', 'scissors'];
    const housePick = options[Math.floor(Math.random() * options.length)];

    state = {
        ...state,
        housePick,
    }
};

const hideOptions = () => {
    document.querySelector('.options').classList.add('slide-left');
    setTimeout(() => {
        document.querySelector('.options').classList.add('hidden')
    }, 300);
};

const showFight = () => {
    document.querySelector('.fight').classList.remove('hidden');
    createElementPickedByPlayer();
    createElementPickedByHouse();

    showResult();
};

const showResult = () => {
    if (state.playerPick === state.housePick) {
        console.log ('remis');
    }
    else if (winningCombinations[state.playerPick].includes(state.housePick)) {
        localStorage.setItem(playerWinsLSKey, state.playerWins + 1);
        state = {
            ...state,
            playerWins: state.playerWins + 1,
        };
        console.log ('player wins');
    } else {
        localStorage.setItem(houseWinsLSKey, state.houseWins + 1);
        state = {
            ...state,
            houseWins: state.houseWins + 1,
        };
        console.log ('house wins');
    }

    renderScore();
};

const createElementPickedByPlayer = () => {
    const playerPick = state.playerPick;

    const pickContainerElement = document.querySelector('.pick__container--player');
    pickContainerElement.innerHTML = '';
    pickContainerElement.appendChild(createPickElement(playerPick));
};

const createElementPickedByHouse = () => {
    const housePick = state.housePick;

    const pickContainerElement = document.querySelector('.pick__container--house');
    pickContainerElement.innerHTML = '';
    pickContainerElement.appendChild(createPickElement(housePick));
};

const createPickElement = (option) => {
    const pickElement = document.createElement('div');
    pickElement.classList.add('button', `button__${option}`); //pamiętać o backticks! `` nie '' 

    const imgContainerElement = document.createElement('div');
    imgContainerElement.classList.add('button__imgContainer');

    const imgElement = document.createElement('img');
    imgElement.src=`./images/icon-${option}.svg`;
    imgElement.alt=option;

    imgContainerElement.appendChild(imgElement);
    pickElement.appendChild(imgContainerElement);

    return pickElement;
};

const init = () => {
    renderScore ();
    pickEvents();
};

init();