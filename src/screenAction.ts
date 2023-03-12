import AsteroidManager from './asteroidManager'

/**
 * Executes all the actions on each frame
 */
export default function screenAction () {

  InCentral = typeof Hero.colisionWith([Central]) === 'object'
  if (InCentral && Hero.cargo > 0) {
    AsteroidManager.hiting('hit_central', Hero.cargo, Hero.x, Hero.y)
    CargoTotal += Hero.cargo
    Hero.resetCargo()
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



