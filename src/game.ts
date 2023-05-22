import { ItemAccount, Limits, MineralPrice, Ordinal } from './types'
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
import Utils from './utils'

export default class GAME {
  Anchor: SPRITE
  Asteroids: ASTEROID[]
  Background: PLAIN
  BkgProportion: number
  BaseRock: SPRITE
  CargoTotal: number
  CenterVoid: any
  Central: SPRITE
  CentralFabric: SPRITE
  CentralRefinery: SPRITE
  CentralWorkshop: SPRITE
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
  StarsData: any[]
  SetNewGame: boolean
  SoundOn: boolean
  Speed: number
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
    this.StarsData = []
    this.SetNewGame = true
    this.SoundOn = true
    this.Speed = 10
    this.XpTotal = 0
    this.W = window.innerWidth
    this.OffSetHorizontal = this.W * CONFIG.OFFSET_X  
    this.OffSetVertical = this.H * CONFIG.OFFSET_Y
    this.CenterVoid = {
      x: this.W / 10,
      y: this.H / 10,
      w: this.W - this.W / 10 * 2,
      h: this.H - this.H / 10 * 2
    }
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

  newgame(): void {
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
