class LightingShader extends GL.Shader {
    constructor() {
        super("\
    varying vec3 color;\
    varying vec3 normal;\
    varying vec3 light;\
    void main() {\
      const vec3 lightDir = vec3(1.0, 2.0, 3.0) / 3.741657386773941;\
      light = (gl_ModelViewMatrix * vec4(lightDir, 0.0)).xyz;\
      color = gl_Color.rgb;\
      normal = gl_NormalMatrix * gl_Normal;\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ", "\
    varying vec3 color;\
    varying vec3 normal;\
    varying vec3 light;\
    void main() {\
      vec3 n = normalize(normal);\
      float diffuse = max(0.0, dot(light, n));\
      float specular = pow(max(0.0, -reflect(light, n).z), 32.0) * sqrt(diffuse);\
      gl_FragColor = vec4(mix(color * (0.3 + 0.7 * diffuse), vec3(1.0), specular), 1.0);\
    }\
  ");

    }
}