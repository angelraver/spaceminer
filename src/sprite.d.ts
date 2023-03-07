export default class SPRITE {
    id: string;
    h: number;
    w: number;
    y: number;
    x: number;
    target: any;
    r: number;
    sheet: string;
    frameTotal: number;
    frameCurrent: number;
    sheetY: number;
    path: Array<any>;
    currentPathPosition: number;
    hits: number;
    hitsLimit: number;
    loops: number;
    currentLoop: number;
    scaleX: number;
    scaleY: number;
    text: string;
    image: HTMLImageElement;
    constructor(props: any);
    updateImage(): void;
    /**
     * Move the spritesheet to show the next frame in animation
     */
    framing(): void;
    flipVertically(direction: number): void;
    flipHorizontally(direction: number): void;
    colisionWith(elements: SPRITE[]): SPRITE;
    draw(): void;
    drawing(): void;
    setPath(target: any): void;
    going(): void;
    hit(): void;
    looping(): void;
    fadeOut(): void;
}
