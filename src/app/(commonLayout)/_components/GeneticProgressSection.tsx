"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import DNAAnimationBackground from "./DNAAnimationBackground";
import LevelUpCards, { progressCards } from "./LevelUpCards";
import { Dna, ChevronDown } from "lucide-react";

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

  // Header animations
  const headerOpacity = useTransform(smoothProgress, [0, 0.08, 0.15], [1, 1, 0]);
  const headerScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);

  const handleCardInView = useCallback((index: number) => {
    setCurrentCardIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ minHeight: "450vh" }}
    >
      {/* DNA Background - Sticky, always visible in this section */}
      <div className="sticky top-0 left-0 w-full h-screen z-0">
        <DNAAnimationBackground
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>

      {/* Content Layer - positioned over the DNA background */}
      <div className="absolute inset-0 z-10">
        {/* Header Section */}
        <div className="h-screen flex items-center justify-center">
          <motion.div
            style={{ opacity: headerOpacity, scale: headerScale }}
            className="text-center px-4"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm mb-8 transition-colors duration-700"
              style={{ 
                backgroundColor: `${primaryColor}15`,
                borderColor: `${primaryColor}40`
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Dna className="w-5 h-5" style={{ color: primaryColor }} />
              </motion.div>
              <span 
                className="text-sm font-mono uppercase tracking-[0.25em] transition-colors duration-700"
                style={{ color: primaryColor }}
              >
                Genetic Evolution Protocol
              </span>
            </motion.div>
            
            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9]"
            >
              <span className="block">REWRITE</span>
              <span 
                className="block bg-clip-text text-transparent transition-all duration-700"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` 
                }}
              >
                YOUR DNA
              </span>
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-lg mx-auto mb-12"
            >
              Scroll to initiate your genetic transformation sequence
            </motion.p>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-7 h-12 rounded-full border-2 flex justify-center pt-2 transition-colors duration-700"
                style={{ borderColor: `${primaryColor}60` }}
              >
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-700"
                  style={{ backgroundColor: primaryColor }}
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown 
                  className="w-5 h-5 transition-colors duration-700" 
                  style={{ color: `${primaryColor}80` }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Cards Section */}
        <LevelUpCards onCardInView={handleCardInView} />
        
        {/* Final Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center py-40 px-4"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-all duration-700"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 0 60px ${primaryColor}60` 
              }}
            >
              <span className="text-3xl font-black text-black">S</span>
            </div>
          </motion.div>
          
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            EVOLUTION COMPLETE
          </h3>
          <p className="text-white/50 mb-10 max-w-md mx-auto text-lg">
            Your genetic potential has been fully unlocked. Begin your ascent to Monarch status.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 rounded-xl font-bold text-lg overflow-hidden"
          >
            <div 
              className="absolute inset-0 transition-all duration-700"
              style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
            />
            <div 
              className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-70 transition-all duration-500"
              style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
            />
            
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            
            <span className="relative z-10 text-black font-black tracking-wide">
              BEGIN YOUR ASCENT
            </span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Top fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
      
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default GeneticProgressSection;
