"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ReadingProgress() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show on individual blog post pages (not /blog listing)
  const isArticlePage = pathname?.startsWith("/blog/") && pathname !== "/blog";

  if (!mounted || !isArticlePage) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}
