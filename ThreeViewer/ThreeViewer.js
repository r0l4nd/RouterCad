/// <reference path="../typings/threejs/three.d.ts" />
/// <reference path="../typings/TrackballControls.d.ts" />
var ThreeViewer;
(function (ThreeViewer) {
    var Viewer = (function () {
        function Viewer(container) {
            var _this = this;
            this.container = container;
            //declare as lambda in order to allow recursion
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.controls.update();
            };
            //declare as lambda to localise scope of 'this'
            this.render = function () {
                _this.renderer.render(_this.scene, _this.camera);
            };
            this.init();
            this.animate();
        }
        Viewer.prototype.getParentWidth = function () {
            return this.container.parent().width() - 10;
        };
        Viewer.prototype.getParentHeight = function () {
            return this.container.parent().innerHeight() - 10;
        };
        Viewer.prototype.init = function () {
            var _this = this;
            this.camera = new THREE.PerspectiveCamera(70, this.getParentWidth() / this.getParentHeight(), 1, 10000);
            this.camera.position.y = -500;
            this.camera.position.z = 500;
            this.controls = new THREE.TrackballControls(this.camera);
            this.setupControls(this.controls);
            this.scene = new THREE.Scene();
            this.addLights(this.scene);
            // renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: false });
            this.renderer.setClearColor(0xffffff);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.resizeRenderer();
            this.container.append(this.renderer.domElement);
            window.addEventListener('resize', function () {
                _this.resizeRenderer();
                window.setTimeout(function () {
                    _this.resizeRenderer();
                }, 500);
            }, false);
            this.render();
        };
        Viewer.prototype.setupControls = function (controls) {
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [65, 83, 68];
            controls.addEventListener('change', this.render);
        };
        Viewer.prototype.addLights = function (scene) {
            var light = new THREE.PointLight(0xffffff, 1, 2000);
            light.position.set(200, 200, 500);
            scene.add(light);
            light = new THREE.PointLight(0xffffff, 0.5, 2000);
            light.position.set(100, 200, 0);
            scene.add(light);
        };
        Viewer.prototype.addScene = function (mesh) {
            // remove existing elements from the scene
            if (this.oldMesh)
                this.scene.remove(this.oldMesh);
            this.scene.add(mesh);
            this.oldMesh = mesh;
            this.render();
        };
        Viewer.prototype.resizeRenderer = function () {
            this.camera.aspect = this.getParentWidth() / this.getParentHeight();
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.getParentWidth(), this.getParentHeight());
            // shrink viewer by 5px
            var oldWidth = this.getParentWidth();
            var oldHeight = this.getParentHeight();
            this.renderer.setSize(this.getParentWidth() - 5, this.getParentHeight() - 5);
            this.controls.handleResize();
            this.render();
            // deal with the div size lagging behind the page size
            // if shrinking the viewer by 5px caused the parent to shrink, do another resize!
            if (oldWidth > this.getParentWidth() || oldHeight > this.getParentHeight()) {
                this.resizeRenderer();
            }
        };
        return Viewer;
    })();
    ThreeViewer.Viewer = Viewer;
})(ThreeViewer || (ThreeViewer = {}));
