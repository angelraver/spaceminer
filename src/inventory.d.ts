import BACKGROUND from './background';
import { MineralModel, Ordinal } from './types';
type MineralsAccount = {
    type: string;
    qty: number;
};
/**
 * Sprite class
 */
export default class INVENTORY {
    showInventory: Boolean;
    panel: BACKGROUND;
    mineralsTypes: string[];
    mineralsAccount: MineralsAccount[];
    slots: any[];
    soundButton: BACKGROUND;
    constructor();
    setPanel(): void;
    setMinerals(): void;
    getMineral(type: string): MineralModel;
    updateMinerals(): void;
    setSoundButton(): void;
    click(e: Ordinal): void;
    draw(): void;
}
export {};
