import { SPRITE_LIBRARY, MINERAL_MODELS } from './config'
import BACKGROUND from './background'
import { MineralModel, Ordinal, ItemAccount } from './types'
import TEXT from './text'
import Utils from './utils'
import Sound from './sound'

const STOCK_MINERAL_POSITIONS: any[] = [
  { x: 0, y: 0, t: 'A' },   { x: 56, y: 0, t: 'B' },   { x: 112, y: 0, t: 'C' },  { x: 168, y: 0, t: 'D' },
  { x: 0, y: 64, t: 'E' },  { x: 56, y: 64, t: 'F' },  { x: 112, y: 64, t: 'G' }, { x: 168, y: 64, t: 'H' },
]

const SALE_MINERAL_POSITIONS: any[] = [
  { x: 0, y: 0, t: 'A' }, { x: 72, y: 0, t: 'B' },
  { x: 0, y: 64, t: 'C' }, { x: 72, y: 64, t: 'D' },
  { x: 0, y: 128, t: 'E' }, { x: 72, y: 128, t: 'F' },
  { x: 0, y: 192, t: 'G' }, { x: 72, y: 192, t: 'H' },
]

/**
 * Sprite class
 */
export default class INVENTORY {
  textStock: TEXT
  textSale: TEXT
  showInventory: Boolean
  panel: BACKGROUND
  slotsStock: any[]
  slotsSale: any[]
  soundButton: BACKGROUND

  constructor() {
    this.setPanel()
    this.setTexts()
    this.setStockMinerals()
    this.setSaleMinerals()
    this.setSoundButton()
  }
  
  /**
   * set the inventory panel
   */
  setPanel() {
    this.panel = new BACKGROUND({ w: 400, h: 640, sheet: SPRITE_LIBRARY.inventoryPanel, fixed: true })
    this.panel.x = (g.W - this.panel.w) / 2
    this.panel.y = (g.H - this.panel.h) / 2
  }

/**
 * set the texts
 * SALE
 * STOCK
 */
  setTexts() {
    this.textStock = new TEXT({
      text: 'STOCK',
      x: this.panel.x + (this.panel.w / 2) + (this.panel.w / 4),
      y: this.panel.y + 24,
      size: 24,
      color: 'crimson',
      colorLine: 'black',
      align: 'center'
    })

    this.textSale = new TEXT({
      text: 'ON SALE',
      x: this.panel.x + 95,
      y: this.panel.y + 24,
      size: 24, 
      color: 'crimson',
      colorLine: 'black',
      align: 'start'
    })
  }

  /**
   * Sets the mineral slots for stock, with qty 0
   */
  setStockMinerals(){
    this.slotsStock = STOCK_MINERAL_POSITIONS.filter((pos) => !!this.getMineralModel(pos.t)).map((position) => {
      const mineral: MineralModel = this.getMineralModel(position.t)
      return {
        type: position.t,
        qty: 0,
        spriteImage: new BACKGROUND({
          fixed: true,
          x: this.panel.x + (this.panel.w / 3) + position.x + 16,
          y: this.panel.y + 24 + position.y,
          w: 48,
          h: 48,
          sheet: mineral.sheet,
        }),
        spriteText: new TEXT({
          x: this.panel.x + (this.panel.w / 3) + position.x + 64,
          y: this.panel.y + 80 + position.y,
          size: 24,
          color: 'black',
          colorLine: 'black',
          align: 'end'
        })
      }
    })
  }

  /**
   * set the slots for sale with qty 0
   */
  setSaleMinerals(){
    this.slotsSale = SALE_MINERAL_POSITIONS.filter((pos) => !!this.getMineralModel(pos.t)).map((position) => {
      const mineral: MineralModel = this.getMineralModel(position.t)
      return {
        type: position.t,
        qty: 0,
        spriteImage: new BACKGROUND({
          fixed: true,
          x: this.panel.x + 8 + position.x ,
          y: this.panel.y + 24 + position.y,
          w: 48, h: 48,
          sheet: mineral.sheet
        }),
        spriteText: new TEXT({
          x: this.panel.x + 40 + position.x,
          y: this.panel.y + 88 + position.y,
          size: 24, color: 'black', colorLine: 'black', align: 'center'
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
 * sets the button for the sound ON / OFF
 */
  setSoundButton() {
    this.soundButton = new BACKGROUND({ fixed: true, w: 32, h: 32 , sheet: SPRITE_LIBRARY.buttonSound })
    this.soundButton.x = this.panel.x + this.panel.w - this.soundButton.w * 1.7
    this.soundButton.y = this.panel.y + this.panel.h - this.soundButton.h * 1.7
  }

/**
 * manages click for
 * 
 * Sound button
*/
  click(e: Ordinal) {
    if (!g.Inventory.showInventory) return

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

    // SOUND BUTTON
    if (Utils.isHiting(e, this.soundButton)) {
      if (g.SoundOn) {
        g.SoundOn = false
        this.soundButton.sheet.y = 47
      } else {
        g.SoundOn = true
        this.soundButton.sheet.y = 0
      }
    }
  }

  draw() {
    if (!g.Inventory.showInventory) return

    this.panel.draw()
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

    this.soundButton.draw()
  }
}
