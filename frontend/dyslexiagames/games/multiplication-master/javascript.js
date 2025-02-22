var playing = false;
var score;
var timeRemaining;
var action;
var correctAnswer;
var bestScore = 0;

// Load best score from local storage
if (localStorage.getItem("bestScore")) {
    bestScore = parseInt(localStorage.getItem("bestScore"));
    document.getElementById("bestScoreNumber").innerHTML = bestScore;
}

document.getElementById("start").onclick = function () {
    if (playing) {
        location.reload();
    } else {
        playing = true;
        score = 0;
        document.getElementById("scoreNumber").innerHTML = score;
        document.getElementById("instruction").innerHTML = "Select one..";
        show("time");
        timeRemaining = 30;
        document.getElementById("remainingTime").innerHTML = timeRemaining;
        hide("gameover");
        document.getElementById("start").innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }
};

for (var i = 1; i < 5; i++) {
    document.getElementById("answer" + i).onclick = function () {
        if (playing) {
            if (parseInt(this.innerHTML) === correctAnswer) {
                score++;
                document.getElementById("scoreNumber").innerHTML = score;
                show("right");
                setTimeout(function () {
                    hide("right");
                }, 1000);
                hide("wrong");
                generateQA();
            } else {
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
                hide("right");

                // PENALTY IMPLEMENTATION:
                if (score > 0) {
                    score--;
                    document.getElementById("scoreNumber").innerHTML = score;
                    document.getElementById("message").textContent = "Incorrect! -1 point"; // Display message
                    document.getElementById("message").style.color = "red";
                } else {
                    document.getElementById("message").textContent = "Incorrect! -1"; // Display message
                    document.getElementById("message").style.color = "red";

                    // Game Over when score reaches 0:
                    gameOver();
                }

            }
        }
    };
}

const startCountdown = () => {
    action = setInterval(function () {
        timeRemaining -= 1;
        document.getElementById("remainingTime").innerHTML = timeRemaining;
        if (timeRemaining === 0) {
            gameOver();
        }
    }, 1000);
};

const gameOver = () => {
    stopCountdown();
    show("gameover");
    document.getElementById("gameover").innerHTML =
        "<p>GAME OVER!</p><p>YOUR SCORE: " + score + "</p>";
    hide("time");
    hide("right");
    hide("wrong");
    playing = false;
    document.getElementById("start").innerHTML = "Start Game";

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        document.getElementById("bestScoreNumber").innerHTML = bestScore;
    }
    // Optionally reset the score to 0 on game over:
    // score = 0;
    // document.getElementById("scoreNumber").innerHTML = score;
}

const generateQA = () => {
    var randomNumber1 = Math.round(Math.random() * 10);
    var randomNumber2 = Math.round(Math.random() * 10);
    var operators = ["+", "-", "*"];
    var randomOperator = operators[Math.floor(Math.random() * operators.length)];

    var problem;
    switch (randomOperator) {
        case "+":
            problem = randomNumber1 + " + " + randomNumber2;
            correctAnswer = randomNumber1 + randomNumber2;
            break;
        case "-":
            problem = randomNumber1 + " - " + randomNumber2;
            correctAnswer = randomNumber1 - randomNumber2;
            break;
        case "*":
            problem = randomNumber1 + " * " + randomNumber2;
            correctAnswer = randomNumber1 * randomNumber2;
            break;
    }

    document.getElementById("problem").innerHTML = problem;
    var answerBox = Math.round(Math.random() * 3) + 1;
    document.getElementById("answer" + answerBox).innerHTML = correctAnswer;
    var answers = [correctAnswer];

    for (var i = 1; i < 5; i++) {
        if (i !== answerBox) {
            var wrongAnswer;
            do {
                var randomWrongNum1 = Math.round(Math.random() * 10);
                var randomWrongNum2 = Math.round(Math.random() * 10);
                var randomWrongOperator = operators[Math.floor(Math.random() * operators.length)];

                switch (randomWrongOperator) {
                    case "+":
                        wrongAnswer = randomWrongNum1 + randomWrongNum2;
                        break;
                    case "-":
                        wrongAnswer = randomWrongNum1 - randomWrongNum2;
                        break;
                    case "*":
                        wrongAnswer = randomWrongNum1 * randomWrongNum2;
                        break;
                }
            } while (answers.indexOf(wrongAnswer) > -1);
            document.getElementById("answer" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
};

const stopCountdown = () => clearInterval(action);
const hide = (id) => (document.getElementById(id).style.display = "none");
const show = (id) => (document.getElementById(id).style.display = "block");