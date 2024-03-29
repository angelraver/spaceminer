import { CONFIG } from './config'
import { LibraryItem } from './types'

const SOUND_LIBRARY: LibraryItem = {
  engine: 'engines.mp3',
  asteroidEmpty: 'asteroidempty.mp3',
  miningclick: 'miningclick.mp3',
  mineralFound: 'mineralfound.mp3',
  pickoupcoin: 'pickupcoin.mp3',
  powerup23: 'powerup23.mp3',
  inventoryOpen: 'inventory-open.mp3',
  clientBuy: 'client-buy.mp3',
  clientNobuy: 'client-nobuy.mp3',
  mineralSelect: 'mineral-select.mp3',
  mineralUnselect: 'mineral-unselect.mp3',
}

/**
 * Methods for audio
 */
export default class Sound {
  /**
   * Plays the sound
   */
  static play(origin: string) {
    if(!g.SoundOn) return

    let sound = new Audio(CONFIG.SOUND_FOLDER + SOUND_LIBRARY[origin])
    sound.play()
  }
}
