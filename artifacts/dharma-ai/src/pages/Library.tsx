import { Layout } from "@/components/Layout";
import { topics } from "@/lib/mock/topics";
import { Link } from "wouter";
import { Book, Scale, Shield, FileText, Gavel } from "lucide-react";

export default function Library() {
  const getIcon = (slug: string) => {
    if (slug.includes("rights") || slug.includes("constitution")) return <Scale className="w-6 h-6" />;
    if (slug.includes("criminal") || slug.includes("negligence")) return <Gavel className="w-6 h-6" />;
    if (slug.includes("data") || slug.includes("privacy") || slug.includes("cyber")) return <Shield className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-3xl mb-16">
          <div className="font-sans text-sm font-bold tracking-widest uppercase text-primary mb-4">Volume I</div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            Citizen's Library
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Plain-language explanations of the Republic's central laws, designed to make legal rights and obligations legible to every citizen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <Link key={topic.id} href={`/library/${topic.slug}`}>
              <div className="group h-full bg-card border border-border p-8 rounded-sm hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer flex flex-col">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-sm mb-6 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {getIcon(topic.slug)}
                </div>
                <div className="font-sans text-xs font-bold tracking-wider text-primary uppercase mb-3">
                  {topic.domain}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{topic.title}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed flex-1">
                  {topic.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
