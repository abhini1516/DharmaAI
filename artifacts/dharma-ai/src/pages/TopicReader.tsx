import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { topics, Topic } from "@/lib/mock/topics";
import { lawyers, Lawyer } from "@/lib/mock/lawyers";
import { CitationChip } from "@/components/CitationChip";
import { LawyerCard } from "@/components/LawyerCard";
import { Sparkles, ArrowLeft, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TopicReader() {
  const params = useParams<{ topicSlug: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [matchedLawyers, setMatchedLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate network
      await new Promise(r => setTimeout(r, 600));
      
      const found = topics.find(t => t.slug === params.topicSlug);
      if (found) {
        setTopic(found);
        
        // Find a couple related lawyers based on topic domain/title keywords
        const keywords = found.title.split(' ').concat(found.domain.split(' '));
        const matched = lawyers.filter(l => 
          l.practiceAreas.some(pa => 
            keywords.some(kw => kw.length > 3 && pa.toLowerCase().includes(kw.toLowerCase()))
          )
        ).slice(0, 2);
        
        // Fallback to random if no keyword match
        setMatchedLawyers(matched.length > 0 ? matched : lawyers.slice(0, 2));
      }
      setLoading(false);
    };
    
    loadData();
  }, [params.topicSlug]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <div className="font-serif text-lg text-muted-foreground animate-pulse">Retrieving gazette records...</div>
        </div>
      </Layout>
    );
  }

  if (!topic) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Topic Not Found</h1>
          <p className="text-muted-foreground font-sans mb-8">The requested volume could not be located in the library.</p>
          <Link href="/library">
            <button className="bg-primary text-primary-foreground font-sans px-6 py-2 rounded-sm cursor-pointer">
              Return to Library
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <Link href="/library" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Link>
          
          <div className="max-w-4xl">
            <div className="font-sans text-sm font-bold tracking-widest uppercase text-primary mb-4">{topic.domain}</div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
              {topic.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif">
              {topic.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 font-display border-b border-border pb-4">Plain Language Overview</h2>
              <div className="prose prose-lg prose-headings:font-display prose-p:font-serif prose-p:leading-relaxed max-w-none text-foreground">
                <p className="text-lg leading-loose">{topic.plainLanguageExplainer}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 font-display border-b border-border pb-4">Key Statutory Provisions</h2>
              <div className="space-y-6">
                {topic.keySections.map((section, i) => (
                  <div key={i} className="bg-card border border-border p-6 rounded-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <CitationChip tag={`[${section.sectionId}]`} />
                      <h3 className="font-bold text-lg">{section.title}</h3>
                    </div>
                    <p className="font-sans text-foreground/80 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="bg-primary/5 border border-primary/20 p-8 rounded-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 text-primary/10 transform translate-x-4 -translate-y-4">
                <Sparkles className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-display text-foreground relative z-10">Have a specific question about this?</h3>
              <p className="font-sans text-muted-foreground mb-6 relative z-10 max-w-xl">
                Dharma AI can analyze your unique situation in the context of the {topic.domain} and provide guidance.
              </p>
              <Link href={`/consult?topic=${topic.slug}`}>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium px-6 py-3 rounded-sm shadow-sm transition-all cursor-pointer flex items-center gap-2 relative z-10">
                  <Sparkles className="w-4 h-4" />
                  Ask Dharma AI
                </button>
              </Link>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            
            <div className="bg-card border border-border p-6 rounded-sm sticky top-24">
              <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                Frequently Asked
              </h3>
              <Accordion type="single" collapsible className="w-full font-sans">
                {topic.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b-border border-b last:border-0">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary transition-colors py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {matchedLawyers.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-xl mb-4 border-b border-border pb-2">
                  Specialized Practitioners
                </h3>
                <div className="space-y-4">
                  {matchedLawyers.map(lawyer => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/directory" className="font-sans text-sm font-medium text-primary hover:underline">
                    View all lawyers →
                  </Link>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
