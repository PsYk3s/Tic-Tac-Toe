const start = document.getElementById("start")
const continueGame = document.getElementById("continue")
const createTiles = document.querySelectorAll(".tile")
const boardText = document.getElementById("players")
const scores = document.getElementById("scores")

const createPlayer = (player, mark) => {
    const name = player;
    const playerMark = mark
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;
    return { name, getScore, giveScore, playerMark };
}

const createGame = () => {
    let turn = 0;
    const getTurn = () => turn;
    const addTurn = () => turn++;
    return { getTurn, addTurn }
}

const validateWin = (tiles) => {
    const winnerRef = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    for (let i = 0; i < winnerRef.length; i++) {
        if (tiles[(winnerRef[i][0]) - 1].innerText === tiles[(winnerRef[i][1]) - 1].innerText &&
            tiles[(winnerRef[i][1]) - 1].innerText === tiles[(winnerRef[i][2]) - 1].innerText &&
            tiles[(winnerRef[i][0]) - 1].innerText !== "") {
                return true;
        };
    };
}


const startGame = (function () {
    start.addEventListener("click", () => {
        const player1 = createPlayer(prompt("Who's player 1?", "Player 1"), "x")
        const player2 = createPlayer(prompt("Who's player 2?", "Player 2"), "o")
        boardText.innerText = `${player1.name} versus ${player2.name}`
        const game = createGame()
        let whosTurn = player1;
        createTiles.forEach( element => element.innerText = "" )
        Array.from(createTiles).forEach( element => element.addEventListener( "click", () => {

            if ( !validateWin( createTiles ) ) {
                element.innerText = whosTurn.playerMark
                
                if ( validateWin( createTiles ) ) {
                    whosTurn.giveScore()
                    scores.innerText = `${ player1.getScore() } - ${ player2.getScore() }`
                    boardText.innerText = `${ whosTurn.name } wins!`
                }

                game.addTurn()
            }
            whosTurn == player1 ? whosTurn = player2 : whosTurn = player1;

        }, { once: true }));
    })
})();



