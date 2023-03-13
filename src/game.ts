import { Limits } from './types'
import { CONFIG } from './config'
import SPRITE from './sprite'
import ASTEROID from './asteroid'
import TEXT from './text'
import CROSSHAIR from './crosshair'
import HERO from './hero'
import BACKGROUND from './background'
import PLAIN from './plain'

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
  CargoGoal: number
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
  engineSound: HTMLAudioElement
  lastUpdate: number
  delta: number

  constructor() {
    this.GlobalTime = 0
    this.MarkTime = 0
    this.Speed = 10
    this.CurrentScreen = 'levelStart'
    this.GameOver = false
    this.Pause = false
    this.SetNewGame = true
    this.Background = undefined
    this.Hero = undefined
    this.Central = undefined
    this.Crosshair = undefined
    this.CurrentAsteroid = undefined
    this.Asteroids = []
    this.AsteroidsNumber = 0
    this.CargoTotal = 0
    this.CargoGoal = 0
    this.InCentral = false
    this.HitsLabels = []
    this.bkgProportion = 4
    this.OffSetHorizontal = CONFIG.GAME_WIDTH
    this.OffSetVertical = CONFIG.GAME_HEIGHT
    this.Stars = []
    this.Margin = 100
    this.VisibleArea = undefined
    this.Anchor = undefined
    this.LevelLimits = undefined
    this.engineSound = undefined
    this.lastUpdate = Date.now()
    this.delta = 0
  }
}
