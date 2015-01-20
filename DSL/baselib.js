/// <reference path="../Scripts/typings/csg.d.ts" />
/// <reference path="../SimpleViewer/CsgTools.ts" />
/// <reference path="../IPrototype.ts" />
var RectPocket = (function () {
    function RectPocket(origin, dimensions) {
        this.origin = origin;
        this.dimensions = dimensions;
        this.tools = new CsgTools();
    }
    RectPocket.prototype.getPrototype = function () {
        var ret = new CSG.cube(this.tools.csgCoords(this.origin, this.dimensions));
        this.tools.setColour(ret, 1, 0, 1);
        return { getCSG: function () {
            return ret;
        } };
    };
    return RectPocket;
})();
var CirclePocket = (function () {
    function CirclePocket(origin, radius, height) {
        this.origin = origin;
        this.radius = radius;
        this.height = height;
        this.tools = new CsgTools();
    }
    CirclePocket.prototype.getPrototype = function () {
        var ret = new CSG.cylinder({ radius: this.radius, start: this.origin, end: [this.origin[0], this.origin[1], this.origin[2] - this.height] });
        this.tools.setColour(ret, 0, 1, 1);
        return { getCSG: function () {
            return ret;
        } };
    };
    return CirclePocket;
})();
var WoodFlat = (function () {
    function WoodFlat(origin, dimensions) {
        this.origin = origin;
        this.dimensions = dimensions;
        this.cuts = [];
        this.tools = new CsgTools();
    }
    WoodFlat.prototype.getPrototype = function () {
        var ret = new CSG.cube(this.tools.csgCoords(this.origin, this.dimensions));
        this.tools.setColour(ret, 1, 1, 0);
        this.cuts.forEach(function (cut) {
            ret = ret.subtract(cut.getPrototype().getCSG());
        });
        return { getCSG: function () {
            return ret;
        } };
    };
    WoodFlat.prototype.makeCut = function (shape) {
        this.cuts.push(shape);
    };
    return WoodFlat;
})();
