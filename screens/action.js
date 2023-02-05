function actionScreen () {  
  // Background.draw();

  ctx.fillStyle = "red";
  ctx.fillRect(CENTER_VOID.x, CENTER_VOID.y, CENTER_VOID.w, CENTER_VOID.h);

  Asteroids.forEach((asteroid) => {
    // asteroid.drawing();
  });

  Hero.framing();
  Hero.going();
  Hero.drawing()

  CurrentAsteroid = Hero.colision(Asteroids);

}
