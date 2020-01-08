let beer;

function move() {
  let mousedownTime;
  var arrow = document.querySelector(".arrow");
  // calcule le temps que l'on reste appuyer sur la souris
  beer.addEventListener("mousedown", () => {
    mousedownTime = new Date().getTime();
  });
  beer.addEventListener("mouseup", function() {
    const mouseupTime = new Date().getTime(),
      timeDifference = (mouseupTime - mousedownTime) / 2; // transforme le temps d'appui en pixels
    oxo.animation.move(beer, "up", timeDifference, true);
    console.log(timeDifference);
    console.log();
  });

  // collision();
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
// function moveTable() {
//   setInterval(() => {
//     var tables = document.querySelectorAll(".table");
//     for (i = 0; i < tables.length; i++) {
//       oxo.animation.move(tables[i], "left", 10, true);
//     }
//   }, 60);
// }

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

// add 5 point score when beer touch table
function addScorePoint() {
  oxo.player.addToScore(5);
}

function game() {
  beer = document.querySelector(".beer");

  move();
  //createtable(100, 500);
  //createtable(100, 1500);
  //createtable(100, 2000);
  //moveTable();

  ifLeaveScreen();
  setInterval(addTable, 3000);
}

// oxo.inputs.listenKeyOnce("enter", function() {
oxo.screens.loadScreen("game", function() {
  game();
});
// });
