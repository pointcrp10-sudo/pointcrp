// ======================== ЛОКАЛИЗАЦИЯ =========================
let currentLang = 'ru';

const LANG = {
    'ru': {
        yourTurn: 'Ваш ход',
        opponentTurn: 'Ход соперника',
        win: 'ВЫ ПОБЕДИЛИ',
        lose: 'ПОРАЖЕНИЕ ОТ',
        draw: 'НИЧЬЯ С',
        playerSelect: 'Выберите игроков',
        you: 'Вы',
        opponent: 'Соперник',
        startMatch: 'Начать матч!',
        listComplete: 'Список заполнен!',
        mainTitle: '⚽ Золотой Мяч: ТОП‑30 ⚽'
    },
    'en': {
        yourTurn: 'Your turn',
        opponentTurn: 'Opponent\'s turn',
        win: 'YOU WON AGAINST',
        lose: 'LOSS TO',
        draw: 'DRAW WITH',
        playerSelect: 'Select players',
        you: 'You',
        opponent: 'Opponent',
        startMatch: 'Start match!',
        listComplete: 'List completed!',
        mainTitle: '⚽ Golden Ball: TOP‑30 ⚽'
    }
};

function t(key) {
    const langData = LANG[currentLang] || LANG['ru'];
    return langData[key] || key;
}

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

// ======================== БАЗА ДАННЫХ =========================
const playersPool = [
    { name: "Лионель Месси", img: "images/1.jpg" },
    { name: "Криштиану Роналду", img: "images/2.jpg" },
    { name: "Килиан Мбаппе", img: "images/3.jpg" },
    { name: "Эрлинг Холанд", img: "images/4.jpg" },
    { name: "Винисиус Жуниор", img: "images/5.jpg" },
    { name: "Джуд Беллингем", img: "images/6.jpg" },
    { name: "Родри", img: "images/7.jpg" },
    { name: "Ламин Ямаль", img: "images/8.jpg" },
    { name: "Усман Дембеле", img: "images/9.jpg" },
    { name: "Доминик Собослаи", img: "images/10.jpg" },
    { name: "Харри Кейн", img: "images/11.jpg" },
    { name: "Майкл Олисе", img: "images/12.jpg" },
    { name: "Давид Райя", img: "images/13.jpg" },
    { name: "Вильям Салиба", img: "images/14.jpg" },
    { name: "Витинья", img: "images/15.jpg" },
    { name: "Нуно Мендеш", img: "images/16.jpg" },
    { name: "Бруно Фернандеш", img: "images/17.jpg" },
    { name: "Букайо Сака", img: "images/18.jpg" },
    { name: "Йозуа Киммих", img: "images/19.jpg" },
    { name: "Джамал Мусиала", img: "images/20.jpg" },
    { name: "Эмильяно Мартинес", img: "images/21.jpg" },
    { name: "Димарко", img: "images/22.jpg" },
    { name: "Пау Кубарси", img: "images/23.jpg" },
    { name: "Педри", img: "images/24.jpg" },
    { name: "Хвича Кварацхелия", img: "images/25.jpg" },
    { name: "Лука Модрич", img: "images/26.jpg" },
    { name: "Мартин Эдегор", img: "images/27.jpg" },
    { name: "Деклан Райс", img: "images/28.jpg" },
    { name: "Шерки", img: "images/29.jpg" },
    { name: "Альварес", img: "images/30.jpg" }
];

// ======================== УПРАВЛЕНИЕ КНОПКОЙ "В МЕНЮ" =========================
function showMenuButton() {
    document.getElementById('to-menu-btn').style.display = 'block';
}
function hideMenuButton() {
    document.getElementById('to-menu-btn').style.display = 'none';
}

// ======================== ГЛАВНОЕ МЕНЮ =========================
function goToMainMenu() {
    hideMenuButton();
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('player-card').style.display = 'none';
    document.getElementById('grid-wrapper').style.display = 'none';
    document.getElementById('tic-tac-toe').style.display = 'none';
    document.getElementById('player-select-modal').style.display = 'none';
    window.tttGameOver = true;
    document.getElementById('main-title').textContent = t('mainTitle');
}

// ======================== УРОВЕНЬ 1 =========================
let currentGamePlayers = [];
let currentPlayerIndex = 0;
let choices = Array(30).fill(null);

