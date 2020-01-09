let beer;
let live = 5;

function move() {
  let mousedownTime;

  beer.addEventListener("mousedown", () => {
    mousedownTime = new Date().getTime();
  });
  beer.addEventListener("mouseup", function() {
    const mouseupTime = new Date().getTime(),
      timeDifference = (mouseupTime - mousedownTime) / 2; // transforme le temps d'appui en pixels
    if (timeDifference > 520) {
      oxo.animation.move(beer, "up", 520, true);
    } else {
      oxo.animation.move(beer, "up", timeDifference, true);
    }
    console.log(timeDifference);
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
  live--;
  hearts.removeChild(hearts.childNodes[0]);
  console.log(hearts);

  // if (hearts.childElementCount === 4) {
  //   // oxo.screens.loadScreen("end");
  // }
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

function addTable() {
  let table = createtable(50, 950);

  oxo.elements.onCollisionWithElement(beer, table, function() {
    touch = true;
    resetBeerPosition();
    addScorePoint();
    addSoundOrder();
  });

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
function addMen() {
  let men = createMen(280, 920);

  oxo.elements.onCollisionWithElement(beer, men, function() {
    touch = true;
    resetBeerPosition();
    removeScorePoint(5);
    addSoundImpact();
    removeLive();
  });

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
  setInterval(() => {
    addMen();
  }, 1000);
}

oxo.inputs.listenKeyOnce("enter", function() {
  oxo.screens.loadScreen("game", game);
});
// oxo.screens.loadScreen("end");
