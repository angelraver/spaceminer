import { SPRITE_LIBRARY, MINERAL_MODELS } from './config'
import BACKGROUND from './background'
import { MineralModel, Ordinal, ItemAccount } from './types'
import TEXT from './text'
import Utils from './utils'
import Sound from './sound'

const MINERAL_POSITIONS: any[] = [
  { x: 0, y: 0, t: 'A' },
  { x: 50, y: 0, t: 'B' },
  { x: 100, y: 0, t: 'C' },
  { x: 150, y: 0, t: 'D' },
  { x: 200, y: 0, t: 'E' },
  { x: 250, y: 0, t: 'F' },
  { x: 300, y: 0, t: 'G' },
  { x: 350, y: 0, t: 'H' },
]

/**
 * Sprite class
 */
export default class INVENTORY {
  textStock: TEXT
  textSale: TEXT
  showInventory: Boolean
  panelStock: BACKGROUND
  panelSale: BACKGROUND
  slotsStock: any[]
  slotsSale: any[]

  constructor() {
    this.setPanelStock()
    this.setPanelSale()
    this.setStockMinerals()
    this.setSaleMinerals()
  }

  setPanelStock() {
    this.panelStock = new BACKGROUND({ w: 400, h: 80, sheet: SPRITE_LIBRARY.ui, fixed: true, fVertical: true })
    this.panelStock.x = (g.W / 2) - this.panelStock.w / 2 - 20
    this.panelStock.y = g.H - this.panelStock.h / 2 - 30

    this.textStock = new TEXT({
      text: 'STOCK',
      x: this.panelStock.x + this.panelStock.w / 2 - 10,
      y: this.panelStock.y + 30,
      size: 24,
      color: 'black',
      colorLine: 'white',
      align: 'center'
    })
  }

  setPanelSale() {
    this.panelSale = new BACKGROUND({ w: 400, h: 80, sheet: SPRITE_LIBRARY.ui, fixed: true })
    this.panelSale.x = (g.W / 2) + this.panelSale.w / 2 + 20
    this.panelSale.y = g.H - this.panelSale.h / 2 - 30

    this.textSale = new TEXT({
      text: 'SALE',
      x: this.panelSale.x - 130,
      y: this.panelSale.y + 30,
      size: 24, 
      color: 'black',
      colorLine: 'white',
      align: 'start'
    })
  }

  /**
   * Sets the mineral slots for stock, with qty 0
   */
  setStockMinerals(){
    this.slotsStock = MINERAL_POSITIONS.filter((pos) => !!this.getMineralModel(pos.t)).map((position) => {
      const mineral: MineralModel = this.getMineralModel(position.t)
      return {
        type: position.t,
        qty: 0,
        spriteImage: new BACKGROUND({
          fixed: true,
          x: this.panelStock.x - this.panelStock.w / 2 + position.x,
          y: this.panelStock.y + position.y - 40,
          w: 48,
          h: 48,
          sheet: mineral.sheet,
        }),
        spriteText: new TEXT({
          x: this.panelStock.x - this.panelStock.w / 2 + position.x + 40,
          y: this.panelStock.y + position.y + 10,
          size: 24,
          color: 'black',
          colorLine: 'white',
          align: 'end'
        })
      }
    })
  }

  /**
   * set the slots for sale with qty 0
   */
  setSaleMinerals(){
    this.slotsSale = MINERAL_POSITIONS.filter((pos) => !!this.getMineralModel(pos.t)).map((position) => {
      const mineral: MineralModel = this.getMineralModel(position.t)
      return {
        type: position.t,
        qty: 0,
        spriteImage: new BACKGROUND({
          fixed: true,
          x: this.panelSale.x - this.panelSale.w / 2 + position.x,
          y: this.panelSale.y + position.y - 40,
          w: 48, h: 48,
          sheet: mineral.sheet
        }),
        spriteText: new TEXT({
          x: this.panelSale.x - this.panelSale.w / 2 + position.x + 40,
          y: this.panelSale.y + position.y + 10,
          size: 24,
          color: 'black',
          colorLine: 'white',
          align: 'center'
        })
      }
    })
  }

  /**
   * get 1 mineral type by its type
   */
  getMineralModel(type: string): MineralModel {
    return MINERAL_MODELS.find(m => m.type === type)
  }
  
  /**
   * updates the qty of mineralas in the slots
   */
  mineralsUpdateSlots() {  
    this.slotsStock = this.slotsStock.map((slot) => {
      const mineral = g.MineralsStock.find((m) => m.type === slot.type)
      if (mineral) {
        slot.qty = mineral.qty
        slot.spriteText.text = mineral.qty
      }
      return slot
    })

    this.slotsSale = this.slotsSale.map((slot) => {
      const mineral = g.MineralsOnSale.find((m) => m.type === slot.type)
      if (mineral) {
        slot.qty = mineral.qty
        slot.spriteText.text = mineral.qty
      }
      return slot
    })
  }

  mineralAddToSale(type: string) {
    g.MineralsStock = Utils.updateQtyList(g.MineralsStock, type, false)
    g.MineralsOnSale = Utils.updateQtyList(g.MineralsOnSale, type, true)
    this.mineralsUpdateSlots()
  }

  mineralReturnToStock(type: string) {
    g.MineralsOnSale = Utils.updateQtyList(g.MineralsOnSale, type, false)
    g.MineralsStock = Utils.updateQtyList(g.MineralsStock, type, true)
    this.mineralsUpdateSlots()
  }

  mineralSold(type: string) {
    g.MineralsOnSale = Utils.updateQtyList(g.MineralsOnSale, type, false)
    this.mineralsUpdateSlots()
  }

/**
 * manages click for
 * 
 * Sound button
*/
  click(e: Ordinal) {
    // STOCK SLOTS
    this.slotsStock.forEach((slot) => {
      if (Utils.isHiting(e, slot.spriteImage)) {// clicking on the mineral
        if (slot.qty > 0) {
          Sound.play('mineralSelect')
          this.mineralAddToSale(slot.type)
        }
      }
    })

    // SALE SLOTS
    this.slotsSale.forEach((slot) => {
      if (Utils.isHiting(e, slot.spriteImage)) {// clicking on the mineral
        if (slot.qty > 0) {
          Sound.play('mineralUnselect')
          this.mineralReturnToStock(slot.type)
        }
      }
    })
  }

  draw() {
    this.panelStock.framing()
    this.panelStock.drawNormal()
    this.panelSale.drawNormal()
    this.textStock.draw()
    this.textSale.draw()

    this.slotsStock.filter((slot) => slot.qty > 0).forEach((slot) => {
      slot.spriteImage.draw()
      slot.spriteText.draw()
    })

    this.slotsSale.filter((slot) => slot.qty > 0).forEach((slot) => {
      slot.spriteImage.draw()
      slot.spriteText.draw()
    })

  }
}
