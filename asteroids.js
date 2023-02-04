const getAsteroid = (id) => {
  const asteroid = new SPRITE({
    id: 'asteroid_' + id,
    h: 105,
    w: 121,
    sheet: 'a1.png',
    totalFrames: 1,
    scaleX: Math.random() < 0.5 ? -1 : 1,
    scaleY: Math.random() < 0.5 ? -1 : 1,
    r: radiants(undefined, undefined, Math.random() * 180),
    hitsLimit: 9
  });

  asteroid.x = random(asteroid.w / 2, GAME_WIDTH - asteroid.w / 2);
  asteroid.y = random(asteroid.h / 2, GAME_HEIGHT - asteroid.h / 2);

  const insideCenter = colision(asteroid, CENTER_VOID);
  const overlaping = Asteroids.some((a) => colision(a, asteroid));

  if (insideCenter || overlaping) {
    return getAsteroid(id);
  }

  return asteroid;
}

const getAsteroids = () => {
  for(let i = 0; i < Asteroids_Number; i++) {
    Asteroids.push(getAsteroid(i));
  }
}
