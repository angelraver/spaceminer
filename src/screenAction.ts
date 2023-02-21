import Asteroid from './asteroid'
import { CONFIG } from './config'
const gt = globalThis

/**
 * Executes all the actions on each frame
 */
export default function screenAction () {
  checkDirection()

  gt.Background.draw()
  gt.Central.draw()

  gt.Asteroids.forEach((asteroid) => {
    asteroid.draw()
  })

  gt.Hero.framing()
  gt.Hero.going()
  gt.Hero.draw()

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

function checkDirection() {
  GoingLeft = Hero.x < OffSetHorizontal
  GoingRight = Hero.x > CONFIG.GAME_WIDTH - OffSetHorizontal
  GoingTop = Hero.y < OffSetVertical
  GoingBottom = Hero.y > CONFIG.GAME_HEIGHT - OffSetVertical
}