import SPRITE from "./sprite";
import { Ordinal } from './types';
/**
 * Extends SPRITE to add hero features
 */
export default class HERO extends SPRITE {
    goingLeft: boolean;
    goingRight: boolean;
    goingTop: boolean;
    goingBottom: boolean;
    cargo: number;
    cargoMineralsFull: boolean;
    cargoMineralsPositions: Ordinal[];
    cargoMinerals: SPRITE[];
    constructor(props: any);
    /**
     * Overwrite draw
     */
    draw(): void;
    /**
     * Manage click event
     * @param e
     */
    click(e: Ordinal): void;
    /**
     * add the cargo sprite to the Hero CargoMinerals prop
     * the cargo is based on the asteroid mineral
     */
    addCargoMineral(): void;
    /**
     * Returns one of the 4 cargo position available if it is.
     */
    getCargoMineralsPosition(): Ordinal;
    /**
     * Resets the cargo relative props
     */
    resetCargo(): void;
    /**
    * Update the global Going family top, right, bottom ,left to know where the hero is going
    */
    checkDirection(): void;
}
