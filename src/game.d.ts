import { Limits } from './types';
import SPRITE from './sprite';
import ASTEROID from './asteroid';
import TEXT from './text';
import CROSSHAIR from './crosshair';
import HERO from './hero';
import CLIENT from './client';
import BACKGROUND from './background';
import PLAIN from './plain';
import INVENTORY from './inventory';
import UI from './uiPanel';
export default class GAME {
    Anchor: SPRITE;
    AsteroidsNumber: number;
    Asteroids: ASTEROID[];
    Background: PLAIN;
    BkgProportion: number;
    Block: number;
    CargoTotal: number;
    CenterVoid: any;
    Central: SPRITE;
    Clients: CLIENT[];
    Crosshair: CROSSHAIR;
    CurrentScreen: string;
    CurrentAsteroid: ASTEROID;
    Device: string;
    GameOver: boolean;
    GlobalTime: number;
    H: number;
    Hero: HERO;
    HitsLabels: TEXT[];
    InCentral: boolean;
    Inventory: INVENTORY;
    LevelLimits: Limits;
    Margin: number;
    MarkTime: number;
    MineralsTotal: string[];
    MoneyTotal: number;
    OffSetHorizontal: number;
    OffSetVertical: number;
    Pause: boolean;
    Stars: BACKGROUND[];
    SetNewGame: boolean;
    Speed: number;
    VisibleArea: PLAIN;
    UiPanel: UI;
    XpTotal: number;
    W: number;
    constructor();
    /**
     * to know the current device desktop or mobile
     */
    setDevice(): void;
}
