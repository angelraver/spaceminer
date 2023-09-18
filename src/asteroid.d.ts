import SPRITE from './sprite';
import { Ordinal, Sheet } from './types';
/**
 * Extend SPRITE to add asteroid features
 */
export default class ASTEROID extends SPRITE {
    mineralType: string;
    modelCurrent: number;
    modelNew: number;
    empty: boolean;
    rotationDirection: string;
    rotationSpeed: number;
    constructor(props: any);
    /**
    * Returns an SPRITE with random position
    * @returns SPRITE
    */
    static create(): void;
    /**
     * returns a list of asteorids lists
     * one big list throws error on some devices
     */
    static setGroups(totalQty: number, groupLimit: number): any[];
    /**
     * Manage the click on the CurrentAsteroid
     * - Update the cargo
     * - Update the asteroid sprites
     * @returns nothing
     */
    click(e: any): void;
    impact(): void;
    heroMining(xp: number): void;
    setEmpty(): void;
    isClickIn(e: Ordinal): boolean;
    /**
     * returns the one mineral for the asteroid, from the collection of minerals based on probability of occurrence
     *
     */
    static getRandomMineralType(): string;
    static getModel(): Sheet;
    draw(): void;
}
