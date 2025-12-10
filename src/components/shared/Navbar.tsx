"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Menu, X } from "lucide-react";
import NavAction from "../modules/appbar/navActiop";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Contact Us", href: "/contact" },
  { title: "Chat with AI", href: "/chat" },
];

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(!(y > lastY && y > 50));
      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full z-99 bg-background/70 backdrop-blur-xl border-b border-border/30"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary"
            >
              Ascent <span className="text-accent">Protocol</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group text-sm font-medium"
                >
                  <span
                    className={`${
                      pathname === link.href
                        ? "text-primary"
                        : "text-foreground/80 group-hover:text-primary transition"
                    }`}
                  >
                    {link.title}
                  </span>

                  <motion.span
                    layoutId="navbar-underline"
                    className={`absolute left-0 -bottom-1 h-0.5 bg-accent ${
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full transition-all duration-300"
                    }`}
                  />
                </Link>
              ))}

              <NavAction user={user} />
            </nav>

            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                  <Menu className="w-6 h-6" />
                </SheetTrigger>

                <SheetContent side="right" className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl text-primary">
                      Ascent <span className="text-accent">Protocol</span>
                    </h2>
                    <X className="w-6 h-6" onClick={() => setOpen(false)} />
                  </div>

                  <div className="mt-8 flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`block py-2 px-3 rounded-md ${
                            pathname === link.href
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground hover:bg-primary/15"
                          }`}
                        >
                          {link.title}
                        </Link>
                      </motion.div>
                    ))}

                    {user ? (
                      <Link href="/logout" onClick={() => setOpen(false)}>
                        <Button className="w-full" variant="outline">
                          Logout
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setOpen(false)}>
                          <Button className="w-full" variant="outline">
                            Login
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setOpen(false)}>
                          <Button className="w-full">Register</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}