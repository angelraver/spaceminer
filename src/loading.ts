import { CONFIG, SPRITE_LIBRARY } from './config'
import { SOUND_LIBRARY } from './sound'

export default class LOADING {
  assetsLoaded: number
  totalAssetsCount: number
  allAssets: any
  loadingScreen: HTMLDivElement
  loadingBar: HTMLDivElement
  loadingText: HTMLDivElement
  canvas: HTMLCanvasElement
  constructor() {
    this.assetsLoaded = 0
    this.totalAssetsCount = 0
    this.loadingScreen = <HTMLDivElement>document.getElementById('loading-screen')
    this.loadingBar = <HTMLDivElement>document.getElementById('loading-bar')
    this.loadingText = <HTMLDivElement>document.getElementById('loading-text')
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas')
  }

  objectListing(inputObject: any, fileType: string) {
    const assets: { [key: string]: any } = {}
    for (const key in inputObject) {
      if (Object.hasOwnProperty.call(inputObject, key)) {
        if (fileType === 'png') {
          assets[key] = CONFIG.SPRITES_FOLDER + inputObject[key].i + '.' + fileType
        }
        if (fileType === 'mp3') {
          assets[key] = CONFIG.SOUND_FOLDER + inputObject[key]
        }
      }
    }

    return assets
  }

  assetLoaded(): void {
    this.assetsLoaded++
    const progress = Math.floor((this.assetsLoaded / this.totalAssetsCount) * 100)
    this.loadingBar.style.width = `${progress}%`
    this.loadingText.textContent = `Loading: ${progress}%`
    if (this.assetsLoaded === this.totalAssetsCount) {
      // All assets are loaded, initialize your canvas or game here
      this.loadingScreen.style.display = 'none'
      this.canvas.style.display = 'block'
      g.Loaded = true
    }
  }

  preloadImages(): void {
    for (const key in this.allAssets.images) {
      const image = new Image()
      image.src = this.allAssets.images[key]
      image.onload = () => this.assetLoaded()
      g.Sprites[key] = image
    }
  }

  preloadSounds(): void {
    for (const key in this.allAssets.sounds) {
      const audio = new Audio()
      audio.src = this.allAssets.sounds[key]
      audio.addEventListener('canplaythrough', () => this.assetLoaded(), false)
    }
  }

  loadAssets(): void {
    this.allAssets = {
      images: this.objectListing(SPRITE_LIBRARY, 'png'),
      sounds: this.objectListing(SOUND_LIBRARY, 'mp3')
    }
    this.totalAssetsCount = Object.keys(this.allAssets.images).length + Object.keys(this.allAssets.sounds).length
    this.preloadImages()
    this.preloadSounds()
  }
}
