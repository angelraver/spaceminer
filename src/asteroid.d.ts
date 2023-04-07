import SPRITE from './sprite';
import { Ordinal, AsteroidModel } from './types';
/**
 * Extend SPRITE to add asteroid features
 */
export default class ASTEROID extends SPRITE {
    mineralType: string;
    modelCurrent: number;
    modelNew: number;
    empty: boolean;
    constructor(props: any);
    /**
     * Manage the click on the CurrentAsteroid
     * - Update the cargo
     * - Update the asteroid sprites
     * @returns nothing
     */
    click(e: any): void;
    heroMining(xp: number): void;
    setEmpty(): void;
    isClickIn(e: Ordinal): boolean;
    /**
     * Returns an SPRITE with random position
     * @param id string
     * @returns SPRITE
     */
    static create(id: string): ASTEROID;
    /**
     * Updates g.Asteroids, each asteroid is related with the previous ones
     * it must be this way to avoid overlaping
     */
    static createGroup(qty: number): void;
    /**
     * returns the one mineral for the asteroid, from the collection of minerals based on probability of occurrence
     *
     */
    static getRandomMineralType(): string;
    static getModel(): AsteroidModel;
}
