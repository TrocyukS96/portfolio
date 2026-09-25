"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TbMenu2, TbSparkles, TbX } from "react-icons/tb";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function EstimateLink({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <span className="relative inline-flex">
      <span
        aria-hidden
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-50 blur-md animate-pulse"
      />
      <Link
        href="/estimate"
        onClick={onNavigate}
        className="estimate-cta group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(45,212,191,0.35)] transition-transform hover:scale-[1.04]"
      >
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:animate-[estimate-sheen_0.8s_ease] group-hover:opacity-100" />
        <TbSparkles size={16} className="relative shrink-0" />
        <span className="relative">Estimate</span>
      </Link>
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    navLinks.forEach((link) => {
      const sectionId = link.href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!isHome) {
      setIsMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-white/5 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={isHome ? "#about" : "/"}
          onClick={isHome ? (e) => handleNavClick(e, "#about") : undefined}
          className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent lg:text-2xl"
        >
          Stanislav<span className="text-white"> Trotcyuk</span>.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={isHome ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  isActive
                    ? "text-primary"
                    : "text-slate-300 hover:text-primary"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <EstimateLink />
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <TbX size={24} /> : <TbMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-lg border-b border-white/5"
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={isHome ? link.href : `/${link.href}`}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-slate-300 hover:text-primary"
                  )}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </Link>
              );
            })}
            <EstimateLink onNavigate={() => setIsMobileMenuOpen(false)} />
          </nav>
        </motion.div>
      )}
    </header>
  );
}
