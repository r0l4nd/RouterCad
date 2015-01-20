/// <reference path="../Scripts/typings/threejs/three.d.ts" />
/// <reference path="../Scripts/typings/TrackballControls.d.ts" />

module ThreeViewer {
  export class Viewer  {
    stats;

    camera;
    controls;
    scene;
    renderer;

    cross;

    constructor(private container) {
      this.init();
      this.animate();
    }

    init() {

      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.z = 500;

      this.controls = new THREE.TrackballControls(this.camera);

      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;

      this.controls.noZoom = false;
      this.controls.noPan = false;

      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;

      this.controls.keys = [65, 83, 68];

      this.controls.addEventListener('change', this.render);

      // world

      this.scene = new THREE.Scene();
      //            this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);




      // lights

      var light: THREE.Light = new THREE.DirectionalLight(0x00ff00);
      light.position.set(100, 100, 100);
      this.scene.add(light);

      light = new THREE.DirectionalLight(0x0000ff);
      light.position.set(-100, -100, -100);
      this.scene.add(light);

      light = new THREE.AmbientLight(0x222222);
      this.scene.add(light);


      // renderer

      this.renderer = new THREE.WebGLRenderer({ antialias: false });
      this.renderer.setClearColor(0xffffff);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.container.append(this.renderer.domElement);

      //

      window.addEventListener('resize', this.onWindowResize, false);

      //

      this.render();


    }

    addScene(mesh) {
      this.scene.add(mesh);
      this.render();
    }

    onWindowResize() {

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.controls.handleResize();

      this.render();

    }

    animate = () => {
      requestAnimationFrame(this.animate);
      this.controls.update();
    }

    render = () => {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
