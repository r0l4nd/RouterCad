/// <reference path="../typings/threejs/three.d.ts" />
/// <reference path="../typings/TrackballControls.d.ts" />
var ThreeViewer;
(function (ThreeViewer) {
    var Viewer = (function () {
        function Viewer(container) {
            var _this = this;
            this.container = container;
            this.resizeRenderer = function () {
                _this.camera.aspect = _this.getParentWidth() / _this.getParentHeight();
                _this.camera.updateProjectionMatrix();

                _this.renderer.setSize(_this.getParentWidth(), _this.getParentHeight());
                var oldWidth = _this.getParentWidth();
                var oldHeight = _this.getParentHeight();
                _this.renderer.setSize(_this.getParentWidth() - 5, _this.getParentHeight() - 5);

                _this.controls.handleResize();

                _this.render();

                // deal with the div size lagging behind the page size
                if (oldWidth > _this.getParentWidth() || oldHeight > _this.getParentHeight()) {
                    _this.resizeRenderer();
                }
            };
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

            this.controls.rotateSpeed = 1.0;
            this.controls.zoomSpeed = 1.2;
            this.controls.panSpeed = 0.8;

            this.controls.noZoom = false;
            this.controls.noPan = false;

            this.controls.staticMoving = true;
            this.controls.dynamicDampingFactor = 0.3;

            this.controls.keys = [65, 83, 68];

            this.controls.addEventListener('change', this.render);

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

            //
            this.render();
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
            if (this.oldMesh)
                this.scene.remove(this.oldMesh);

            this.scene.add(mesh);
            this.oldMesh = mesh;
            this.render();
        };
        return Viewer;
    })();
    ThreeViewer.Viewer = Viewer;
})(ThreeViewer || (ThreeViewer = {}));
