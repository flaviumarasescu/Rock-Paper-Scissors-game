const game = () => {
  let pScore = 0;
  let cScore = 0;

  //Start the game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");

    //Debounce function
    const debounce = (fn, delay) => {
      let timeoutID;
      return function () {
        if (timeoutID) {
          clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(fn, delay);
      };
    };

    //Throttle function
    const throttle = (fn, delay) => {
      let last = 0;
      return function () {
        const now = new Date().getTime();
        if (now - last < delay) {
          return;
        }
        last = now;
        return fn();
      };
    };

    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    // Debounce function applied
    options.forEach((option) => {
      let playerHandStr;
      option.addEventListener("click", function () {
        playerHandStr = `${this.textContent}`;
      });

      option.addEventListener(
        "click",
        debounce(function () {
          //Computer choice
          const computerNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[computerNumber];
          //Compare hands
          compareHands(playerHandStr, computerChoice);
          //Update images
          playerHand.src = `${playerHandStr}.png`;
          computerHand.src = `${computerChoice}.png`;
        }, 2000)
      );
    });

    // options.forEach((option) => {
    //   //Normal function so "this" is bound to this function
    //   option.addEventListener("click", function () {
    //     //Computer choice
    //     const computerNumber = Math.floor(Math.random() * 3);
    //     const computerChoice = computerOptions[computerNumber];
    //     //Compare hands
    //     compareHands(this.textContent, computerChoice);
    //     //Update images
    //     playerHand.src = `${this.textContent}.png`;
    //     computerHand.src = `${computerChoice}.png`;
    //   });
    // });
  };
  //Update score
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };
  //Compare hands
  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");
    //Check for tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It's a tie";
      return;
    }
    //Check for rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer wins";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player wins";
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player wins";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  startGame();
  playMatch();
};

window.onload = game();
