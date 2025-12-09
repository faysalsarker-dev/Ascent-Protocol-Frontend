"use client";
import { Button } from '@/src/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, Crown, Gift, Clock, Sparkles, Star, Shield, Rocket } from "lucide-react";

import Link from 'next/link';
const GoldenCard = () => {
    return (
        <div>
              <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Golden Card */}
          <div className="relative">
            {/* Outer Glow */}
            <motion.div 
              className="absolute -inset-1 bg-linear-to-r from-accent via-primary to-secondary rounded-3xl blur-xl opacity-50"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Main Card */}
            <div className="relative golden-border rounded-3xl p-2">
              <div className="bg-card-gradient rounded-2xl p-8 md:p-12 lg:p-16 backdrop-blur-xl border border-accent/20">
                {/* Top Badge */}
                <motion.div 
                  className="flex justify-center mb-8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border-2 border-accent/50">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="h-6 w-6 text-accent" />
                    </motion.div>
                    <span className="font-display text-lg font-bold text-accent tracking-wider">
                      GOLDEN OPPORTUNITY
                    </span>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="h-6 w-6 text-accent" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Main Content */}
                <div className="text-center space-y-8">
                  <motion.h2 
                    className="font-display text-3xl md:text-4xl lg:text-6xl font-black leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-foreground">ACCESS </span>
                    <span className="bg-linear-to-r from-accent via-primary to-secondary bg-clip-text text-transparent animated-gradient">
                      EVERYTHING
                    </span>
                    <br />
                    <span className="text-foreground">FOR </span>
                    <motion.span 
                      className="text-accent text-glow-accent"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      FREE
                    </motion.span>
                  </motion.h2>

                  <motion.p 
                    className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-body"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    For a <span className="text-accent font-semibold">limited time</span>, the entire Ascent Protocol system is 
                    <span className="text-primary font-semibold"> completely free</span>. 
                    No hidden fees. No credit card required. Full access to all features.
                  </motion.p>

                  {/* Features Grid */}
                  <motion.div 
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    {[
                      { icon: Zap, text: "AI Personal Coach", color: "text-primary" },
                      { icon: Rocket, text: "Solo Leveling System", color: "text-secondary" },
                      { icon: Shield, text: "Unlimited Missions", color: "text-success" },
                      { icon: Star, text: "All Achievements", color: "text-accent" },
                    ].map((item, index) => (
                      <motion.div 
                        key={item.text}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border/30"
                        whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted) / 0.5)" }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                        <span className="text-sm font-medium text-foreground">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.div 
                    className="flex flex-col items-center gap-6 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link href="/register">
                      <Button  size="lg" className="group text-lg px-12">
                        <Gift className="h-6 w-6 group-hover:animate-bounce" />
                        Claim Your Free Access
                        <Sparkles className="h-5 w-5" />
                      </Button>
                    </Link>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                      {[
                        { icon: Clock, text: "Limited time offer" },
                        { icon: Shield, text: "No credit card required" },
                        { icon: Zap, text: "Instant access" },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 text-accent" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
    );
};

export default GoldenCard;