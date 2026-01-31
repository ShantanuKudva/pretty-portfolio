'use client';

import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Earth } from './globe/Earth';
import { TrafficLayer } from './globe/TrafficLayer';
import { Markers } from './globe/Markers';
import type { GeoDataPoint } from './globe/types';

// Generate sample traffic data
// 1. Define Nodes (Markers) first so traffic connects them
const sampleMarkers: GeoDataPoint[] = [
  ...Array.from({ length: 8 }).map(() => ({
    lat: (Math.random() - 0.5) * 140, // Avoid extreme poles
    long: (Math.random() - 0.5) * 360,
    metadata: { type: 'server' as const, name: 'HawkNet Node' },
  })),
  ...Array.from({ length: 4 }).map(() => ({
    lat: (Math.random() - 0.5) * 140,
    long: (Math.random() - 0.5) * 360,
    metadata: { type: 'threat' as const, name: 'DDoS Attempt' },
  })),
];

// 2. Generate Traffic Flows connecting these nodes
const sampleFlows: GeoDataPoint[] = Array.from({ length: 24 }).map((_, i) => {
  // Pick random source and destination from markers
  const sourceNode = sampleMarkers[Math.floor(Math.random() * sampleMarkers.length)];
  let destNode = sampleMarkers[Math.floor(Math.random() * sampleMarkers.length)];

  // Ensure source != dest
  while (destNode === sourceNode) {
    destNode = sampleMarkers[Math.floor(Math.random() * sampleMarkers.length)];
  }

  const protocol = Math.random() > 0.5 ? 'HTTPS' : 'SSH';

  return {
    lat: sourceNode.lat,
    long: sourceNode.long,
    destination: { lat: destNode.lat, long: destNode.long },
    metadata: {
      type: 'traffic',
      protocol,
    },
  };
});

function GlobeScene({ onMarkerClick }: { onMarkerClick: (point: GeoDataPoint) => void }) {
  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        maxDistance={8}
        minDistance={3}
      />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Earth showClouds={true} />
      <TrafficLayer flows={sampleFlows} />
      <Markers points={sampleMarkers} onMarkerClick={onMarkerClick} />
    </>
  );
}

// Simulated Live Stats
function StatsOverlay() {
  const [stats, setStats] = useState({ flows: 10420, threats: 3 });

  // Simulate live updates
  useMemo(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        flows: prev.flows + Math.floor(Math.random() * 10 - 3),
        threats: Math.max(0, prev.threats + (Math.random() > 0.95 ? (Math.random() > 0.5 ? 1 : -1) : 0))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2 z-10 pointer-events-none">
      <div className="bg-background/80 backdrop-blur border border-border/50 p-2 sm:p-3 rounded-lg flex items-center gap-2 sm:gap-3">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse" />
        <div>
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active Flows</p>
          <p className="text-sm sm:text-lg font-mono font-bold text-foreground">{stats.flows.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-background/80 backdrop-blur border border-border/50 p-2 sm:p-3 rounded-lg flex items-center gap-2 sm:gap-3">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
        <div>
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Threats Detected</p>
          <p className="text-sm sm:text-lg font-mono font-bold text-foreground">{stats.threats}</p>
        </div>
      </div>
    </div>
  );
}

export function Globe() {
  const [selectedPoint, setSelectedPoint] = useState<GeoDataPoint | null>(null);

  return (
    <div className="relative w-full h-full group">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <Suspense fallback={null}>
          <GlobeScene onMarkerClick={setSelectedPoint} />
        </Suspense>
      </Canvas>

      <StatsOverlay />

      {/* Interactive Overlay */}
      {selectedPoint && (
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur border border-border p-4 rounded-xl animate-in fade-in slide-in-from-bottom-2 z-50 max-w-xs shadow-2xl">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h4 className="font-bold text-foreground">
                {selectedPoint.metadata?.type === 'threat' ? '⚠️ Active Threat' : '🟢 Server Node'}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedPoint.metadata?.type === 'threat'
                  ? 'High-velocity traffic anomaly detected from IP region.'
                  : 'Operational status normal. Handling 2.4k req/s.'}
              </p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs font-mono bg-foreground/10 px-2 py-1 rounded">
                  {selectedPoint.lat.toFixed(2)}, {selectedPoint.long.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedPoint(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
