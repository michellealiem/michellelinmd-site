"use client";

import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface Paper {
  title: string;
  year: string;
  url: string;
}

interface Publication {
  theme: string;
  description: string;
  totalPapers: number;
  papers: readonly Paper[];
}

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const visiblePapers = isExpanded ? publication.papers : publication.papers.slice(0, 2);
  const hasMorePapers = publication.papers.length > 2;

  return (
    <div
      className="flex flex-col h-full p-4 border rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-sm mb-2">{publication.theme}</h3>
        {hasMorePapers && (
          <ChevronDownIcon
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200",
              isExpanded ? "rotate-180" : ""
            )}
          />
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-3">{publication.description}</p>
      
      <div className={cn(
        "space-y-2",
        isExpanded && hasMorePapers && "max-h-64 overflow-y-auto pr-2"
      )}>
        {visiblePapers.map((paper, idx) => (
          <a
            key={idx}
            href={paper.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block text-xs link-underline w-fit",
              paper.url ? "text-blue-600" : "text-muted-foreground"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!paper.url) e.preventDefault();
            }}
          >
            {paper.title} ({paper.year})
          </a>
        ))}
      </div>

      {hasMorePapers && (
        <p className="text-xs text-muted-foreground mt-3">
          {isExpanded 
            ? "Click to collapse" 
            : `+ ${publication.papers.length - 2} more papers`}
        </p>
      )}
    </div>
  );
}
