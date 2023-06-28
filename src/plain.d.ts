import SPRITE from './sprite';
/**
 * Extends SPRITE to add a plain of color
 */
export default class PLAIN extends SPRITE {
    color: string;
    alpha: number;
    constructor(props: any);
    /**
     * Draw
     */
    draw(): void;
}
