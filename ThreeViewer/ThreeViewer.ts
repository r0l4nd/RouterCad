/// <reference path="../typings/threejs/three.d.ts" />
/// <reference path="../typings/TrackballControls.d.ts" />

module threeViewer {

    /**
     * Creates a 3D viewer using three.js
     */
    export class Viewer {

        private camera;
        private controls:THREE.TrackballControls;
        private scene:THREE.Scene;
        private renderer;

        /**
         * Returns a new Viewer and adds it inside the specified element
         *
         * @param container The Jquery element to add the viewer inside
         */
        constructor(private container) {
            this.initRenderer();
            this.animate();
        }

        private getParentWidth() {
            return this.container.parent().width() - 10;
        }

        private getParentHeight() {
            return this.container.parent().innerHeight() - 10;
        }


        private initRenderer() {

            this.camera = new THREE.PerspectiveCamera(70, this.getParentWidth() / this.getParentHeight(), 1, 10000);
            this.camera.position.y = -500;
            this.camera.position.z = 500;

            this.controls = new THREE.TrackballControls(this.camera);
            this.setupControls(this.controls);

            this.scene = new THREE.Scene();

            this.addLights(this.scene);
            // renderer
            this.renderer = new THREE.WebGLRenderer({antialias: false});
            this.renderer.setClearColor(0xffffff);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.resizeRenderer();
            this.container.append(this.renderer.domElement);

            window.addEventListener('resize', () => {
                this.resizeRenderer();
                window.setTimeout(() => {
                    this.resizeRenderer();
                }, 500);
            }, false);

            this.render();
        }

        private setupControls(controls:THREE.TrackballControls) {
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [65, 83, 68];
            controls.addEventListener('change', this.render);
        }

        private  addLights(scene:THREE.Scene) {
            var light = new THREE.PointLight(0xffffff, 1, 2000);
            light.position.set(200, 200, 500);
            scene.add(light);

            light = new THREE.PointLight(0xffffff, 0.5, 2000);
            light.position.set(100, 200, 0);
            scene.add(light);
        }

        private oldMesh;

        /**
         * Remove the current mesh in the scene and replace it with the one specified
         *
         * @param mesh the new mesh to display
         */
        addScene(mesh) {
            // remove existing elements from the scene
            if (this.oldMesh)
                this.scene.remove(this.oldMesh);

            this.scene.add(mesh);
            this.oldMesh = mesh;
            this.render();
        }

        private resizeRenderer() {
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
        }

        //declare as lambda in order to allow recursion
        private animate = () => {
            requestAnimationFrame(this.animate);
            this.controls.update();
        }

        //declare as lambda to localise scope of 'this'
        private render = () => {
            this.renderer.render(this.scene, this.camera);
        }
    }
}
