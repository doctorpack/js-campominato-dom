
const eleSelectLevel = document.querySelector('#select-level');
const eleBtnPlay = document.querySelector('#btn-play');
const eleBtnHelp = document.querySelector('#btn-help');
const eleStartScreen = document.querySelector('.start-screen');
const eleGrid = document.querySelector('.grid');
let arrMines;
let score;
let maxScore;


eleBtnPlay.addEventListener('click', function () {
	score = 0; // inizializzo score ad ogni nuovo gioco
	const nCells = parseInt(eleSelectLevel.value);
	const nMines = 16;
	maxScore = nCells - nMines;
	arrMines = generateMines(nMines, 1, nCells);
	console.log(arrMines.sort((a, b) => a - b));

	// pulire la griglia ad ogni cambio di livello
	eleGrid.innerHTML = '';

	eleGrid.classList.remove('hidden');
	eleStartScreen.classList.add('hidden');

	const sideSquare = Math.sqrt(nCells);
	eleGrid.style.setProperty('--sideSquare', sideSquare);

	for (let i = 1; i <= nCells; i++) {
		const eleCell = document.createElement('div');
		eleCell.classList.add('cell');
		eleCell.innerHTML = i;
		eleGrid.append(eleCell);

		eleCell.addEventListener('click', toggleCell);
	}
});

eleBtnHelp.addEventListener('click', function () {
	if (eleBtnHelp.dataset.function == 'show-help') {
		eleBtnHelp.innerHTML = 'Back to game';
		eleBtnHelp.dataset.function = 'show-game';
		eleGrid.classList.add('hidden');
		eleStartScreen.classList.remove('hidden');
	} else if (eleBtnHelp.dataset.function == 'show-game') {
		eleBtnHelp.innerHTML = 'Show help';
		eleBtnHelp.dataset.function = 'show-help';
		eleGrid.classList.remove('hidden');
		eleStartScreen.classList.add('hidden');
	}
});

function toggleCell() {
	
	const cellNumber = parseInt(this.innerHTML);

	if (arrMines.includes(cellNumber)) { 
		this.classList.add('mine');
		disableAllCells(true);
		alert('Il tuo punteggio e: ' + score);
	} else {
		this.removeEventListener('click', toggleCell);
		this.classList.add('no-mine');
		if (score == maxScore) {
			disableAllCells(false);
			alert('Complimenti hai vinto! Il tuo punteggio e: ' + score);
		}
	}
}

function generateMines(nMines, min, max) {
	const arrRandoms = [];
	for (let i = 0; i < nMines; i++) {
		do {
			randomNumber = getRandomInteger(min, max);
		} while (arrRandoms.includes(randomNumber))
		arrRandoms.push(randomNumber);
	}
	return arrRandoms;
}
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function disableAllCells(showMines) {
	const listCells = eleGrid.querySelectorAll('.cell');
	for (let i = 0; i < listCells.length; i++) {		
		const cellNumber = parseInt(listCells[i].innerHTML);
		if (showMines && arrMines.includes(cellNumber)) {
			listCells[i].classList.add('mine');
		}
		listCells[i].removeEventListener('click', toggleCell);
	}
}