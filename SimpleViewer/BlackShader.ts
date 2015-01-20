class BlackShader extends GL.Shader {
    constructor() {
        super("\
    void main() {\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ", "\
    void main() {\
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.3);\
    }\
  ");
    }
}