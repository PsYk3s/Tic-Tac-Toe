const tiles = document.querySelectorAll(".tile");

const gameObj = [
    {
        gameBoard: Array.from(tiles),
        winnerRef: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],
        turn: 1,
        round: 1,
    },
    {
        player1: "Player 1",
        player2: "Player 2",
        player1Score: 0,
        player2Score: 0,
    },
];

const game = (function () {

    const scores = document.getElementById("scores")
    const players = document.getElementById("players")
    const overlay = document.getElementById("overlay")

    const clearBoard = () => {
        gameObj[0].turn = 1;
        Array.from(tiles).forEach(e => {
            e.innerText = "";
            e.addEventListener("click", () => {
                e.innerText = gameObj[0].turn % 2 !== 0 ? "x" : "o";
                gameObj[0].turn++;
                update()
            },
                { once: true }
            )
        });
        update()
    }

    const newGame = () => {
        clearBoard()
        overlay.style.display = "none";
        gameObj[0].round = 1;
        gameObj[0].turn = 1;
        gameObj[1].player1 = prompt("Who is player 1?", "Player 1")
        gameObj[1].player2 = prompt("Who is player 2?", "Player 2")
        gameObj[1].player1Score = 0;
        gameObj[1].player2Score = 0;
        update()
    }

    const newRound = () => {
        clearBoard()
        overlay.style.display = "none";
        gameObj[0].round++;
        update()
    }

    const update = () => {
        scores.innerText = `Turn: ${gameObj[0].turn} Scores: ${gameObj[1].player1Score} - ${gameObj[1].player2Score} Round: ${gameObj[0].round}`;
        players.innerText = `${gameObj[1].player1} versus ${gameObj[1].player2}`;
        evaluate();
    }

    const evaluate = () => {

        for (let i = 0; i < gameObj[0].winnerRef.length; i++) {
            if (tiles[(gameObj[0].winnerRef[i][0]) - 1].innerText === tiles[(gameObj[0].winnerRef[i][1]) - 1].innerText &&
                tiles[(gameObj[0].winnerRef[i][1]) - 1].innerText === tiles[(gameObj[0].winnerRef[i][2]) - 1].innerText &&
                tiles[(gameObj[0].winnerRef[i][0]) - 1].innerText !== "") {
                gameObj[0].turn % 2 !== 0 ? gameObj[1].player1Score++ : gameObj[1].player2Score++;
                overlay.style.display = "block";
                return
            };
        };

        if (gameObj[0].turn > 9) {
            overlay.style.display = "block";
            return
        };
    }

    return { newGame, newRound, update }

})()