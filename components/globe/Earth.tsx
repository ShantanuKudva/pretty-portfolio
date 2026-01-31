'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

interface EarthProps {
    showClouds?: boolean;
}

// Night shader - Fragment
const nightFragmentShader = `
  uniform sampler2D nightTexture;
  uniform vec3 sunDirection;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  
  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 L = normalize(sunDirection);
    
    float sunDot = dot(N, L); 
    
    // SMOOTHER transition - wider twilight zone
    float darkness = clamp(-sunDot, 0.0, 1.0);
    
    // Core night ramps in gradually between -0.2 and 0.2
    float nightCore = smoothstep(-0.2, 0.2, sunDot);
    nightCore = 1.0 - nightCore; // Invert so 1 = night, 0 = day
    
    // Twilight boost for gradual fade
    float twilightBoost = smoothstep(-0.1, 0.1, sunDot);
    twilightBoost = (1.0 - twilightBoost) * 0.3;
    
    float nightMask = clamp(nightCore + twilightBoost, 0.0, 1.0);
    
    // Smooth depth factor
    float depthFactor = 1.0 + clamp(darkness * 0.25, 0.0, 0.25);
    
    // Sample and boost city lights
    vec3 cityLights = texture2D(nightTexture, vUv).rgb;
    cityLights = max(cityLights - vec3(0.05), 0.0);
    
    vec3 finalColor = cityLights * nightMask * depthFactor;
    finalColor = pow(finalColor, vec3(0.9)); // Slight gamma correction
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Night shader - Vertex
const nightVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    // World-space normal (accounting for globe rotation, but stable)
    vec4 worldNormal = modelMatrix * vec4(normal, 0.0);
    vWorldNormal = normalize(worldNormal.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function Earth({ showClouds = true }: EarthProps) {
    const cloudsRef = useRef<THREE.Mesh>(null);
    const shaderRef = useRef<THREE.ShaderMaterial>(null);
    const sunDirectionRef = useRef(new THREE.Vector3(1, 0.5, 1).normalize());
    const sunLightRef = useRef<THREE.DirectionalLight>(null);

    // Load textures directly
    const [dayTexture, nightTexture, cloudsTexture] = useTexture([
        '/earth-day.jpg',
        '/earth-night.jpg',
        '/earth-clouds.jpg',
    ]);

    useFrame((state, delta) => {
        // Rotate clouds slowly
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.002;
        }

        // Update shader uniform
        if (shaderRef.current) {
            shaderRef.current.uniforms.sunDirection.value.copy(sunDirectionRef.current);
        }
    });

    return (
        <group>
            {/* Lighting */}
            <directionalLight ref={sunLightRef} position={[10, 5, 10]} intensity={2.2} color="#ffffff" />
            <ambientLight intensity={0.3} color="#4a5568" />

            {/* Day Earth (base layer) */}
            <mesh>
                <sphereGeometry args={[2, 128, 64]} />
                <meshPhongMaterial
                    map={dayTexture}
                    shininess={5}
                    specular={new THREE.Color(0x222222)}
                    polygonOffset
                    polygonOffsetFactor={1}
                    polygonOffsetUnits={1}
                />
            </mesh>

            {/* Night Earth (city lights layer with shader) */}
            <mesh>
                <sphereGeometry args={[2.002, 128, 64]} />
                <shaderMaterial
                    ref={shaderRef}
                    fragmentShader={nightFragmentShader}
                    vertexShader={nightVertexShader}
                    uniforms={{
                        nightTexture: { value: nightTexture },
                        sunDirection: { value: sunDirectionRef.current },
                    }}
                    transparent
                    depthWrite={false}
                    depthTest={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Clouds layer */}
            {showClouds && (
                <mesh ref={cloudsRef}>
                    <sphereGeometry args={[2.005, 64, 32]} />
                    <meshLambertMaterial
                        map={cloudsTexture}
                        transparent
                        opacity={0.3}
                        depthWrite={false}
                        alphaTest={0.1}
                    />
                </mesh>
            )}

            {/* Atmosphere glow */}
            <mesh scale={[1.08, 1.08, 1.08]}>
                <sphereGeometry args={[2, 32, 16]} />
                <meshBasicMaterial
                    color="#4a9eff"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}
