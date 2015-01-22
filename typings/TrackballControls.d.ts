declare module THREE {
    export class TrackballControls {
        constructor(camera: THREE.Camera);
        rotateSpeed: number;
        zoomSpeed: number;
        panSpeed: number;
        noZoom: boolean;
        noPan: boolean;
        staticMoving: boolean;
        dynamicDampingFactor: number;
        keys: number[];
        addEventListener: Function;
        update: Function;
        handleResize: Function;
    }
}