/// <reference path="../Scripts/typings/csg.d.ts" />
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
        return { getCSG: ()=>{return ret;}};
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
        return { getCSG: ()=>{return ret;}};
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
        return { getCSG: ()=>{ return ret; }};
    }

    private cuts: IPocket[];

    makeCut(shape: IPocket) {
        this.cuts.push(shape);
    }

    tools: CsgTools;
}
