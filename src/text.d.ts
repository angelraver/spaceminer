import SPRITE from "./sprite";
/**
 * Extends SPRITE to add text features
 */
export default class TEXT extends SPRITE {
    text: string;
    constructor(props: any);
    /**
     * Draw the text on canvas
     * - Apply looping
     */
    draw(): void;
    /**
   * Adds a hit label (SPRITE type TEXT) to the global array of Hitlabels
   */
    static hiting(id: string, number: number, x: number, y: number): void;
}
