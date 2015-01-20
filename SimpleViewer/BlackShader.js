var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackShader = (function (_super) {
    __extends(BlackShader, _super);
    function BlackShader() {
        _super.call(this, "\
    void main() {\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ", "\
    void main() {\
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.3);\
    }\
  ");
    }
    return BlackShader;
})(GL.Shader);
