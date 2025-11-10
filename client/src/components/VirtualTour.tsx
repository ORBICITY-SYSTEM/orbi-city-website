import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { X, Maximize2, Minimize2, RotateCcw } from "lucide-react";

interface VirtualTourProps {
  imageUrl: string;
  onClose?: () => void;
}

export default function VirtualTour({ imageUrl, onClose }: VirtualTourProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sphere: THREE.Mesh;
    isUserInteracting: boolean;
    onPointerDownMouseX: number;
    onPointerDownMouseY: number;
    lon: number;
    onPointerDownLon: number;
    lat: number;
    onPointerDownLat: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create sphere geometry for 360 image
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert to see inside

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        
        sceneRef.current = {
          scene,
          camera,
          renderer,
          sphere,
          isUserInteracting: false,
          onPointerDownMouseX: 0,
          onPointerDownMouseY: 0,
          lon: 0,
          onPointerDownLon: 0,
          lat: 0,
          onPointerDownLat: 0
        };

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
        setIsLoading(false);
      }
    );

    // Mouse/touch interaction
    let isUserInteracting = false;
    let onPointerDownMouseX = 0;
    let onPointerDownMouseY = 0;
    let lon = 0;
    let onPointerDownLon = 0;
    let lat = 0;
    let onPointerDownLat = 0;

    const onPointerDown = (event: PointerEvent) => {
      isUserInteracting = true;
      onPointerDownMouseX = event.clientX;
      onPointerDownMouseY = event.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (isUserInteracting) {
        lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
        lat = Math.max(-85, Math.min(85, lat));
      }
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const fov = camera.fov + event.deltaY * 0.05;
      camera.fov = Math.max(30, Math.min(90, fov));
      camera.updateProjectionMatrix();
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);

      camera.position.x = 0.1 * Math.sin(phi) * Math.cos(theta);
      camera.position.y = 0.1 * Math.cos(phi);
      camera.position.z = 0.1 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", handleResize);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometry.dispose();
    };
  }, [imageUrl]);

  const handleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleReset = () => {
    if (sceneRef.current) {
      sceneRef.current.lon = 0;
      sceneRef.current.lat = 0;
      sceneRef.current.camera.fov = 75;
      sceneRef.current.camera.updateProjectionMatrix();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
            <p className="text-lg">Loading Virtual Tour...</p>
          </div>
        </div>
      )}

      {/* 360 View Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleReset}
          className="bg-white/90 hover:bg-white"
          title="Reset View"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={handleFullscreen}
          className="bg-white/90 hover:bg-white"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </Button>

        {onClose && (
          <Button
            variant="secondary"
            size="icon"
            onClick={onClose}
            className="bg-white/90 hover:bg-white"
            title="Close"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full">
        <p className="text-sm">
          <span className="font-semibold">Drag</span> to look around • <span className="font-semibold">Scroll</span> to zoom
        </p>
      </div>
    </div>
  );
}
