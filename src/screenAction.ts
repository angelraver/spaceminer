import CLIENT from './client'
/**
 * Executes all the actions on each frame
 */
export default function screenAction () {
  CLIENT.checkIn()

  g.CurrentAsteroid = g.Hero.colisionWith(g.Asteroids)
  g.InCentral = typeof g.Hero.colisionWith([g.Central]) === 'object'  

  g.Anchor.positionByHero()
  g.Background.draw()
  g.Stars.forEach(s => s.draw())
  g.Explosions.forEach(e => e.draw())
  g.Asteroids.forEach(a => a.draw())
  g.Central.draw()
  g.Hero.draw()
  g.Clients.forEach(c => c.draw())
  g.Crosshair.draw()
  g.HitsLabels.forEach(h => h.draw())
  g.HitsLabels = g.HitsLabels.filter((s) => s.currentLoop < s.loops)
  g.Inventory.draw()
  g.UiPanel.draw()
  console.log(g.Explosions.length)

}

