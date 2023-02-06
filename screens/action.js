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

  console.log('Cargo:', Cargo, ' | ', 'Total: ', CargoTotal, ' | ', 'Goal: ', CargoGoal);
}
