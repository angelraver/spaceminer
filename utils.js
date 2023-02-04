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
  if (target) {
    let targetY = target.y < origin.y ? -(target.y) : target.y;
    console.log(targetY);
    return Math.atan2(origin.y + targetY, origin.x - target.x);
  }
  if (degrees) {
    return degrees * (Math.PI/180);
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
  for(let i = 0; i < limit; i++){
    if (xIsLonger) {
      if(target.y < pos.y) {
        pos.y = pos.y - xIsLongerSpeed;
      } else {
        pos.y = pos.y + xIsLongerSpeed;
      }
      if(target.x < pos.x) {
        pos.x = pos.x - speed;
      } else {
        pos.x = pos.x + speed;
      }
    } else {
      if(target.y < pos.y) {
        pos.y = pos.y - speed;
      } else {
        pos.y = pos.y + speed;
      }
      if(target.x < pos.x) {
        pos.x = pos.x - yIsLongerSpeed;
      } else {
        pos.x = pos.x + yIsLongerSpeed;
      }
    }
    positions.push({ ...pos });
  }
  return positions;
}