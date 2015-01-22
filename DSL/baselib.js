/// <reference path="../typings/ThreeBSP.d.ts" />
/// <reference path="../IPrototype.ts" />
/// <reference path="../typings/threejs/three.d.ts" />

var RectPocket = (function () {
    function RectPocket(origin, dimensions) {
        this.origin = origin;
        this.dimensions = dimensions;
    }
    RectPocket.prototype.getPrototype = function () {
        var cube_geometry = new THREE.CubeGeometry(this.dimensions[0], this.dimensions[1], this.dimensions[2]);
        var cube_mesh = new THREE.Mesh(cube_geometry);
        cube_mesh.position.x = this.origin[0];
        cube_mesh.position.y = this.origin[1];
        cube_mesh.position.z = this.origin[2];

        return {
            getThree: function () {
                return cube_mesh;
            },
            mesh: cube_mesh
        };
    };
    return RectPocket;
})();

var CirclePocket = (function () {
    function CirclePocket(origin, radius, height) {
        this.origin = origin;
        this.radius = radius;
        this.height = height;
    }
    CirclePocket.prototype.getPrototype = function () {
        /*var ret = new CSG.cylinder({ radius: this.radius, start: this.origin, end: [this.origin[0], this.origin[1], this.origin[2] - this.height] });
        this.tools.setColour(ret, 0, 1, 1);*/
        return {
            getThree: function () {
                return null;
            },
            mesh: 0
        };
    };
    return CirclePocket;
})();

var WoodFlat = (function () {
    function WoodFlat(origin, dimensions) {
        this.origin = origin;
        this.dimensions = dimensions;
        this.cuts = [];
    }
    WoodFlat.prototype.getPrototype = function () {
        var cube_geometry = new THREE.CubeGeometry(this.dimensions[0], this.dimensions[1], this.dimensions[2]);
        var cube_mesh = new THREE.Mesh(cube_geometry);
        cube_mesh.position.x = this.origin[0];
        cube_mesh.position.y = this.origin[1];
        cube_mesh.position.z = this.origin[2];
        var cube_bsp = new ThreeBSP(cube_mesh);

        this.cuts.forEach(function (cut) {
            cube_bsp = cube_bsp.subtract(new ThreeBSP(cut.getPrototype().getThree()));
        });
        ;

        var three = cube_bsp.toMesh(new THREE.MeshLambertMaterial({
            color: 0xCCCCCC
        }));
        return {
            getThree: function () {
                return three;
            },
            mesh: cube_mesh
        };
    };

    WoodFlat.prototype.makeCut = function (shape) {
        this.cuts.push(shape);
    };
    return WoodFlat;
})();
