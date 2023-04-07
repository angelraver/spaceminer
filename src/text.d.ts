import SPRITE from './sprite';
/**
 * Extends SPRITE to add text features
 */
export default class TEXT extends SPRITE {
    text: string;
    color: string;
    colorLine: string;
    size: number;
    align: string;
    constructor(props: any);
    /**
     * Adds a hit label (SPRITE type TEXT) to the global array of Hitlabels
    */
    static hiting(number: number, x: number, y: number): void;
    /**
     * Draw the text on canvas
     * - Apply looping
     */
    draw(): void;
}
