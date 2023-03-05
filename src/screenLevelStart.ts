import { CONFIG as C, CONFIG } from './config';
import HERO from './hero'
import SPRITE from './sprite'
import BACKGROUND from './background';
import Asteroid from './asteroid'
import CROSSHAIR from './crosshair';
import Utils from './utils'
import PLAIN from './plain';

/**
 * Prepare the game stats before the action screen
 */
export default function screenLevelStart() {
  if (SetNewGame) {
    GameOver = false;
    SetNewGame = false;
    Background = new PLAIN({
      x: 0,
      y: 0,
      w: CONFIG.GAME_WIDTH,
      h: CONFIG.GAME_HEIGHT,
      static: true,
      color: '#2c2137',
      alpha: 1
    })
    Anchor = new PLAIN({
      x: 0,
      y: 0,
      w: CONFIG.GAME_WIDTH,
      h: CONFIG.GAME_HEIGHT,
      static: false,
      color: 'black',
      alpha: 0.01
    })
    Stars = Array.from({ length: 1000 }, function (v, i) {
      return new BACKGROUND({
        id: 'star_' + i,
        x: Utils.random(1, 4) * 25,
        y: 0,
        w: 30,
        h: 30,
        xt: Utils.random(-CONFIG.GAME_WIDTH, CONFIG.GAME_WIDTH * 2),
        yt: Utils.random(-CONFIG.GAME_HEIGHT, CONFIG.GAME_HEIGHT * 2),
        wt: 30,
        ht: 30,
        totaFrames: 1,
        sheet: 'stars.png'
      })
    })

    Asteroids = Asteroid.createGroup(AsteroidsNumber)

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
    })

    Hero = new HERO({
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

    Crosshair = new CROSSHAIR({
      id: 'crosshair',
      h: 64,
      w: 64, 
      sheet: 'crosshair158.png',
      totalFrames: 1,
      r: 0
    })
  }

  CurrentScreen = 'action';
  MarkTime = 0;
  GlobalTime = 0;
}
