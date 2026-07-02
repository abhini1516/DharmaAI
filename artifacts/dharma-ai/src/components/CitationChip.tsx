import { useState } from "react";
import { citations } from "@/lib/mock/citations";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookOpen } from "lucide-react";

interface CitationChipProps {
  tag: string;
}

export function CitationChip({ tag }: CitationChipProps) {
  const [open, setOpen] = useState(false);
  
  // Extract key without brackets
  const key = tag.replace('[', '').replace(']', '');
  const citation = citations[key];

  if (!citation) {
    return <span className="font-mono text-sm px-1.5 py-0.5 bg-muted rounded-sm border border-border text-muted-foreground">{tag}</span>;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button 
          className="inline-flex items-center gap-1.5 font-mono text-sm px-2 py-0.5 bg-secondary/50 hover:bg-secondary rounded-sm border border-border text-foreground transition-colors cursor-pointer group align-baseline mx-1"
          aria-label={`View citation details for ${citation.title}`}
        >
          <BookOpen className="w-3 h-3 text-primary group-hover:scale-110 transition-transform" />
          <span>{tag}</span>
        </button>
      </SheetTrigger>
      <SheetContent className="font-serif sm:max-w-md w-full overflow-y-auto border-l border-border bg-background">
        <SheetHeader className="mb-6 border-b border-border pb-6 mt-4">
          <div className="inline-block px-2 py-1 bg-muted rounded-sm border border-border font-mono text-xs text-muted-foreground w-fit mb-4">
            {tag}
          </div>
          <SheetTitle className="font-display text-3xl font-bold text-foreground">
            {citation.title}
          </SheetTitle>
          <SheetDescription className="font-sans text-base text-muted-foreground mt-2">
            {citation.act}, {citation.year}
            <br />
            <span className="text-sm">{citation.section}</span>
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-8">
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Statutory Text</h4>
            <div className="bg-card border border-border p-5 rounded-sm shadow-sm relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-l-sm"></div>
              <p className="leading-relaxed text-foreground text-[1.05rem]">
                "{citation.text}"
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Plain Language Explanation</h4>
            <p className="leading-relaxed text-foreground text-[1.05rem] bg-secondary/30 p-5 rounded-sm border border-border/50">
              {citation.simplified}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
