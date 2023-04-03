import { ClientModel } from './types'
import { CLIENT_MODELS } from './config'
import CLIENT from './client'
/**
 * Executes all the actions on each frame
 */
export default function screenAction () {
  addClients()

  g.CurrentAsteroid = g.Hero.colisionWith(g.Asteroids)
  g.InCentral = typeof g.Hero.colisionWith([g.Central]) === 'object'  

  g.Anchor.positionByHero()
  g.Background.draw()
  g.Stars.forEach(s => s.draw())
  g.Asteroids.forEach(a => a.draw())
  g.Central.draw()
  g.Hero.draw()
  g.Clients.forEach(c => c.draw())
  g.Crosshair.draw()
  g.HitsLabels.forEach(h => h.draw())
  g.HitsLabels = g.HitsLabels.filter((s) => s.currentLoop < s.loops)
  g.Inventory.draw()
  g.UiPanel.draw()
}

function addClients() {
  if (g.Clients.length === CLIENT_MODELS.length) return

  CLIENT_MODELS.forEach((model: ClientModel) => {
    if (model.requiredXp >= g.XpTotal) {
      const existing = g.Clients.find((c: CLIENT) => model.id === c.id)
      if (!existing) {
        g.Clients.push(new CLIENT({
          id: model.id,
          h: 6,
          w: 6,
          period: model.period,
          timeShopping: model.timeShopping,
          sheet: model.sheet.img,
          fX: model.sheet.x,
          fY: model.sheet.y,
          fQty: model.sheet.fQty,
          fH: model.sheet.h,
          fW: model.sheet.w
        }))
      }
    }    
  })
}
