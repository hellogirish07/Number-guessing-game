let randomNumber = Math.floor(Math.random() * 100); // for random number 

function startgame() {
    let userNumber = 
    parseInt(document.getElementById("userInput").value);
    let resultDisplay = document.getElementById("display");

    // Correct Guess 
    if(randomNumber == userNumber) {
        resultDisplay.innerHTML = 
        "Congrats, You Guessed the right Number";
        resultDisplay.style.backgroundColor = "green" ;
    }

    // Guessed number os less 
    else if(randomNumber < userNumber) {
        resultDisplay.innerHTML = 
        "Number is less then " + userNumber;
        resultDisplay.style.backgroundColor = "red" ;
    }

    // Guessed number os greater 
    else if (randomNumber > userNumber) {
        resultDisplay.innerHTML = 
        "Number is greater then " + userNumber;
        resultDisplay.style.backgroundColor = "red" ;
    }

    else {
        resultDisplay.innerHTML = 
        "You enterwd a wrong input";
        resultDisplay.style.backgroundColor = "red" ;
    }
}

function reset() {
    window.location.reload();
}
