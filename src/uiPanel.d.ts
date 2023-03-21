import BACKGROUND from './background';
import TEXT from './text';
import SPRITE from './sprite';
export default class UIPANEL {
    panel: BACKGROUND;
    xp: TEXT;
    xpIcon: SPRITE;
    money: TEXT;
    moneyIcon: SPRITE;
    constructor();
    create(): void;
    draw(): void;
}
