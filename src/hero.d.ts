import SPRITE from './sprite';
import { Ordinal } from './types';
import ENEMY from './enemy';
/**
 * Extends SPRITE to add hero features
 */
export default class HERO extends SPRITE {
    goingLeft: boolean;
    goingRight: boolean;
    goingTop: boolean;
    goingBottom: boolean;
    xp: number;
    cargoMineralsPositions: Ordinal[];
    cargoMinerals: SPRITE[];
    flame1: SPRITE;
    flame2: SPRITE;
    inCentral: boolean;
    shoot: SPRITE;
    enemyTarget: ENEMY;
    constructor(props: any);
    /**
     * Manage click event
     */
    click(e: Ordinal): void;
    /**
     * When the hero is clicking on an asteorid
     * - Adds xp
     * - Prepare xp to drop on central
     * - Triggers the hit label
     */
    mining(xp: number, x: number, y: number): void;
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
     * Unloads the cargo in the central
     * - Creates the hit label
     * - Updates the XpTotal
     * - Updates the MineralsStock
     * - Resets the xp
     */
    unloadCargo(): void;
    /**
     * Resets the cargo relative props
     * Resets the xp
     */
    resetCargo(): void;
    /**
    * Update the global Going family top, right, bottom ,left to know where the hero is going
    */
    checkDirection(): void;
    going(): void;
    checkMoving(): boolean;
    checkEmemys(): void;
    checkShoot(): void;
    checkLooted(): SPRITE;
    checkCargo(): boolean;
    checkInCentral(): void;
    checkCargoFull(): boolean;
    drawing(): void;
}
