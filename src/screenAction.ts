import Asteroid from './asteroid'
import { CONFIG } from './config'

/**
 * Executes all the actions on each frame
 */
export default function screenAction () {
  checkDirection()

  Background.draw()
  Central.draw()

  Asteroids.forEach((a) => a.draw())

  Hero.going()
  Hero.draw()

  CurrentAsteroid = Hero.colisionWith(Asteroids)
  InCentral = typeof Hero.colisionWith([Central]) === 'object'

  if (CurrentAsteroid) {
    Crosshair.x = CurrentAsteroid.x
    Crosshair.y = CurrentAsteroid.y
    Crosshair.draw()
  }

  if (InCentral && Cargo > 0) {
    Asteroid.hiting('hit_central', Cargo, Hero.x, Hero.y)
    CargoTotal += Cargo
    Cargo = 0
  }

  HitsLabels.forEach((hit) => {
    hit.fadeOut()
    hit.draw()
  })

  HitsLabels = HitsLabels.filter((s) => s.currentLoop < s.loops)

  // console.log('Cargo:', Cargo, ' | ', 'Total: ', CargoTotal, ' | ', 'Goal: ', CargoGoal)
}

/**
 * Update the global Going family top, right, bottom ,left to know where the hero is going
 */
function checkDirection() {
  GoingTop = Hero.y < OffSetVertical
  GoingRight = Hero.x > CONFIG.GAME_WIDTH - OffSetHorizontal
  GoingBottom = Hero.y > CONFIG.GAME_HEIGHT - OffSetVertical
  GoingLeft = Hero.x < OffSetHorizontal
}