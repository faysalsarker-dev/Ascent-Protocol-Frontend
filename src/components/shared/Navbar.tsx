"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Contact Us", href: "/contact" },
  { title: "Chat with AI", href: "/chat" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  // Scroll hide/show animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false); // scroll down -> hide
      } else {
        setVisible(true); // scroll up -> show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/30 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl md:text-3xl text-primary tracking-tight">
          Ascent <span className="text-accent">Protocol</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-foreground hover:text-primary transition ${
                pathname === link.href
                  ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-accent"
                  : ""
              }`}
            >
              {link.title}
            </Link>
          ))}

          <Link href="/login">
            <Button size="sm" variant="outline">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Register</Button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button>
                <Menu className="w-6 h-6 text-foreground" />
              </button>
            </SheetTrigger>

            <SheetContent  size="sm" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl text-primary">
                  Ascent <span className="text-accent">Protocol</span>
                </h2>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2 px-4 rounded-md transition ${
                      pathname === link.href
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-primary/20"
                    }`}
                  >
                    {link.title}
                  </Link>
                ))}

                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
