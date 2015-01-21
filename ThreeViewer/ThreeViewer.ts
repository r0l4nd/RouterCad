/// <reference path="../Scripts/typings/threejs/three.d.ts" />
/// <reference path="../Scripts/typings/TrackballControls.d.ts" />

module ThreeViewer {
  export class Viewer {
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

    private getParentWidth() {
      return this.container.parent().width() - 10;
    }

    private getParentHeight() {
      return this.container.parent().innerHeight() - 10;
    }


    init() {

      this.camera = new THREE.PerspectiveCamera(70, this.getParentWidth() / this.getParentHeight(), 1, 1000);
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

      var light = new THREE.PointLight(0xffffff, 1, 2000);
      light.position.set(200, 200, 500);
      this.scene.add(light);

      light = new THREE.PointLight(0xffffff, 0.5, 2000);
      light.position.set(100, 200, 0);
      this.scene.add(light);
      // renderer

      this.renderer = new THREE.WebGLRenderer({ antialias: false });
      this.renderer.setClearColor(0xffffff);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.getParentWidth(), this.getParentHeight());

      this.container.append(this.renderer.domElement);

      //

      window.addEventListener('resize', () => {
        this.onWindowResize();
        window.setTimeout(() => { this.onWindowResize(); }, 500);
      }, false);

      //

      this.render();


    }

    addScene(mesh) {
      this.scene.add(mesh);
      this.render();
    }

    onWindowResize = () => {

      this.camera.aspect = this.getParentWidth() / this.getParentHeight();
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.getParentWidth(), this.getParentHeight());
      var oldWidth = this.getParentWidth();
      var oldHeight = this.getParentHeight();
      this.renderer.setSize(this.getParentWidth() - 5, this.getParentHeight() - 5);

      this.controls.handleResize();

      this.render();

      // deal with the div size lagging behind the page size
      if (oldWidth > this.getParentWidth() || oldHeight > this.getParentHeight()) {
        this.onWindowResize();
      }


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
