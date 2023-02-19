/**
 * Simple functions to return values
 * - Does not update globals
 */
export default class Utils {
  static random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
/**
 * Returns if 2 SPRITE are in colision
 * @param a 
 * @param b 
 * @returns 
 */
  static colision(a: any, b: any): boolean {
    return a.x + a.w > b.x &&
      a.y + a.h > b.y &&
      a.x < b.x + b.w &&
      a.y < b.y + b.h
  }
/**
 * Translate degrees to radiants
 * @param degrees 
 * @returns 
 */
  static toRadiants(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
/**
 * Return radiants for the inclination between the origin and the target
 * Optional: directly returns the radiants for the given degrees argument
 * @param origin 
 * @param target 
 * @param degrees 
 * @returns 
 */
  static radiants(origin: any, target: any, degrees?: number) {
    if (target) {
      const distanceX = origin.x - target.x
      const distanceY = origin.y - target.y
      const angle = Math.atan2(distanceX, distanceY)
      return angle
    }
    if (degrees) {
      return Utils.toRadiants(degrees)
    }
  }
/**
 * Return an array of positions {x,y} for the line between the origin and the target based on the speed
 * @param origin 
 * @param target 
 * @param speed 
 * @returns 
 */
  static pathLinear(origin: any, target: any, speed: number) {
    const distanceX = target.x - origin.x
    const distanceY = target.y - origin.y
    const ySteps = Math.floor(Math.abs(distanceY / speed))
    const xSteps = Math.floor(Math.abs(distanceX / speed))
    const xIsLonger = xSteps > ySteps
    let pos = { x: origin.x, y: origin.y }
    let positions = []
    const limit = xIsLonger ? xSteps : ySteps
    const xIsLongerSpeed = speed / (xSteps / ySteps)
    const yIsLongerSpeed = speed / (ySteps / xSteps)
    for (let i = 0; i < limit; i++) {
      if (xIsLonger) {
        if (target.y < pos.y) {
          pos.y = pos.y - xIsLongerSpeed
        } else {
          pos.y = pos.y + xIsLongerSpeed
        }
        if (target.x < pos.x) {
          pos.x = pos.x - speed
        } else {
          pos.x = pos.x + speed
        }
      } else {
        if (target.y < pos.y) {
          pos.y = pos.y - speed
        } else {
          pos.y = pos.y + speed
        }
        if (target.x < pos.x) {
          pos.x = pos.x - yIsLongerSpeed
        } else {
          pos.x = pos.x + yIsLongerSpeed
        }
      }
      positions.push({ ...pos })
    }
    return positions
  }

  // pixelation = 40
  // static pixelate({ w, h, x: _x, y: _y }) {
  //   var imageData = ctx.getImageData(_x, _y, w, h),
  //   data = imageData.data
  //   for (var y = 0; y < h; y += pixelation) {
  //     for (var x = 0; x < w; x += pixelation) {
  //       var red = data[((w * y) + x) * 4],
  //       green = data[((w * y) + x) * 4 + 1],
  //       blue = data[((w * y) + x) * 4 + 2]
  //       for (var n = 0; n < pixelation; n++) {
  //         for (var m = 0; m < pixelation; m++) {
  //           if (x + m < w) {
  //             data[((w * (y + n)) + (x + m)) * 4] = red
  //             data[((w * (y + n)) + (x + m)) * 4 + 1] = green
  //             data[((w * (y + n)) + (x + m)) * 4 + 2] = blue
  //           }
  //         }
  //       }
  //     }
  //   }

  //   ctx.putImageData(imageData, _x, _y)
  // }
}
