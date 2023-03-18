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
import UIPANEL from './uiPanel'

export default class GAME {
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
  OffSetHorizontal: number
  OffSetVertical: number
  bkgProportion: number
  Stars: BACKGROUND[]
  Margin: number
  Anchor: SPRITE
  VisibleArea: PLAIN
  LevelLimits: Limits
  Inventory: INVENTORY
  UiPanel: UIPANEL
  constructor() {
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
    this.bkgProportion = 4
    this.OffSetHorizontal = CONFIG.GAME_WIDTH
    this.OffSetVertical = CONFIG.GAME_HEIGHT
    this.Stars = []
    this.Margin = 100
    this.MineralsTotal = []
    this.XpTotal = 0
    this.MoneyTotal = 0
  }
}
