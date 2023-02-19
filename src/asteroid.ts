import SPRITE from "./sprite"
import TEXT from "./text"
import Utils from "./utils"
import { CONFIG } from "./config"
const gt = globalThis

export default class Asteroid {
  static create( id: string): SPRITE {
    const asteroid = new SPRITE({
      id: 'asteroid_' + id,
      h: 105,
      w: 121,
      sheet: 'a1.png',
      totalFrames: 1,
      scaleX: Math.random() < 0.5 ? -1 : 1,
      scaleY: Math.random() < 0.5 ? -1 : 1,
      r: Utils.radiants(undefined, undefined, Math.random() * 180),
      hitsLimit: 9
    }) 
  
    asteroid.x = Utils.random(asteroid.w / 2, CONFIG.GAME_WIDTH - asteroid.w / 2) 
    asteroid.y = Utils.random(asteroid.h / 2, CONFIG.GAME_HEIGHT - asteroid.h / 2) 
  
    const insideCenter = Utils.colision(asteroid, CONFIG.CENTER_VOID) 
    const overlaping = Asteroids.some((a) => Utils.colision(a, asteroid)) 
  
    if (insideCenter || overlaping) {
      return this.create(id) 
    }
  
    return asteroid 
  }

  static createGroup(n: number): SPRITE[] {
    const asteroidGroup = []
    for(let i = 0;  i < n;  i++) {
      asteroidGroup.push(this.create(i.toString())) 
    }
    return asteroidGroup
  }

  static destroy(id: string) {
    Asteroids = Asteroids.filter((a) => a.id !== id) 
  }

  static click() {
    if (!CurrentAsteroid) return false 

    CurrentAsteroid.hit() 
    switch(CurrentAsteroid.hits) {
      case 3:
        gt.AsteroidModelNew = 1 
        Cargo += 3 
        this.hiting('hit_' + CurrentAsteroid.id, 1, CurrentAsteroid.x, CurrentAsteroid.y) 
        break
      case 6:
        gt.AsteroidModelNew = 2 
        this.hiting('hit_' + CurrentAsteroid.id, 4, CurrentAsteroid.x, CurrentAsteroid.y) 
        Cargo += 5 
        break
    }

    if (gt.AsteroidModelCurrent != gt.AsteroidModelNew) {
      gt.AsteroidModelCurrent = gt.AsteroidModelNew 
      let model = CONFIG.ASTEROIDS_MODEL[gt.AsteroidModelCurrent] 
      Asteroids = Asteroids.map((asteroid) => {
        if (asteroid.id === CurrentAsteroid.id) {
          asteroid.h = model.h 
          asteroid.w = model.w 
          asteroid.sheet = model.sheet 
          asteroid.updateImage() 
        }
        return asteroid 
      }) 
    }

    if (gt.CurrentAsteroid.hits === gt.CurrentAsteroid.hitsLimit) {
      this.destroy(gt.CurrentAsteroid.id) 
      Cargo += 8 
    }
  }

  static hiting(id: string, number: number, x: number, y: number) {
    const hitLabel: TEXT = new TEXT({
      id: id,
      text: '+' + number,
      x: x,
      y: y,
      loops: 30
    }) 
    gt.HitsLabels.push(hitLabel) 
  }
}
