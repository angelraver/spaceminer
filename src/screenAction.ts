import Asteroid from './asteroid'
const gt = globalThis

/**
 * Executes all the actions on each frame
 */
export default function screenAction () {
  gt.Background.draw()
  gt.Central.drawing()

  gt.Asteroids.forEach((asteroid) => {
    asteroid.drawing()
  })

  gt.Hero.framing()
  gt.Hero.going()
  gt.Hero.drawing()

  gt.CurrentAsteroid = gt.Hero.colisionWith(gt.Asteroids)
  gt.InCentral = typeof gt.Hero.colisionWith([gt.Central]) === 'object'

  if (InCentral && gt.Cargo > 0) {
    Asteroid.hiting('hit_central', gt.Cargo, gt.Hero.x, gt.Hero.y)
    gt.CargoTotal += gt.Cargo
    gt.Cargo = 0
  }

  gt.HitsLabels.forEach((hit) => {
    hit.fadeOut()
    hit.draw()
  })

  gt.HitsLabels = gt.HitsLabels.filter((s) => s.currentLoop < s.loops)

  // console.log('Cargo:', Cargo, ' | ', 'Total: ', CargoTotal, ' | ', 'Goal: ', CargoGoal)
}
