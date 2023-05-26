import BACKGROUND from './background';
/**
 * Extends BACKGROUND to add STAR features
 */
export default class STAR extends BACKGROUND {
    constructor(props: any);
    updateImage(): void;
    /**
     * returns a list of asteorids lists
     * one big list throws error on some devices
     */
    static getGroups(): STAR[];
}
