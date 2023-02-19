import SPRITE from "./sprite";
export default class Asteroid {
    static create(id: string): SPRITE;
    static createGroup(n: number): SPRITE[];
    static destroy(id: string): void;
    static click(): boolean;
    static hiting(id: string, number: number, x: number, y: number): void;
}
