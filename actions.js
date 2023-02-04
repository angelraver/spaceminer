function addElement(sprite) {
  const isText = sprite.text && !sprite.image;
  if (isText) {
    ctx.font = "28px ArcadeClassic";
    ctx.fillText(sprite.text, sprite.x, sprite.y);
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
  } else {

    if (sprite.r) {
      drawImageRot(sprite.image, sprite.x, sprite.y, sprite.w, sprite.h, sprite.r)
    } else {
      ctx.drawImage(sprite.image, 0, sprite.sheetY, sprite.w, sprite.h, sprite.x, sprite.y, sprite.w, sprite.h);
    }
  }
}

function drawImageRot(img, x, y, w, h, deg) {
  ctx.save()
  ctx.translate(x + w / 2, y + h / 2);
  const compensate = 90;
  ctx.rotate(deg * Math.PI / 180 - compensate);
  ctx.drawImage(img, w / 2 * (-1), h / 2 * (-1), w, h);
  ctx.restore();  
}

function clearGameFrame() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}
