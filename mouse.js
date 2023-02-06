function click(e) {
  if (!CurrentAsteroid) {
    Hero.setPath({ x: e.x, y: e.y });
  }

  Asteroid.click();
}

