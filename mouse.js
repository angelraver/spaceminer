const asteroidsModels = [
  { w: 121, h: 105, sheet: 'a1.png' },
  { w: 107, h: 106, sheet: 'a2.png' },
  { w: 112, h: 89, sheet: 'a3.png' }
];
let currentAsteroidModel = 0;
let newAsteroidModel = 0;

function click(e) {
  if (!CurrentAsteroid) {
    Hero.setPath({ x: e.x, y: e.y });
  } else {
    CurrentAsteroid.hit();
    switch(CurrentAsteroid.hits) {
      case 3:
        newAsteroidModel = 1;
        break
      case 6:
        newAsteroidModel = 2;
        break
    }

    if (currentAsteroidModel != newAsteroidModel) {
      currentAsteroidModel = newAsteroidModel;
      let model = asteroidsModels[currentAsteroidModel];
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
      Asteroids = Asteroids.filter((a) => a.id !== CurrentAsteroid.id);
      console.log('drained!!!!: ');
    }
    
  }
}

