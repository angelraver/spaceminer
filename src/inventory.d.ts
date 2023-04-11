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
    panel: BACKGROUND;
    mineralsStockTypes: string[];
    slotsStock: any[];
    mineralsSaleTypes: string[];
    slotsSale: any[];
    soundButton: BACKGROUND;
    constructor();
    /**
     * set the inventory panel
     */
    setPanel(): void;
    /**
     * set the texts
     * SALE
     * STOCK
     */
    setTexts(): void;
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
    updateStockMinerals(): void;
    setMineralTo(action: string, type: string): void;
    /**
     * returns one random mineral from the SlotSale
     */
    mineralSold(): void;
    /**
     * sets the button for the sound ON / OFF
     */
    setSoundButton(): void;
    /**
     * manages click for
     *
     * Sound button
    */
    click(e: Ordinal): void;
    draw(): void;
}
