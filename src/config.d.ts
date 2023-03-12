import { Mineral } from './types';
/**
 * Global constants setting the game sources and values
 */
export declare const CONFIG: {
    SPRITES_FOLDER: string;
    SOUND_FOLDER: string;
    BLOCK_UNITY: number;
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
/**
 * Collection of Asteroid sprites
 */
export declare const ASTEROIDS_MODELS: {
    w: number;
    h: number;
    sheet: string;
}[];
/**
 * Collection of minerals for the cargo
 */
export declare const MINERALS: Mineral[];
