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
    background: BACKGROUND;
    minerals: BACKGROUND[];
    mineralsTypes: string[];
    mineralsAccount: MineralsAccount[];
    slots: [];
    constructor();
    create(): void;
    draw(): void;
    getMineral(type: string): Mineral;
    updateMinerals(): void;
}
export {};
