import { Ordinal, Sheet } from './types';
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
    fVertical: boolean;
    fCurrent: number;
    sheet: Sheet;
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
     * Given an sprite array it returs the fist with collision
     * @param elements list of SPRITEs to check
     * @returns SPRITE collisioning with
     */
    colisionWith(elements: any[]): any;
    /**
     * Complex draw on the canvas with rotation and scaling and mini
     * can receive a inner callback to execute inside
     */
    draw(callBackInner?: () => void): void;
    /**
     * executes applis rotation, scaleing and call the drawImage
     * can receive a inner callback to execute inside
     */
    drawNormal(callBackInner?: () => void): void;
    /**
     * executes the ctx.drawImage
     * can receive a inner callback to execute inside
     */
    drawImage({ x, y, w, h, img, sheet }: any): void;
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
    setPath(target: Ordinal, speed: number): void;
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