function startLevel1() {
    hideMenuButton();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('player-card').style.display = 'flex';
    document.getElementById('grid-wrapper').style.display = 'block';
    document.getElementById('tic-tac-toe').style.display = 'none';
    showMenuButton();
    document.getElementById('main-title').textContent = t('mainTitle');

    currentGamePlayers = [...playersPool].sort(() => Math.random() - 0.5);
    currentPlayerIndex = 0;
    choices = Array(30).fill(null);

    renderGrid();
    nextTurn();
}

function renderGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell' + (choices[i] ? ' occupied' : '');
        const name = choices[i] || '———';
        cell.innerHTML = `
            <span class="cell-num">${i+1}</span>
            <span class="cell-name">${name}</span>
        `;
        if (!choices[i]) {
            cell.addEventListener('click', () => selectSlot(i));
        }
        container.appendChild(cell);
    }
}

function nextTurn() {
    if (currentPlayerIndex < 30) {
        const player = currentGamePlayers[currentPlayerIndex];
        document.getElementById('player-card').innerHTML = `
            <img src="${player.img}" class="player-img" alt="${player.name}">
            <div class="player-name-text">${player.name}</div>
        `;
    } else {
        // Все слоты заполнены
        document.getElementById('player-card').style.display = 'none';
    }
}

function selectSlot(index) {
    if (currentPlayerIndex >= 30 || choices[index] !== null) return;
    choices[index] = currentGamePlayers[currentPlayerIndex].name;
    currentPlayerIndex++;
    renderGrid();
    nextTurn();
}

// ======================== УРОВЕНЬ 2 =========================
let selectedPlayer1 = null;
let selectedPlayer2 = null;
let tttBoard = [];
let tttPlayer = 'player';
let tttGameOver = false;

function startLevel2() {
    hideMenuButton();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('player-card').style.display = 'flex';
    document.getElementById('grid-wrapper').style.display = 'none';
    document.getElementById('tic-tac-toe').style.display = 'none';
    document.getElementById('main-title').textContent = t('mainTitle');
    showMenuButton();

    showPlayerSelectModal();
}

function showPlayerSelectModal() {
    const modal = document.getElementById('player-select-modal');
    const select1 = document.getElementById('player1-select');
    const select2 = document.getElementById('player2-select');
    const avatar1 = document.getElementById('player1-avatar');
    const avatar2 = document.getElementById('player2-avatar');

    if (!modal || !select1 || !select2 || !avatar1 || !avatar2) {
        console.error('Ошибка: элементы модалки не найдены');
        return;
    }

    select1.innerHTML = '';
    select2.innerHTML = '';
    if (!playersPool || playersPool.length === 0) {
        console.error('Ошибка: playersPool пуст');
        return;
    }
    playersPool.forEach((p, idx) => {
        const opt1 = document.createElement('option');
        opt1.value = idx;
        opt1.textContent = p.name;
        select1.appendChild(opt1);
        const opt2 = document.createElement('option');
        opt2.value = idx;
        opt2.textContent = p.name;
        select2.appendChild(opt2);
    });

    select1.value = 0;
    select2.value = 1;
    avatar1.src = playersPool[0].img;
    avatar2.src = playersPool[1].img;

    select1.onchange = () => {
        const idx = parseInt(select1.value);
        avatar1.src = playersPool[idx].img;
    };
    select2.onchange = () => {
        const idx = parseInt(select2.value);
        avatar2.src = playersPool[idx].img;
    };

    modal.style.display = 'flex';

    document.getElementById('start-ttt-btn').onclick = () => {
        const idx1 = parseInt(select1.value);
        const idx2 = parseInt(select2.value);
        if (idx1 === idx2) {
            alert('Игроки должны быть разными!');
            return;
        }
        selectedPlayer1 = playersPool[idx1];
        selectedPlayer2 = playersPool[idx2];
        modal.style.display = 'none';
        startTicTacToe();
    };
}

function startTicTacToe() {
    const boardEl = document.getElementById('ttt-board');
    boardEl.innerHTML = '';
    tttBoard = Array(9).fill(null);
    tttGameOver = false;
    tttPlayer = 'player';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'ttt-cell';
        cell.dataset.index = i;
        cell.onclick = () => tttCellClick(i);
        boardEl.appendChild(cell);
    }

    document.getElementById('tic-tac-toe').style.display = 'flex';
    updateCardStatus(`${t('yourTurn')} (${selectedPlayer1.name})`);
    renderTTT();
}

