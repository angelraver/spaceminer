import SPRITE from './sprite';
import { Ordinal } from './types';
/**
 * Extends SPRITE to add text features
 */
export default class IMPACT extends SPRITE {
    constructor(props: any);
    /**
     * Returns one IMPACT
     */
    static get(pos: Ordinal, loops: number, scaleX: number, scaleY: number): IMPACT;
    /**
     * add 1 impact to g.Impacts
     */
    static add(pos: Ordinal, loops: number, scaleX: number, scaleY: number): void;
    /**
     * Draw the text on canvas
     * - Apply looping
     */
    drawing(): void;
}
