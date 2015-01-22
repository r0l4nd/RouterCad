/// <reference path="../typings/ThreeBSP.d.ts" />
/// <reference path="../IPrototype.ts" />
/// <reference path="../typings/threejs/three.d.ts" />

interface IPocket {
    getPrototype(): IPrototype;
}

class RectPocket implements IPocket {
    constructor(private origin:number[], private dimensions:number[]) {
    }

    getPrototype():IPrototype {

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
    }

}

class CirclePocket implements IPocket {
    constructor(private origin:number[], private radius: number, private height: number) {
    }

    getPrototype():IPrototype {
        /*var ret = new CSG.cylinder({ radius: this.radius, start: this.origin, end: [this.origin[0], this.origin[1], this.origin[2] - this.height] });
         this.tools.setColour(ret, 0, 1, 1);*/
        return {
            getThree: () => {
                return null;
            },
            mesh: 0
        };
    }

}

class WoodFlat {
    constructor(private origin:number[], private dimensions:number[]) {
        this.cuts = [];
    }

    getPrototype():IPrototype {
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
    }

    private cuts:IPocket[];

    makeCut(shape:IPocket) {
        this.cuts.push(shape);
    }

}
