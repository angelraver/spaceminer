function actionScreen () {  
  Background.draw();
  Central.drawing();

  Asteroids.forEach((asteroid) => {
    asteroid.drawing();
  });

  Hero.framing();
  Hero.going();
  Hero.drawing()

  CurrentAsteroid = Hero.colision(Asteroids);
  InCentral = Hero.colision([Central]);

  if (InCentral && Cargo) {
    Asteroid.hiting('hit_central', Cargo, Hero.x, Hero.y);
    CargoTotal += Cargo;
    Cargo = 0;
  }

  Hits.forEach((hit) => {
    hit.fadeOut();
    hit.draw();
  });

  cleanSprites();

  // console.log('Cargo:', Cargo, ' | ', 'Total: ', CargoTotal, ' | ', 'Goal: ', CargoGoal);
}

function cleanSprites() {
  Hits = Hits.filter((s) => s.currentLoop < s.loops);
}