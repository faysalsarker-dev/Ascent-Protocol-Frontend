"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useScroll, useSpring } from "framer-motion";
import DNAAnimationBackground from "./DNAAnimationBackground";
import LevelUpCards, { progressCards } from "./LevelUpCards";

const GeneticProgressSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const velocityTimeout = useRef<NodeJS.Timeout>();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Update scroll progress for DNA
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      setScrollProgress(v);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Get current card colors
  const currentCard = progressCards[currentCardIndex];
  const primaryColor = currentCard?.primaryHex || "#22D3EE";
  const secondaryColor = currentCard?.secondaryHex || "#2DD4BF";

  // Track scroll velocity
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const velocity = Math.abs(currentScrollY - lastScrollY.current);
    lastScrollY.current = currentScrollY;
    
    setScrollVelocity(Math.min(velocity / 8, 6));
    
    if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
    velocityTimeout.current = setTimeout(() => setScrollVelocity(0), 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
    };
  }, [handleScroll]);

  const handleCardInView = useCallback((index: number) => {
    setCurrentCardIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
    >
      {/* Sticky DNA Background - stays in viewport while scrolling */}
      <div className="sticky top-0 left-0 w-full h-screen pointer-events-none z-0">
        <DNAAnimationBackground
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>

      {/* Scrolling Content - uses negative margin to overlay the sticky background */}
      <div className="relative z-10 -mt-[100vh] overflow-x-hidden">
 <div className="sticky top-0 left-0 w-full h-40 bg-linear-to-b from-black via-black/60 to-transparent z-20 pointer-events-none" />



        <LevelUpCards onCardInView={handleCardInView} />


               <div className="sticky bottom-0 left-0 w-full h-36 bg-linear-to-t from-black via-black/60 to-transparent z-20 pointer-events-none -mt-32" />

      </div>


    </section>
  );
};

export default GeneticProgressSection;