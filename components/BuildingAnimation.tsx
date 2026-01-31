'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function BuildingBlocks() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const blocks: THREE.Mesh[] = [];
    const targetRotations: number[] = [];

    // Create building blocks
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.BoxGeometry(0.4, Math.random() * 0.8 + 0.4, 0.4);
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? '#000000' : '#ffffff',
        wireframe: i % 2 === 0,
      });
      const mesh = new THREE.Mesh(geometry, material);

      const angle = (i / 12) * Math.PI * 2;
      const radius = 1.5;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1,
        Math.sin(angle) * radius
      );

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      groupRef.current.add(mesh);
      blocks.push(mesh);
      targetRotations.push(Math.random() * Math.PI * 2);
    }

    let time = 0;
    const animate = () => {
      time += 0.01;
      blocks.forEach((block, i) => {
        block.rotation.x += (targetRotations[i] - block.rotation.x) * 0.02;
        block.rotation.y += 0.002;
        block.position.y = Math.sin(time + i * 0.3) * 0.3;
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <group ref={groupRef}>
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <ambientLight intensity={0.5} />
    </group>
  );
}

export function BuildingAnimation() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <color attach="background" args={['#ffffff']} />
      <BuildingBlocks />
    </Canvas>
  );
}
