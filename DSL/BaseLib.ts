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

    var cube_geometry = new THREE.CubeGeometry(this.dimensions[0], this.dimensions[1], this.dimensions[2]);
    var cube_mesh = new THREE.Mesh(cube_geometry);
    cube_mesh.position.x = this.origin[0];
    cube_mesh.position.y = this.origin[1];
    cube_mesh.position.z = this.origin[2];

    return {
      getCSG: function() {
        return ret;
      }, getThree: function() {
        return cube_mesh;
      }
    };
  }

  tools: CsgTools;
}

class CirclePocket implements IPocket {
  constructor(private origin: any[], private radius, private height) {
    this.tools = new CsgTools();
  }

  getPrototype(): IPrototype {
    var ret = new CSG.cylinder({ radius: this.radius, start: this.origin, end: [this.origin[0], this.origin[1], this.origin[2] - this.height] });
    this.tools.setColour(ret, 0, 1, 1);
    return { getCSG: () => { return ret; }, getThree: () => { return null; } };
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

    var cube_geometry = new THREE.CubeGeometry(this.dimensions[0], this.dimensions[1], this.dimensions[2]);
    var cube_mesh = new THREE.Mesh(cube_geometry);
    cube_mesh.position.x = this.origin[0];
    cube_mesh.position.y = this.origin[1];
    cube_mesh.position.z = this.origin[2];
    var cube_bsp = new ThreeBSP(cube_mesh);

    this.cuts.forEach(function(cut) {
      cube_bsp = cube_bsp.subtract(new ThreeBSP(cut.getPrototype().getThree()));
    });
    ;

    var three = cube_bsp.toMesh(new THREE.MeshLambertMaterial({
      color: 0xCCCCCC
    }));
    return {
      getCSG: function() {
        return ret;
      }, getThree: function() {
        return three;
      }
    };
  }

  private cuts: IPocket[];

  makeCut(shape: IPocket) {
    this.cuts.push(shape);
  }

  tools: CsgTools;
}
