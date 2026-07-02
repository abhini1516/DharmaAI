import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { lawyers, Lawyer } from "@/lib/mock/lawyers";
import { ArrowLeft, ShieldCheck, MapPin, Languages, Scale, BookOpen, Star, Mail, Phone, Calendar, Gavel } from "lucide-react";

export default function LawyerProfile() {
  const params = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const found = lawyers.find(l => l.id === params.id);
      setLawyer(found || null);
      setLoading(false);
    }, 400);
  }, [params.id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <div className="font-serif text-lg text-muted-foreground animate-pulse">Loading practitioner profile...</div>
        </div>
      </Layout>
    );
  }

  if (!lawyer) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground font-sans mb-8">The requested practitioner could not be found in the registry.</p>
          <Link href="/directory">
            <button className="bg-primary text-primary-foreground font-sans px-6 py-2 rounded-sm cursor-pointer">
              Return to Directory
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-8 py-8">
        <Link href="/directory" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Registry
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Bio & Core Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card border border-border p-6 rounded-sm shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              
              <div className="w-24 h-24 bg-secondary rounded-sm mb-6 flex items-center justify-center font-display text-4xl text-muted-foreground border border-border">
                {lawyer.name.charAt(4)} {/* First letter after Adv. */}
              </div>
              
              <h1 className="font-display font-bold text-3xl mb-2">{lawyer.name}</h1>
              
              <div className="flex items-center gap-2 font-mono text-xs bg-muted px-2 py-1 rounded-sm w-fit border border-border text-muted-foreground mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                BAR REG: {lawyer.barNumber}
              </div>

              <div className="space-y-4 font-sans text-sm border-t border-border pt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-muted-foreground">{lawyer.location.city}, {lawyer.location.state}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-semibold">Experience</div>
                    <div className="text-muted-foreground">{lawyer.experienceYears} Years at Bar</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Languages className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-semibold">Languages</div>
                    <div className="text-muted-foreground">{lawyer.languages.join(", ")}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-semibold">Education</div>
                    <div className="text-muted-foreground">{lawyer.education}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium px-4 py-2.5 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> Request Consultation
                </button>
                <button className="w-full bg-background hover:bg-secondary text-foreground border border-border font-sans font-medium px-4 py-2.5 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> View Phone Number
                </button>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-sm shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg">Fees & Ratings</h3>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="font-sans text-muted-foreground text-sm">Consultation Rate</span>
                <span className="font-sans font-bold">₹{lawyer.hourlyFee} <span className="text-xs font-normal text-muted-foreground">/ hr</span></span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-sans text-muted-foreground text-sm">Client Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-sans font-bold">{lawyer.rating}</span>
                  <span className="font-sans text-xs text-muted-foreground">({lawyer.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            
            <section>
              <h2 className="font-display font-bold text-2xl mb-4 border-b border-border pb-2">About Counsel</h2>
              <p className="font-serif text-lg leading-relaxed text-foreground/90">
                {lawyer.about}
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl mb-4 border-b border-border pb-2">Primary Practice Areas</h2>
              <div className="flex flex-wrap gap-3 mt-4">
                {lawyer.practiceAreas.map(area => (
                  <div key={area} className="bg-secondary/50 border border-secondary-border px-4 py-2 rounded-sm font-sans text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-primary" />
                    {area}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl mb-6 border-b border-border pb-2">Notable Case Outcomes</h2>
              <div className="space-y-4">
                {lawyer.notableCases.map((caseStr, i) => (
                  <div key={i} className="bg-card border border-border p-5 rounded-sm flex items-start gap-4">
                    <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center shrink-0 border border-border">
                      <Gavel className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-sans text-foreground font-medium">{caseStr}</p>
                      <p className="font-sans text-xs text-muted-foreground mt-2 uppercase tracking-wide">Public Record</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </div>
    </Layout>
  );
}
