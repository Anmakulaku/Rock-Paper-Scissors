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
    document.querySelector('.result__button').addEventListener('click', reset);
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
    const optionsElement = document.querySelector('.options');
    optionsElement.classList.add('slide-left');
};

const showFight = () => { 
    const fightElement = document.querySelector('.fight');
    fightElement .classList.add('slide-left');
    fightElement.classList.remove('hidden');
    createElementPickedByPlayer();
    createElementPickedByHouse();

    showResult();
};

const showResult = () => {
    const resultText = document.querySelector('.result__text');

    if (state.playerPick === state.housePick) {
        resultText.innerText = 'DRAW';
        console.log ('remis');
    }
    else if (winningCombinations[state.playerPick].includes(state.housePick)) {
        resultText.innerText = 'YOU WIN';
        document.querySelector('.circle__player').classList.remove('hidden');
        localStorage.setItem(playerWinsLSKey, state.playerWins + 1);
        state = {
            ...state,
            playerWins: state.playerWins + 1,
        };
        console.log ('player wins');
    } else {
        resultText.innerText = 'YOU LOSE';
        document.querySelector('.circle__house').classList.remove('hidden');
        localStorage.setItem(houseWinsLSKey, state.houseWins + 1);
        state = {
            ...state,
            houseWins: state.houseWins + 1,
        };
    
        console.log ('house wins');
    }
    setTimeout(renderResult, 500);
    setTimeout(renderScore, 1000);
};

const renderResult = () => {
    document.querySelector('.result').classList.add('shown');
    document.querySelector('.pick__player').classList.add('moved');
    document.querySelector('.pick__house').classList.add('moved');
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

const reset = () => {
    const fightElement = document.querySelector('.fight');
    fightElement.classList.remove('slide-left');
    const optionsElement = document.querySelector('.options');
    optionsElement.classList.remove('slide-left');

    document.querySelector('.result').classList.remove('shown');
    document.querySelector('.pick__player').classList.remove('moved');
    document.querySelector('.pick__house').classList.remove('moved');
    document.querySelector('.circle__player').classList.add('hidden');
    document.querySelector('.circle__house').classList.add('hidden');
};

const rules = () => {
    const rulesButton = document.querySelector('.rules__button');
    const modal = document.querySelector('.modal');
    const closeModalButton = document.querySelector('.closeModal');

    rulesButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
}


const init = () => {
    renderScore ();
    pickEvents();
    rules();
};

init();