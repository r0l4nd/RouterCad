declare class ThreeBSP {
    constructor(mesh: THREE.Mesh);

    subtract(mesh: ThreeBSP): ThreeBSP;

    toMesh(material: THREE.Material): THREE.Mesh;
}