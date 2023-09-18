import { ItemAccount, Limits, MineralPrice, Ordinal } from './types'
import { CONFIG, SPRITE_LIBRARY } from './config'
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
import IMPACT from './impact'
import Utils from './utils'
import CHARACTER from './character'
import ENEMY from './enemy'
import EXPLOSION from './explosion'

export default class GAME {
  Sprites: { [key: string]: HTMLImageElement }
  Anchor: SPRITE
  Asteroids: any[]
  Background: PLAIN
  BkgProportion: number
  CargoTotal: number
  CenterVoid: any
  Central: SPRITE
  Characters: CHARACTER[]
  Clients: CLIENT[]
  Crosshair: CROSSHAIR
  CurrentScreen: string
  CurrentAsteroid: ASTEROID
  Device: string
  Enemys: ENEMY[]
  EnemyRate: number
  EnemysHitLimit: number
  Explosions: EXPLOSION[]
  GameOver: boolean
  GlobalTime: number
  H: number
  Hero: HERO
  HitsLabels: TEXT[]
  HitsLabelsDone: TEXT[]
  Impacts: IMPACT[]
  Inventory: INVENTORY
  LevelLimits: Limits
  Loaded: boolean
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
  StarsData: any[]
  Images: any
  SetNewGame: boolean
  SoundOn: boolean
  SpeedClient: number
  SpeedEnemy: number
  SpeedHero: number
  SpeedHeroShoot: number
  ScreenTitle: { title: BACKGROUND, buttonNewGame: BACKGROUND, click: (e: Ordinal) => void }
  VisibleArea: PLAIN
  UiPanel: UI
  XpTotal: number
  W: number
  constructor() {
    this.Asteroids = []
    this.BkgProportion = 4
    this.CargoTotal = 0
    this.CurrentScreen = 'titleSetup' // titleSetup title levelStart action
    this.Enemys = []
    this.EnemyRate = 10
    this.EnemysHitLimit = 10
    this.Explosions = []
    this.GlobalTime = 0
    this.GameOver = false
    this.H = window.innerHeight
    this.HitsLabels = []
    this.Impacts = []
    this.Loaded = false
    this.MarkTime = 0
    this.Margin = 200
    this.MineralsStock = []
    this.MineralsOnSale = []
    this.MineralsPrices = []
    this.MineralsHistory = []
    this.MoneyTotal = 0
    this.Pause = false
    this.Stars = []
    this.StarsData = []
    this.SetNewGame = true
    this.SoundOn = true
    this.SpeedHero = 10
    this.SpeedClient = this.SpeedHero * 0.7
    this.SpeedEnemy =  this.SpeedHero * 0.6
    this.SpeedHeroShoot = this.SpeedHero * 2
    this.Sprites = {}
    this.XpTotal = 0
    this.W = window.innerWidth
    this.setCenterVoid()
    this.setLimits()
    this.LevelLimits = {
      t: -this.OffSetVertical,
      r: this.W + this.OffSetHorizontal,
      b: this.H + this.OffSetVertical,
      l: -this.OffSetHorizontal
    }
  }

  save(): void {
    const saveData = this.getSaveData()
    const expirationDays = 10000
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = 'spaceminer=' + saveData, + ';' + expires;
    console.log('save ok!', saveData)
  }

  getSaveData(): string {
    const data = {
      MineralsStock: g.MineralsStock,
      MineralsOnSale: g.MineralsOnSale,
      MineralsHistory: g.MineralsHistory,
      XpTotal: g.XpTotal,
      MoneyTotal: g.MoneyTotal,
    }
    return JSON.stringify(data)
  }

  setCenterVoid(): void {
    if (this.W < 500) {
      this.CenterVoid = {
        x: 0,
        y: this.H / 10,
        w: this.W,
        h: this.H - this.H / 10 * 2
      }
    } else {
      this.CenterVoid = {
        x: this.W / 10,
        y: this.H / 10,
        w: this.W - this.W / 10 * 2,
        h: this.H - this.H / 10 * 2
      }
    }
  }

  setLimits(): void {
    if (this.W < 500) {
      this.OffSetHorizontal = this.W * 5
      this.OffSetVertical = this.H * 3
    } else {
      this.OffSetHorizontal = this.W * 2
      this.OffSetVertical = this.H * 2
    }
  } 
  
  load(): any {
    function getCookie(cname: string) {
      let name = cname + '='
      let decodedCookie = decodeURIComponent(document.cookie)
      let ca = decodedCookie.split(';')
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    }
    // const gameData = JSON.parse(getCookie('spaceminer'))
    // g.MineralsStock = gameData.MineralsStock
    // g.MineralsOnSale = gameData.MineralsOnSale
    // g.MineralsHistory = gameData.MineralsHistory
    // g.XpTotal = gameData.XpTotal
    // g.MoneyTotal = gameData.MoneyTotal
    // console.log(gameData)
  }

  newGame(): void {
    g.StarsData = Array.from({ length: 1000 }, () => {
      return {
        x: Utils.random(g.LevelLimits.l, g.LevelLimits.r),
        y: Utils.random(g.LevelLimits.t, g.LevelLimits.b),
        fX: Utils.random(0, 4) * 50,
        fY: Utils.random(0, 4) * 50,
      }
    })
  }
}
