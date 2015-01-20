/// <reference path="../Scripts/typings/threejs/three.d.ts" />
/// <reference path="../Scripts/typings/TrackballControls.d.ts" />
var ThreeViewer;
(function (ThreeViewer) {
    var Viewer = (function () {
        function Viewer(container) {
            var _this = this;
            this.container = container;
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.controls.update();
            };
            this.render = function () {
                _this.renderer.render(_this.scene, _this.camera);
            };
            this.init();
            this.animate();
        }
        Viewer.prototype.init = function () {
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
            var light = new THREE.DirectionalLight(0x00ff00);
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
        };
        Viewer.prototype.addScene = function (mesh) {
            this.scene.add(mesh);
            this.render();
        };
        Viewer.prototype.onWindowResize = function () {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.controls.handleResize();
            this.render();
        };
        return Viewer;
    })();
    ThreeViewer.Viewer = Viewer;
})(ThreeViewer || (ThreeViewer = {}));
