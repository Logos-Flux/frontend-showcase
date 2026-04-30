// Note: three.js adds ~600KB to the bundle. When mounting Globe on a real
// panel, wrap the import with React.lazy + Suspense so it only loads on
// demand, e.g. const Globe = lazy(() => import('@/components/library/Globe'))
// and re-export a default from this module if needed.
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export interface GlobeMarker {
  lat: number
  lng: number
  label?: string
  color?: string
  size?: number
}

interface GlobeProps {
  markers?: GlobeMarker[]
  dotCount?: number
  radius?: number
  dotColor?: string
  markerColor?: string
  autoRotate?: boolean
  rotateSpeed?: number
  className?: string
  style?: React.CSSProperties
}

function latLngToVec3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = []
  const offset = 2 / count
  const increment = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2
    const r = Math.sqrt(1 - y * y)
    const phi = i * increment
    const x = Math.cos(phi) * r
    const z = Math.sin(phi) * r
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius))
  }
  return points
}

export function Globe({
  markers = [],
  dotCount = 1200,
  radius = 100,
  dotColor = '#5a6178',
  markerColor = '#7B2FBE',
  autoRotate = true,
  rotateSpeed = 0.6,
  className,
  style,
}: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const { clientWidth: width, clientHeight: height } = mount
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000)
    camera.position.z = -radius * 2.6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const dots = fibonacciSphere(dotCount, radius)
    const dotGeom = new THREE.BufferGeometry().setFromPoints(dots)
    const dotMat = new THREE.PointsMaterial({
      color: new THREE.Color(dotColor),
      size: 1.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    })
    scene.add(new THREE.Points(dotGeom, dotMat))

    const markerGroup = new THREE.Group()
    markers.forEach((m) => {
      const pos = latLngToVec3(m.lat, m.lng, radius * 1.02)
      const geom = new THREE.SphereGeometry(m.size ?? 2.2, 12, 12)
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(m.color ?? markerColor) })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.position.copy(pos)
      markerGroup.add(mesh)

      const haloGeom = new THREE.RingGeometry((m.size ?? 2.2) * 1.4, (m.size ?? 2.2) * 2, 24)
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(m.color ?? markerColor),
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      })
      const halo = new THREE.Mesh(haloGeom, haloMat)
      halo.position.copy(pos)
      halo.lookAt(0, 0, 0)
      markerGroup.add(halo)
    })
    scene.add(markerGroup)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.enableZoom = false
    controls.enableDamping = true
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = rotateSpeed

    let frameId = 0
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const observer = new ResizeObserver(handleResize)
    observer.observe(mount)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      controls.dispose()
      dotGeom.dispose()
      dotMat.dispose()
      markerGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          ;(obj.material as THREE.Material).dispose()
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [markers, dotCount, radius, dotColor, markerColor, autoRotate, rotateSpeed])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: '100%', height: '100%', minHeight: 300, ...style }}
    />
  )
}
