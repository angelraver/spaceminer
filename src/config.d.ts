import { Mineral, AsteroidModel, Ordinal } from './types';
/**
 * Global constants setting the game sources and values
 */
export declare const CONFIG: {
    SPRITES_FOLDER: string;
    SOUND_FOLDER: string;
    GAME_SPEED: number;
    GAME_WIDTH: number;
    GAME_HEIGHT: number;
    GAME_MID_H: number;
    GAME_MID_V: number;
    CENTER_LIMITS: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
    CENTER_VOID: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
};
export declare const ASTEROIDS_MODELS_FRESH: AsteroidModel[];
/**
 * Collection of Asteroid sprites
 */
export declare const ASTEROIDS_MODELS_BREAK: AsteroidModel[];
/**
 * Collection of minerals for the cargo
 */
export declare const MINERALS: Mineral[];
export declare const INVENTORY_SLOT = 50;
export declare const INVENTORY_MINERAL_POSITIONS: Ordinal[];
type SoundLibrary = {
    [key: string]: string;
};
export declare const SOUND_LIBRARY: SoundLibrary;
export {};
