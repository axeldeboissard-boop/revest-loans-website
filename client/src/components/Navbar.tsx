/**
 * Revest Loans Navbar
 * Design: Coastal Trust Architecture — white sticky nav, navy text, green CTA
 * Font: DM Sans for nav items, Playfair Display for logo wordmark
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";

const APPLY_URL = "https://revesthomes.my1003app.com/633511/register";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-white shadow-md shadow-slate-200/60"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-22">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 py-1" aria-label="Revest Loans home">
            <img
              src="/assets/revest-official-logo.png"
              alt="Revest Loans"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {isHome ? (
              <>
                <a href="#about" className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200 relative group">
                  About
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#54b947] group-hover:w-full transition-all duration-200" />
                </a>
                <a href="#team" className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200 relative group">
                  Team
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#54b947] group-hover:w-full transition-all duration-200" />
                </a>
                <Link href="/loan-programs" className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200 relative group">
                  Loan Programs
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#54b947] group-hover:w-full transition-all duration-200" />
                </Link>
                <Link href="/bridge-loans" className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200 relative group">
                  Bridge Loans
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#54b947] group-hover:w-full transition-all duration-200" />
                </Link>
                <Link href="/beat-the-rate" className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200 relative group">
                  Beat the Rate
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#54b947] group-hover:w-full transition-all duration-200" />
                </Link>
                <a href="#partners" className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200 relative group">
                  Partners
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#54b947] group-hover:w-full transition-all duration-200" />
                </a>
                <a href="#contact" className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200 relative group">
                  Contact
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#54b947] group-hover:w-full transition-all duration-200" />
                </a>
              </>
            ) : (
              <>
                <Link href="/" className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200">
                  Home
                </Link>
                <a
                  href="https://freemodel-jq4u8gba.manus.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-medium text-[#0f2044] hover:text-[#54b947] transition-colors duration-200"
                >
                  Freemodel
                </a>
                <Link href="/partners/culbertson-gray" className={`font-body text-sm font-medium transition-colors duration-200 ${location === "/partners/culbertson-gray" ? "text-[#54b947]" : "text-[#0f2044] hover:text-[#54b947]"}`}>
                  CA Markets
                </Link>
                  <Link href="/beat-the-rate" className={`font-body text-sm font-medium transition-colors duration-200 ${location === "/beat-the-rate" ? "text-[#54b947]" : "text-[#0f2044] hover:text-[#54b947]"}`}>
                  Beat the Rate
                </Link>
              </>
            )}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:9252854898"
              className="flex items-center gap-1.5 font-body text-sm font-medium text-[#0f2044] hover:text-[#1a3a6b] transition-colors"
            >
              <Phone size={14} />
              (925) 285-4898
            </a>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press bg-brand-green text-white font-body font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#439a39] transition-colors duration-200"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-brand-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          {isHome ? (
            <>
              <a href="#about" className="block font-body text-sm font-medium text-brand-navy py-2">About</a>
              <a href="#team" className="block font-body text-sm font-medium text-brand-navy py-2">Team</a>
              <Link href="/loan-programs" className="block font-body text-sm font-medium text-brand-navy py-2">Loan Programs</Link>
              <Link href="/bridge-loans" className="block font-body text-sm font-medium text-brand-navy py-2">Bridge Loans</Link>
              <Link href="/beat-the-rate" className="block font-body text-sm font-medium text-brand-navy py-2">Beat the Rate</Link>
              <a href="#partners" className="block font-body text-sm font-medium text-brand-navy py-2">Partners</a>
              <a href="#contact" className="block font-body text-sm font-medium text-brand-navy py-2">Contact</a>
            </>
          ) : (
            <>
              <Link href="/" className="block font-body text-sm font-medium text-brand-navy py-2">Home</Link>
              <a href="https://freemodel-jq4u8gba.manus.space" target="_blank" rel="noopener noreferrer" className="block font-body text-sm font-medium text-brand-navy py-2">Freemodel</a>
              <Link href="/partners/culbertson-gray" className="block font-body text-sm font-medium text-brand-navy py-2">CA Markets</Link>
              <Link href="/beat-the-rate" className="block font-body text-sm font-medium text-brand-navy py-2">Beat the Rate</Link>
            </>
          )}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a href="tel:9252854898" className="font-body text-sm font-medium text-brand-navy py-2">(925) 285-4898</a>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green text-brand-navy font-body font-semibold text-sm px-5 py-2.5 rounded-md text-center"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
