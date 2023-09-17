import BACKGROUND from './background';
import { MineralModel, Ordinal } from './types';
import TEXT from './text';
/**
 * Sprite class
 */
export default class INVENTORY {
    textStock: TEXT;
    textSale: TEXT;
    showInventory: Boolean;
    panelStock: BACKGROUND;
    panelSale: BACKGROUND;
    slotsStock: any[];
    slotsSale: any[];
    constructor();
    setPanelStock(): void;
    setPanelSale(): void;
    /**
     * Sets the mineral slots for stock, with qty 0
     */
    setStockMinerals(): void;
    /**
     * set the slots for sale with qty 0
     */
    setSaleMinerals(): void;
    /**
     * get 1 mineral type by its type
     */
    getMineralModel(type: string): MineralModel;
    /**
     * updates the qty of mineralas in the slots
     */
    mineralsUpdateSlots(): void;
    mineralAddToSale(type: string): void;
    mineralReturnToStock(type: string): void;
    mineralSold(type: string): void;
    /**
     * manages click for
     *
     * Sound button
    */
    click(e: Ordinal): void;
    draw(): void;
}
