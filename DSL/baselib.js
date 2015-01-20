/// <reference path="../Scripts/typings/csg.d.ts" />
/// <reference path="../Scripts/typings/ThreeBSP.d.ts" />
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
        }, getThree: function () {
            return null;
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
        }, getThree: function () {
            return null;
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
        var cube_geometry = new THREE.CubeGeometry(this.dimensions[0], this.dimensions[1], this.dimensions[2]);
        var cube_mesh = new THREE.Mesh(cube_geometry);
        cube_mesh.position.x = -7;
        var cube_bsp = new ThreeBSP(cube_mesh);
        var sphere_geometry = new THREE.SphereGeometry(18, 32, 32);
        var sphere_mesh = new THREE.Mesh(sphere_geometry);
        sphere_mesh.position.x = -7;
        var sphere_bsp = new ThreeBSP(sphere_mesh);
        var subtract_bsp = cube_bsp.subtract(sphere_bsp);
        var three = cube_bsp.toMesh(new THREE.MeshLambertMaterial({
            color: 0xCCCCCC
        }));
        return { getCSG: function () {
            return ret;
        }, getThree: function () {
            return three;
        } };
    };
    WoodFlat.prototype.makeCut = function (shape) {
        this.cuts.push(shape);
    };
    return WoodFlat;
})();
