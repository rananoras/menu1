import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MenuItem } from '../types/menu';

interface ThreeFoodStageProps {
  activeItem: MenuItem;
  onOpenLookbook: () => void;
  lang: 'ar' | 'en';
}

// Reusable math vectors at module scope to eliminate per-frame GC
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);

export const ThreeFoodStage: React.FC<ThreeFoodStageProps> = ({
  activeItem,
  onOpenLookbook,
  lang,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<MenuItem>(activeItem);
  activeItemRef.current = activeItem;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080808, 0.05);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.6, 5.2);
    camera.lookAt(0, 0.4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3db, 0.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffecc7, 0x111116, 0.8);
    scene.add(hemiLight);

    const keySpot = new THREE.SpotLight(0xffeed6, 8.5);
    keySpot.position.set(3, 6, 4);
    keySpot.angle = Math.PI / 5;
    keySpot.penumbra = 0.5;
    keySpot.castShadow = !isSoftwareGl;
    if (keySpot.castShadow) {
      keySpot.shadow.mapSize.width = 1024;
      keySpot.shadow.mapSize.height = 1024;
      keySpot.shadow.bias = -0.0005;
      keySpot.shadow.normalBias = 0.02;
    }
    scene.add(keySpot);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 3.2);
    rimLight.position.set(-3.5, 3.5, -2.5);
    scene.add(rimLight);

    const goldAccentLight = new THREE.PointLight(0xffdf88, 2.5, 8);
    goldAccentLight.position.set(0, -0.2, 0.8);
    scene.add(goldAccentLight);

    // Composite 3D Pedestal Assembly (THREE.Group with 5 parts)
    const pedestalGroup = new THREE.Group();
    scene.add(pedestalGroup);

    // 1. Base plinth: Dark Obsidian Chamfered Cylinder
    const baseGeo = new THREE.CylinderGeometry(1.9, 2.1, 0.25, 48);
    const darkObsidianMat = new THREE.MeshStandardMaterial({
      color: 0x121214,
      metalness: 0.85,
      roughness: 0.35,
    });
    const baseMesh = new THREE.Mesh(baseGeo, darkObsidianMat);
    baseMesh.position.y = -0.125;
    baseMesh.receiveShadow = !isSoftwareGl;
    pedestalGroup.add(baseMesh);

    // 2. Brushed Gold Beveled Accent Ring
    const goldRingGeo = new THREE.CylinderGeometry(1.92, 1.92, 0.04, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.2,
    });
    const goldRing = new THREE.Mesh(goldRingGeo, goldMat);
    goldRing.position.y = 0.01;
    pedestalGroup.add(goldRing);

    // 3. Inner Rotating Exhibition Plinth (Fine textured dark matte stone)
    const upperGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.12, 48);
    const upperPlinthMat = new THREE.MeshStandardMaterial({
      color: 0x171719,
      roughness: 0.6,
      metalness: 0.4,
    });
    const upperPlinth = new THREE.Mesh(upperGeo, upperPlinthMat);
    upperPlinth.position.y = 0.08;
    upperPlinth.receiveShadow = !isSoftwareGl;
    pedestalGroup.add(upperPlinth);

    // 4. Contact shadow grounding plane
    const shadowGeo = new THREE.PlaneGeometry(5.5, 5.5);
    // Procedural radial contact shadow texture via 2D Canvas
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.25;
    pedestalGroup.add(shadowPlane);

    // 5. Floating Showcase Ring & Kinetic Food Art Platter
    const dishGroup = new THREE.Group();
    dishGroup.position.y = 0.65;
    scene.add(dishGroup);

    // Luxury Ceramic Plate
    const plateGeo = new THREE.CylinderGeometry(1.35, 1.15, 0.06, 64);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.25,
      metalness: 0.7,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.castShadow = !isSoftwareGl;
    dishGroup.add(plateMesh);

    // Plate Gold Rim
    const plateGoldRingGeo = new THREE.TorusGeometry(1.36, 0.015, 16, 64);
    plateGoldRingGeo.rotateX(Math.PI / 2);
    const plateGoldRing = new THREE.Mesh(plateGoldRingGeo, goldMat);
    plateGoldRing.position.y = 0.03;
    dishGroup.add(plateGoldRing);

    // Floating Gold Ember Particles (procedural gold dust)
    const particleCount = isSoftwareGl ? 30 : 75;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * 3.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      scales[i] = Math.random() * 0.04 + 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    pGrad.addColorStop(0, '#FFF5CC');
    pGrad.addColorStop(0.3, '#D4AF37');
    pGrad.addColorStop(0.8, 'rgba(212, 175, 55, 0.2)');
    pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);
    const pTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pTex,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interactive Drag / Tilt Controls
    let isDragging = false;
    let prevMouseX = 0;
    let autoRotateVelocity = 0.003;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        prevMouseX = e.clientX;
        _targetRotation.y += deltaX * 0.008;
      } else {
        // Subtle tilt parallax
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        _targetRotation.x = ny * 0.12;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous subtle auto-rotation if not actively dragging
      if (!isDragging) {
        _targetRotation.y += autoRotateVelocity;
      }

      // Smooth exponential damping
      _currentRotation.x = THREE.MathUtils.damp(_currentRotation.x, _targetRotation.x, 6, delta);
      _currentRotation.y = THREE.MathUtils.damp(_currentRotation.y, _targetRotation.y, 6, delta);

      // Apply to dish & pedestal
      dishGroup.rotation.y = _currentRotation.y;
      dishGroup.rotation.x = _currentRotation.x * 0.5;
      pedestalGroup.rotation.y = _currentRotation.y * 0.3;

      // Gentle vertical floating motion
      dishGroup.position.y = 0.58 + Math.sin(time * 1.5) * 0.04;

      // Drift floating gold particles
      const posAttr = particleGeo.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += 0.003;
        if (arr[i * 3 + 1] > 3.5) {
          arr[i * 3 + 1] = 0;
        }
      }
      posAttr.needsUpdate = true;
      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
      baseGeo.dispose();
      darkObsidianMat.dispose();
      goldRingGeo.dispose();
      goldMat.dispose();
      upperGeo.dispose();
      upperPlinthMat.dispose();
      plateGeo.dispose();
      plateMat.dispose();
      plateGoldRingGeo.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      shadowTexture.dispose();
      pTex.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[480px] lg:h-[560px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        title={lang === 'ar' ? 'اسحب للتدوير ثلاثي الأبعاد' : 'Drag to rotate in 3D'}
      />

      {/* Realistic Cinematic Plated Food Anchor Visual over 3D Pedestal */}
      <div
        onClick={onOpenLookbook}
        className="relative z-10 pointer-events-auto cursor-pointer group flex flex-col items-center -mt-6 transition-transform duration-500 hover:scale-[1.03]"
      >
        <div className="relative w-64 h-52 sm:w-80 sm:h-64 md:w-96 md:h-76 rounded-full p-2 flex items-center justify-center">
          {/* Subtle outer gold halo */}
          <div className="absolute inset-4 rounded-full border border-[#D4AF37]/30 group-hover:border-[#D4AF37]/70 transition-colors duration-500" />
          
          {/* Circular mask with the high-resolution cinematic food photo */}
          <div className="w-[86%] h-[86%] rounded-full overflow-hidden shadow-2xl shadow-black/90 border border-white/10 group-hover:border-[#D4AF37]/60 transition-all duration-500 relative">
            <img
              src={activeItem.image}
              alt={lang === 'ar' ? activeItem.nameAr : activeItem.nameEn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark gradient vignette over edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Click to inspect affordance overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
              <span className="text-xs uppercase tracking-widest text-[#F3E5AB] font-medium px-4 py-2 bg-black/80 border border-[#D4AF37]/50 rounded-full">
                {lang === 'ar' ? 'استعراض الإيديتوريال الفاخر' : 'Inspect Luxury Lookbook'}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Dish Badge underneath */}
        <div className="mt-1 flex items-center gap-2 text-xs text-[#C8C2B7] bg-[#0F0F0F]/80 px-4 py-1.5 rounded-full border border-white/10 group-hover:border-[#D4AF37]/40 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span>{lang === 'ar' ? 'عرض تفاعلي ثلاثي الأبعاد' : 'Interactive 3D Stage'}</span>
          <span className="text-stone-500">·</span>
          <span>{lang === 'ar' ? 'اسحب للتدوير' : 'Drag to Rotate'}</span>
        </div>
      </div>
    </div>
  );
};
