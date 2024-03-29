import * as THREE from "three";
import { Resize, Center } from "@react-three/drei"
import { useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import createTubeGeometry from "./createTubeGeometry";

import { randomFloat } from "./lib/random";
import CurveMesh from "./CurveMesh";
import glsl from "glslify";

const totalMeshes = 80;
const numSides = 8;
const subdivisions = 200;
const isSquare = false;

const mat = {
  side: THREE.DoubleSide,
  defines: {
    lengthSegments: subdivisions.toFixed(1),
    ROBUST: false,
    ROBUST_NORMALS: true, // can be disabled for a slight optimization
    FLAT_SHADED: isSquare
  },
  glslVersion: THREE.GLSL3
};

const tubeData = createTubeGeometry(numSides, subdivisions);
const data = {
  uniforms: {
    Ka: { value: new THREE.Vector3(1, 1, 1) },
    Kd: { value: new THREE.Vector3(1, 1, 1) },
    Ks: { value: new THREE.Vector3(1, 1, 1) },
    LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
    LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
    Shininess: { value: 200.0 },
    time: { value: 0 },
    thickness: { value: 1000 },
    color: { value: new THREE.Color("#5674b3") },
    animateRadius: { value: 0 },
    animateStrength: { value: 0 },
    index: { value: 0 },
    totalMeshes: { value: totalMeshes },
    radialSegments: { value: numSides },
    vibration: {value: 0},
    opacity: {value: 1}
  },
  ...mat,
  fragmentShader: `
  precision highp float;

  in vec3 vNormal;
  in vec2 vUv;
  in vec3 vViewPosition;
  out vec4 outColor;
  
  uniform vec3 color;
  uniform float opacity;
  uniform float animateRadius;
  uniform float animateStrength;
        
  void main () {
    // handle flat and smooth normals
    vec3 normal = vNormal;
  
    // Z-normal "fake" shading
    float diffuse = normal.z * 0.5 + 0.5;
  
    // add some "rim lighting"
    vec3 V = normalize(vViewPosition);
    float vDotN = 1.0 - max(dot(V, normal), 0.0);
    float rim = smoothstep(0.5, 1.0, vDotN);
    diffuse += rim * 2.0;
  
    // we'll animate in the new color from t.,he center point
    float distFromCenter = clamp(length(vViewPosition) / 5.0, 0.0, 1.0);
    float edge = 0.05;
    float t = animateRadius;
    vec3 curColor = mix(color, vec3(1.), smoothstep(t - edge, t + edge, vUv.y) * animateStrength);
  
    // final color
    outColor = vec4(diffuse * curColor, opacity);
  }`,
  vertexShader: glsl`
  // attributes of our mesh
  in float position;
  in float angle;
  in vec2 uv;
  
  // built-in uniforms from ThreeJS camera and Object3D
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform mat3 normalMatrix;
  
  // custom uniforms to build up our tubes
  uniform float thickness;
  uniform float time;
  uniform float animateRadius;
  uniform float animateStrength;
  uniform float index;
  uniform float radialSegments;
  uniform float vibration;
  
  // pass a few things along to the vertex shader
  out vec2 vUv;
  out vec3 vViewPosition;
  out vec3 vNormal;
  
  // Import a couple utilities
  float PI = 3.14159265359;
  //#pragma glslify: ease = require('glsl-easings/exponential-in-out');
  
  // Some constants for the robust version
  #ifdef ROBUST
    const float MAX_NUMBER = 1.79769313e+308;
    const float EPSILON = 1.19209290e-7;
  #endif
  
  // Angles to spherical coordinates
  vec3 spherical (float r, float phi, float theta) {
    return r * vec3(
      cos(phi) * cos(theta),
      cos(phi) * sin(theta),
      sin(phi)
    );
  }
  
  // Flying a curve along a sine wave
  // vec3 sample (float t) {
  //   float x = t * 2.0 - 1.0;
  //   float y = sin(t + time);
  //   return vec3(x, y, 0.0);
  // }
  
  // Creates an animated torus knot
  vec3 testSample (float t) {
    float beta = t * PI;
    
    float ripple = sin(t * 2.0 * PI + time ) * 0.5 + 0.5 * 0.5;
    float noise = time + index * ripple * 8.0;
    
    // animate radius on click
    float radiusAnimation = animateRadius * animateStrength * 0.25;
    float r = sin(index * 0.75 + beta * 2.0) * (0.75 + radiusAnimation);
    float theta = 4.0 * beta + index * 0.25;
    float phi = sin(index * 2.0 + beta * 8.0 + noise);
  
    return spherical(r, phi, theta);
  }
  
  #ifdef ROBUST
  // ------
  // Robust handling of Frenet-Serret frames with Parallel Transport
  // ------
  vec3 getTangent (vec3 a, vec3 b) {
    return normalize(b - a);
  }
  
  void rotateByAxisAngle (inout vec3 normal, vec3 axis, float angle) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
    // assumes axis is normalized
    float halfAngle = angle / 2.0;
    float s = sin(halfAngle);
    vec4 quat = vec4(axis * s, cos(halfAngle));
    normal = normal + 2.0 * cross(quat.xyz, cross(quat.xyz, normal) + quat.w * normal);
  }
  
  void createTube (float t, vec2 volume, out vec3 outPosition, out vec3 outNormal) {
    // Reference:
    // https://github.com/mrdoob/three.js/blob/b07565918713771e77b8701105f2645b1e5009a7/src/extras/core/Curve.js#L268
    float nextT = t + (1.0 / lengthSegments);
  
    // find first tangent
    vec3 point0 = testSample(0.0);
    vec3 point1 = testSample(1.0 / lengthSegments);
  
    vec3 lastTangent = getTangent(point0, point1);
    vec3 absTangent = abs(lastTangent);
    #ifdef ROBUST_NORMAL
      float min = MAX_NUMBER;
      vec3 tmpNormal = vec3(0.0);
      if (absTangent.x <= min) {
        min = absTangent.x;
        tmpNormal.x = 1.0;
      }
      if (absTangent.y <= min) {
        min = absTangent.y;
        tmpNormal.y = 1.0;
      }
      if (absTangent.z <= min) {
        tmpNormal.z = 1.0;
      }
    #else
      vec3 tmpNormal = vec3(1.0, 0.0, 0.0);
    #endif
    vec3 tmpVec = normalize(cross(lastTangent, tmpNormal));
    vec3 lastNormal = cross(lastTangent, tmpVec);
    vec3 lastBinormal = cross(lastTangent, lastNormal);
    vec3 lastPoint = point0;
  
    vec3 normal;
    vec3 tangent;
    vec3 binormal;
    vec3 point;
    float maxLen = (lengthSegments - 1.0);
    float epSq = EPSILON * EPSILON;
    for (float i = 1.0; i < lengthSegments; i += 1.0) {
      float u = i / maxLen;
      // could avoid additional sample here at expense of ternary
      // point = i == 1.0 ? point1 : sample(u);
      point = testSample(u);
      tangent = getTangent(lastPoint, point);
      normal = lastNormal;
      binormal = lastBinormal;
  
      tmpVec = cross(lastTangent, tangent);
      if ((tmpVec.x * tmpVec.x + tmpVec.y * tmpVec.y + tmpVec.z * tmpVec.z) > epSq) {
        tmpVec = normalize(tmpVec);
        float tangentDot = dot(lastTangent, tangent);
        float theta = acos(clamp(tangentDot, -1.0, 1.0)); // clamp for floating pt errors
        rotateByAxisAngle(normal, tmpVec, theta);
      }
  
      binormal = cross(tangent, normal);
      if (u >= t) break;
  
      lastPoint = point;
      lastTangent = tangent;
      lastNormal = normal;
      lastBinormal = binormal;
    }
  
    // extrude outward to create a tube
    float tubeAngle = angle;
    float circX = cos(tubeAngle);
    float circY = sin(tubeAngle);
  
    // compute the TBN matrix
    vec3 T = tangent;
    vec3 B = binormal;
    vec3 N = -binormal;
  
    // extrude the path & create a new normal
    outNormal.xyz = normalize(B * circX + N * circY);
    outPosition.xyz = point + B * volume.x * circX + N * volume.y * circY;
  }
  #else
  // ------
  // Fast version; computes the local Frenet-Serret frame
  // ------
  void createTube (float t, vec2 volume, out vec3 offset, out vec3 normal) {
    // find next sample along curve
    float nextT = t + (1.0 / lengthSegments);
  
    // sample the curve in two places
    vec3 current = testSample(t- vibration);
    vec3 next = testSample(nextT);
    
    // compute the TBN matrix
    vec3 T = normalize(next - current );
    vec3 B = normalize(cross(T, next + current ));
    vec3 N = -normalize(cross(B, T));
  
    // extrude outward to create a tube
    float tubeAngle = angle;
    float circX = cos(tubeAngle);
    float circY = sin(tubeAngle);
  
    // compute position and normal
    normal.xyz = normalize(B * circX + N * circY);
    offset.xyz = current + B* volume.x * circX + N * volume.y* circY;
  }
  #endif
  
  void main() {
    // current position to sample at
    // [-0.5 .. 0.5] to [0.0 .. 1.0]
    float t = (position* 2.0) * 0.5 + 0.5;
  
    // build our tube geometry
    vec2 volume = vec2(thickness );
  
    // animate the per-vertex curve thickness
    float volumeAngle = t * lengthSegments * 0.5 + index * 20.0 + time * 2.5;
    float volumeMod = sin(volumeAngle) * 0.5 + 0.5;
    volume += 0.0001 * volumeMod;
  
    // build our geometry
    vec3 transformed;
    vec3 objectNormal;
    createTube(t, volume, transformed, objectNormal);
  
    // pass the normal and UV along
    vec3 transformedNormal = normalMatrix * objectNormal;
    vNormal = normalize(transformedNormal);
    vUv = uv.yx; // swizzle this to match expectations
  
    // project our vertex position
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }`
};

const ShapingCurves = (props) => {
  const meshRef = useRef();

  const material = useMemo(() => {
    const m = new THREE.RawShaderMaterial();
    m.side = data.side;
    m.defines = data.defines;
    m.glslVersion = data.glslVersion;
    m.fragmentShader = data.fragmentShader;
    m.vertexShader = data.vertexShader;
    m.key = THREE.MathUtils.generateUUID();
    m.uniformsNeedUpdate = true;
    return m;
  }, []);

  return (
    <object3D ref={meshRef} scale={props.scale}>
      {[...Array(totalMeshes).keys()].map((_, i) => {
        const t = totalMeshes <= 1 ? 0 : i / (totalMeshes - 1);
        const m = material.clone();
        m.transparent = true;
        m.uniforms = THREE.UniformsUtils.clone(data.uniforms);
        m.uniforms.index.value = t;
        m.uniforms.thickness.value = randomFloat(0.005, 0.0075);
        return <CurveMesh key={i} material={m} tubeData={tubeData} channelDataAmp={props.channelDataCentroid} channelDataCentroid={props.channelDataAmp} loadTime={props.loadTime}/>;
      })}
    </object3D>
  );
};

export default function House(props) {
  const viewport = useThree((state) => state.viewport)

  return (
      <ShapingCurves props={props}/>
  )
}