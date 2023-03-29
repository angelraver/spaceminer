import BACKGROUND from './background';
import { Mineral } from './types';
type MineralsAccount = {
    type: string;
    qty: number;
};
/**
 * Sprite class
 */
export default class INVENTORY {
    showInventory: Boolean;
    background: BACKGROUND;
    mineralsTypes: string[];
    mineralsAccount: MineralsAccount[];
    slots: any[];
    constructor();
    draw(): void;
    getMineral(type: string): Mineral;
    updateMinerals(): void;
}
export {};
