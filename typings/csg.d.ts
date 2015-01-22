declare module CSG {
    export class prototype
    {
        subtract(csg: prototype);   
        toPolygons();

        union(csg: prototype): prototype;
    }

    export class sphere extends prototype {
        constructor(p: { radius: number;center: any[] });
    }

    export class cube extends prototype {
        constructor(options: { center: any[] });
        constructor(options: { radius: number; center: any[] });
        constructor(options: { radius: any[]; center: any[] });
    }

    export class cylinder extends prototype {
        constructor(options: { radius: number; start: any[]; end: any[] });
    }
    
    export class vector { }
}

declare module GL {
    export class Vector {
        constructor(x: number, y: number, z: number);
        x:number;
        y:number;
        z:number;

        static fromAngles(angle1: number, angle2: number);

        add(vector: Vector): Vector;
    }

    export class Shader {
        constructor(voidMainGlPositionGlModelviewprojectionmatrixGlVertex: string, voidMainGlFragcolorVec4: string);

        draw(mesh, triangles);

        uniforms(p: { brightness: number });
    }

    export class Mesh {
        constructor(p: { normals: boolean;colors: boolean });

        triangles;
        vertices;
        normals;
        colors;

        computeWireframe();

        static sphere(p: { normals: boolean;radius: number }) ;
    }

    export class Indexer {
        add(vertex);

        unique;
    }

    export function create();

    export var keys;
}