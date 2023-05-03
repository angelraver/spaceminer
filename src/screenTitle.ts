import SPRITE from './sprite'
import { SPRITE_LIBRARY } from './config'

export function screenTitleSetup () {
  g.Title = new SPRITE({
    w: 25, h: 16,
    x: g.W / 2, y: g.H / 2,
    sheet: SPRITE_LIBRARY.title,
    fX: 0, fY: 0, fW: 204, fH: 130,
    r: 0,
    scaleX: 1, scaleY: -1,
  })
  g.CurrentScreen = 'title'
}

export function screenTitle () {
  g.Title.draw()
}
