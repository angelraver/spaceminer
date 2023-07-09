import SPRITE from './sprite';
import { Ordinal } from './types';
/**
 * Extends SPRITE to add text features
 */
export default class EXPLOSION extends SPRITE {
    constructor(props: any);
    /**
     * Returns one EXPLOSION
     */
    static get(pos: Ordinal): EXPLOSION;
    /**
     * add 1 explosion to g.Explosions
     */
    static add(pos: Ordinal): void;
    drawing(): void;
}
