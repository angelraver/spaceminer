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

  if (InCentral) {
    CargoTotal += Cargo;
    Cargo = 0;
  }

  console.log('Cargo:', Cargo, ' | ', 'Total: ', CargoTotal, ' | ', 'Goal: ', CargoGoal);
}
