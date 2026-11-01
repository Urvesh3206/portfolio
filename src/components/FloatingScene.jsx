import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ----- Floating Particle Field ----- */
function ParticleField({ count = 200, mouse }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 20 - 5,
        ],
        scale: Math.random() * 0.04 + 0.01,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
        floatAmplitude: Math.random() * 0.5 + 0.2,
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    particles.forEach((p, i) => {
      const floatY = Math.sin(time * p.speed + p.offset) * p.floatAmplitude
      const floatX = Math.cos(time * p.speed * 0.7 + p.offset) * p.floatAmplitude * 0.3
      
      dummy.position.set(
        p.position[0] + floatX + mouse.x * 0.3,
        p.position[1] + floatY + mouse.y * 0.2,
        p.position[2]
      )
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#c4f042" transparent opacity={0.4} />
    </instancedMesh>
  )
}

/* ----- Floating Geometric Shapes ----- */
function FloatingShape({ position, rotation, scale, color, geometry, speed = 0.5, mouse }) {
  const meshRef = useRef()
  const initialPos = useMemo(() => [...position], [position])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    meshRef.current.position.y = initialPos[1] + Math.sin(time * speed) * 0.6
    meshRef.current.position.x = initialPos[0] + Math.cos(time * speed * 0.7) * 0.3 + mouse.x * 0.5
    meshRef.current.position.z = initialPos[2] + mouse.y * 0.3
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.1 * speed
    meshRef.current.rotation.z = time * 0.08 * speed
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
      {geometry === 'torus' && <torusGeometry args={[1, 0.3, 8, 16]} />}
      {geometry === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

/* ----- Orbital Ring ----- */
function OrbitalRing({ radius = 5, mouse }) {
  const ref = useRef()
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    ref.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.1) * 0.15 + mouse.y * 0.1
    ref.current.rotation.z = time * 0.05 + mouse.x * 0.1
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color="#2a2a2e" transparent opacity={0.5} />
    </mesh>
  )
}

/* ----- Grid Lines ----- */
function GridPlane({ mouse }) {
  const ref = useRef()
  
  useFrame((state) => {
    ref.current.position.y = -6 + mouse.y * 0.3
    ref.current.rotation.x = -Math.PI / 2 + mouse.y * 0.02
  })

  return (
    <group ref={ref}>
      <gridHelper args={[40, 40, '#1a1a2e', '#1a1a2e']} />
    </group>
  )
}

/* ----- Main Scene ----- */
export default function FloatingScene({ mouse, scrollY }) {
  const groupRef = useRef()
  const scrollOffset = useMemo(() => scrollY * 0.001, [scrollY])
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.05,
        0.02
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.03 - scrollOffset * 0.1,
        0.02
      )
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#c4f042" />
      <pointLight position={[-10, -10, 5]} intensity={0.15} color="#4a9eff" />
      
      <group ref={groupRef}>
        <ParticleField count={180} mouse={mouse} />
        
        <FloatingShape
          position={[-7, 4, -3]}
          scale={1.2}
          color="#c4f042"
          geometry="icosahedron"
          speed={0.3}
          mouse={mouse}
        />
        <FloatingShape
          position={[8, -2, -5]}
          scale={0.9}
          color="#4a9eff"
          geometry="octahedron"
          speed={0.4}
          mouse={mouse}
        />
        <FloatingShape
          position={[-5, -6, -2]}
          scale={0.7}
          color="#f0c040"
          geometry="tetrahedron"
          speed={0.5}
          mouse={mouse}
        />
        <FloatingShape
          position={[6, 6, -4]}
          scale={0.8}
          color="#c4f042"
          geometry="torus"
          speed={0.25}
          mouse={mouse}
        />
        <FloatingShape
          position={[0, -10, -6]}
          scale={0.6}
          color="#4a9eff"
          geometry="torusKnot"
          speed={0.35}
          mouse={mouse}
        />
        <FloatingShape
          position={[-9, -14, -3]}
          scale={1.0}
          color="#f0c040"
          geometry="icosahedron"
          speed={0.28}
          mouse={mouse}
        />
        <FloatingShape
          position={[10, -20, -5]}
          scale={0.75}
          color="#c4f042"
          geometry="octahedron"
          speed={0.45}
          mouse={mouse}
        />
        
        <OrbitalRing radius={6} mouse={mouse} />
        <OrbitalRing radius={9} mouse={mouse} />
        
        <GridPlane mouse={mouse} />
      </group>

      <fog attach="fog" args={['#0a0a0b', 8, 30]} />
    </>
  )
}
