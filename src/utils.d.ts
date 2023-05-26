import { Ordinal, ItemAccount } from './types';
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
    static colision(a: any, b: any): boolean;
    /**
     * Returns if the given point is in colision with the given SPRITE
     */
    static isHiting(a: Ordinal, b: any): boolean;
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
    /**
     * get random point beyond the offSets of the game
     */
    static randomOuterPoint(): {
        x: number;
        y: number;
    };
    /**
     * checks if a is inside b + the margin
     */
    static valueInMargin(a: number, b: number, margin: number): boolean;
    /**
     * returns a new list if the type exists in the list updates the qty
     */
    static updateQtyList(list: ItemAccount[], type: string, addition: boolean): ItemAccount[];
    /**
     * returns a number in ascendent order from the start to end
     */
    static getNumberAscending(start: number, end: number): number;
}
