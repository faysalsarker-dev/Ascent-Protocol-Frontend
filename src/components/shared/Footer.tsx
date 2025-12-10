"use client";

import { Sparkles, Facebook, Instagram, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com/faysal.sharker.140" },
    { icon: Instagram, url: "https://www.instagram.com/faysal_sarker_" },
    { icon: Github, url: "https://github.com/faysalsarker-dev" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/faysalsarker-dev" },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "Chat", href: "/chat" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative py-14 px-6 bg-card/40 border-t border-border/20 backdrop-blur-xl overflow-hidden">
      {/* Soft gradient lights */}
      <div className="absolute -top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-background" />
                </div>
                <div className="absolute inset-0 w-10 h-10 bg-primary/40 blur-xl rounded-xl opacity-50 group-hover:opacity-90 transition" />
              </div>

              <div className="leading-none">
                <span className="text-lg font-bold tracking-wider">ASCENT</span>
                <p className="text-[10px] tracking-[0.3em] text-primary">PROTOCOL</p>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Your AI-powered fitness companion.  
              Level up like a real solo ranker.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-md bg-muted/40 text-muted-foreground 
                            flex items-center justify-center hover:bg-primary/10 hover:text-primary 
                            transition-all"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:justify-self-end"
          >
            <h4 className="text-sm font-semibold tracking-wide mb-4">NAVIGATION</h4>

            <ul className="space-y-2 flex gap-3">
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

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-muted-foreground">
            © {currentYear} Ascent Protocol. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground opacity-80">
            Built by <span className="text-primary font-medium">Faysal Sarker</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
