import CLIENT from './client'
/**
 * Executes all the actions on each frame
 */
export default function screenAction () {
  CLIENT.create()

  g.CurrentAsteroid = g.Hero.colisionWith(g.Asteroids.flat())
  g.InCentral = typeof g.Hero.colisionWith([g.Central]) === 'object'  

  g.Anchor.positionByHero()
  g.Background.draw()
  g.Stars.forEach(s => s.draw())
  g.BaseRock.draw()
  g.Asteroids.flat().forEach(a => a.draw())
  g.Impacts.forEach(e => e.drawing())
  g.Clients.forEach(c => c.drawing())
  g.Crosshair.draw()
  g.Central.draw()
  //////
  g.Enemys.forEach(e => e.drawing())
  g.Hero.drawing()
  //////
  g.HitsLabels.forEach(h => h.draw())
  g.HitsLabels = g.HitsLabels.filter((s) => s.currentLoop < s.loops)
  //////
  g.Inventory.draw()
  g.UiPanel.draw()
  g.Characters.forEach((c) => c.drawing())
  g.Explosions.forEach(e => e.drawing())
}

