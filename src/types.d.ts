export type Ordinal = {
    x: number;
    y: number;
};
export type Limits = {
    t: number;
    r: number;
    b: number;
    l: number;
};
export type Sheet = {
    image: string;
    x: number;
    y: number;
    w: number;
    h: number;
};
export type Mineral = {
    type: string;
    name: string;
    chance: number[];
    sheet: Sheet;
};
