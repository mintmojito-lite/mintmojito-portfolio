"use client";
/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
    useFBO,
    useScroll,
    Image,
    Scroll,
    Preload,
    ScrollControls,
    MeshTransmissionMaterial,
    Text
} from '@react-three/drei';
import { easing } from 'maath';

interface ModeProps {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: any;
}

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }: { mode?: 'lens' | 'cube' | 'bar', lensProps?: any, barProps?: any, cubeProps?: any }) {
    const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
    const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

    // We are not using navItems inside the canvas anymore as we have a sidebar
    // But we keep the structure for compatibility if needed.
    const { ...modeProps } = rawOverrides;

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }} style={{ pointerEvents: 'auto' }}>
                <ScrollControls damping={0.2} pages={1} distance={0.4}>
                    <Wrapper modeProps={modeProps}>
                        <Scroll>
                            {/* Visual Content behind the glass */}
                            <Typography />
                            {/* <Images /> User didn't ask for images, just the effect. keeping it clean. */}
                        </Scroll>
                        {/* <Scroll html /> */}
                        <Preload />
                    </Wrapper>
                </ScrollControls>
            </Canvas>
        </div>
    );
}

const ModeWrapper = memo(function ModeWrapper({
    children,
    geometryType = 'torus', // Default primitive
    lockToBottom = false,
    followPointer = true,
    modeProps = {},
    ...props
}: any) {
    const ref = useRef<THREE.Mesh>(null);
    const buffer = useFBO();
    const { viewport: vp } = useThree();
    const [scene] = useState(() => new THREE.Scene());

    useFrame((state, delta) => {
        const { gl, viewport, pointer, camera } = state;
        const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

        const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
        const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;

        if (ref.current) {
            easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);
            // Rotate the mesh for some life
            ref.current.rotation.x += delta * 0.5;
            ref.current.rotation.y += delta * 0.2;
        }

        gl.setRenderTarget(buffer);
        gl.render(scene, camera);
        gl.setRenderTarget(null);

        // Clear Background for transparency
        gl.setClearColor(0x000000, 0);
    });

    const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

    return (
        <>
            {createPortal(children, scene)}
            {/* Background Plane reflecting the portal content */}
            <mesh scale={[vp.width, vp.height, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
            </mesh>

            {/* The Glass Object */}
            <mesh ref={ref} scale={scale ?? 1.5} {...props}>
                {geometryType === 'torus' && <torusGeometry args={[1, 0.4, 32, 64]} />}
                {geometryType === 'cube' && <boxGeometry args={[2, 2, 2]} />}
                {geometryType === 'bar' && <capsuleGeometry args={[1, 4, 8, 16]} />}

                <MeshTransmissionMaterial
                    buffer={buffer.texture}
                    ior={ior ?? 1.2}
                    thickness={thickness ?? 1.5}
                    anisotropy={anisotropy ?? 0.2}
                    chromaticAberration={chromaticAberration ?? 0.05}
                    {...extraMat}
                />
            </mesh>
        </>
    );
});

function Lens({ modeProps, ...p }: any) {
    return <ModeWrapper geometryType="torus" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: any) {
    return <ModeWrapper geometryType="cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: any) {
    return (
        <ModeWrapper
            geometryType="bar"
            lockToBottom={false} // Let it float
            followPointer={true}
            modeProps={{ ...modeProps }}
            {...p}
        />
    );
}

function Typography() {
    const { width, height } = useThree((state) => state.viewport);

    return (
        <group>
            {/* Abstract shapes to be distorted */}
            <mesh position={[-width / 4, height / 4, 0]}>
                <dodecahedronGeometry args={[1]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} />
            </mesh>
            <mesh position={[width / 4, -height / 4, -2]}>
                <octahedronGeometry args={[1.5]} />
                <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
            </mesh>
        </group>
    );
}
