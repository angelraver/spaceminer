class Asteroid {
  currentAsteroidModel = undefined
  newAsteroidModel = undefined

  static create(id) {
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
    });
  
    asteroid.x = Utils.random(asteroid.w / 2, GAME_WIDTH - asteroid.w / 2);
    asteroid.y = Utils.random(asteroid.h / 2, GAME_HEIGHT - asteroid.h / 2);
  
    const insideCenter = Utils.colision(asteroid, CENTER_VOID);
    const overlaping = Asteroids.some((a) => Utils.colision(a, asteroid));
  
    if (insideCenter || overlaping) {
      return this.create(id);
    }
  
    return asteroid;
  }

  static createGroup(n) {
    for(let i = 0; i < n; i++) {
      Asteroids.push(this.create(i));
    }
  }

  static destroy(id) {
    Asteroids = Asteroids.filter((a) => a.id !== id);
  }

  static click() {
    if (!CurrentAsteroid) return false;

    CurrentAsteroid.hit();
    switch(CurrentAsteroid.hits) {
      case 3:
        this.newAsteroidModel = 1;
        Cargo += 3;
        break
      case 6:
        this.newAsteroidModel = 2;
        Cargo += 5;
        break
    }

    if (this.currentAsteroidModel != this.newAsteroidModel) {
      this.currentAsteroidModel = this.newAsteroidModel;
      let model = asteroidsModels[this.currentAsteroidModel];
      Asteroids = Asteroids.map((asteroid) => {
        if (asteroid.id === CurrentAsteroid.id) {
          asteroid.h = model.h;
          asteroid.w = model.w;
          asteroid.sheet = model.sheet;
          asteroid.updateImage();
        }
        return asteroid;
      });
    }

    if (CurrentAsteroid.hits === CurrentAsteroid.hitsLimit) {
      this.destroy(CurrentAsteroid.id);
      Cargo += 8;
    }
  }
}
