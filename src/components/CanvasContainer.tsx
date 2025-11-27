"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

interface CanvasContainerProps {
  children: React.ReactNode;
}

const CanvasContainer = ({ children }: CanvasContainerProps) => {
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent hydration mismatch

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]} // Optimize for pixel ratio
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
