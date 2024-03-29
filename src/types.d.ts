export type Ordinal = {
    x: number;
    y: number;
};
export type Sheet = {
    i?: string;
    x: number;
    y: number;
    w: number;
    h: number;
    fQty?: number;
};
export type Limits = {
    t: number;
    r: number;
    b: number;
    l: number;
};
export type MineralModel = {
    type: string;
    name: string;
    chance: number[];
    sheet: Sheet;
};
export type ClientModel = {
    id: string;
    requiredXp: number;
    period: number;
    timeShopping: number;
    sheet: Sheet;
};
export type LibraryItem = {
    [key: string]: string;
};
export type LibraryImage = {
    [key: string]: Sheet;
};
export type ItemAccount = {
    type: string;
    qty: number;
};
export type MineralPrice = {
    type: string;
    price: number;
};
