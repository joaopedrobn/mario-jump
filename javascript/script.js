const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
let gameOver = false;

const jump = () => {
  if (!gameOver && !mario.classList.contains("jump")) {
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

const restartGame = () => {
  if (gameOver) {
    // Resetando variáveis e animações
    gameOver = false;

    pipe.style.animation = "pipe-animation 2s infinite linear";
    pipe.style.left = "";

    mario.style.animation = "";
    mario.style.bottom = "0px";
    mario.src = "images/mario.gif"; // Volta para a animação original
    mario.style.width = "150px";
    mario.style.marginLeft = "";

    // Reiniciar o loop
    startGameLoop();
  }
};

const startGameLoop = () => {
  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseInt(
      window.getComputedStyle(mario).bottom.replace("px", ""),
      10
    );

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "images/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      gameOver = true;
      clearInterval(loop);
    }
  }, 10);
};

// Inicia o loop pela primeira vez
startGameLoop();

// Evento de pulo
document.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "ArrowUp") {
    if (gameOver) {
      restartGame(); // Reinicia o jogo se estiver em game over
    } else {
      jump(); // Faz o Mario pular normalmente
    }
  }
});
