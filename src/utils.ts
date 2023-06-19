import { Ordinal, ItemAccount } from './types'

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
   * Returns if the given point is in colision with the given SPRITE
   */
  static isHiting(a: Ordinal, b: any): boolean {
    if (b) {
      if (b.type === 'spr') {
        return a.x >= b.x - b.w / 2
          && a.x <= b.x + b.w + b.w / 2
          && a.y >= b.y - b.h / 2
          && a.y <= b.y + b.w + b.h / 2
      }

      if (b.type === 'bkg') {
        return a.x >= b.x
          && a.x <= b.x + b.w
          && a.y >= b.y
          && a.y <= b.y + b.h
      }
    }

    return false
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
  static radiants(origin: Ordinal, target: Ordinal, degrees?: number) {
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
  static pathLinear(origin: Ordinal, target: Ordinal, speed: number): Ordinal[] {
    const distanceX = target.x - origin.x
    const distanceY = target.y - origin.y
    const ySteps = Math.floor(Math.abs(distanceY / speed))
    const xSteps = Math.floor(Math.abs(distanceX / speed))
    const xIsLonger = xSteps > ySteps
    let pos = { x: origin.x, y: origin.y }
    let positions = []
    const limit = xIsLonger ? xSteps : ySteps
    let calculatedSpeed = 0
    for (let i = 0; i < limit; i++) {
      if (xIsLonger) {
        calculatedSpeed = speed / (xSteps / ySteps)
        if (target.y < pos.y) {
          pos.y = pos.y - calculatedSpeed
        } else {
          pos.y = pos.y + calculatedSpeed
        }
        if (target.x < pos.x) {
          pos.x = pos.x - speed
        } else {
          pos.x = pos.x + speed
        }
      } else {
        calculatedSpeed = speed / (ySteps / xSteps)
        if (target.y < pos.y) {
          pos.y = pos.y - speed
        } else {
          pos.y = pos.y + speed
        }
        if (target.x < pos.x) {
          pos.x = pos.x - calculatedSpeed
        } else {
          pos.x = pos.x + calculatedSpeed
        }
      }

      let xCompleted = pos.x === target.x
      let yCompleted = pos.y === target.y
      positions.push({ ...pos })
    }
    return positions
  }

  /**
   * get random point beyond the offSets of the game
   */
  static randomOuterPoint() {
    const randomIndex = this.random(0,3)
    const margin = 80
    const yRandomPoint = this.random(-g.OffSetVertical, g.H + g.OffSetVertical)
    const xRandomPoint = this.random(-g.OffSetHorizontal, g.W + g.OffSetHorizontal)
    const points = [
      { // from top
        x: xRandomPoint,
        y: -g.OffSetVertical - margin
      },
      { // from right
        x: g.W + g.OffSetHorizontal + margin,
        y: yRandomPoint
      },
      { // from bottom
        x: xRandomPoint,
        y: g.H + g.OffSetVertical + margin
      },
      { // from left
        x: -g.OffSetHorizontal - margin,
        y: yRandomPoint
      }
    ]

    return points[randomIndex]
  }

  /**
   * checks if a is inside b + the margin
   */
  static valueInMargin(a: number, b: number, body: number, margin: number): boolean {
    return a >= (b - margin) && a <= (b + body + margin)
  }

  /**
   * returns a new list if the type exists in the list updates the qty
   */
  static updateQtyList(list: ItemAccount[], type: string, addition: boolean): ItemAccount[] {
    const items = [...list]
    const mineralInList = items.map((m) => m.type).includes(type)

    if(mineralInList) {
      return items.map((m) => {
        if (m.type === type) {
          if (addition) {
            m.qty = m.qty + 1
          } else {
            m.qty = m.qty - 1
          }        
        }
        return m
      })
    } else {
      if (addition) {
        return [...items, { type: type, qty: 1 }]
      }
    }
  }

  /**
   * returns a number in ascendent order from the start to end
   */
  static getNumberAscending(start: number, end: number) {
    if (start < end) {
      return start + 1
    } else {
      return end
    }
  }

  static wrapText(text: string, x: number, y: number, maxWidth: number, lineHeight: number): { line: string, x: number, y: number}[] {
    let words = text.split(' ')
    let line = ''
    let testLine = ''
    let lineArray = []
    for(var n = 0; n < words.length; n++) {
      testLine += `${words[n]} `
      let metrics = ctx.measureText(testLine)
      let testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        lineArray.push({line, x, y})
        y += lineHeight
        line = `${words[n]} `
        testLine = `${words[n]} `
      }
      else {
        line += `${words[n]} `
      }
      if(n === words.length - 1) {
        lineArray.push({line, x, y})
      }
    }
    return lineArray;
  }

  static absInt(value: number): number {
    return Math.abs(parseInt(value.toString()))
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
