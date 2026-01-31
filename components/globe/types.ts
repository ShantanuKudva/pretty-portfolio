export interface GeoDataPoint {
    lat: number;
    long: number;
    destination?: { lat: number; long: number };
    metadata?: {
        type?: 'traffic' | 'threat' | 'server' | 'robot' | 'dot';
        subtype?: string;
        protocol?: string;
        status?: string;
        name?: string;
        isHub?: boolean;
        robotId?: string;
        battery?: number;
        sourceCity?: string;
        protocols?: string[];
        [key: string]: any;
    };
}

export interface CartesianCoordinate {
    x: number;
    y: number;
    z: number;
}
