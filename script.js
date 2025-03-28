document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game");
    const gameScreen = document.getElementById("game-screen");
    const welcomeScreen = document.getElementById("welcome-screen");
    const leaderboardScreen = document.getElementById("leaderboard-screen");
    const leaderboardList = document.getElementById("leaderboard");
    const playerNameInput = document.getElementById("player-name");
    const difficultySelect = document.getElementById("difficulty");
    const enableHintsCheckbox = document.getElementById("enable-hints");
    const guessInput = document.getElementById("guess-input");
    const submitGuessBtn = document.getElementById("submit-guess");
    const feedback = document.getElementById("feedback");
    const hint = document.getElementById("hint");
    const playAgainBtn = document.getElementById("play-again");

    let targetNumber, attempts, range, hintsEnabled, playerName;

    function getLeaderboard() {
        return JSON.parse(localStorage.getItem("leaderboard")) || [];
    }

    function saveLeaderboard(data) {
        localStorage.setItem("leaderboard", JSON.stringify(data));
    }

    function updateLeaderboard(name, score) {
        const leaderboard = getLeaderboard();
        leaderboard.push({ name, score, date: new Date().toLocaleString() });
        leaderboard.sort((a, b) => a.score - b.score);
        saveLeaderboard(leaderboard.slice(0, 5));

        leaderboardList.innerHTML = "";
        leaderboard.slice(0, 5).forEach((entry, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${entry.name} - ${entry.score} attempts (${entry.date})`;
            leaderboardList.appendChild(li);
        });

        leaderboardScreen.classList.remove("hidden");
    }

    startGameBtn.addEventListener("click", () => {
        playerName = playerNameInput.value || "Player";
        hintsEnabled = enableHintsCheckbox.checked;
        attempts = 0;

        switch (difficultySelect.value) {
            case "easy":
                range = [1, 50];
                break;
            case "medium":
                range = [1, 100];
                break;
            case "hard":
                range = [1, 1000];
                break;
        }

        targetNumber = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];

        welcomeScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        feedback.textContent = `Guess a number between ${range[0]} and ${range[1]}`;
        hint.textContent = "";
        guessInput.value = "";
    });

    submitGuessBtn.addEventListener("click", () => {
        const guess = parseInt(guessInput.value, 10);
        if (isNaN(guess)) {
            feedback.textContent = "Please enter a valid number.";
            return;
        }

        attempts++;
        if (guess < targetNumber) {
            feedback.textContent = "Too low!";
        } else if (guess > targetNumber) {
            feedback.textContent = "Too high!";
        } else {
            feedback.textContent = `Congratulations, ${playerName}! You guessed it in ${attempts} attempts.`;
            submitGuessBtn.disabled = true;
            playAgainBtn.classList.remove("hidden");
            updateLeaderboard(playerName, attempts);
        }

        if (hintsEnabled) {
            hint.textContent = guess < targetNumber ? "Try a higher number." : "Try a lower number.";
        }

        if (guess === targetNumber) {
            feedback.innerHTML = `🎉 Congratulations, ${playerName}! You guessed it in ${attempts} attempts.`;
            hint.textContent = ""; // Hide the hint
            hint.classList.add("hidden"); // Add Tailwind's hidden class
            updateLeaderboard(playerName, attempts);
            guessInput.disabled = true;
            submitGuess.classList.add("hidden");
            playAgain.classList.remove("hidden");
        }
    });

    playAgainBtn.addEventListener("click", () => {
        welcomeScreen.classList.remove("hidden");
        gameScreen.classList.add("hidden");
        playAgainBtn.classList.add("hidden");
        submitGuessBtn.disabled = false;
        leaderboardScreen.classList.add("hidden");
    });
});
