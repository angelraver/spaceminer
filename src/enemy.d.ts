import SPRITE from './sprite';
import { Ordinal } from './types';
/**
 * Extends SPRITE to add hero features
 */
export default class ENEMY extends SPRITE {
    origin: Ordinal;
    destiny: Ordinal;
    pathBlocked: boolean;
    period: number;
    isCloseToHero: boolean;
    constructor(props: any);
    static create(): void;
    /**
     * Updates the path array positions to stay relative to the hero current position
     */
    pathByHero(): void;
    /**
      if the enemy has no path, creates one
      the target is near the hero
      if the hero is not moving, path remains
      if the hero moves the path is regenated
     */
    checkPath(): void;
    hit(): void;
    /**
   * Overwrite draw
   * Before it checks the path by hero
   * Before it checks the path and blocked it
   */
    drawing(): void;
}
