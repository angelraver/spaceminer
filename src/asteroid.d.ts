import SPRITE from './sprite';
import { Ordinal } from './types';
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
    setEmpty(): void;
    isClickIn(e: Ordinal): boolean;
}
