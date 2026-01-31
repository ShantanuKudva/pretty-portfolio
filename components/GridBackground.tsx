'use client';

export function GridBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1]">
            {/* Grid lines - grey color */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                linear-gradient(to right, rgba(128, 128, 128, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(128, 128, 128, 0.15) 1px, transparent 1px)
             `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)'
                }}
            />

            {/* Subtle dot pattern overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(rgba(128, 128, 128, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />
        </div>
    );
}
