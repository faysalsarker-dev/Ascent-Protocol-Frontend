"use client"
import { Sparkles, Twitter, Instagram, Youtube, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-border/20 bg-card/30 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-background" />
                </div>
                <div className="absolute inset-0 w-10 h-10 bg-primary/40 blur-xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold tracking-widest text-foreground leading-none">
                  ASCENT
                </span>
                <span className="font-display text-xs font-medium tracking-[0.3em] text-primary leading-none">
                  PROTOCOL
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Your AI-powered fitness companion with the Solo Leveling system. Rise above your limits.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Youtube, Github, Linkedin].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-6 text-sm tracking-wider">PRODUCT</h4>
            <ul className="space-y-3">
              {["Features", "How It Works", "Leaderboards", "Mobile App"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-6 text-sm tracking-wider">COMPANY</h4>
            <ul className="space-y-3">
              {["About Us", "Blog", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-6 text-sm tracking-wider">LEGAL</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Ascent Protocol. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Made with <Sparkles className="h-4 w-4 text-primary" /> for hunters worldwide
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;