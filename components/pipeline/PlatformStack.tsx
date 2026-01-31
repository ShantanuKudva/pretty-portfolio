'use client';

export function PlatformStack() {
    return (
        <div className="w-full p-3 sm:p-8 rounded-2xl border border-border bg-background/5 relative overflow-hidden font-mono">
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-[10px] sm:text-xs font-bold text-muted-foreground uppercase opacity-50">STACK_VIEW_V1</div>

            <div className="space-y-4 relative z-10">

                {/* Layer 3: Services */}
                <div className="p-4 rounded-xl border-2 border-green-500/20 bg-green-500/5 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">Available Services</span>
                        <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">Docker Swarm Services</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['Wiresense', 'Vector', 'Kafka', 'ClickHouse', 'Postgres', 'Redis', 'Prometheus', 'Grafana'].map(svc => (
                            <div key={svc} className="text-center py-2 bg-background/50 rounded border border-green-500/10 text-xs font-semibold text-foreground hover:scale-105 transition-transform cursor-default">
                                {svc}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center -my-2 opacity-50">
                    <div className="h-4 w-[2px] bg-border"></div>
                </div>

                {/* Layer 2: Platform */}
                <div className="p-4 rounded-xl border-2 border-blue-500/20 bg-blue-500/5 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Shared Platform</span>
                        <span className="text-[10px] bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full">Terraform</span>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <div className="flex-1 py-3 bg-background/50 rounded border border-blue-500/10 text-center">
                            <div className="text-sm font-bold text-foreground">Kong Gateway</div>
                            <div className="text-[10px] text-muted-foreground">API Management</div>
                        </div>
                        <div className="flex-1 py-3 bg-background/50 rounded border border-blue-500/10 text-center">
                            <div className="text-sm font-bold text-foreground">Keycloak</div>
                            <div className="text-[10px] text-muted-foreground">Identity (OIDC)</div>
                        </div>
                    </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center -my-2 opacity-50">
                    <div className="h-4 w-[2px] bg-border"></div>
                </div>

                {/* Layer 1: Infrastructure */}
                <div className="p-4 rounded-xl border-2 border-orange-500/20 bg-orange-500/5 backdrop-blur-sm transition-all">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">Infrastructure Provider</span>
                        <span className="text-[10px] bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded-full">Ansible</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="py-2 border-b-2 border-orange-500/30 text-xs font-bold text-foreground">AWS (VPC, SG, EC2)</div>
                        <div className="py-2 border-b-2 border-orange-500/30 text-xs font-bold text-foreground">Bare Metal</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
