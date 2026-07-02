import { lawyers, Lawyer } from '../lawyers';

export interface MatchFilter {
  location?: string;
  practiceArea?: string;
  maxBudget?: number;
  languages?: string[];
}

export interface RankedLawyer extends Lawyer {
  matchScore: number;
  matchReasoning: string;
}

export const matchLawyers = async (caseText: string, filters: MatchFilter): Promise<RankedLawyer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...lawyers];

      // Apply hard filters
      if (filters.location) {
        results = results.filter(l => l.location.city.toLowerCase() === filters.location?.toLowerCase() || l.location.state.toLowerCase() === filters.location?.toLowerCase());
      }
      if (filters.practiceArea) {
        results = results.filter(l => l.practiceAreas.some(pa => pa.toLowerCase().includes(filters.practiceArea!.toLowerCase())));
      }
      if (filters.maxBudget) {
        results = results.filter(l => l.hourlyFee <= filters.maxBudget!);
      }
      if (filters.languages && filters.languages.length > 0) {
        results = results.filter(l => filters.languages!.some(lang => l.languages.includes(lang)));
      }

      // Simulate vector similarity scoring based on case text
      const lowerCaseText = caseText.toLowerCase();
      const ranked: RankedLawyer[] = results.map(l => {
        let score = 60 + Math.floor(Math.random() * 20); // Base score 60-80
        let reasoning = "This lawyer's general practice experience aligns with standard procedural requirements for your location.";

        // Boost scores based on keyword matches
        if ((lowerCaseText.includes("accident") || lowerCaseText.includes("crash")) && l.practiceAreas.includes("Criminal Defense")) {
          score += 15;
          reasoning = `High proximity match: Adv. ${l.name.split(' ')[1]} has specialized trial experience in criminal negligence and motor accident tribunals.`;
        } else if ((lowerCaseText.includes("data") || lowerCaseText.includes("privacy") || lowerCaseText.includes("online")) && l.practiceAreas.includes("Cyber Law")) {
          score += 18;
          reasoning = "Excellent statutory overlap: Background in IT Act and DPDP Act compliance directly addresses your digital privacy concerns.";
        } else if ((lowerCaseText.includes("defective") || lowerCaseText.includes("bought") || lowerCaseText.includes("company")) && l.practiceAreas.includes("Consumer Protection")) {
          score += 16;
          reasoning = "Strong thematic match: Proven track record representing individuals against corporations at the Consumer Disputes Redressal Commission.";
        } else if ((lowerCaseText.includes("rights") || lowerCaseText.includes("police") || lowerCaseText.includes("government")) && l.practiceAreas.includes("Constitutional Law")) {
          score += 19;
          reasoning = "Direct jurisdictional fit: Extensive history filing writ petitions and defending fundamental rights against state overreach.";
        }

        // Cap at 99
        score = Math.min(score, 99);

        return {
          ...l,
          matchScore: score,
          matchReasoning: reasoning
        };
      });

      // Sort by score descending
      ranked.sort((a, b) => b.matchScore - a.matchScore);

      resolve(ranked);
    }, 2000); // Simulate processing time
  });
};
