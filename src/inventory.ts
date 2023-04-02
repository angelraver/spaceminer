import { MINERAL_MODELS } from './config'
import BACKGROUND from './background'
import { MineralModel } from './types'
import TEXT from './text'

type MineralsAccount = { 
  type: string
  qty: number
}

const INVENTORY_MINERAL_POSITIONS: any[] = [
  { x: 0, y: 0, t: 'A' }, { x: 7, y: 0, t: 'B' },
  { x: 0, y: 10, t: 'C' }, { x: 7, y: 10, t: 'D' },
  { x: 0, y: 20, t: 'E' }, { x: 7, y: 20, t: 'F' },
  { x: 0, y: 30, t: 'G' }, { x: 7, y: 30, t: 'H' },
]

/**
 * Sprite class
 */
export default class INVENTORY {
  showInventory: Boolean
  background: BACKGROUND
  mineralsTypes: string[]
  mineralsAccount: MineralsAccount[]
  slots: any[]
  constructor() {
    this.background = new BACKGROUND({
      id: 'inventory',
      w: 50,
      h: 80,
      fX: 190,
      fY: 0,
      fW: 110,
      fH: 145,
      sheet: 'ui',
      fixed: true
    })
    this.background.x = (g.W - this.background.w) / 2
    this.background.y = (g.H - this.background.h) / 2

    this.mineralsAccount = []
    this.mineralsTypes = []
    this.showInventory = false
    this.slots = INVENTORY_MINERAL_POSITIONS.filter((pos) => !!this.getMineral(pos.t)).map((position) => {
      const mineral: MineralModel = this.getMineral(position.t)
      return {
        type: position.t,
        qty: 0,
        spriteImage: new BACKGROUND({
          fixed: true,
          id: 'inv_mineral_' + position.t,
          x: this.background.x + (this.background.w / 2) + (position.x * g.Block),
          y: this.background.y + (g.Block * 3) + (position.y * g.Block),
          w: 6,
          h: 6,
          sheet: mineral.sheet.img,
          fX: mineral.sheet.x,
          fY: mineral.sheet.y,
          fW: mineral.sheet.w,
          fH: mineral.sheet.h,
          fQty: mineral.sheet.fQty
        }),
        spriteText: new TEXT({
          id: 'inv_mineral_qty_' + position.t,
          x: this.background.x + (this.background.w / 2) + (position.x * g.Block) + (g.Block * 6),
          y: this.background.y + (g.Block * 3) + (position.y * g.Block) + (g.Block * 7),
          size: g.Block * 3,
          color: 'black',
          colorLine: 'black',
          align: 'end'
        })
      }
    })
  }

  draw() {
    if (!g.Inventory.showInventory) return

    this.background.draw()
    this.slots.filter((slot) => slot.qty > 0).forEach((slot) => {
      slot.spriteImage.draw()
      slot.spriteText.draw()
    })
  }

  getMineral(type: string): MineralModel {
    return MINERAL_MODELS.find(m => m.type === type)
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

    this.slots = this.slots.map((slot) => {
      const mineral = this.mineralsAccount.find((m) => m.type === slot.type)
      if (mineral) {
        slot.qty = mineral.qty
        slot.spriteText.text = mineral.qty
      }
      return slot
    })
  }
}
