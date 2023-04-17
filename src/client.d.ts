import SPRITE from './sprite';
import { Ordinal } from './types';
/**
 * Extends SPRITE to add hero features
 */
export default class CLIENT extends SPRITE {
    origin: Ordinal;
    destiny: Ordinal;
    pathBlocked: boolean;
    period: number;
    isInCentral: boolean;
    isOutside: Boolean;
    timeArrivalCentral: number;
    timeArrivalOutside: number;
    timeShopping: number;
    mineralTypeBought: string;
    mineralCargo: SPRITE;
    constructor(props: any);
    /**
     * Updates the path array positions to stay relative to the hero current position
     */
    pathByHero(): void;
    /**
     * Check if it is time to the client to get a path to appear
     * Check if it is time to the client to leave
     * Set the mineral to buy
     */
    checkPath(): void;
    /**
     * updates the client mineralTypeBought prop
     * updates the g.MineralsOnSale
     */
    buyMineral(): void;
    /**
     * Check if there are new clients, add new clients
     */
    static checkIfIsIn(): void;
    /**
   * Overwrite draw
   * Before it checks the path by hero
   * Before it checks the path and blocked it
   */
    draw(): void;
}
