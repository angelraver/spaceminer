import { CONFIG as C, MINERALS, INVENTORY_SLOT, INVENTORY_MINERAL_POSITIONS } from './config'
import BACKGROUND from './background'
import { Mineral } from './types'

type MineralsAccount = { 
  type: string
  qty: number
}

/**
 * Sprite class
 */
export default class INVENTORY {
  showInventory: Boolean
  background: BACKGROUND
  minerals: BACKGROUND[]
  mineralsTypes: string[]
  mineralsAccount: MineralsAccount[]
  slots: []
  constructor() {
    this.create()
    this.showInventory = false
  }

  create() {
    this.background = new BACKGROUND({
      id: 'inventory',
      w: 50,
      h: 80,
      frameX: 190,
      frameY: 0,
      frameW: 110,
      frameH: 145,
      sheet: 'ui.png',
      frameTotal: 1,
      fixed: true
    })
    this.background.x = (g.W - this.background.w) / 2
    this.background.y = (g.H - this.background.h) / 2

    this.mineralsAccount = []
    this.mineralsTypes = []
  }

  draw() {
    if (g.Inventory.showInventory) {
      this.background.draw()
    }
  }
  
  getMineral(type: string): Mineral {
    return MINERALS.find(m => m.type === type)
  }

  updateMinerals() {
    g.MineralsTotal.forEach((type) => {
      if(!this.mineralsTypes.includes(type)) {
        this.mineralsTypes.push(type)
        this.mineralsAccount.push({ type: type, qty: 1 })
      }
    })

    this.mineralsAccount = this.mineralsAccount.map((mineral) => {
      mineral.qty = g.MineralsTotal.filter(m => m === mineral.type).length
      return mineral
    })
  }
}
