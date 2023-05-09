import { MineralModel, AsteroidModel, ClientModel, Sheet, LibraryImage } from './types';
/**
 * Global constants setting the game sources and values
 */
export declare const CONFIG: {
    SPRITES_FOLDER: string;
    SOUND_FOLDER: string;
    GAME_SPEED: number;
    OFFSET_X: number;
    OFFSET_Y: number;
};
export declare const SPRITE_LIBRARY: LibraryImage;
export declare const CLIENT_MODELS: ClientModel[];
export declare const ASTEROID_MODELS: AsteroidModel[];
/**
 * Collection of minerals for the cargo
 */
export declare const MINERAL_MODELS: MineralModel[];
export declare const EXPLOSIONS_SHEETS: Sheet[];
