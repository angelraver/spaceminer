import { Ordinal } from './types';
import BACKGROUND from './background';
import TEXT from './text';
import SPRITE from './sprite';
export default class UI {
    controlsButton: SPRITE;
    xpPanel: BACKGROUND;
    xpText: TEXT;
    xpIcon: SPRITE;
    moneyPanel: BACKGROUND;
    moneyText: TEXT;
    moneyIcon: SPRITE;
    fontSize: number;
    constructor();
    create(): void;
    setControls(): void;
    setXp(): void;
    setMoney(): void;
    /**
     * Show / Hide inventory
     */
    click(e: Ordinal): void;
    draw(): void;
}
