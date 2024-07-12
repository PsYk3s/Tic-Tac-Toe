const start = document.getElementById("start")

//Create game state
const createGame = () => {
    let turn = 1;
    const getTurn = () => turn;
    const addTurn = () => turn++;
    const setTurnZero = () => turn = 1;
    console.log("Game created")
    return { getTurn, addTurn, setTurnZero }
}

//Create player - factory - Static logic
const createPlayer = (player, mark) => {
    const name = player;
    const playerMark = mark;
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;
    const setScoreZero = () => score = 0;
    return { name, getScore, giveScore, playerMark, setScoreZero };
}

//Gameplay dynamic logic
const gamePlay = () => {

    const scores = document.getElementById("scores")
    const players = document.getElementById("players")
    const playBtn = document.getElementById("play-again");

    //Update scores and players
    const updateBoard = () => {
        players.innerText = `${player1.name} versus ${player2.name}!`;
        scores.innerText = `${player1.getScore()} - ${player2.getScore()}`;
    }

    //Refresh tiles
    const clearTiles = () => {
        tiles.forEach(tile => { tile.innerText = "" });
        tiles.forEach(tile => { tile.removeEventListener("click", clickAction) });
        tiles.forEach(tile => { tile.addEventListener("click", clickAction, { once: true }) });
    }

    //Initiate the game
    const game = createGame();
    const player1 = createPlayer(prompt("Who's player 1?", "Player 1"), "x");
    const player2 = createPlayer(prompt("Who's player 2?", "Player 2"), "o");
    const tiles = Array.from(document.querySelectorAll(".tile"));
    updateBoard()
    let whosTurn = player1;
    start.removeEventListener("click", gamePlay);
    start.innerText = "Reset";

    //Reset game
    const reset = () => {
        clearTiles()
        player1.setScoreZero();
        player2.setScoreZero();
        game.setTurnZero();
        whosTurn = player1;
        updateBoard()
    }

    //Play on
    const playAgain = () => {
        playBtn.style.display = "none"
        clearTiles()
        game.setTurnZero();
        whosTurn = player1;
        updateBoard()
    }

    start.addEventListener("click", reset)

    //Winner check - returns boolean
    const validateWin = () => {
        const winnerRef = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];

        for (let i = 0; i < winnerRef.length; i++) {
            if (tiles[(winnerRef[i][0]) - 1].innerText === tiles[(winnerRef[i][1]) - 1].innerText &&
                tiles[(winnerRef[i][1]) - 1].innerText === tiles[(winnerRef[i][2]) - 1].innerText &&
                tiles[(winnerRef[i][0]) - 1].innerText !== "") {
                tiles.forEach(tile => { tile.removeEventListener("click", clickAction) })
                whosTurn.giveScore()
                players.innerText = `${whosTurn.name} wins!`;
                playBtn.style.display = "inline"
                playBtn.addEventListener("click", playAgain);
                return
            };
        };
    }

    //Check for ties
    const validateTie = () => {
        if (game.getTurn() >= 9) {
            players.innerText = `It's a tie!`;
            tiles.forEach(tile => { tile.removeEventListener("click", clickAction) });
            playBtn.style.display = "inline";
            playBtn.addEventListener("click", playAgain);
            return
        }
    }

    //What happens on click
    const clickAction = (e) => {
        e.target.innerText = whosTurn.playerMark
        if (!validateWin()) {
             validateTie()
        }
        whosTurn == player1 ? whosTurn = player2 : whosTurn = player1;
        game.addTurn()
    }

    tiles.forEach(tile => { tile.addEventListener("click", clickAction, { once: true }) })
}

start.addEventListener("click", gamePlay)



