import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ----- GPU-Accelerated Particle Field (Single Draw Call) ----- */
function ParticleField({ count = 160 }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorAccent = new THREE.Color('#c4f042')
    const colorCool = new THREE.Color('#4a9eff')

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4

      const isCool = Math.random() > 0.82
      const c = isCool ? colorCool : colorAccent
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const ptr = state.pointer
    pointsRef.current.rotation.y = t * 0.012 + ptr.x * 0.06
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.04 + ptr.y * 0.04
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ----- Optimized Wireframe Floating Shapes ----- */
function FloatingShape({ position, scale, color, geometry, speed = 0.5 }) {
  const meshRef = useRef()
  const initialPos = useMemo(() => [...position], [position])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    const ptr = state.pointer
    meshRef.current.position.y = initialPos[1] + Math.sin(time * speed) * 0.5
    meshRef.current.position.x = initialPos[0] + Math.cos(time * speed * 0.7) * 0.25 + ptr.x * 0.4
    meshRef.current.position.z = initialPos[2] + ptr.y * 0.3
    meshRef.current.rotation.x = time * 0.12 * speed
    meshRef.current.rotation.y = time * 0.08 * speed
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
      {geometry === 'torus' && <torusGeometry args={[1, 0.25, 8, 20]} />}
      {geometry === 'torusKnot' && <torusKnotGeometry args={[0.75, 0.22, 48, 8]} />}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.16}
      />
    </mesh>
  )
}

/* ----- Orbital Rings ----- */
function OrbitalRing({ radius = 5 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.elapsedTime
    const ptr = state.pointer
    ref.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.08) * 0.12 + ptr.y * 0.08
    ref.current.rotation.z = time * 0.04 + ptr.x * 0.08
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.007, 8, 80]} />
      <meshBasicMaterial color="#2a2a2e" transparent opacity={0.4} />
    </mesh>
  )
}

/* ----- Subtle Grid Floor ----- */
function GridPlane() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = -6 + state.pointer.y * 0.2
  })

  return (
    <group ref={ref}>
      <gridHelper args={[40, 24, '#1a1a2e', '#121218']} />
    </group>
  )
}

/* ----- Main 3D Scene Controller ----- */
export default function FloatingScene() {
  const groupRef = useRef()
  const scrollRef = useRef(0)

  useFrame((state) => {
    if (!groupRef.current) return
    const ptr = state.pointer
    const targetScroll = (typeof window !== 'undefined' ? window.scrollY : 0) * 0.001
    
    // Smooth lerp for silky parallax without react re-renders
    scrollRef.current = THREE.MathUtils.lerp(scrollRef.current, targetScroll, 0.06)

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      ptr.x * 0.06,
      0.04
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      ptr.y * 0.04 - scrollRef.current * 0.12,
      0.04
    )
  })

  return (
    <>
      <group ref={groupRef}>
        <ParticleField count={160} />

        <FloatingShape
          position={[-7, 4, -3]}
          scale={1.2}
          color="#c4f042"
          geometry="icosahedron"
          speed={0.3}
        />
        <FloatingShape
          position={[8, -2, -5]}
          scale={0.9}
          color="#4a9eff"
          geometry="octahedron"
          speed={0.4}
        />
        <FloatingShape
          position={[-5, -6, -2]}
          scale={0.7}
          color="#f0c040"
          geometry="tetrahedron"
          speed={0.5}
        />
        <FloatingShape
          position={[6, 6, -4]}
          scale={0.8}
          color="#c4f042"
          geometry="torus"
          speed={0.25}
        />
        <FloatingShape
          position={[0, -10, -6]}
          scale={0.6}
          color="#4a9eff"
          geometry="torusKnot"
          speed={0.35}
        />
        <FloatingShape
          position={[-9, -15, -3]}
          scale={1.0}
          color="#f0c040"
          geometry="icosahedron"
          speed={0.28}
        />

        <OrbitalRing radius={6} />
        <OrbitalRing radius={9.5} />

        <GridPlane />
      </group>

      <fog attach="fog" args={['#0a0a0b', 8, 32]} />
    </>
  )
}
