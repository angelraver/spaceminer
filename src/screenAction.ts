import AsteroidManager from './asteroidManager'
import TEXT from './text'

/**
 * Executes all the actions on each frame
 */
export default function screenAction () {
  g.CurrentAsteroid = g.Hero.colisionWith(g.Asteroids)
  g.InCentral = typeof g.Hero.colisionWith([g.Central]) === 'object'

  if (g.InCentral && g.Hero.cargo > 0) {
    TEXT.hiting('hit_central', g.Hero.cargo, g.Hero.x, g.Hero.y)
    g.CargoTotal += g.Hero.cargo
    g.Hero.resetCargo()
  }

  g.Anchor.positionByHero()
  g.Background.draw()
  g.Stars.map(s => {
    s.draw()
  })
  g.Asteroids.map(a => a.draw())
  g.Central.draw()
  g.Hero.draw()
  g.Crosshair.draw()
  g.HitsLabels.map(h => h.draw())
  g.HitsLabels = g.HitsLabels.filter((s) => s.currentLoop < s.loops)
}



