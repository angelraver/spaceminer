import Asteroid from './asteroid'
import { CONFIG } from './config'

/**
 * Executes all the actions on each frame
 */
export default function screenAction () {

  InCentral = typeof Hero.colisionWith([Central]) === 'object'
  if (InCentral && Cargo > 0) {
    Asteroid.hiting('hit_central', Cargo, Hero.x, Hero.y)
    CargoTotal += Cargo
    Cargo = 0
  }

  Anchor.positionByHero()
  Background.draw()
  Stars.map(s => s.draw())
  Central.draw()
  Asteroids.map(a => a.draw())
  Hero.draw()
  Crosshair.draw()
  HitsLabels.map(h => h.draw())

  HitsLabels = HitsLabels.filter((s) => s.currentLoop < s.loops)
}



