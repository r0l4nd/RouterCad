/// <reference path="../Scripts/typings/csg.d.ts" />
/// <reference path="../Scripts/typings/ThreeBSP.d.ts" />
/// <reference path="../SimpleViewer/CsgTools.ts" />
/// <reference path="../IPrototype.ts" />

interface IPocket {
    getPrototype(): IPrototype;
}

class RectPocket implements IPocket {
    constructor(private origin: any[], private dimensions: any[]) {
        this.tools = new CsgTools();
    }

    getPrototype(): IPrototype {
        var ret = new CSG.cube(this.tools.csgCoords(this.origin, this.dimensions));
        this.tools.setColour(ret, 1, 0, 1);
        return { getCSG: ()=>{return ret;}, getThree: ()=>{ return null;}};
    }

    tools: CsgTools;
}

class CirclePocket implements IPocket {
    constructor(private origin: any[], private radius, private height) {
        this.tools = new CsgTools();
    }

    getPrototype(): IPrototype {
        var ret = new CSG.cylinder({ radius: this.radius, start: this.origin, end: [this.origin[0],this.origin[1], this.origin[2]-this.height] });
        this.tools.setColour(ret, 0, 1, 1);
        return { getCSG: ()=>{return ret;}, getThree: ()=>{ return null;}};
      }

    tools: CsgTools;
}

class WoodFlat {
    constructor(private origin: number[], private dimensions: number[]) {
        this.cuts = [];
        this.tools = new CsgTools();
    }

    getPrototype(): IPrototype {
        var ret = new CSG.cube(this.tools.csgCoords(this.origin, this.dimensions));
        this.tools.setColour(ret, 1, 1, 0);
        this.cuts.forEach(cut => { ret = ret.subtract(cut.getPrototype().getCSG()); });

        var cube_geometry = new THREE.CubeGeometry(this.dimensions[0],this.dimensions[1],this.dimensions[2]);
        var cube_mesh = new THREE.Mesh(cube_geometry);
        cube_mesh.position.x = -7;
        var cube_bsp = new ThreeBSP(cube_mesh);
        var sphere_geometry = new THREE.SphereGeometry(18, 32, 32);
        var sphere_mesh = new THREE.Mesh(sphere_geometry);
        sphere_mesh.position.x = -7;
        var sphere_bsp = new ThreeBSP(sphere_mesh);

        var subtract_bsp = cube_bsp.subtract(sphere_bsp);
        var three = cube_bsp.toMesh(new THREE.MeshLambertMaterial(
          {
            color: 0xCCCCCC
            }));
        return { getCSG: ()=>{ return ret; }, getThree: ()=>{ return three;}};
    }

    private cuts: IPocket[];

    makeCut(shape: IPocket) {
        this.cuts.push(shape);
    }

    tools: CsgTools;
}
