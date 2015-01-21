var CsgTools = (function () {
    function CsgTools() {
    }
    CsgTools.prototype.setColour = function (prototype, r, g, b) {
        prototype.toPolygons().map(function (polygon) {
            polygon.shared = [r, g, b];
        });
    };

    CsgTools.prototype.csgCoords = function (origin, dimensions) {
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
    };
    return CsgTools;
})();
