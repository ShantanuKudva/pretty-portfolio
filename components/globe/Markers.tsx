'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { visualizationEngine } from './VisualizationEngine';
import type { GeoDataPoint } from './types';

interface MarkersProps {
    points: GeoDataPoint[];
    onMarkerClick?: (point: GeoDataPoint) => void;
}

export function Markers({ points, onMarkerClick }: MarkersProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const hoverRef = useRef<number | null>(null);

    // Prepare data for instanced mesh
    const { matrices, colors } = useMemo(() => {
        const matrices: THREE.Matrix4[] = [];
        const colors: number[] = [];
        const tempMatrix = new THREE.Matrix4();
        const tempColor = new THREE.Color();

        points.forEach((point) => {
            // Position
            const pos = visualizationEngine.getMarkerPosition(point, 0.04);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                pos.clone().normalize()
            );

            // Scale based on type
            const scale = point.metadata?.type === 'threat' ? 0.06 : 0.03;
            tempMatrix.compose(pos, quaternion, new THREE.Vector3(scale, scale, scale));
            matrices.push(tempMatrix.clone());

            // Color based on type
            if (point.metadata?.type === 'threat') {
                tempColor.set('#f43f5e'); // Rose-500 (Modern Red)
            } else {
                tempColor.set('#0ea5e9'); // Sky-500 (Cyber Blue)
            }
            colors.push(tempColor.r, tempColor.g, tempColor.b);
        });

        return { matrices, colors };
    }, [points]);

    // Update instance matrices and colors
    useFrame(() => {
        if (!meshRef.current) return;

        matrices.forEach((matrix, i) => {
            meshRef.current!.setMatrixAt(i, matrix);
        });

        const colorAttribute = meshRef.current.geometry.getAttribute('color') as THREE.InstancedBufferAttribute;
        if (colorAttribute) {
            // We're using instanceColor instead of a custom attribute for standard materials
            // But standard InstancedMesh uses .setColorAt
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    // Since we computed colors once, let's just set them initially
    // Actually, for interaction (hover), we might need dynamic updates, but let's stick to click first.

    const meshColors = useMemo(() => new Float32Array(colors), [colors]);

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, points.length]}
            frustumCulled={false}
            onClick={(e) => {
                e.stopPropagation();
                const index = e.instanceId;
                if (index !== undefined && onMarkerClick) {
                    console.log('Marker clicked:', index, points[index]);
                    onMarkerClick(points[index]);
                }
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
                if (e.instanceId !== undefined) {
                    hoverRef.current = e.instanceId;
                }
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'auto';
                hoverRef.current = null;
            }}
        >
            <sphereGeometry args={[1.5, 16, 16]}>
                <instancedBufferAttribute
                    attach="attributes-color"
                    args={[meshColors, 3]}
                />
            </sphereGeometry>
            <meshStandardMaterial
                vertexColors
                toneMapped={false}
                emissive="#ffffff"
                emissiveIntensity={0.5}
            />
        </instancedMesh>
    );
}
