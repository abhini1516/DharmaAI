import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { lawyers } from "@/lib/mock/lawyers";
import { LawyerCard } from "@/components/LawyerCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  
  // Extract unique filter options
  const practiceAreas = useMemo(() => {
    const areas = new Set<string>();
    lawyers.forEach(l => l.practiceAreas.forEach(a => areas.add(a)));
    return ["All", ...Array.from(areas).sort()];
  }, []);

  const locations = useMemo(() => {
    const locs = new Set<string>();
    lawyers.forEach(l => locs.add(l.location.city));
    return ["All", ...Array.from(locs).sort()];
  }, []);

  // Filter lawyers
  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            lawyer.about.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPractice = selectedPracticeArea === "All" || lawyer.practiceAreas.includes(selectedPracticeArea);
      const matchesLocation = selectedLocation === "All" || lawyer.location.city === selectedLocation;
      
      return matchesSearch && matchesPractice && matchesLocation;
    });
  }, [searchTerm, selectedPracticeArea, selectedLocation]);

  return (
    <Layout>
      <div className="bg-background border-b border-border py-8">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Verified Bar Directory</h1>
          <p className="text-muted-foreground font-serif text-lg max-w-2xl">
            A curated registry of active practitioners verified against state Bar Council records. Find the right representation for your specific legal needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 font-sans text-sm bg-card border border-border rounded-sm focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 font-display font-bold text-lg border-b border-border pb-2">
              <Filter className="w-4 h-4" /> Filters
            </div>
            
            <div className="space-y-3 font-sans">
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Practice Area</label>
              <select 
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="w-full p-2 bg-card border border-border rounded-sm text-sm outline-none focus:border-primary"
              >
                {practiceAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3 font-sans">
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">City</label>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 bg-card border border-border rounded-sm text-sm outline-none focus:border-primary"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            <div className="pt-4 border-t border-border">
               <div className="bg-secondary/50 p-4 rounded-sm border border-secondary-border">
                 <h4 className="font-sans font-bold text-sm mb-2 flex items-center gap-2">
                   <SlidersHorizontal className="w-4 h-4" /> Not sure who to pick?
                 </h4>
                 <p className="font-sans text-xs text-muted-foreground mb-3">
                   Let our AI matchmaking system analyze your case and rank the best lawyers for your specific situation.
                 </p>
                 <a href="/match" className="block text-center w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 font-sans text-xs font-bold py-2 rounded-sm transition-colors">
                   Use Match Wizard
                 </a>
               </div>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="flex-1">
          <div className="mb-6 font-sans text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{filteredLawyers.length}</span> verified practitioners
          </div>

          {filteredLawyers.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-sm">
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="font-display font-bold text-xl mb-2">No profiles found</h3>
              <p className="font-sans text-muted-foreground text-sm">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedPracticeArea("All"); setSelectedLocation("All");}}
                className="mt-4 text-primary font-sans text-sm font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLawyers.map(lawyer => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
