import { Mineral, AsteroidModel } from './types';
import ASTEROID from './asteroid';
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
     * returns the one mineral for the asteroid, from the collection of minerals based on probability of occurrence
     *
     */
    static getRandomMineral(): Mineral;
    static getModel(): AsteroidModel;
}
