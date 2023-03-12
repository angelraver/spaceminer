import { Mineral } from './types';
import ASTEROID from "./asteroid";
/**
 * Static class to manage the SPRITES asteroids
 */
export default class AsteroidManager {
    /**
     * Returns an SPRITE with random position
     * @param id string
     * @returns SPRITE
     */
    static create(id: string): ASTEROID;
    /**
     * Returns an array of SPRITES Asteroids
     * @param n amount of SPRITES
     * @returns SPRITE[]
     */
    static createGroup(): void;
    /**
     * Refesh the Asteroids array excluding the given id
     * @param id
     */
    static destroy(id: string): void;
    /**
     * Manage the click on the asteroids
     * - Update the cargo
     * - Update the asteroid sprites
     * @returns nothing
     */
    static click(e: any): boolean;
    /**
     * Adds a hit label (SPRITE type TEXT) to the global array of Hitlabels
     * @param id
     * @param number
     * @param x
     * @param y
     */
    static hiting(id: string, number: number, x: number, y: number): void;
    static getMineral(): Mineral;
}
