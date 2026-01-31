'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PipelineNode {
    name: string;
    description: string;
    color?: string;
}

interface SystemPipelineProps {
    stages: PipelineNode[];
    particleColor?: string;
}

function Node({ position, data, index }: { position: [number, number, number]; data: PipelineNode; index: number }) {
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Node Mesh */}
                <mesh>
                    <boxGeometry args={[1.2, 0.8, 0.8]} />
                    <meshStandardMaterial
                        color="#18181b" // zinc-900
                        emissive={data.color || "#3b82f6"} // blue or custom
                        emissiveIntensity={0.5}
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Wireframe overlay for tech look */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(1.2, 0.8, 0.8)]} />
                    <lineBasicMaterial color={data.color || "#3b82f6"} opacity={0.5} transparent />
                </lineSegments>

                {/* Label */}
                <group position={[0, 0.8, 0]}>
                    <Text
                        fontSize={0.25}
                        color="white"
                        anchorX="center"
                        anchorY="bottom"
                        outlineWidth={0.02}
                        outlineColor="#000"
                    >
                        {data.name}
                    </Text>
                </group>

                {/* Description Popup (HTML overlay) */}
                <Html distanceFactor={10} position={[0, -0.8, 0]} className="pointer-events-none select-none">
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {data.description}
                    </div>
                </Html>
            </Float>
        </group>
    );
}

function Connection({ start, end, particleColor = "#4ade80" }: { start: THREE.Vector3; end: THREE.Vector3; particleColor?: string }) {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            start,
            start.clone().add(new THREE.Vector3(1, 0, 0)), // Control point out
            end.clone().add(new THREE.Vector3(-1, 0, 0)), // Control point in
            end
        ]);
    }, [start, end]);

    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const instances = 20;

    useFrame((state) => {
        if (!particlesRef.current) return;
        const time = state.clock.elapsedTime;

        // Update particles moving along the curve
        const dummy = new THREE.Object3D();
        for (let i = 0; i < instances; i++) {
            const t = (time * 0.5 + i / instances) % 1;
            const pos = curve.getPoint(t);
            dummy.position.copy(pos);
            const scale = 0.08 * Math.sin(t * Math.PI); // Pulse size
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            particlesRef.current.setMatrixAt(i, dummy.matrix);
        }
        particlesRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            {/* Static Tube - Faint */}
            <mesh>
                <tubeGeometry args={[curve, 32, 0.02, 8, false]} />
                <meshBasicMaterial color={particleColor} transparent opacity={0.1} />
            </mesh>

            {/* Moving Particles */}
            <instancedMesh ref={particlesRef} args={[undefined, undefined, instances]}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshBasicMaterial color={particleColor} toneMapped={false} />
            </instancedMesh>
        </group>
    );
}

export function SystemPipeline({ stages, particleColor = "#22c55e" }: SystemPipelineProps) {
    const spacing = 3.5;
    const positions = useMemo(() => {
        const startX = -((stages.length - 1) * spacing) / 2;
        return stages.map((_, i) => new THREE.Vector3(startX + i * spacing, 0, 0));
    }, [stages]);

    return (
        <group rotation={[0.2, -0.2, 0]}>
            {stages.map((stage, i) => (
                <group key={i}>
                    <Node position={[positions[i].x, positions[i].y, positions[i].z]} data={stage} index={i} />
                    {i < stages.length - 1 && (
                        <Connection
                            start={positions[i].clone().add(new THREE.Vector3(0.6, 0, 0))} // Right edge of current
                            end={positions[i + 1].clone().add(new THREE.Vector3(-0.6, 0, 0))} // Left edge of next
                            particleColor={particleColor}
                        />
                    )}
                </group>
            ))}

            <ambientLight intensity={0.5} />
            <pointLight position={[5, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-5, -10, 5]} intensity={1} color="#3b82f6" />
        </group>
    );
}
