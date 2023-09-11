import { Ordinal } from './types';
import SPRITE from './sprite';
import PLAIN from './plain';
type CharacterId = string;
export default class CHARACTER extends SPRITE {
    origin: Ordinal;
    destiny: Ordinal;
    speed: number;
    xDirection: 'left' | 'right' | 'still';
    yDirection: 'top' | 'bottom' | 'still';
    dialog: string;
    background: PLAIN;
    loopsCompleted: number;
    done: boolean;
    constructor(props: any);
    remove(): void;
    getX(): number;
    getY(): number;
    getXDirection(): "left" | "right" | "still";
    getYDirection(): "still" | "top" | "bottom";
    checkLoops(): void;
    move(): void;
    drawing(): void;
    static call(characterId: CharacterId, dialog: string, backgroundColor: string): void;
}
export {};
