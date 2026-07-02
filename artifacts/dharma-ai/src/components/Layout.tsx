import { ReactNode } from "react";
import { Link, useLocation } from "wouter";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-serif">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-display font-bold text-xl leading-none group-hover:bg-primary/90 transition-colors">
              D
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">Dharma.ai</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
            <Link href="/library" className={`transition-colors hover:text-primary ${location.startsWith('/library') ? 'text-primary' : 'text-foreground/80'}`}>
              Citizen's Library
            </Link>
            <Link href="/consult" className={`transition-colors hover:text-primary ${location === '/consult' ? 'text-primary' : 'text-foreground/80'}`}>
              AI Consult
            </Link>
            <Link href="/directory" className={`transition-colors hover:text-primary ${location.startsWith('/directory') ? 'text-primary' : 'text-foreground/80'}`}>
              Lawyer Directory
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/match" className="hidden md:inline-flex h-9 items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-sans font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Find a Lawyer
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full fade-up">
        {children}
      </main>

      <footer className="border-t border-border mt-auto bg-background/50">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-display font-bold text-xl mb-2">Dharma.ai</div>
            <p className="text-muted-foreground font-sans text-sm max-w-sm">
              Making Indian law legible to citizens. An institutional digital gazette providing AI-assisted legal literacy and verified bar counsel matching.
            </p>
          </div>
          <div className="font-sans text-sm text-muted-foreground flex gap-4">
            <span>© {new Date().getFullYear()} Dharma.ai</span>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
