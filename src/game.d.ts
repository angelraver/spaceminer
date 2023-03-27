import { Limits } from './types';
import SPRITE from './sprite';
import ASTEROID from './asteroid';
import TEXT from './text';
import CROSSHAIR from './crosshair';
import HERO from './hero';
import BACKGROUND from './background';
import PLAIN from './plain';
import INVENTORY from './inventory';
import UI from './uiPanel';
export default class GAME {
    Device: string;
    W: number;
    H: number;
    Block: number;
    OffSetHorizontal: number;
    OffSetVertical: number;
    BkgProportion: number;
    CenterVoid: any;
    GlobalTime: number;
    MarkTime: number;
    Speed: number;
    CurrentScreen: string;
    GameOver: boolean;
    Pause: boolean;
    SetNewGame: boolean;
    Background: PLAIN;
    Hero: HERO;
    Central: SPRITE;
    Crosshair: CROSSHAIR;
    AsteroidsNumber: number;
    Asteroids: ASTEROID[];
    CurrentAsteroid: ASTEROID;
    CargoTotal: number;
    XpTotal: number;
    MoneyTotal: number;
    MineralsTotal: string[];
    InCentral: boolean;
    HitsLabels: TEXT[];
    Stars: BACKGROUND[];
    Margin: number;
    Anchor: SPRITE;
    VisibleArea: PLAIN;
    LevelLimits: Limits;
    Inventory: INVENTORY;
    UiPanel: UI;
    constructor();
    /**
     * to know the current device desktop or mobile
     */
    setDevice(): void;
}
