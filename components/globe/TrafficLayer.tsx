'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { visualizationEngine } from './VisualizationEngine';
import type { GeoDataPoint } from './types';

interface TrafficLayerProps {
    flows: GeoDataPoint[];
    animated?: boolean;
}

const VERTEX_SHADER = `
  attribute float percent;
  attribute vec3 color;
  varying float vPercent;
  varying vec3 vColor;
  
  void main() {
    vPercent = percent;
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform float time;
  varying float vPercent;
  varying vec3 vColor;
  
  void main() {
    // Animation speed - Slower for organic feel
    float speed = 0.5;
    float offset = time * speed;

    // Dash pattern - Thicker, more prominent
    float dashSize = 0.4;
    float gapSize = 0.3;
    float cycle = dashSize + gapSize;
    
    // Calculate position in cycle
    float dist = mod(vPercent - offset, cycle);
    
    // Opacity based on dash
    float opacity = 0.0; // Default base opacity
    
    // Add a base visibility so lines are always faintly visible
    float baseVisibility = 0.4;

    if (dist < dashSize) {
      // Sharper edges for more technical look
      float d = dist / dashSize;
      opacity = 1.0; // Max opacity for the dash itself
    } else {
       opacity = baseVisibility;
    }
    
    // Fade out entire line at ends
    opacity *= smoothstep(0.0, 0.1, vPercent) * smoothstep(1.0, 0.9, vPercent);
    
    if (opacity < 0.1) discard;
    
    gl_FragColor = vec4(vColor, opacity);
  }
`;

// Helper to get color based on protocol
function getFlowColor(flow: GeoDataPoint): THREE.Color {
    const protocol = (flow.metadata?.protocol as string)?.toUpperCase() || '';

    if (protocol === 'HTTP' || protocol === 'HTTPS') return new THREE.Color('#38bdf8'); // Sky blue (brighter cyan)
    if (protocol === 'SSH' || protocol === 'SSL') return new THREE.Color('#4ade80');    // bright green

    return new THREE.Color('#FFFFFF'); // White
}

export function TrafficLayer({ flows, animated = true }: TrafficLayerProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Generate geometry once when flows change
    const geometry = useMemo(() => {
        if (flows.length === 0) return null;

        const points: number[] = [];
        const percents: number[] = [];
        const colors: number[] = [];
        const indices: number[] = [];

        let indexOffset = 0;
        const segmentsPerArc = 30; // Reduced segments for performance

        flows.forEach(flow => {
            if (!flow.destination) return;

            const color = getFlowColor(flow);
            const arcPoints = visualizationEngine.createArcPoints(
                { lat: flow.lat, long: flow.long },
                { lat: flow.destination.lat, long: flow.destination.long },
                segmentsPerArc,
                0.4 // Increased arc height to prevent clipping through globe
            );

            // Add vertices and attributes
            arcPoints.forEach((p, i) => {
                points.push(p.x, p.y, p.z);
                percents.push(i / (arcPoints.length - 1));
                colors.push(color.r, color.g, color.b);
            });

            // Create line segments indices
            for (let i = 0; i < arcPoints.length - 1; i++) {
                indices.push(indexOffset + i, indexOffset + i + 1);
            }

            indexOffset += arcPoints.length;
        });

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        geo.setAttribute('percent', new THREE.Float32BufferAttribute(percents, 1));
        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geo.setIndex(indices);

        return geo;
    }, [flows]);

    useFrame((state) => {
        if (materialRef.current && animated) {
            materialRef.current.uniforms.time.value = state.clock.elapsedTime;
        }
    });

    const uniforms = useMemo(() => ({
        time: { value: 0 }
    }), []);

    if (!geometry) return null;

    return (
        <lineSegments geometry={geometry}>
            <shaderMaterial
                ref={materialRef}
                vertexShader={VERTEX_SHADER}
                fragmentShader={FRAGMENT_SHADER}
                transparent
                depthTest={true}
                depthWrite={false}
                uniforms={uniforms}
            />
        </lineSegments>
    );
}
