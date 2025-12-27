"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CalloutVariant = "float" | "margin" | "editorial";

interface CalloutProps {
  children: React.ReactNode;
  variant?: CalloutVariant;
  className?: string;
}

// Typewriter hook for margin variant
function useTypewriter(text: string, speed: number = 30, startDelay: number = 300) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, hasStarted]);

  return { displayedText, isComplete, hasStarted };
}

// Intersection Observer hook for scroll-triggered animations
function useInView(threshold: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

/**
 * VARIANT 1: Float Style
 * Right-floated card with gradient border animation
 * Ties into the hero section's animated gradient
 */
function FloatCallout({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        // Layout: float right on desktop, full-width on mobile
        "sm:float-right sm:ml-6 sm:mb-4 sm:w-[280px] w-full my-6",
        // Base styling
        "relative p-[2px] rounded-lg",
        // Animated gradient border
        "bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 bg-[length:200%_200%]",
        "animate-[gradient-shift_4s_ease_infinite]",
        // Animation on scroll
        "transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
        className
      )}
    >
      {/* Inner card */}
      <div className="bg-white dark:bg-gray-900 rounded-[6px] p-5 h-full">
        {/* Decorative quote mark */}
        <span className="text-4xl leading-none text-blue-400/30 dark:text-blue-500/30 font-serif absolute top-3 left-4">
          "
        </span>
        <div className="pt-4 text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
          {children}
        </div>
        {/* Subtle shadow on hover */}
        <div className="absolute inset-0 rounded-lg shadow-lg shadow-blue-500/0 hover:shadow-blue-500/20 transition-shadow duration-300 pointer-events-none" />
      </div>
    </div>
  );
}

/**
 * VARIANT 2: Margin Note Style
 * Elegant academic-style margin note with typewriter effect
 * Appears in the right margin on desktop, inline on mobile
 */
function MarginCallout({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView();
  const text = typeof children === 'string' ? children : '';
  const { displayedText, isComplete } = useTypewriter(text, 25, isInView ? 200 : 99999);

  // For non-string children, just show them directly
  const isStringContent = typeof children === 'string';

  return (
    <aside
      ref={ref}
      className={cn(
        // Desktop: positioned in margin area
        "lg:absolute lg:right-[-220px] lg:w-[200px] lg:top-0",
        // Mobile/tablet: inline with subtle styling
        "lg:relative w-full my-6 lg:my-0",
        // Base styling
        "text-xs leading-relaxed",
        "text-gray-500 dark:text-gray-400",
        "border-l-2 border-gray-300 dark:border-gray-600 pl-3",
        "lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-3 lg:text-right",
        // Fade in
        "transition-opacity duration-500",
        isInView ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {/* Small label */}
      <span className="block text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1 font-medium">
        Note
      </span>
      {/* Content with typewriter effect for strings */}
      <span className="italic">
        {isStringContent ? (
          <>
            {displayedText}
            {!isComplete && <span className="animate-pulse">|</span>}
          </>
        ) : (
          children
        )}
      </span>
    </aside>
  );
}

/**
 * VARIANT 3: Editorial Style
 * Large centered pull-quote with different typeface
 * Magazine/editorial feel with decorative elements
 */
function EditorialCallout({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView();

  return (
    <blockquote
      ref={ref}
      className={cn(
        // Clear any floats and create space
        "clear-both my-12 mx-auto max-w-xl",
        // Centered layout with padding
        "px-8 py-8 text-center",
        // Different typeface - serif for editorial feel
        "font-serif",
        // Typography
        "text-xl md:text-2xl leading-relaxed",
        "text-gray-800 dark:text-gray-200",
        // Decorative borders
        "border-t border-b border-gray-200 dark:border-gray-700",
        // Animation
        "transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {/* Top decorative element */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-3xl text-blue-500/60 dark:text-blue-400/60">"</span>
          <span className="w-8 h-px bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
      
      {/* Quote content */}
      <p className="m-0 italic">
        {children}
      </p>
      
      {/* Bottom decorative element */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-3xl text-blue-500/60 dark:text-blue-400/60 rotate-180">"</span>
          <span className="w-8 h-px bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
    </blockquote>
  );
}

/**
 * Main Callout Component
 * Use variant prop to switch between styles
 */
export function Callout({ children, variant = "float", className }: CalloutProps) {
  switch (variant) {
    case "float":
      return <FloatCallout className={className}>{children}</FloatCallout>;
    case "margin":
      return <MarginCallout className={className}>{children}</MarginCallout>;
    case "editorial":
      return <EditorialCallout className={className}>{children}</EditorialCallout>;
    default:
      return <FloatCallout className={className}>{children}</FloatCallout>;
  }
}

export default Callout;
