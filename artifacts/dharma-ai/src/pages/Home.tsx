import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { Search, Book, Scale, ArrowRight, Sparkles, UserCheck } from "lucide-react";
import { topics } from "@/lib/mock/topics";
import { lawyers } from "@/lib/mock/lawyers";
import { LawyerCard } from "@/components/LawyerCard";

export default function Home() {
  const featuredTopics = topics.slice(0, 3);
  const featuredLawyer = lawyers[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-border bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl mb-6 text-foreground tracking-tight">
            Indian Law, <span className="text-primary italic">Demystified.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-serif mb-12 max-w-2xl mx-auto leading-relaxed">
            The national digital gazette helping citizens understand their rights, navigate statutes, and connect with verified legal counsel.
          </p>

          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-primary/70 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-12 pr-4 py-5 font-sans text-lg bg-card border-2 border-border focus:border-primary rounded-sm shadow-sm focus:shadow-md focus:outline-none transition-all placeholder:text-muted-foreground"
              placeholder="Search acts, fundamental rights, or describe a legal issue..."
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <Link href="/consult">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium px-6 py-2.5 rounded-sm transition-colors cursor-pointer flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Ask AI
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
            <div>
              <h2 className="text-3xl text-foreground">The Citizen's Library</h2>
              <p className="text-muted-foreground mt-2 font-sans">Plain-language guides to the Republic's central laws.</p>
            </div>
            <Link href="/library" className="hidden md:flex items-center gap-1 font-sans font-medium text-primary hover:text-primary/80 transition-colors">
              Browse all volumes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTopics.map((topic) => (
              <Link key={topic.id} href={`/library/${topic.slug}`}>
                <div className="group h-full bg-card border border-border p-8 rounded-sm hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer flex flex-col">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-sm mb-6 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Book className="w-6 h-6" />
                  </div>
                  <div className="font-sans text-sm font-semibold tracking-wider text-primary uppercase mb-3">
                    {topic.domain}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{topic.title}</h3>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed flex-1">
                    {topic.summary}
                  </p>
                  <div className="mt-6 pt-4 border-t border-border flex items-center text-sm font-sans font-medium text-foreground group-hover:text-primary transition-colors">
                    Read provisions <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/library" className="inline-flex items-center gap-1 font-sans font-medium text-primary hover:text-primary/80 transition-colors">
              Browse all volumes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Split Section: AI + Matchmaking */}
      <section className="py-24 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent blur-3xl -z-10 rounded-full"></div>
              <div className="bg-card border border-border rounded-sm shadow-xl p-6 md:p-8 relative">
                <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground px-4 py-1.5 font-sans text-sm font-bold tracking-wide uppercase rounded-sm shadow-md">
                  Case Match 98%
                </div>
                <div className="mt-4">
                  <LawyerCard lawyer={featuredLawyer} isMatch={false} />
                </div>
                
                <div className="mt-6 border-t border-border pt-6">
                  <h4 className="font-sans font-bold text-sm uppercase text-muted-foreground mb-4 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Vector-RAG Analysis
                  </h4>
                  <div className="bg-background border border-border p-4 rounded-sm font-sans text-sm leading-relaxed text-foreground border-l-4 border-l-primary">
                    <span className="font-bold mr-2">Jurisprudential Alignment:</span>
                    Adv. {featuredLawyer.name.split(' ')[1]}'s extensive precedent in Constitutional Law and public interest litigation strongly matches the statutory requirements of your inquiry regarding Article 21 violations.
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                  Expert counsel, <br/>algorithmically matched.
                </h2>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  Our dual-engine system first helps you understand your legal standing through the Dharma AI consultant, then uses semantic vector matching to pair your specific case details with the right verified practitioner from the Bar Council.
                </p>
              </div>

              <div className="space-y-4 font-sans">
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Book className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Statutory Cross-Referencing</h4>
                    <p className="text-sm text-muted-foreground mt-1">AI responses are strictly grounded in active Indian law, dynamically linking to actual sections of the Constitution and central acts.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Verified Bar Counsel</h4>
                    <p className="text-sm text-muted-foreground mt-1">Every practitioner is verified against state Bar Council records, ensuring you only connect with legitimate advocates.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/match">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium px-6 py-3 rounded-sm shadow-sm transition-all cursor-pointer">
                    Find a Lawyer
                  </button>
                </Link>
                <Link href="/directory">
                  <button className="bg-background hover:bg-secondary text-foreground border border-border font-sans font-medium px-6 py-3 rounded-sm transition-all cursor-pointer">
                    Browse Directory
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
