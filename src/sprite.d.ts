import { Ordinal } from './types';
/**
 * Sprite class
 */
export default class SPRITE {
    id: string;
    y: number;
    x: number;
    h: number;
    w: number;
    frameX: number;
    frameY: number;
    frameW: number;
    frameH: number;
    target: any;
    r: number;
    sheet: string;
    frameTotal: number;
    frameCurrent: number;
    path: Array<Ordinal>;
    currentPathPosition: number;
    currentPosition: Ordinal;
    previousPosition: Ordinal;
    hits: number;
    hitsLimit: number;
    loops: number;
    currentLoop: number;
    scaleX: number;
    scaleY: number;
    image: HTMLImageElement;
    moving: boolean;
    mini: boolean;
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
