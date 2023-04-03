import { Ordinal } from './types';
/**
 * Sprite class
 */
export default class SPRITE {
    id: string;
    type: string;
    y: number;
    x: number;
    h: number;
    w: number;
    fX: number;
    fY: number;
    fW: number;
    fH: number;
    fVertical: boolean;
    fQty: number;
    fCurrent: number;
    sheet: string;
    target: any;
    r: number;
    path: Array<Ordinal>;
    currentPathIndex: number;
    currentPos: Ordinal;
    previousPos: Ordinal;
    hits: number;
    hitsLimit: number;
    loops: number;
    currentLoop: number;
    scaleX: number;
    scaleY: number;
    img: HTMLImageElement;
    moving: boolean;
    mini: boolean;
    metadata: any;
    fixed: boolean;
    internalState: {
        rotationInterval: any;
    };
    constructor(props: any);
    /**
     * Set the spritesheet
     */
    updateImage(): void;
    /**
     * Move the spritesheet to show the next frame in animation
     */
    framing(): void;
    /**
     * flip vertically through the canvas scale prop
     * @param direction
     */
    flipVertically(direction: number): void;
    /**
     * flip horizontally through the canvas scale prop
     * @param direction
     */
    flipHorizontally(direction: number): void;
    /**
     * Given an sprite array it returs the fist with collision
     * @param elements list of SPRITEs to check
     * @returns SPRITE collisioning with
     */
    colisionWith(elements: any[]): any;
    /**
     * Complex draw on the canvas with rotation and scaling
     */
    draw(): void;
    tweenUpdate(): void;
    /**
   * Draw the mini version of the sprite a the border of the screen in the direcction
   * of the original sprite, when is not visible
   */
    drawMini(): void;
    /**
     * Set the SPRITE.path property with the list of positions between the current position and the given target
     * Set the SPRITE.r (rotation) to follow the generated path
     * @param target
     */
    setPath(target: any): void;
    /**
     * Set the x and y SPRITE props following the current position inside the phat prop.
     * Move forward inside the path prop elements
     */
    going(): void;
    /**
     * Increase the hits prop
     */
    hit(): void;
    /**
     * Increase the currentLoop prop
     */
    looping(): void;
    /**
     * Move the SPRITE up during the loop
     */
    fadeOut(): void;
    /**
     * Updates the x and y relative to the movement of the Hero
     */
    positionByHero(): void;
    /**
     * returns if the curren sprite is on the visible game area
     * it has tolerance of the same this size in every direction
       * @returns boolean
     */
    isVisible(): boolean;
}
