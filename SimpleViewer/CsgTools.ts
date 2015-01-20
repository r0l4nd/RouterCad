class CsgTools {
    setColour(prototype: CSG.prototype, r: number, g: number, b: number) {
        prototype.toPolygons().map(polygon => {
            polygon.shared = [r, g, b];
        });
    }

    csgCoords(origin: number[], dimensions: number[]) {
        var radius = [
            dimensions[0] / 2,
            dimensions[1] / 2,
            dimensions[2] / 2
        ];

        var center = [
            origin[0] + (dimensions[0] / 2),
            origin[1] + (dimensions[1] / 2),
            origin[2] - (dimensions[2] / 2)
        ];
        return { center: center, radius: radius };
    }


}