import SPRITE from "./sprite"
import { Mineral } from "./types";

/**
 * Extend SPRITE to add asteroid features
 */
export default class ASTEROID extends SPRITE {
  mineral: Mineral
  modelCurrent: number
  modelNew: number
  empty: boolean
  constructor(props: any) {
    super(props);
    this.mineral = props.mineral
    this.empty = false
  }
}
