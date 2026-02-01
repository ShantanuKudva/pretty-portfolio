'use client';

import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Earth } from './globe/Earth';
import { TrafficLayer } from './globe/TrafficLayer';
import { Markers } from './globe/Markers';
import type { GeoDataPoint } from './globe/types';

const BANGALORE = { lat: 12.9716, long: 77.5946 };

// Helper to generate mock IP
const mockIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

// Helper to generate volume history (7 data points for a mini-graph)
const mockVolumeHistory = (scale = 1) => Array.from({ length: 7 }, () => Math.floor(Math.random() * 5000 * scale + 500));

// 1. Define Nodes (Markers) first so traffic connects them
const sampleMarkers: GeoDataPoint[] = [
  // The Hub - Bangalore
  {
    ...BANGALORE,
    metadata: {
      type: 'server' as const,
      name: 'Bangalore Hub (HQ)',
      ip: '203.45.123.1',
      volumeHistory: mockVolumeHistory(3), // Higher traffic
      threatCount: Math.floor(Math.random() * 5),
    },
  },
  // Random distributed nodes
  ...Array.from({ length: 12 }).map(() => ({
    lat: (Math.random() - 0.5) * 140, // Avoid extreme poles
    long: (Math.random() - 0.5) * 360,
    metadata: {
      type: 'server' as const,
      name: 'Edge Node',
      ip: mockIP(),
      volumeHistory: mockVolumeHistory(),
      threatCount: Math.floor(Math.random() * 3),
    },
  })),
  // Brief threat nodes
  ...Array.from({ length: 4 }).map(() => ({
    lat: (Math.random() - 0.5) * 140,
    long: (Math.random() - 0.5) * 360,
    metadata: {
      type: 'threat' as const,
      name: 'DDoS Source',
      ip: mockIP(),
      volumeHistory: mockVolumeHistory(0.5), // Lower legitimate traffic
      threatCount: Math.floor(Math.random() * 50 + 20), // High threat count
    },
  })),
];

// 2. Generate Traffic Flows connecting these nodes
const sampleFlows: GeoDataPoint[] = Array.from({ length: 32 }).map((_, i) => {
  // 80% of traffic should involve Bangalore (Hub & Spoke model)
  const useHub = Math.random() > 0.2;

  let sourceNode: GeoDataPoint;
  let destNode: GeoDataPoint;

  if (useHub) {
    // Traffic either FROM Bangalore or TO Bangalore
    const isOutbound = Math.random() > 0.5;
    if (isOutbound) {
      sourceNode = sampleMarkers[0]; // Bangalore
      destNode = sampleMarkers[Math.floor(1 + Math.random() * (sampleMarkers.length - 1))];
    } else {
      sourceNode = sampleMarkers[Math.floor(1 + Math.random() * (sampleMarkers.length - 1))];
      destNode = sampleMarkers[0]; // Bangalore
    }
  } else {
    // Random noise traffic between other nodes
    sourceNode = sampleMarkers[Math.floor(Math.random() * sampleMarkers.length)];
    destNode = sampleMarkers[Math.floor(Math.random() * sampleMarkers.length)];
  }

  // Ensure source != dest
  while (destNode === sourceNode) {
    destNode = sampleMarkers[Math.floor(Math.random() * sampleMarkers.length)];
  }

  const protocol = Math.random() > 0.6 ? 'HTTPS' : 'WSS';

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

      {/* Interactive Overlay - Enhanced Metrics Modal */}
      {selectedPoint && (
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-xl border border-border p-5 rounded-2xl animate-in fade-in slide-in-from-bottom-2 z-50 w-80 shadow-2xl">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
                {selectedPoint.metadata?.type === 'threat' ? (
                  <><span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Threat Source</>
                ) : (
                  <><span className="w-2 h-2 rounded-full bg-sky-500" /> Network Node</>
                )}
              </h4>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                {selectedPoint.metadata?.ip || 'Unknown IP'}
              </p>
            </div>
            <button
              onClick={() => setSelectedPoint(null)}
              className="text-muted-foreground hover:text-foreground text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Network Volume Mini-Chart */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Network Volume (7d)</p>
            <div className="flex items-end gap-1 h-12 bg-foreground/5 rounded-lg p-2">
              {(selectedPoint.metadata?.volumeHistory || []).map((val: number, i: number) => {
                const maxVal = Math.max(...(selectedPoint.metadata?.volumeHistory || [1]));
                const height = (val / maxVal) * 100;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm transition-all ${selectedPoint.metadata?.type === 'threat' ? 'bg-rose-500/70' : 'bg-sky-500/70'
                      }`}
                    style={{ height: `${height}%` }}
                    title={`${val.toLocaleString()} req`}
                  />
                );
              })}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-foreground/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg. Traffic</p>
              <p className="text-lg font-mono font-bold text-foreground">
                {Math.floor((selectedPoint.metadata?.volumeHistory || []).reduce((a: number, b: number) => a + b, 0) / 7).toLocaleString()}
                <span className="text-xs text-muted-foreground ml-1">req/d</span>
              </p>
            </div>
            <div className="bg-foreground/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Threats</p>
              <p className={`text-lg font-mono font-bold ${(selectedPoint.metadata?.threatCount || 0) > 10 ? 'text-rose-500' : 'text-foreground'}`}>
                {selectedPoint.metadata?.threatCount || 0}
                <span className="text-xs text-muted-foreground ml-1">detected</span>
              </p>
            </div>
          </div>

          {/* Coordinates */}
          <div className="flex gap-2 text-xs font-mono text-muted-foreground">
            <span className="bg-foreground/5 px-2 py-1 rounded">
              {selectedPoint.lat.toFixed(4)}°, {selectedPoint.long.toFixed(4)}°
            </span>
            <span className="bg-foreground/5 px-2 py-1 rounded">
              {selectedPoint.metadata?.name || 'Unknown'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
