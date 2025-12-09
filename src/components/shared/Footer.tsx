"use client";

import { Sparkles, Twitter, Instagram, Github, Youtube, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, url: "#" },
    { icon: Instagram, url: "#" },
    { icon: Github, url: "#" },
    { icon: Youtube, url: "#" },
    { icon: Linkedin, url: "#" },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "Chat", href: "/chat" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative py-16 border-t border-border/20 bg-card/30 overflow-hidden">
      {/* subtle background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Main section */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-background" />
                </div>
                <div className="absolute inset-0 w-10 h-10 bg-primary/40 blur-xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-widest text-foreground">
                  ASCENT
                </span>
                <span className="font-display text-xs font-medium tracking-[0.3em] text-primary">
                  PROTOCOL
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Your AI-powered fitness companion with the Solo Leveling system.
              Rise above your limits.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center 
                             text-muted-foreground hover:text-primary hover:bg-primary/10 transition"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:justify-self-end"
          >
            <h4 className="font-display font-semibold text-foreground mb-5 text-sm tracking-wider">
              NAVIGATION
            </h4>

            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-3"
        >
          <p className="text-xs text-muted-foreground">
            © {currentYear} Ascent Protocol. All rights reserved.
          </p>

        
          {/* watermark */}
          <p className="text-xs text-muted-foreground opacity-70">
            Developed by <span className="text-primary font-medium">Faysal Sarker</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
