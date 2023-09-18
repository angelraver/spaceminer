export default class LOADING {
    assetsLoaded: number;
    totalAssetsCount: number;
    allAssets: any;
    loadingScreen: HTMLDivElement;
    loadingBar: HTMLDivElement;
    loadingText: HTMLDivElement;
    canvas: HTMLCanvasElement;
    constructor();
    objectListing(inputObject: any, fileType: string): {
        [key: string]: any;
    };
    assetLoaded(): void;
    preloadImages(): void;
    preloadSounds(): void;
    loadAssets(): void;
}
