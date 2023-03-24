import { CONFIG, SOUND_LIBRARY } from './config'
/**
 * Methos for audio
 */
export default class Sound {
  /**
   * Plays the sound
   */
  static play(origin: string) {
    let sound = new Audio(CONFIG.SOUND_FOLDER + SOUND_LIBRARY[origin])
    sound.play()
  }
}