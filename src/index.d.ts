import SPRITE from './sprite';
import TEXT from './text';
declare global {
    var GlobalTime: number, ctx: CanvasRenderingContext2D, MarkTime: number, Speed: number, CurrentScreen: string, GameOver: boolean, Pause: boolean, SetNewGame: boolean, Background: SPRITE, Hero: SPRITE, Central: SPRITE, AsteroidsNumber: number, Asteroids: SPRITE[], AsteroidModelCurrent: number, AsteroidModelNew: number, CurrentAsteroid: SPRITE, Cargo: number, CargoTotal: number, CargoGoal: number, InCentral: boolean, HitsLabels: TEXT[];
}
