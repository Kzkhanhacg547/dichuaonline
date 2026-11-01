import React, { useEffect, useRef } from 'react';
import { ActorSpec, TempleScene, loadDevoteeAssets } from './templeScene';

// Transparent canvas with the 3D devotees. Reports whether the 3D files loaded, so the stage
// can fall back to the 2D sprites when public/assets/3d/ is empty.
export const Temple3D: React.FC<{
  specs: ActorSpec[];
  onReady: (ok: boolean) => void;
  onIncenseLit?: () => void;
  onAway?: (key: string, away: boolean) => void;
}> = ({ specs, onReady, onIncenseLit, onAway }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<TempleScene | null>(null);
  const specsRef = useRef(specs);
  specsRef.current = specs;
  const litRef = useRef(onIncenseLit);
  litRef.current = onIncenseLit;
  const awayRef = useRef(onAway);
  awayRef.current = onAway;

  useEffect(() => {
    let cancelled = false;
    loadDevoteeAssets()
      .then((assets) => {
        if (cancelled || !canvasRef.current) return;
        sceneRef.current = new TempleScene(
          canvasRef.current,
          assets,
          () => litRef.current?.(),
          labelsRef.current ?? undefined,
          (key, away) => awayRef.current?.(key, away)
        );
        sceneRef.current.sync(specsRef.current);
        onReady(true);
      })
      .catch((err) => {
        console.info('3D devotees off (no model in /assets/3d/):', err?.message ?? err);
        onReady(false);
      });
    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRef.current?.sync(specs);
  }, [specs]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {/* Name plates that follow people walking up to offer incense (positioned by TempleScene) */}
      <div ref={labelsRef} className="absolute inset-0 pointer-events-none" />
    </>
  );
};
