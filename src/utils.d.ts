export default class Utils {
    static random(min: number, max: number): number;
    static colision(a: any, b: any): boolean;
    static toDegrees(degrees: number): number;
    static radiants(origin: any, target: any, degrees?: number): number;
    static pathLinear(origin: any, target: any, speed: number): {
        x: any;
        y: any;
    }[];
}
