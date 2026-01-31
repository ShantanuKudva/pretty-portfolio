'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect, memo, ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree, ThreeElements } from '@react-three/fiber';
import {
    useFBO,
    useScroll,
    Image,
    Scroll,
    Preload,
    ScrollControls,
    MeshTransmissionMaterial,
    Text,
    RoundedBox
} from '@react-three/drei';
import { easing } from 'maath';
import { useRouter } from 'next/navigation';

interface NavItem {
    label: string;
    link: string;
    isLogo?: boolean;
}

interface FluidGlassProps {
    mode?: 'bar';
    barProps?: Record<string, any>;
    navItems?: NavItem[];
}

export default function FluidGlass({
    mode = 'bar',
    barProps = {},
    navItems = []
}: FluidGlassProps) {
    return (
        <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
            <ScrollControls damping={0.2} pages={1} distance={0.4}>
                <NavItems items={navItems} />
                <Bar modeProps={barProps}>
                    {/* Background Content for Refraction (Optional) */}
                    <Scroll>
                        {/* We can put subtle content here to be refracted, or leave empty if we just want glass */}
                        <Typography />
                    </Scroll>
                </Bar>
            </ScrollControls>
        </Canvas>
    );
}

const ModeWrapper = memo(function ModeWrapper({
    children,
    geometryComponent: Geometry,
    geometryArgs,
    lockToTop = false,
    modeProps = {},
    ...props
}: any) {
    const ref = useRef<THREE.Mesh>(null!);
    const buffer = useFBO();
    const { viewport: vp } = useThree();
    const [scene] = useState<THREE.Scene>(() => new THREE.Scene());

    // Ref for the geometry to measure it if needed, but for RoundedBox we roughly know dimensions
    // We'll trust the scale logic or args
    const widthScalar = 1;

    useFrame((state, delta) => {
        const { gl, viewport, pointer, camera } = state;
        const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

        // Positioning
        const lock = lockToTop;
        const destY = lock ? v.height / 2 - 1.5 : 0;

        // We disable pointer following for the bar mode usually to keep it stable
        const destX = 0;

        easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

        // Store current Y for NavItems (hacky but works if NavItems mimics logic)
        // Better: Allow NavItems to accept props or standard position

        // Scaling
        // If not manually scaled, we can adapt. 
        // ReactBits demo used automatic scaling based on viewport.
        // For our navbar, we might want a fixed width relative to viewport.
        if (modeProps.scale == null) {
            // Default auto-scale logic if needed
            // ref.current.scale.setScalar(0.15);
        }
        // If modeProps.scale IS provided (user asked for 0.15), usage below handles it in <mesh scale={...}>

        gl.setRenderTarget(buffer);
        gl.render(scene, camera);
        gl.setRenderTarget(null);
    });

    const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

    return (
        <>
            {createPortal(children, scene)}
            {/* Background plane for the Portal scene */}
            <mesh scale={[vp.width, vp.height, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
                {/* Opacity 0 basically hides the background source, showing only refraction? 
            ReactBits had this transparent. Let's keep it but maybe we don't need it visible. */}
            </mesh>

            <mesh
                ref={ref}
                scale={scale ?? 0.15}
                {...props}
            >
                <Geometry args={geometryArgs} radius={0.25} smoothness={4} />
                <MeshTransmissionMaterial
                    buffer={buffer.texture}
                    ior={ior ?? 1.15}
                    thickness={thickness ?? 5}
                    anisotropy={anisotropy ?? 0.01}
                    chromaticAberration={chromaticAberration ?? 0.1}
                    {...extraMat}
                />
            </mesh>
        </>
    );
});


function Bar({ modeProps = {}, ...p }: any) {
    const defaultMat = {
        transmission: 1,
        roughness: 0,
        thickness: 10,
        ior: 1.15,
        color: '#ffffff',
        attenuationColor: '#ffffff',
        attenuationDistance: 0.25
    };

    return (
        <ModeWrapper
            geometryComponent={RoundedBox}
            geometryArgs={[80, 10, 4]} // Large args, scaled down by 0.15 => 12 x 1.5 x 0.6 units
            lockToTop={modeProps.lockToTop ?? true}
            modeProps={{ ...defaultMat, ...modeProps }}
            {...p}
        />
    );
}

function NavItems({ items, lockToTop = true }: { items: NavItem[], lockToTop?: boolean }) {
    const group = useRef<THREE.Group>(null!);
    const { viewport, camera } = useThree();
    const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const router = useRouter();

    useEffect(() => {
        const onResize = () => {
            const w = window.innerWidth;
            setDevice(w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop');
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const spacing = device === 'mobile' ? 0.35 : device === 'tablet' ? 0.4 : 0.55;
    // Adjusted spacing for our content

    const fontSize = device === 'mobile' ? 0.15 : 0.2;

    useFrame(() => {
        if (!group.current) return;
        const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
        // Sync Y with Bar logic
        const yPos = lockToTop ? v.height / 2 - 1.5 : 0;
        group.current.position.set(0, yPos, 15.2);

        // Center alignment logic changes based on items count
        group.current.children.forEach((child, i) => {
            // Simple linear layout
            const offset = (i - (items.length - 1) / 2) * spacing * 4; // Scale spacing
            child.position.x = offset;
        });
    });

    return (
        <group ref={group}>
            {items.map(({ label, link, isLogo }) => (
                <Text
                    key={label}
                    fontSize={isLogo ? fontSize * 1.3 : fontSize}
                    font={isLogo ? "/fonts/InstrumentSerif-Regular.ttf" : undefined} // Use custom font if available, else default
                    fontWeight={isLogo ? 800 : 400}
                    letterSpacing={isLogo ? -0.05 : 0}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    onClick={() => {
                        if (link.startsWith('#')) {
                            const el = document.querySelector(link);
                            el?.scrollIntoView({ behavior: 'smooth' });
                        } else if (link.startsWith('http')) {
                            window.open(link, '_blank');
                        } else {
                            router.push(link);
                        }
                    }}
                    onPointerOver={(e) => { document.body.style.cursor = 'pointer'; (e.object as any).color.set('#38bdf8'); }}
                    onPointerOut={(e) => { document.body.style.cursor = 'auto'; (e.object as any).color.set('white'); }}
                >
                    {label}
                </Text>
            ))}
        </group>
    );
}

function Typography() {
    // Hidden content for subtle refraction
    return (
        <Text position={[0, 0, -2]} fontSize={4} color="#38bdf8" anchorX="center" anchorY="middle" fillOpacity={0.1}>
            PORTFOLIO
        </Text>
    );
}
