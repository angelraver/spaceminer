function timing() {
  GlobalTime = GlobalTime + .5;
}

function go() {
  start = setInterval(rolling, GAME_SPEED);
}

function stop() {
  clearInterval(start);
}

function clearGameFrame() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function rolling() {
  clearGameFrame();
  switch(CurrentScreen) {
    case 'title' :
      titleScreen();
      break;
    case 'levelStart' :
      levelStartScreen();
      break;
    case 'action' :
      actionScreen();
      break;
    case 'gameOver' :
      gameOverScreen();
      break;
    case 'levelCompleted':
      levelCompletedScreen();
      break;
  }
}

document.body.addEventListener('click', click);

setInterval(timing, 500);
var start = setInterval(rolling, GAME_SPEED);
