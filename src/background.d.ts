import SPRITE from "./sprite";
/**
 * Extends SPRITE to add background features
 */
export default class BACKGROUND extends SPRITE {
    constructor(props: any);
    draw(): void;
    /**
     * Updates the x and y origin of the image relative to the movement of the Hero
    */
    positionByHero(): void;
}
