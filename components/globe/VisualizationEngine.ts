/**
 * VisualizationEngine
 * Core rendering engine for transforming geographic data to 3D coordinates
 */

import * as THREE from 'three';
import type { GeoDataPoint, CartesianCoordinate } from './types';

export class VisualizationEngine {
    private readonly GLOBE_RADIUS = 2; // Match EarthGlobe sphere radius

    /**
     * Convert geographic coordinates to 3D Cartesian coordinates
     * Uses standard spherical to Cartesian conversion
     */
    geoToCartesian(
        point: GeoDataPoint | { lat: number; long: number },
        radius: number = this.GLOBE_RADIUS
    ): CartesianCoordinate {
        const lat = point.lat ?? 0;
        const lon = point.long ?? 0;

        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);

        return {
            x: -radius * Math.sin(phi) * Math.cos(theta),
            y: radius * Math.cos(phi),
            z: radius * Math.sin(phi) * Math.sin(theta),
        };
    }

    /**
     * Convert Cartesian coordinates to Vector3
     */
    toVector3(coord: CartesianCoordinate): THREE.Vector3 {
        return new THREE.Vector3(coord.x, coord.y, coord.z);
    }

    /**
     * Create arc points between two geographic locations
     * Uses quadratic bezier curve with elevated midpoint
     */
    createArcPoints(
        start: { lat: number; long: number },
        end: { lat: number; long: number },
        segments: number = 50,
        arcHeight: number = 0.3
    ): THREE.Vector3[] {
        const startRadius = this.GLOBE_RADIUS + 0.08;
        const endRadius = this.GLOBE_RADIUS + 0.08;

        const startVec = this.toVector3(this.geoToCartesian(start, startRadius));
        const endVec = this.toVector3(this.geoToCartesian(end, endRadius));

        // Calculate midpoint with height based on distance
        const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
        const distance = startVec.distanceTo(endVec);
        // Increase height factor to ensure arc clears the globe
        const heightFactor = Math.min(distance * (arcHeight * 2.5), 3.0);
        // Apply a minimum elevation for very short arcs
        const minElevation = 0.2;
        mid.normalize().multiplyScalar(this.GLOBE_RADIUS + Math.max(heightFactor, minElevation));

        // Generate quadratic bezier curve
        const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
        return curve.getPoints(segments);
    }

    /**
     * Create arc geometry from points
     */
    createArcGeometry(points: THREE.Vector3[]): THREE.BufferGeometry {
        return new THREE.BufferGeometry().setFromPoints(points);
    }

    /**
     * Create line material for arcs
     */
    createArcMaterial(color: string = '#00ff88', opacity: number = 0.7): THREE.LineBasicMaterial {
        return new THREE.LineBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity,
            linewidth: 1,
        });
    }

    /**
     * Calculate distance between two geo points (in radians)
     */
    geoDistance(start: { lat: number; long: number }, end: { lat: number; long: number }): number {
        const startVec = this.toVector3(this.geoToCartesian(start, 1));
        const endVec = this.toVector3(this.geoToCartesian(end, 1));
        return startVec.angleTo(endVec);
    }

    /**
     * Get position for marker slightly above globe surface
     */
    getMarkerPosition(
        point: GeoDataPoint | { lat: number; long: number },
        elevation: number = 0.02
    ): THREE.Vector3 {
        const coord = this.geoToCartesian(point, this.GLOBE_RADIUS + elevation);
        return this.toVector3(coord);
    }

    /**
     * Batch convert points to marker positions (for instanced rendering)
     */
    batchGetMarkerPositions(points: GeoDataPoint[], elevation: number = 0.02): THREE.Vector3[] {
        return points.map((point) => this.getMarkerPosition(point, elevation));
    }

    /**
     * Create instance matrices for batch rendering
     */
    createInstanceMatrices(points: GeoDataPoint[], scale: number = 0.02): THREE.Matrix4[] {
        return points.map((point) => {
            const position = this.getMarkerPosition(point);
            const matrix = new THREE.Matrix4();
            matrix.compose(position, new THREE.Quaternion(), new THREE.Vector3(scale, scale, scale));
            return matrix;
        });
    }
}

// Singleton instance for convenience
export const visualizationEngine = new VisualizationEngine();
