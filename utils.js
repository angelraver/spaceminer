const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const colision = (a, b) => {
  return a.x + a.w > b.x &&
    a.y + a.h > b.y &&
    a.x < b.x + b.w &&
    a.y < b.y + b.h;
}

const radiants = (origin, target, degrees) => {
  const toDegrees = (degrees) => degrees * (Math.PI / 180);

  if (target) {
    const distanceX = origin.x - target.x;
    const distanceY = origin.y - target.y;
    const angle = Math.atan2(distanceX, distanceY);

    return angle;
  }
  if (degrees) {
    return toDegrees(degrees);
  }
}

const pathLinear = function (origin, target, speed) {
  const distanceX = target.x - origin.x;
  const distanceY = target.y - origin.y;
  const ySteps = Math.floor(Math.abs(distanceY / speed));
  const xSteps = Math.floor(Math.abs(distanceX / speed));
  const xIsLonger = xSteps > ySteps;
  let pos = { x: origin.x, y: origin.y };
  let positions = [];
  const limit = xIsLonger ? xSteps : ySteps;
  const xIsLongerSpeed = speed / (xSteps / ySteps);
  const yIsLongerSpeed = speed / (ySteps / xSteps);
  for (let i = 0; i < limit; i++) {
    if (xIsLonger) {
      if (target.y < pos.y) {
        pos.y = pos.y - xIsLongerSpeed;
      } else {
        pos.y = pos.y + xIsLongerSpeed;
      }
      if (target.x < pos.x) {
        pos.x = pos.x - speed;
      } else {
        pos.x = pos.x + speed;
      }
    } else {
      if (target.y < pos.y) {
        pos.y = pos.y - speed;
      } else {
        pos.y = pos.y + speed;
      }
      if (target.x < pos.x) {
        pos.x = pos.x - yIsLongerSpeed;
      } else {
        pos.x = pos.x + yIsLongerSpeed;
      }
    }
    positions.push({ ...pos });
  }
  return positions;
}