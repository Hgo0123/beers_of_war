let beer;

function move() {}

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
  let table = createtable(100, 900);

  oxo.elements.onCollisionWithElement(beer, table, function() {
    touch = true;
    resetBeerPosition();
    addScorePoint();
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
    removeScorePoint();
  });

  let moveIntervalMen = setInterval(function() {
    oxo.animation.move(men, "left", 10, true);
  }, 30);

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
// remove 2 point score when beer touch men
function removeScorePoint() {
  oxo.player.removeFromScore(2);
}

function game() {
  beer = document.querySelector(".beer");
  let mousedownTime;

  setInterval(() => {
    resetBeerPosition();
  }, 2000);

  beer.addEventListener("mousedown", () => {
    mousedownTime = new Date().getTime();
  });
  beer.addEventListener("mouseup", function() {
    const mouseupTime = new Date().getTime(),
      timeDifference = (mouseupTime - mousedownTime) / 2; // transforme le temps d'appui en pixels
    oxo.animation.move(beer, "up", timeDifference, true);
  });

  ifLeaveScreen();
  setInterval(addTable, 3000);

  ifLeaveScreen();
  setInterval(addMen, 2000);
}

oxo.inputs.listenKeyOnce("enter", function() {
oxo.screens.loadScreen("game", game);
});

