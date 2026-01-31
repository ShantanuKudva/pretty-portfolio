'use client';

import {
    SiGo,
    SiPython,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiPostgresql,
    SiRedis,
    SiDocker,
    SiAmazon
} from 'react-icons/si';
import LogoLoop from './LogoLoop';

const techStack = [
    { title: 'Go', icon: SiGo },
    { title: 'Python', icon: SiPython },
    { title: 'TypeScript', icon: SiTypescript },
    { title: 'React', icon: SiReact },
    { title: 'Next.js', icon: SiNextdotjs },
    { title: 'PostgreSQL', icon: SiPostgresql },
    { title: 'Redis', icon: SiRedis },
    { title: 'Docker', icon: SiDocker },
    { title: 'AWS', icon: SiAmazon },
];

export function TechStack() {
    return (
        <section className="w-full py-12 border-y border-border bg-background/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                    Technical Arsenal
                </p>
            </div>

            <div className="w-full overflow-hidden">
                <LogoLoop
                    logos={techStack.map((tech) => ({
                        node: <tech.icon className="w-10 h-10 text-muted-foreground hover:text-foreground transition-colors" />,
                        title: tech.title,
                    }))}
                    speed={80}
                    direction="left"
                    gap={80}
                    pauseOnHover={false}
                    logoHeight={40}
                />
            </div>
        </section>
    );
}
