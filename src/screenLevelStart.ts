import { CONFIG as C } from './config';
import SPRITE from './sprite'
import SCENARIO from './scenario';
import Asteroid from './asteroid'

/**
 * Prepare the game stats before the action screen
 */
export default function screenLevelStart() {
  if (SetNewGame) {
    GameOver = false;
    SetNewGame = false;
    Asteroid.createGroup(AsteroidsNumber)

    Background = new SCENARIO({
      id: 'background',
      x: 0,
      y: 0,
      h: 1080,
      w: 3920,
      xd: -OffSetHorizontal,
      yd: -OffSetVertical,
      hd: C.GAME_HEIGHT * 2,
      wd: C.GAME_WIDTH * 4,
      sheet: 'background.png',
      totalFrames: 1,
    });

    Central = new SPRITE({
      id: 'central',
      x: C.GAME_WIDTH / 2,
      y: C.GAME_HEIGHT / 2,
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
      x: C.GAME_MID_H - C.BLOCK_UNITY / 2,
      y: C.GAME_HEIGHT - C.GAME_HEIGHT / 2,
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
