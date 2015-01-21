/// <reference path="../Scripts/typings/csg.d.ts" />
/// <reference path="BlackShader.ts" />
/// <reference path="LightingShader.ts" />
var SimpleViewer = (function () {
    // A viewer is a WebGL canvas that lets the user view a mesh. The user can
    // tumble it around by dragging the mouse.
    function SimpleViewer(width, height, depth) {
        var _this = this;
        this.tools = new CsgTools();
        this.angleX = 0;
        this.angleY = 0;
        // Get a new WebGL canvas
        var gl = GL.create();
        var camera = new GL.Vector(5, 5, 5);
        this.gl = gl;
        // Set up the viewport
        gl.canvas.width = width;
        gl.canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.matrixMode(gl.PROJECTION);
        gl.loadIdentity();
        gl.perspective(45, width / height, 0.1, 10000);
        gl.matrixMode(gl.MODELVIEW);
        // Set up WebGL state
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(1, 1, 1, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.polygonOffset(1, 1);
        ;
        gl.enable(gl.POLYGON_OFFSET_FILL);
        gl.polygonOffset(1, 1);
        // Black shader for wireframe
        this.blackShader = new BlackShader();
        // Shader with diffuse and specular lighting
        this.lightingShader = new LightingShader();
        gl.onmousemove = function (e) {
            if (e.dragging) {
                _this.angleY += e.deltaX;
                _this.angleX += e.deltaY;
                _this.gl.ondraw();
            }
        };
        gl.onupdate = function (seconds) {
            var speed = seconds * 4;
            // Forward movement
            var up = GL.keys.W | GL.keys.UP;
            var down = GL.keys.S | GL.keys.DOWN;
            var forward = GL.Vector.fromAngles((90 - _this.angleY) * Math.PI / 180, (180 - _this.angleX) * Math.PI / 180);
            camera = camera.add(forward.multiply(speed * (up - down)));
            // Sideways movement
            var left = GL.keys.A | GL.keys.LEFT;
            var right = GL.keys.D | GL.keys.RIGHT;
            var sideways = GL.Vector.fromAngles(-_this.angleY * Math.PI / 180, 0);
            camera = camera.add(sideways.multiply(speed * (right - left)));
        };
        gl.ondraw = function () {
            gl.makeCurrent();
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.loadIdentity();
            gl.translate(-_this.gl.canvas.width / 2, -_this.gl.canvas.height / 2, -depth);
            gl.rotate(_this.angleX, 1, 0, 0);
            gl.rotate(_this.angleY, 0, 1, 0);
            gl.enable(gl.POLYGON_OFFSET_FILL);
            if (_this.mesh)
                _this.lightingShader.draw(_this.mesh, gl.TRIANGLES);
            gl.disable(gl.POLYGON_OFFSET_FILL);
            gl.enable(gl.BLEND);
            if (_this.mesh)
                _this.blackShader.draw(_this.mesh, gl.LINES);
            gl.disable(gl.BLEND);
        };
        gl.animate();
        gl.ondraw();
    }
    SimpleViewer.prototype.setSize = function (width, height) {
        this.gl.canvas.width = width;
        this.gl.canvas.height = height;
        this.gl.viewport(0, 0, width, height);
        this.gl.matrixMode(this.gl.PROJECTION);
        this.gl.loadIdentity();
        this.gl.perspective(45, width / height, 0.1, 10000);
        this.gl.matrixMode(this.gl.MODELVIEW);
    };
    SimpleViewer.prototype.addAxis = function (prototype) {
        var xAxis = new CSG.cube({ center: [1000, 0.1, 0.1], radius: [1000, 0.1, 0.1] });
        this.tools.setColour(xAxis, 1, 0, 0);
        prototype = prototype.union(xAxis);
        var yAxis = new CSG.cube({ center: [0.1, 1000, 0.1], radius: [0.1, 1000, 0.1] });
        this.tools.setColour(yAxis, 0, 1, 0);
        prototype = prototype.union(yAxis);
        var zAxis = new CSG.cube({ center: [0.1, 0.1, 1000], radius: [0.1, 0.1, 1000] });
        this.tools.setColour(zAxis, 0, 0, 1);
        prototype = prototype.union(zAxis);
        return prototype;
    };
    SimpleViewer.prototype.setContents = function (prototype) {
        this.mesh = this.toMesh(this.addAxis(prototype));
        this.gl.ondraw();
    };
    SimpleViewer.prototype.getCanvas = function () {
        return this.gl.canvas;
    };
    // Convert from CSG solid to GL.Mesh object
    SimpleViewer.prototype.toMesh = function (prototype) {
        var mesh = new GL.Mesh({ normals: true, colors: true });
        var indexer = new GL.Indexer();
        prototype.toPolygons().map(function (polygon) {
            var indices = polygon.vertices.map(function (vertex) {
                vertex.color = polygon.shared;
                return indexer.add(vertex);
            });
            for (var i = 2; i < indices.length; i++) {
                mesh.triangles.push([indices[0], indices[i - 1], indices[i]]);
            }
        });
        mesh.vertices = indexer.unique.map(function (v) { return [v.pos.x, v.pos.y, v.pos.z]; });
        mesh.normals = indexer.unique.map(function (v) { return [v.normal.x, v.normal.y, v.normal.z]; });
        mesh.colors = indexer.unique.map(function (v) { return v.color; });
        mesh.computeWireframe();
        return mesh;
    };
    return SimpleViewer;
})();
