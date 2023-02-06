function levelStartScreen() {
  if (SetNewGame) {
    GameOver = false;
    SetNewGame = false;
    Asteroid.createGroup(Asteroids_Number);

    Background = new SPRITE({
      id: 'background',
      x: 0,
      y: 0,
      h: GAME_HEIGHT,
      w: GAME_WIDTH,
      sheet: 'background.png',
      totalFrames: 1,
    });

    Central = new SPRITE({
      id: 'central',
      x: GAME_HEIGHT / 2,
      y: GAME_WIDTH / 2,
      w: 91,
      h: 90,
      sheet: 'central.png',
      totalFrames: 1,
      r: 20,
      scaleX: 2,
      scaleY: 2,
    });

    Hero = new SPRITE({
      id: 'hero',
      x: GAME_MID_H - BLOCK_UNITY / 2,
      y: GAME_HEIGHT - GAME_HEIGHT / 2,
      h: 74,
      w: 50,
      sheet: 'ship.png',
      totalFrames: 1,
      r: 0,
      scaleX: 1,
      scaleY: 1,
    });
    Hero.target = { x: Hero.x, y: Hero.y };
  }

  CurrentScreen = 'action';
  MarkTime = 0;
  GlobalTime = 0;
}