function updateCardStatus(text) {
    document.getElementById('player-card').innerHTML = `
        <div style="font-size:20px; font-weight:bold; color:#f7c948;">${text}</div>
    `;
}

function tttCellClick(index) {
    if (tttGameOver) return;
    if (tttBoard[index] !== null) return;
    if (tttPlayer !== 'player') return;

    tttBoard[index] = 'player';
    renderTTT();
    if (checkWin('player')) {
        tttGameOver = true;
        highlightWin('player');
        finishGame(true);
        return;
    }
    if (tttBoard.every(c => c !== null)) {
        tttGameOver = true;
        finishGame(null);
        return;
    }

    tttPlayer = 'computer';
    updateCardStatus(`${t('opponentTurn')} (${selectedPlayer2.name})...`);
    setTimeout(() => computerMove(), 350);
}

function computerMove() {
    if (tttGameOver) return;
    let move;
    if (Math.random() < 1/3) {
        const empty = tttBoard.map((v,i) => v === null ? i : null).filter(v => v !== null);
        if (empty.length === 0) return;
        move = empty[Math.floor(Math.random() * empty.length)];
    } else {
        move = getBestMove();
    }
    if (move === -1) return;
    tttBoard[move] = 'computer';
    renderTTT();
    if (checkWin('computer')) {
        tttGameOver = true;
        highlightWin('computer');
        finishGame(false);
        return;
    }
    if (tttBoard.every(c => c !== null)) {
        tttGameOver = true;
        finishGame(null);
        return;
    }
    tttPlayer = 'player';
    updateCardStatus(`${t('yourTurn')} (${selectedPlayer1.name})`);
}

function getBestMove() {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
        if (tttBoard[i] === null) {
            tttBoard[i] = 'computer';
            const score = minimax(tttBoard, 0, false);
            tttBoard[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    if (checkWin('computer')) return 10 - depth;
    if (checkWin('player')) return depth - 10;
    if (board.every(c => c !== null)) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = 'computer';
                best = Math.max(best, minimax(board, depth+1, false));
                board[i] = null;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = 'player';
                best = Math.min(best, minimax(board, depth+1, true));
                board[i] = null;
            }
        }
        return best;
    }
}

function checkWin(player) {
    const patterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return patterns.some(p => p.every(idx => tttBoard[idx] === player));
}

function highlightWin(player) {
    const patterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    const cells = document.querySelectorAll('.ttt-cell');
    for (let p of patterns) {
        if (p.every(idx => tttBoard[idx] === player)) {
            p.forEach(idx => cells[idx].classList.add('win'));
            break;
        }
    }
}

function renderTTT() {
    const cells = document.querySelectorAll('.ttt-cell');
    cells.forEach((cell, idx) => {
        const val = tttBoard[idx];
        cell.classList.remove('taken', 'win');
        if (val === 'player') {
            cell.style.backgroundImage = `url('${selectedPlayer1.img}')`;
            cell.classList.add('taken');
        } else if (val === 'computer') {
            cell.style.backgroundImage = `url('${selectedPlayer2.img}')`;
            cell.classList.add('taken');
        } else {
            cell.style.backgroundImage = 'none';
        }
    });
}

function finishGame(isWin) {
    const card = document.getElementById('player-card');
    if (isWin === true) {
        card.innerHTML = `
            <div style="font-size:38px;">🏆</div>
            <div style="font-size:22px; font-weight:bold; color:#f7c948;">${t('win')} ${selectedPlayer2.name.toUpperCase()}!</div>
            <div style="color:#aab;">Отличная игра!</div>
        `;
    } else if (isWin === false) {
        card.innerHTML = `
            <div style="font-size:38px;">😞</div>
            <div style="font-size:22px; font-weight:bold; color:#e67a5a;">${t('lose')} ${selectedPlayer2.name.toUpperCase()}</div>
            <div style="color:#aab;">Попробуйте ещё раз</div>
        `;
    } else {
        card.innerHTML = `
            <div style="font-size:38px;">🤝</div>
            <div style="font-size:22px; font-weight:bold; color:#aaa;">${t('draw')} ${selectedPlayer2.name.toUpperCase()}</div>
            <div style="color:#aab;">Вы сыграли вничью</div>
        `;
    }
}

// ======================== ИНИЦИАЛИЗАЦИЯ =========================
hideMenuButton();
document.getElementById('main-menu').style.display = 'flex';
document.getElementById('main-title').textContent = t('mainTitle');
