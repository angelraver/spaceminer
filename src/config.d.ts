import { MineralModel, AsteroidModel, ClientModel } from './types';
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
export declare const ASTEROID_MODELS: AsteroidModel[];
/**
 * Collection of minerals for the cargo
 */
export declare const MINERAL_MODELS: MineralModel[];
type SoundLibrary = {
    [key: string]: string;
};
export declare const SOUND_LIBRARY: SoundLibrary;
export declare const CLIENT_MODELS: ClientModel[];
export {};
