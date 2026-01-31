'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaFileDownload } from 'react-icons/fa';
import Image from 'next/image';
import ProfileCard from "@/components/ProfileCard";

export function ContactSection() {
    return (
        <section id="contact" className="relative w-full py-24 md:py-48 overflow-hidden bg-background">
            {/* Decorative gradient blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    <div className="w-[280px] md:w-[350px] aspect-[0.718] shrink-0 z-10 relative mx-auto md:mx-0">
                        <ProfileCard
                            name="Shantanu Kudva"
                            title="Backend Engineer"
                            handle="shantanu_kudva"
                            status="Building Systems"
                            contactText="Get in Touch"
                            avatarUrl="/me-new.jpg"
                            miniAvatarUrl="/me-new.jpg"
                            // showIcon={true}
                            iconUrl="/sk-logo.svg"
                            behindGlowEnabled={true}
                            showUserInfo={false}
                            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                            enableTilt={true}
                            enableMobileTilt={true}
                            behindGlowColor="rgba(125, 190, 255, 0.67)"
                            onContactClick={() => window.location.href = 'mailto:shantanu.kudva@example.com'}
                            className="w-full h-full cover-mode"
                        />
                    </div>

                    {/* Contact Actions */}
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-6xl font-serif text-foreground"><span className="italic">Let&apos;s</span> Connect</h2>
                            <p className="text-lg text-muted-foreground font-sans max-w-md">
                                Always open to discussing distributed systems, high-performance architecture, or just geeking out over tech.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 max-w-xs mx-auto md:mx-0">
                            <a href="mailto:kudvashantanu2002@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <FaEnvelope />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground font-mono uppercase">Email</p>
                                    <p className="text-sm font-semibold text-foreground">Contact Me</p>
                                </div>
                            </a>

                            <a href="https://linkedin.com/in/shantanu-kudva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                    <FaLinkedin />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground font-mono uppercase">LinkedIn</p>
                                    <p className="text-sm font-semibold text-foreground">Professional Profile</p>
                                </div>
                            </a>

                            <a href="tel:+919945274012" className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-green-500/50 hover:bg-green-500/5 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                                    <FaPhone />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground font-mono uppercase">Phone</p>
                                    <p className="text-sm font-semibold text-foreground">+91 99452 74012</p>
                                </div>
                            </a>

                            <a href="/resume.pdf" download className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                    <FaFileDownload />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground font-mono uppercase">Resume</p>
                                    <p className="text-sm font-semibold text-foreground">Download PDF</p>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
