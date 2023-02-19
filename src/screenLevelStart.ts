import { CONFIG } from './config';
import SPRITE from './sprite'
import Asteroid from './asteroid'
const gt = globalThis

export default function screenLevelStart() {
  if (gt.SetNewGame) {
    gt.GameOver = false;
    gt.SetNewGame = false;
    gt.Asteroids = Asteroid.createGroup(gt.AsteroidsNumber)

    gt.Background = new SPRITE({
      id: 'background',
      x: 0,
      y: 0,
      h: CONFIG.GAME_HEIGHT,
      w: CONFIG.GAME_WIDTH,
      sheet: 'background.png',
      totalFrames: 1,
    });

    gt.Central = new SPRITE({
      id: 'central',
      x: CONFIG.GAME_WIDTH / 2,
      y: CONFIG.GAME_HEIGHT / 2,
      w: 91,
      h: 90,
      sheet: 'central.png',
      totalFrames: 1,
      r: 20,
      scaleX: 2,
      scaleY: 2,
    });

    gt.Hero = new SPRITE({
      id: 'hero',
      x: CONFIG.GAME_MID_H - CONFIG.BLOCK_UNITY / 2,
      y: CONFIG.GAME_HEIGHT - CONFIG.GAME_HEIGHT / 2,
      h: 74,
      w: 50,
      sheet: 'ship.png',
      totalFrames: 1,
      r: 0,
      scaleX: 1,
      scaleY: 1,
    });
    gt.Hero.target = { x: gt.Hero.x, y: gt.Hero.y };
  }

  gt.CurrentScreen = 'action';
  gt.MarkTime = 0;
  gt.GlobalTime = 0;
}
