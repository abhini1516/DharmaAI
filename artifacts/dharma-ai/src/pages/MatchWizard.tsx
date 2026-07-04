import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useMatchLawyers } from "@workspace/api-client-react";
import type { RankedLawyer } from "@workspace/api-zod";
import { LawyerCard } from "@/components/LawyerCard";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Loader2, Database, Network } from "lucide-react";

interface MatchFilter {
  location: string;
  maxBudget: number;
}

export default function MatchWizard() {
  const [step, setStep] = useState(1);
  const [caseDescription, setCaseDescription] = useState("");
  const [filters, setFilters] = useState<MatchFilter>({
    location: "New Delhi",
    maxBudget: 5000
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [results, setResults] = useState<RankedLawyer[]>([]);
  const matchMutation = useMatchLawyers();

  const handleNext = () => {
    if (step === 1 && !caseDescription.trim()) return;
    setStep(s => s + 1);
  };

  const processMatch = async () => {
    setIsProcessing(true);
    setStep(3); // The loading/results step
    
    // Simulate complex AI pipeline steps
    const steps = [
      "Parsing narrative for statutory keywords...",
      "Extracting legal domain vectors (Constitutional, BNS, DPDP)...",
      "Querying state Bar Council registries...",
      "Evaluating vector proximity to specialized bar practitioners...",
      "Ranking candidates by semantic relevance score..."
    ];

    const stepPromise = (async () => {
      for (let i = 0; i < steps.length; i++) {
        setLoadingMsg(steps[i]);
        await new Promise(r => setTimeout(r, 800));
      }
    })();

    try {
      const [response] = await Promise.all([
        matchMutation.mutateAsync({
          data: {
            caseText: caseDescription,
            location: filters.location,
            maxBudget: filters.maxBudget,
          },
        }),
        stepPromise,
      ]);
      setResults(response.matches);
    } catch {
      setResults([]);
    }
    setIsProcessing(false);
  };

  return (
    <Layout>
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-sans text-sm font-bold tracking-widest uppercase text-primary mb-2">
              <Sparkles className="w-4 h-4" /> AI Matchmaking
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Find the right counsel for your specific case.
            </h1>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-8 flex items-center gap-4 max-w-xl">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-sans text-xs font-bold border transition-colors ${
                  step === i ? 'bg-primary border-primary text-primary-foreground' :
                  step > i ? 'bg-primary/20 border-primary text-primary' :
                  'bg-muted border-border text-muted-foreground'
                }`}>
                  {step > i ? <CheckCircle2 className="w-3 h-3" /> : i}
                </div>
                <div className={`h-1 flex-1 rounded-full transition-colors ${
                  step > i ? 'bg-primary/50' : 'bg-border'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">

          {/* STEP 1: Case Description */}
          {step === 1 && (
            <div className="fade-up space-y-6">
              <h2 className="font-display font-bold text-2xl">Describe your legal situation</h2>
              <p className="font-sans text-muted-foreground">
                Write in plain English. Dharma AI will parse the facts, identify the relevant statutes (like the IT Act or BNS), and use semantic search to find lawyers who have handled cases with similar legal characteristics.
              </p>
              
              <div className="relative">
                <textarea
                  className="w-full bg-card border border-border p-6 rounded-sm font-sans text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none shadow-sm min-h-[250px]"
                  placeholder="e.g., I bought a refrigerator online and it was completely defective. The company is refusing to honor the warranty and their customer service ignores my emails. I want to send them a legal notice."
                  value={caseDescription}
                  onChange={e => setCaseDescription(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleNext}
                  disabled={!caseDescription.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium px-8 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Filters */}
          {step === 2 && (
            <div className="fade-up space-y-8">
              <h2 className="font-display font-bold text-2xl">Refine your requirements</h2>
              
              <div className="bg-card border border-border p-8 rounded-sm shadow-sm space-y-8">
                
                <div className="space-y-4">
                  <label className="font-sans font-bold text-sm uppercase tracking-wider text-muted-foreground">Jurisdiction / Location</label>
                  <select 
                    className="w-full p-4 bg-background border border-border rounded-sm font-sans focus:border-primary outline-none"
                    value={filters.location}
                    onChange={e => setFilters({...filters, location: e.target.value})}
                  >
                    <option value="New Delhi">New Delhi, Delhi</option>
                    <option value="Mumbai">Mumbai, Maharashtra</option>
                    <option value="Bengaluru">Bengaluru, Karnataka</option>
                    <option value="Chennai">Chennai, Tamil Nadu</option>
                    <option value="Chandigarh">Chandigarh, Punjab</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="font-sans font-bold text-sm uppercase tracking-wider text-muted-foreground">Maximum Hourly Fee (INR)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="1000" max="15000" step="500"
                      value={filters.maxBudget}
                      onChange={e => setFilters({...filters, maxBudget: Number(e.target.value)})}
                      className="flex-1 accent-primary"
                    />
                    <div className="font-mono font-bold w-24 text-right bg-secondary px-3 py-2 rounded-sm border border-secondary-border">
                      ₹{filters.maxBudget}
                    </div>
                  </div>
                </div>
                
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="bg-background border border-border hover:bg-secondary text-foreground font-sans font-medium px-6 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button 
                  onClick={processMatch}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium px-8 py-3 rounded-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Generate Matches
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Processing / Results */}
          {step === 3 && (
            <div className="fade-up">
              
              {isProcessing ? (
                <div className="py-20 flex flex-col items-center text-center max-w-lg mx-auto">
                  <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-primary">
                      <Network className="w-8 h-8" />
                    </div>
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl mb-4">Vector Search in Progress</h3>
                  
                  <div className="bg-card border border-border w-full p-4 rounded-sm shadow-sm flex items-center gap-4">
                    <Database className="w-5 h-5 text-muted-foreground animate-pulse" />
                    <p className="font-mono text-sm text-left text-muted-foreground w-full">
                      {"> "}{loadingMsg}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-700 rounded-full mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="font-display font-bold text-3xl mb-2">Analysis Complete</h2>
                    <p className="font-sans text-muted-foreground">
                      We found {results.length} verified practitioners whose background structurally aligns with your case narrative.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {results.length > 0 ? (
                      results.map((lawyer, idx) => (
                        <div key={lawyer.id} className="relative">
                          {idx === 0 && (
                            <div className="absolute -top-3 left-4 bg-primary text-primary-foreground font-sans font-bold text-xs uppercase tracking-wide px-3 py-1 rounded-sm shadow-md z-10">
                              Top Recommendation
                            </div>
                          )}
                          <LawyerCard lawyer={lawyer} isMatch={true} />
                        </div>
                      ))
                    ) : (
                      <div className="bg-card border border-border p-8 text-center rounded-sm">
                        <p className="font-sans text-muted-foreground">No matches found with the current strict filters.</p>
                        <button 
                          onClick={() => setStep(2)}
                          className="mt-4 text-primary font-sans text-sm font-medium hover:underline"
                        >
                          Adjust Filters
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-8 border-t border-border flex justify-center">
                    <button 
                      onClick={() => { setStep(1); setCaseDescription(""); setResults([]); }}
                      className="bg-secondary text-foreground border border-secondary-border hover:bg-secondary/80 font-sans font-medium px-6 py-2.5 rounded-sm transition-colors cursor-pointer"
                    >
                      Start New Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
