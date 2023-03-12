import { Ordinal } from './types';
import SPRITE from './sprite';
/**
 * Simple functions to return values
 * - Does not update globals
 */
export default class Utils {
    static random(min: number, max: number): number;
    /**
     * Returns if 2 SPRITE are in colision
     * @param a
     * @param b
     * @returns
     */
    static colision(a: SPRITE, b: any): boolean;
    /**
     * Returns if the given point is in colision with the given SPRITE
     */
    static hit(a: Ordinal, b: SPRITE): boolean;
    /**
     * Translate degrees to radiants
     * @param degrees
     * @returns
     */
    static toRadiants(degrees: number): number;
    /**
     * Return radiants for the inclination between the origin and the target
     * Optional: directly returns the radiants for the given degrees argument
     * @param origin
     * @param target
     * @param degrees
     * @returns
     */
    static radiants(origin: Ordinal, target: Ordinal, degrees?: number): number;
    /**
     * Return an array of positions {x,y} for the line between the origin and the target based on the speed
     * @param origin
     * @param target
     * @param speed
     * @returns
     */
    static pathLinear(origin: Ordinal, target: Ordinal, speed: number): Ordinal[];
}
