import { ItemAccount, Limits, MineralPrice } from './types'
import { CONFIG } from './config'
import SPRITE from './sprite'
import ASTEROID from './asteroid'
import TEXT from './text'
import CROSSHAIR from './crosshair'
import HERO from './hero'
import CLIENT from './client'
import BACKGROUND from './background'
import PLAIN from './plain'
import INVENTORY from './inventory'
import UI from './uiPanel'
import EXPLOSION from './explosion'

export default class GAME {
  Anchor: SPRITE
  Asteroids: ASTEROID[]
  Background: PLAIN
  BkgProportion: number
  Block: number
  CargoTotal: number
  CenterVoid: any
  Central: SPRITE
  Clients: CLIENT[]
  Crosshair: CROSSHAIR
  CurrentScreen: string
  CurrentAsteroid: ASTEROID
  Device: string
  Explosions: EXPLOSION[]
  GameOver: boolean
  GlobalTime: number
  H: number
  Hero: HERO
  HitsLabels: TEXT[]
  HitsLabelsDone: TEXT[]
  InCentral: boolean
  Inventory: INVENTORY
  LevelLimits: Limits
  Margin: number
  MarkTime: number
  MineralsStock: ItemAccount[]
  MineralsOnSale: ItemAccount[]
  MineralsPrices: MineralPrice[]
  MineralsHistory: ItemAccount[]
  MoneyTotal: number
  OffSetHorizontal: number
  OffSetVertical: number
  Pause: boolean
  Stars: BACKGROUND[]
  SetNewGame: boolean
  SoundOn: boolean
  Speed: number
  VisibleArea: PLAIN
  UiPanel: UI
  XpTotal: number
  W: number
  constructor() {
    this.Asteroids = []
    this.BkgProportion = 4
    this.CargoTotal = 0
    this.CurrentScreen = 'levelStart'
    this.Explosions = []
    this.GlobalTime = 0
    this.GameOver = false
    this.H = window.innerHeight
    this.HitsLabels = []
    this.InCentral = false
    this.MarkTime = 0
    this.Margin = 100
    this.MineralsStock = []
    this.MineralsOnSale = []
    this.MineralsPrices = []
    this.MineralsHistory = []
    this.MoneyTotal = 0
    this.Pause = false
    this.Stars = []
    this.SetNewGame = true
    this.SoundOn = true
    this.Speed = 10
    this.XpTotal = 0
    this.W = window.innerWidth
    this.Block = CONFIG.BLOCK
    this.OffSetHorizontal = this.W * CONFIG.OFFSET_X  
    this.OffSetVertical = this.H * CONFIG.OFFSET_Y
    this.CenterVoid = {
      x: this.W / 4,
      y: this.H / 4,
      w: this.W / 2,
      h: this.H / 2
    }
  }
}
