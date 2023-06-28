import { ItemAccount, Limits, MineralPrice, Ordinal } from './types';
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
import EXPLOSION from './explosion';
import CHARACTER from './character';
import ENEMY from './enemy';
export default class GAME {
    Anchor: SPRITE;
    Asteroids: any[];
    Background: PLAIN;
    BkgProportion: number;
    BaseRock: SPRITE;
    CargoTotal: number;
    CenterVoid: any;
    Central: SPRITE;
    Characters: CHARACTER[];
    Clients: CLIENT[];
    Crosshair: CROSSHAIR;
    CurrentScreen: string;
    CurrentAsteroid: ASTEROID;
    Device: string;
    Explosions: EXPLOSION[];
    Enemys: ENEMY[];
    GameOver: boolean;
    GlobalTime: number;
    H: number;
    Hero: HERO;
    HitsLabels: TEXT[];
    HitsLabelsDone: TEXT[];
    InCentral: boolean;
    Inventory: INVENTORY;
    LevelLimits: Limits;
    Margin: number;
    MarkTime: number;
    MineralsStock: ItemAccount[];
    MineralsOnSale: ItemAccount[];
    MineralsPrices: MineralPrice[];
    MineralsHistory: ItemAccount[];
    MoneyTotal: number;
    OffSetHorizontal: number;
    OffSetVertical: number;
    Pause: boolean;
    Stars: BACKGROUND[];
    StarsData: any[];
    Images: any;
    SetNewGame: boolean;
    SoundOn: boolean;
    SpeedClient: number;
    SpeedEnemy: number;
    SpeedHero: number;
    SpeedHeroShoot: number;
    ScreenTitle: {
        title: BACKGROUND;
        buttonNewGame: BACKGROUND;
        click: (e: Ordinal) => void;
    };
    VisibleArea: PLAIN;
    UiPanel: UI;
    XpTotal: number;
    W: number;
    constructor();
    save(): void;
    getSaveData(): string;
    setCenterVoid(): void;
    setLimits(): void;
    load(): any;
    newGame(): void;
}
