// InteractiveGlobe.tsx
// Optimized globe with illumination and labels for each location.
// - ThreeGlobe labels layer used for readable labels.
// - Improved lighting (Hemisphere + Directional).
// - Low-poly invisible shells for reliable clicking.
// - Performance-minded defaults: pointsMerge, capped pixel ratio.

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type Location = {
  name: string;
  lat: number;
  lng: number;
  size?: number;
  color?: string;
  id?: string;
};

type Props = {
  width?: string;
  height?: string;
  locations?: Location[];
  onLocationSelect?: (loc: Location) => void;
  autoRotate?: boolean;
};

const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '600px';

const InteractiveGlobe: React.FC<Props> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  locations = [],
  onLocationSelect,
  autoRotate = true
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<any>(null);
  const markersRef = useRef<THREE.Group | null>(null);
  const animRef = useRef<number | null>(null);
  const lastClickRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  // convert lat/lng to cartesian position
  const latLngToVector3 = (lat: number, lng: number, radius = 100) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 600);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // scene & camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(0, 0, 280);
    cameraRef.current = camera;
    scene.add(camera);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.45;
    controls.minDistance = 140;
    controls.maxDistance = 900;
    controlsRef.current = controls;

    // improved lighting for illumination
    const hemi = new THREE.HemisphereLight(0xffffff, 0x222233, 0.6);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(400, 200, 300);
    dir.castShadow = false;
    scene.add(dir);
    // small rim fill for pop
    const rim = new THREE.DirectionalLight(0xffffff, 0.12);
    rim.position.set(-200, -100, -100);
    scene.add(rim);

    // globe (performance-minded)
    const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: false })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .showGraticules(false)
      .showAtmosphere(true)
      .atmosphereColor('lightskyblue')
      .atmosphereAltitude(0.12)
      .globeCurvatureResolution(6)
      .pointsMerge(true) // merged points for perf
      .pointResolution(6)
      .pointAltitude((d: any) => (d.size || 1) / 20)
      .pointRadius(0.7)
      .pointColor((d: any) => d.color || '#ffd166');

    // labels layer: use location name and position slightly above surface
    globe.labelsData(locations)
      .labelLat((d: any) => d.lat)
      .labelLng((d: any) => d.lng)
      .labelText((d: any) => d.name)
      .labelColor(() => 'rgba(230,230,230,0.95)')
      .labelAltitude(() => 0.018) // slightly above small points
      .labelSize(() => 0.55)
      .labelResolution(4)
      .labelIncludeDot(() => true)
      .labelDotRadius(() => 0.11);

    scene.add(globe);
    globeRef.current = globe;

    // markers group for reliable raycasting
    const markersGroup = new THREE.Group();
    markersGroup.name = 'click-markers';
    markersRef.current = markersGroup;
    scene.add(markersGroup);

    const createMarkers = (list: Location[]) => {
      markersGroup.clear();
      if (!list || list.length === 0) return;

      const shellGeom = new THREE.SphereGeometry(1.8, 6, 6);
      const shellMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 });
      list.forEach(loc => {
        const shell = new THREE.Mesh(shellGeom, shellMat);
        const pos = latLngToVector3(loc.lat, loc.lng, 100 + 1.6);
        shell.position.copy(pos);

        // visible dot to match label dot; brighter/emissive for night texture
        const dotGeom = new THREE.SphereGeometry(Math.max(0.65, (loc.size || 1) * 0.7), 10, 10);
        const dotMat = new THREE.MeshStandardMaterial({
          color: loc.color || '#ffd166',
          emissive: loc.color || '#ffd166',
          emissiveIntensity: 0.6,
          roughness: 0.4,
          metalness: 0.0
        });
        const dot = new THREE.Mesh(dotGeom, dotMat);
        dot.position.set(0, 0, 0);
        shell.add(dot);

        shell.userData.location = loc;
        markersGroup.add(shell);
      });
    };

    createMarkers(locations);

    // Raycaster and input handling
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const CLICK_DEBOUNCE_MS = 180;

    const handlePointer = (clientX: number, clientY: number) => {
      if (!rendererRef.current || !cameraRef.current) return false;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, cameraRef.current);

      // markers first
      const intersects = raycaster.intersectObjects(markersGroup.children, true);
      if (intersects.length > 0) {
        let node: any = intersects[0].object;
        while (node && !node.userData?.location) node = node.parent;
        const loc = node?.userData?.location;
        if (loc && onLocationSelect) onLocationSelect(loc);
        return true;
      }

      // fallback: intersect globe surface and pick nearest location within tolerance
      if (globeRef.current) {
        const ints = raycaster.intersectObject(globeRef.current.globeMesh || globeRef.current, true);
        if (ints.length > 0) {
          const p = ints[0].point;
          let nearest: Location | null = null;
          let minD = Infinity;
          for (const loc of locations) {
            const pos = latLngToVector3(loc.lat, loc.lng, 100 + ((loc.size || 1) * 1.2));
            const d = pos.distanceTo(p);
            if (d < minD) {
              minD = d;
              nearest = loc;
            }
          }
          if (nearest && minD < 28) {
            if (onLocationSelect) onLocationSelect(nearest);
            return true;
          }
        }
      }
      return false;
    };

    const onPointerDown = (ev: PointerEvent) => {
      const now = Date.now();
      if (now - lastClickRef.current < CLICK_DEBOUNCE_MS) return;
      lastClickRef.current = now;
      handlePointer(ev.clientX, ev.clientY);
    };
    const onTouchStart = (ev: TouchEvent) => {
      const t = ev.touches && ev.touches[0];
      if (!t) return;
      const now = Date.now();
      if (now - lastClickRef.current < CLICK_DEBOUNCE_MS) return;
      lastClickRef.current = now;
      handlePointer(t.clientX, t.clientY);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown, { passive: true });
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });

    // pause when not visible
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animRef.current || 0);
      else animate();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // render loop
    const animate = () => {
      if (!controlsRef.current || !rendererRef.current || !cameraRef.current || !sceneRef.current) return;
      controlsRef.current.update();
      if (autoRotate && globeRef.current) globeRef.current.rotation.y += 0.0009;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    setIsReady(true);

    // responsive
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth || 800;
      const h = mountRef.current.clientHeight || 600;
      rendererRef.current.setSize(w, h);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();

      try {
        globeRef.current && globeRef.current.rendererSize && globeRef.current.rendererSize(new THREE.Vector2(w, h));
      } catch {}
    };
    window.addEventListener('resize', handleResize);

    // cleanup
    return () => {
      cancelAnimationFrame(animRef.current || 0);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      controls.dispose();
      renderer.dispose();
      markersGroup.clear();
      try {
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // init once

  // update locations and labels when prop changes
  useEffect(() => {
    if (!isReady) return;
    try {
      if (globeRef.current) {
        globeRef.current.pointsData(locations);
        globeRef.current.pointAltitude((d: any) => (d.size || 1) / 20);
        globeRef.current.pointColor((d: any) => d.color || '#ffd166');

        // update labels explicitly
        globeRef.current.labelsData(locations)
          .labelLat((d: any) => d.lat)
          .labelLng((d: any) => d.lng)
          .labelText((d: any) => d.name)
          .labelAltitude(() => 0.018)
          .labelSize(() => 0.55)
          .labelColor(() => 'rgba(230,230,230,0.95)')
          .labelIncludeDot(() => true)
          .labelDotRadius(() => 0.11);
      }

      // recreate markers for raycasting
      if (markersRef.current) {
        markersRef.current.clear();
        const shellGeom = new THREE.SphereGeometry(1.8, 6, 6);
        const shellMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 });
        for (const loc of locations) {
          const shell = new THREE.Mesh(shellGeom, shellMat);
          const pos = latLngToVector3(loc.lat, loc.lng, 100 + 1.6);
          shell.position.copy(pos);

          const dotGeom = new THREE.SphereGeometry(Math.max(0.65, (loc.size || 1) * 0.7), 10, 10);
          const dotMat = new THREE.MeshStandardMaterial({
            color: loc.color || '#ffd166',
            emissive: loc.color || '#ffd166',
            emissiveIntensity: 0.6,
            roughness: 0.4,
            metalness: 0.0
          });
          const dot = new THREE.Mesh(dotGeom, dotMat);
          dot.position.set(0, 0, 0);
          shell.add(dot);

          shell.userData.location = loc;
          markersRef.current.add(shell);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Globe update error', err);
    }
  }, [locations, isReady]);

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default InteractiveGlobe;
