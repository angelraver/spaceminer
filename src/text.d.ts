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
}
