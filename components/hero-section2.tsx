"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LiquidButton } from "@/components/liquid-glass-button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function HeroSection2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show fixed header when scrolled past 80% of hero section
      const heroHeight = window.innerHeight * 0.7; // 70vh
      setIsScrolled(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Who We Are", href: "/who-we-are" },
    { name: "Members", href: "/members" },
    { name: "Events & Gallery", href: "/events-gallery" },
    { name: "IBAG News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Fixed Header - appears after scrolling */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b-gray-50 shadow-sm shadow-blur-md"
            : "-translate-y-full bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src="/ibag_logo.png"
                  alt="IBAG Logo"
                  className="h-12 w-auto"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Button className="bg-gray-800 hover:bg-red-500 text-white transition-colors duration-200">
                Join Us Today
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white backdrop-blur-md border-t border-gray-200">
              <nav className="flex flex-col space-y-4 px-4 py-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-red-700"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="bg-gray-800 hover:bg-italian-green text-white transition-colors duration-200 mt-4">
                  Join Us Today
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="relative w-full h-[100vh] lg:h-[100vh] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero2-bg.jpg"
          alt="IBAG Hero Background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70"></div>

        {/* Hero Navigation Header - scrolls with hero */}
        <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
          <div className="container mx-auto px-4 pt-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo and Brand */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src="/ibag_logo.png"
                    alt="IBAG Logo"
                    className="h-16 w-auto"
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-red-500 font-medium"
                        : "text-white hover:text-red-500 font-light"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* CTA Button */}
              <div className="hidden md:flex">
                <Button className="bg-white hover:text-white hover:bg-red-500 text-gray-700 transition-colors duration-200">
                  Join Us Today
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/20">
                <nav className="flex flex-col space-y-4 px-4 py-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-base font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? "text-white"
                          : "text-gray-200 hover:text-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white transition-all duration-200 mt-4">
                    Join Us Today
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="absolute bottom-16 left-0 right-0 ">
          <div className="container max-w-8xl mx-auto px-4">
            <motion.div
              className="max-w-8xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[28px] md:text-5xl text-center font-bold text-gray-100 leading-tight mb-4 justify-between">
                Building Bridges Between
                <br /> Italy and Ghana
              </h1>
             
                <p className="text-base md:text-lg text-center text-gray-100 flex-1">
                  Driving partnerships and opportunities between Italy and
                  Ghana.
                </p>

                {/* CTA Button */}
                <div className="hidden md:flex items-center justify-center mt-6">
                  <LiquidButton
                    className="
                    text-white 
                    text-lg 
                    font-light
                    [&>div:first-child]:shadow-[0_0_6px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.5),inset_3px_3px_0.5px_-3px_rgba(156,163,175,0.9),inset_-3px_-3px_0.5px_-3px_rgba(156,163,175,0.85),inset_1px_1px_1px_-0.5px_rgba(156,163,175,0.6),inset_-1px_-1px_1px_-0.5px_rgba(156,163,175,0.6),inset_0_0_6px_6px_rgba(156,163,175,0.12),inset_0_0_2px_2px_rgba(156,163,175,0.06),0_0_12px_rgba(255,255,255,0.15)]"
                  >
                    Join Us Today
                  </LiquidButton>
                </div>

                {/* <motion.button
                className="inline-flex items-center gap-3 bg-white text-red-600 pl-[10px] pr-[15px] py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                whileHover="hover"
                initial="initial"
                variants={{
                  initial: {},
                  hover: {}
                }}
              > */}
                {/* Sliding circular icon */}
                {/* <motion.div 
                  className="w-[35px] h-[35px] bg-red-500 rounded-full flex items-center justify-center z-10 relative"
                  variants={{
                    initial: { x: 0 },
                    hover: { x: 120 }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
                >
                  <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.div> */}

                {/* Text that fades out and reappears on the right */}
                {/* <div className="relative flex-1">
                    <motion.span
                       className="inline-block whitespace-nowrap"
                       variants={{
                         initial: { opacity: 1 },
                         hover: { opacity: 0 }
                       }}
                       transition={{ 
                         duration: 0.2, 
                         ease: "easeOut",
                         opacity: { duration: 0.3, ease: "easeIn" }
                       }}
                     >
                       Join Us Today
                     </motion.span>
                     
                     <motion.span
                         className="absolute left-0 top-0 whitespace-nowrap"
                         style={{ transform: 'translateX(-45px)' }}
                         variants={{
                           initial: { opacity: 0 },
                           hover: { opacity: 1 }
                         }}
                         transition={{ 
                           opacity: {
                             duration: 0.3,
                             delay: 0.3,
                             ease: "easeIn"
                           }
                         }}
                       >
                         Join Us Today
                       </motion.span>
                  </div> */}
                {/* </motion.button> */}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
