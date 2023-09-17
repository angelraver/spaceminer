import { Ordinal } from './types';
import BACKGROUND from './background';
import TEXT from './text';
import SPRITE from './sprite';
export default class UI {
    xpPanel: BACKGROUND;
    xpText: TEXT;
    xpIcon: SPRITE;
    moneyPanel: BACKGROUND;
    moneyText: TEXT;
    moneyIcon: SPRITE;
    fontSize: number;
    soundButton: BACKGROUND;
    constructor();
    create(): void;
    setXp(): void;
    setMoney(): void;
    /**
     * Show / Hide inventory
     */
    click(e: Ordinal): void;
    /**
     * sets the button for the sound ON / OFF
     */
    setSoundButton(): void;
    draw(): void;
}
