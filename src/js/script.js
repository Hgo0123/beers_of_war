let beer;
let live = 0;
let countScore = 0;

function end() {
  let credits = document.querySelector(".credits");
  credits.addEventListener("click", function() {
    oxo.screens.loadScreen("credit");
  });
  oxo.inputs.listenKeyOnce("enter", function() {
    window.location.reload("game", game);
  });
}

function move() {
  let mousedownTime;

  beer.addEventListener("mousedown", () => {
    mousedownTime = new Date().getTime();
  });
  beer.addEventListener("mouseup", function() {
    const mouseupTime = new Date().getTime(), // calcule le temps d'appui de la souris
      timeDifference = (mouseupTime - mousedownTime) / 2; // transforme le temps d'appui en pixels

    if (timeDifference > 520) {
      oxo.animation.move(beer, "up", 520, true);
    } else {
      oxo.animation.move(beer, "up", timeDifference, true);
    }
  });
}

function resetBeerPosition() {
  var beer = document.querySelector(".beer");
  oxo.animation.setPosition(beer, { x: 0, y: 0 });
}

function ifLeaveScreen() {
  oxo.elements.onLeaveScreen(
    beer,
    function() {
      resetBeerPosition();
    },
    true
  );
}

function addSoundOrder() {
  soundOrder = document.getElementById("sound");
  soundOrder.play();
}

function addSoundImpact() {
  soundImpact = document.getElementById("impact");
  soundImpact.play();
}

function removeLive() {
  let hearts = document.querySelector(".divHeart");
  live++;
  hearts.removeChild(hearts.childNodes[live]);

  if (hearts.childElementCount === 0) {
    oxo.screens.loadScreen("end", end);
  }
}

function createtable(x, y) {
  return oxo.elements.createElement({
    type: "div",
    class: "table",
    obstacle: true,
    styles: {
      position: "absolute",
      top: x + "px",
      left: y + "px"
    },
    appendTo: ".frame"
  });
}
function nextlevel() {
  var level = document.querySelectorAll(".level");

  if (countScore === 5) {
    level[0].classList.add("appear");
  }
  if (countScore === 10) {
    level[1].classList.add("appear");
  }
  if (countScore === 15) {
    level[2].classList.add("appear");
  }
}

function addTable() {
  let table = createtable(50, 950);

  oxo.elements.onCollisionWithElement(beer, table, function() {
    countScore += 1;
    nextlevel();

    resetBeerPosition();
    addScorePoint();
    addSoundOrder();
  });

  if (countScore >= 5) {
    let moveInterval = setInterval(function() {
      oxo.animation.move(table, "left", 10, true);
    }, 20);
    oxo.elements.onLeaveScreenOnce(
      table,
      function() {
        table.remove();
        clearInterval(moveInterval);
      },
      true
    );
  } else {
    let moveInterval = setInterval(function() {
      oxo.animation.move(table, "left", 10, true);
    }, 60);
    oxo.elements.onLeaveScreenOnce(
      table,
      function() {
        table.remove();
        clearInterval(moveInterval);
      },
      true
    );
  }
}

function createMen(x, y) {
  return oxo.elements.createElement({
    type: "div",
    class: "men",
    obstacle: true,
    styles: {
      position: "absolute",
      top: x + "px",
      left: y + "px"
    },
    appendTo: ".frame"
  });
}
function moveMen() {
  if (countScore >= 5) {
    var men = createMen(220, 920);
  } else {
    var men = createMen(280, 920);
  }
  let moveIntervalMen = setInterval(function() {
    oxo.animation.move(men, "left", 13, true);
  }, 40);
  oxo.elements.onLeaveScreenOnce(
    men,
    function() {
      men.remove();
      clearInterval(moveIntervalMen);
    },
    true
  );
}
function moveMenPlus() {
  let men = createMen(350, 10);
  let moveIntervalMen = setInterval(function() {
    oxo.animation.move(men, "right", 13, true);
  }, 40);
  oxo.elements.onCollisionWithElement(beer, men, function() {
    touch = true;
    resetBeerPosition();
    addSoundImpact();
    removeLive();
  });
  oxo.elements.onLeaveScreenOnce(
    men,
    function() {
      men.remove();
      clearInterval(moveIntervalMen);
    },
    true
  );
}

function addMen() {
  if (countScore >= 5) {
    moveMen();
    moveMenPlus();
  } else {
    moveMen();
  }
  //   oxo.animation.move(men, "left", 20, true);
  // }, 60);
  oxo.elements.onCollisionWithElement(beer, men, function() {
    resetBeerPosition();
    addSoundImpact();
    removeLive();
  });
}

// add 5 point score when beer touch table
function addScorePoint() {
  oxo.player.addToScore(5);
}
// remove 5 point score when beer touch men
function removeScorePoint(x) {
  oxo.player.removeFromScore(x);
}
function score() {
  score = oxo.player.getScore();
  return score;
}

function game() {
  beer = document.querySelector(".beer");

  move();

  setInterval(() => {
    resetBeerPosition();
  }, 1000);

  ifLeaveScreen();
  setInterval(addTable, 3000);

  ifLeaveScreen();
  setInterval(addMen, 2000);
}

oxo.screens.loadScreen("home", function() {
  let howto = document.querySelector(".howto");
  howto.addEventListener("click", function() {
    oxo.screens.loadScreen("howtoplay");
  });

  oxo.inputs.listenKeyOnce("enter", function() {
    oxo.screens.loadScreen("game", game);
  });
});
