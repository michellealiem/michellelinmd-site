"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterMarginNotesProps {
  htmlContent: string;
}

export function TypewriterMarginNotes({ htmlContent }: TypewriterMarginNotesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    const blockquotes = containerRef.current.querySelectorAll("blockquote");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(blockquotes).indexOf(entry.target as HTMLQuoteElement);
            
            if (!hasAnimated.has(index)) {
              const blockquote = entry.target as HTMLQuoteElement;
              const paragraph = blockquote.querySelector("p");
              
              if (paragraph) {
                const fullText = paragraph.textContent || "";
                paragraph.textContent = "";
                paragraph.style.visibility = "visible";
                
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                  if (charIndex < fullText.length) {
                    paragraph.textContent += fullText[charIndex];
                    charIndex++;
                  } else {
                    clearInterval(typeInterval);
                  }
                }, 30); // 30ms per character
                
                setHasAnimated(prev => new Set(prev).add(index));
              }
            }
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    blockquotes.forEach((blockquote) => {
      const paragraph = blockquote.querySelector("p");
      if (paragraph) {
        // Store original text and hide initially
        paragraph.dataset.fullText = paragraph.textContent || "";
        paragraph.textContent = "";
      }
      observer.observe(blockquote);
    });

    return () => observer.disconnect();
  }, [htmlContent]);

  return (
    <article
      ref={containerRef}
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default TypewriterMarginNotes;
