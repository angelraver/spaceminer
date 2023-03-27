import { Limits } from './types'
import { CONFIG } from './config'
import SPRITE from './sprite'
import ASTEROID from './asteroid'
import TEXT from './text'
import CROSSHAIR from './crosshair'
import HERO from './hero'
import BACKGROUND from './background'
import PLAIN from './plain'
import INVENTORY from './inventory'
import UI from './uiPanel'

const MOBILE = 'mobile'
const DESKTOP = 'desktop'

export default class GAME {
  Device: string
  W: number
  H: number
  Block: number
  OffSetHorizontal: number
  OffSetVertical: number
  BkgProportion: number
  CenterVoid: any
  GlobalTime: number
  MarkTime: number
  Speed: number
  CurrentScreen: string
  GameOver: boolean
  Pause: boolean
  SetNewGame: boolean
  Background: PLAIN
  Hero: HERO
  Central: SPRITE
  Crosshair: CROSSHAIR
  AsteroidsNumber: number
  Asteroids: ASTEROID[]
  CurrentAsteroid: ASTEROID
  CargoTotal: number
  XpTotal: number
  MoneyTotal: number
  MineralsTotal: string[]
  InCentral: boolean
  HitsLabels: TEXT[]
  Stars: BACKGROUND[]
  Margin: number
  Anchor: SPRITE
  VisibleArea: PLAIN
  LevelLimits: Limits
  Inventory: INVENTORY
  UiPanel: UI
  constructor() {
    this.W = window.innerWidth
    this.H = window.innerHeight
    this.BkgProportion = 4
    this.CenterVoid = 
    this.GlobalTime = 0
    this.MarkTime = 0
    this.Speed = 10
    this.CurrentScreen = 'levelStart'
    this.GameOver = false
    this.Pause = false
    this.SetNewGame = true
    this.Asteroids = []
    this.AsteroidsNumber = 0
    this.CargoTotal = 0
    this.InCentral = false
    this.HitsLabels = []
    this.Stars = []
    this.Margin = 100
    this.MineralsTotal = []
    this.XpTotal = 0
    this.MoneyTotal = 0
    this.setDevice()
  }
/**
 * to know the current device desktop or mobile
 */
  setDevice() {
    if (this.W < 500 || this.H < 500) {
      this.Device = MOBILE
      this.Block = CONFIG.BLOCK_MOBILE
      this.OffSetHorizontal = this.W * CONFIG.OFFSET_MOBILE_X
      this.OffSetVertical = this.H * CONFIG.OFFSET_MOBILE_Y
      this.CenterVoid = {
        x: 0,
        y: this.H / 2 - this.H / 4,
        w: this.W,
        h: this.H / 2
      }
    } else {
      this.Device = DESKTOP
      this.Block = CONFIG.BLOCK_DESKTOP
      this.OffSetHorizontal = this.W * CONFIG.OFFSET_DESKTOP_X  
      this.OffSetVertical = this.H * CONFIG.OFFSET_DESKTOP_Y
      this.CenterVoid = {
        x: this.W / 2 - this.W / 4,
        y: this.H / 2 - this.H / 4,
        w: this.W / 2,
        h: this.H / 2
      }
    }
  }
}
