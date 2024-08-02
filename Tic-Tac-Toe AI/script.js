let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            e.style.color = turn === "X" ? "red" : "blue";
            checkWin();
            checkDraw();
            if (!isGameOver) changeTurn();
            if (turn === "O" && !isGameOver) {
                aiMove();
            }
        }
    });
});

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winConditions.forEach(condition => {
        let [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#restart").style.display = "none";
            [a, b, c].forEach(i => {
                boxes[i].style.backgroundColor = "#08d9d6";
                boxes[i].style.color = "#000";
            });
        }
    });
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw!";
            document.querySelector("#play-again").style.display = "inline";
            document.querySelector("#restart").style.display = "none";
        }
    }
}

function aiMove() {
    let emptyBoxes = [];
    boxes.forEach((e, index) => {
        if (e.innerHTML === "") emptyBoxes.push(index);
    });
    if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        let boxToFill = boxes[emptyBoxes[randomIndex]];
        boxToFill.innerHTML = turn;
        boxToFill.style.color = "blue";
        checkWin();
        checkDraw();
        changeTurn();
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#restart").style.display = "inline";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});

document.querySelector("#restart").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});
