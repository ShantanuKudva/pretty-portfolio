'use client';

export function Footer() {
  return (
    <footer className="w-full bg-foreground text-background border-t border-background/20">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Shantanu Kudva</h4>
            <p className="text-background/70">
              Backend Engineer specializing in scalable distributed systems and infrastructure optimization.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="https://github.com/ShantanuKudva" className="hover:text-background transition-colors">GitHub</a></li>
              <li><a href="https://linkedin.com/in/shantanu-kudva" className="hover:text-background transition-colors">LinkedIn</a></li>
              <li><a href="mailto:kudvashantanu2002@gmail.com" className="hover:text-background transition-colors">Email</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <ul className="space-y-2 text-background/70">
              <li>Bengaluru, India</li>
              <li>+91-9945274012</li>
              <li><a href="mailto:kudvashantanu2002@gmail.com" className="hover:text-background transition-colors">kudvashantanu2002@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-background/60">
          <p>&copy; 2024-2026 Shantanu Kudva. All rights reserved.</p>
          <p>Built with React Three Fiber & Next.js</p>
        </div>
      </div>
    </footer>
  );
}
