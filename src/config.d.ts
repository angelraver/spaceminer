import { MineralModel, AsteroidModel, ClientModel, LibraryItem, Sheet } from './types';
/**
 * Global constants setting the game sources and values
 */
export declare const CONFIG: {
    SPRITES_FOLDER: string;
    SOUND_FOLDER: string;
    GAME_SPEED: number;
    BLOCK_DESKTOP: number;
    BLOCK_MOBILE: number;
    OFFSET_MOBILE_X: number;
    OFFSET_MOBILE_Y: number;
    OFFSET_DESKTOP_X: number;
    OFFSET_DESKTOP_Y: number;
};
export declare const SPRITE_LIBRARY: LibraryItem;
export declare const CLIENT_MODELS: ClientModel[];
export declare const ASTEROID_MODELS: AsteroidModel[];
/**
 * Collection of minerals for the cargo
 */
export declare const MINERAL_MODELS: MineralModel[];
export declare const EXPLOSIONS_SHEETS: Sheet[];
