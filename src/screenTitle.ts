import { Ordinal } from './types'
import { SPRITE_LIBRARY } from './config'
import Utils from './utils'
import BACKGROUND from './background'

export function screenTitleSetup () {
  g.ScreenTitle = {
    title: new BACKGROUND({
      w: 200, h: 130,
      x: g.W / 2 - 100, y: g.H / 2 - 200,
      sheet: SPRITE_LIBRARY.titleLogo,
      r: 0,
      scaleX: 1, scaleY: -1,
      fixed: true,
    }),
    buttonNewGame: new BACKGROUND({
      w: 200, h: 50,
      x: g.W / 2 - 100, y: g.H / 2,
      sheet: SPRITE_LIBRARY.titleButtonNewGame,
      r: 0,
      scaleX: 1, scaleY: -1,
      fixed: true,
    }),
    click: (e: Ordinal) => {
      if (Utils.isHiting(e, g.ScreenTitle.buttonNewGame)) {
        console.log('START NEW GAME!')
        g.CurrentScreen = 'levelStart'
      } else {
        console.log('nope!')
      }
    }
  }
  g.CurrentScreen = 'title'
  document.body.addEventListener('click', g.ScreenTitle.click)
}

export function screenTitle () {
  g.ScreenTitle.title.draw()
  g.ScreenTitle.buttonNewGame.draw()
}
