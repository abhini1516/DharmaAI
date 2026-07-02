import { Lawyer } from "@/lib/mock/lawyers";
import { Link } from "wouter";
import { MapPin, ShieldCheck, Star, Award, Gavel } from "lucide-react";
import { RankedLawyer } from "@/lib/mock/services/match";

interface LawyerCardProps {
  lawyer: Lawyer | RankedLawyer;
  isMatch?: boolean;
}

export function LawyerCard({ lawyer, isMatch = false }: LawyerCardProps) {
  const rankedLawyer = lawyer as RankedLawyer;
  const hasScore = rankedLawyer.matchScore !== undefined;

  return (
    <div className="group bg-card border border-card-border hover:border-primary/30 rounded-sm shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden">
      {hasScore && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-primary">Match Score</span>
          </div>
          <div className="font-mono font-bold text-2xl text-primary">
            {rankedLawyer.matchScore}%
          </div>
        </div>
      )}
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-bold text-xl">{lawyer.name}</h3>
              {lawyer.verified && (
                <ShieldCheck className="w-4 h-4 text-green-600 fill-green-600/10" />
              )}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground font-sans text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lawyer.location.city}, {lawyer.location.state}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-sm border border-secondary-border">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="font-sans font-bold text-sm">{lawyer.rating}</span>
          </div>
        </div>

        <div className="space-y-3 mb-5 flex-1">
          <div className="font-sans text-sm text-foreground/80 line-clamp-2">
            {lawyer.about}
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {lawyer.practiceAreas.slice(0, 3).map(area => (
              <span key={area} className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border font-sans text-xs">
                <Gavel className="w-3 h-3 mr-1" />
                {area}
              </span>
            ))}
            {lawyer.practiceAreas.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border font-sans text-xs">
                +{lawyer.practiceAreas.length - 3}
              </span>
            )}
          </div>
        </div>

        {hasScore && rankedLawyer.matchReasoning && (
          <div className="mt-auto pt-4 border-t border-border mb-4">
            <p className="font-sans text-sm text-foreground/90 bg-secondary/50 p-3 rounded-sm border border-border/50">
              <span className="font-bold mr-1">Why matched:</span>
              {rankedLawyer.matchReasoning}
            </p>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border font-sans">
          <div className="text-sm font-medium">
            <span className="font-bold">₹{lawyer.hourlyFee}</span>
            <span className="text-muted-foreground"> / hr</span>
          </div>
          <Link href={`/directory/${lawyer.id}`} className="text-sm font-medium text-primary hover:underline underline-offset-4">
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}
