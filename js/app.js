let scoupe = 0;
let attempt = 5;

class Interface {
  melodyBtn = document.querySelector(".melody-img");
  volumeValue = document.querySelector(".range");
  helloWindow = document.querySelector(".hello");
  victoryPopUp = document.querySelector(".victory");
  gameOverPopUp = document.querySelector(".game-over");
  gameBox = document.querySelector(".game-box");
  scoupeNode = document.querySelector(".scope");
  attemptNode = document.querySelector(".attempt");
  addBtn = document.querySelector(".addBtn");
}

class Muzic extends Interface {
  flag = true;
  melody = new Howl({
    src: ["./muzic/melody.mp3"],
    html5: true,
    volume: 0.1,
    loop: true
  });
  lop = new Howl({
    src: ["./muzic/lop.mp3"],
    html5: true,
    volume: 0.2,
  });
  gameOver = new Howl({
    src: ["./muzic/gameover.mp3"],
    html5: true,
    volume: 0.2,
  });
  victory = new Howl({
    src: ["./muzic/victory.mp3"],
    html5: true,
    volume: 0.2,
  });
  changeVolume() {
    this.volumeValue.addEventListener("input", (e) => {
      this.melody.volume(Number(e.target.value));
    });
  }
  playOffMelody() {
    this.melodyBtn.addEventListener("click", (e) => {
      e.target.classList.toggle("melody-img_off");
      !this.flag ? this.melody.play() : this.melody.stop();
      this.flag = !this.flag;
    });
  }
}

class Game extends Interface {
  countBalls = 15;
  victoryScope = 2500;
  countColor = 9;

  startGame() {
    this.helloWindow.addEventListener("click", (e) => {
      if (e.target.classList.contains("hello"))
        e.target.classList.add("hello_close");
    });

    melody.melody.play();

    this.attemptNode.innerHTML = attempt;
    this.scoupeNode.innerHTML = scoupe;

    for (let i = 0; i < this.countBalls; i++) {
      let indCol = Math.floor(Math.random() * this.countColor);
      let bl = new Balls(Math.floor(Math.random() * 1000), indCol);
      bl.createBalls();
      bl.removeBalls();
    }
  }
  restartGame() {
    scoupe = 0;
    attempt = 5;
    this.attemptNode.innerHTML = attempt;
    this.scoupeNode.innerHTML = scoupe;
  }
  victory() {
    if (scoupe >= this.victoryScope && attempt >= 0) {
      melody.victory.play();

      this.victoryPopUp.children[0].innerHTML = ` Поздравляю вас! Вы набрали <strong>${scoupe}</strong> баллов в нашей игре - это отличный результат. Мы гордимся вами и желаем дальнейших успехов в играх и жизни!`;
      this.victoryPopUp.classList.add("victory__active");

      setTimeout(() => {
        this.victoryPopUp.classList.remove("victory__active");
      }, 1500);

      this.restartGame();
    }
  }
  gameOver() {
    if (scoupe < this.victoryScope && attempt === 0) {
      melody.gameOver.play();

      this.gameOverPopUp.children[0].innerHTML = `Твой результат: <strong>${scoupe}</strong>. Я думаю ты можешь лучше, попробуй еще раз!`;
      this.gameOverPopUp.classList.add("game-over__active");

      setTimeout(() => {
        this.gameOverPopUp.classList.remove("game-over__active");
      }, 1500);

      this.restartGame();
    }
  }
}

class Balls extends Interface {
  balls = document.createElement("div");
  className = "balls";
  addCountBalls = 5;
  arrColor = [
    "#03045e",
    "#023e8a",
    "#0077b6",
    "#0096c7",
    "#00b4d8",
    "#48cae4",
    "#90e0ef",
    "#ade8f4",
    "#caf0f8",
  ];

  constructor(nominalValue, color) {
    super();
    this.nominalValue = nominalValue;
    this.color = color;
  }

  createBalls() {
    this.balls.classList.add(this.className);
    this.balls.style.backgroundColor = this.arrColor[this.color];
    this.balls.dataset.nominalValue = this.nominalValue;
    this.gameBox.append(this.balls);
  }

  removeBalls() {
    this.balls.addEventListener("click", (e) => {
      melody.lop.play();

      let ball = e.target;
      ball.innerHTML = `<span>${ball.dataset.nominalValue}</span>`;
      ball.classList.add("lop");
      setTimeout(()=> {
        ball.remove();
      }, 400)
      scoupe += Number(ball.dataset.nominalValue);
      this.scoupeNode.innerHTML = scoupe;
      this.attemptNode.innerHTML = --attempt;

      game.victory();
      game.gameOver();
    });
  }
  addBalls() {
    this.addBtn.addEventListener("click", () => {
      for (let i = 0; i < this.addCountBalls; i++) {
        let indCol = Math.floor(Math.random() * this.arrColor.length);
        let bl = new Balls(Math.floor(Math.random() * 1000), indCol);
        bl.createBalls();
        bl.removeBalls();
      }
    });
  }
}

const melody = new Muzic();
melody.playOffMelody();
melody.changeVolume();

const balls = new Balls();
balls.addBalls();

const game = new Game();
game.startGame();
