/**
 * Revest Loans × Culbertson & Gray Group
 * Co-branded landing page for Sacramento, San Jose, and Lake Tahoe markets
 * Design: Dark navy hero (matches revestcg.manus.space), light sections below
 * Replicates the full design and content of revestcg.manus.space
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  CheckCircle2, ArrowRight, Star, Phone, Mail, MapPin, Users, TrendingUp, Clock, Award
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const APPLY_URL = "https://revesthomes.my1003app.com/633511/register";
const SEARCH_URL = "https://search.culbertsonandgray.com/";
const VALUATION_URL = "https://search.culbertsonandgray.com/seller";

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// Markets
const MARKETS = [
  {
    id: "sacramento",
    label: "CALIFORNIA'S CAPITAL CITY",
    name: "Sacramento",
    tagline: "From East Sacramento bungalows to Elk Grove master-plans — the region's most complete team.",
    stats: ["500+ Closings", "$1B+ Volume", "21-Day Avg Close"],
    bg: "/assets/revest-partner-cg.webp",
    neighborhoods: [
      { name: "East Sacramento", type: "Historic", price: "$685K", change: "+4.2% YoY", desc: "Tree-lined streets, Craftsman bungalows, and walkable access to Midtown dining and the American River Parkway." },
      { name: "Midtown", type: "Urban Core", price: "$595K", change: "+5.1% YoY", desc: "Sacramento's cultural heartbeat — galleries, farm-to-fork restaurants, and Victorian homes within blocks of the Capitol." },
      { name: "Land Park", type: "Family", price: "$720K", change: "+3.8% YoY", desc: "One of Sacramento's most beloved neighborhoods, anchored by William Land Park and the Sacramento Zoo." },
      { name: "Elk Grove", type: "Suburban", price: "$545K", change: "+2.9% YoY", desc: "Top-rated schools, master-planned communities, and easy freeway access make Elk Grove a perennial buyer favorite." },
    ],
  },
  {
    id: "san-jose",
    label: "SILICON VALLEY",
    name: "San Jose",
    tagline: "Tech-buyer specialists with RSU income expertise and same-day fully-underwritten pre-approvals.",
    stats: ["350+ Closings", "$2.1B+ Volume", "97% Offer Win Rate"],
    bg: "/assets/san-jose-market.jpg",
    neighborhoods: [
      { name: "Willow Glen", type: "Charming Village", price: "$1.4M", change: "+3.1% YoY", desc: "Tree-lined streets, boutique shops, and a tight-knit community feel just minutes from downtown San Jose." },
      { name: "Almaden Valley", type: "Premium Suburban", price: "$1.6M", change: "+2.8% YoY", desc: "Award-winning schools, mountain views, and spacious homes make Almaden Valley a top family destination." },
      { name: "Evergreen", type: "Growing Community", price: "$1.1M", change: "+4.5% YoY", desc: "Newer construction, diverse dining, and excellent schools in the rolling hills of East San Jose." },
      { name: "Cambrian Park", type: "Established", price: "$1.3M", change: "+3.6% YoY", desc: "Quiet, established neighborhood with excellent schools and convenient access to major tech campuses." },
    ],
  },
  {
    id: "lake-tahoe",
    label: "ALPINE LIVING",
    name: "Lake Tahoe",
    tagline: "Lakefront estates to mountain retreats — second-home and short-term rental financing specialists.",
    stats: ["200+ Closings", "$850M+ Volume", "STR Financing"],
    bg: "/assets/lake-tahoe-market.jpg",
    neighborhoods: [
      { name: "Incline Village", type: "Lakefront Luxury", price: "$1.8M", change: "+5.2% YoY", desc: "Nevada's premier lakeside community with private beach access, ski resort proximity, and no state income tax." },
      { name: "South Lake Tahoe", type: "Resort Town", price: "$650K", change: "+6.1% YoY", desc: "Year-round resort living with strong short-term rental demand and access to Heavenly Mountain Resort." },
      { name: "Truckee", type: "Mountain Town", price: "$1.1M", change: "+4.8% YoY", desc: "Authentic mountain community with world-class skiing, hiking, and a thriving arts and dining scene." },
      { name: "Kings Beach", type: "Lakeside Community", price: "$780K", change: "+5.5% YoY", desc: "Affordable entry into the Tahoe market with direct lake access and strong vacation rental potential." },
    ],
  },
];

// Real estate team
const RE_TEAM = [
  {
    name: "Colby Culbertson",
    title: "Team Lead & Owner",
    dre: "DRE #01439112",
    phone: "(916) 705-4374",
    photo: "/assets/colby-culbertson.jpg",
    alt: "Colby Culbertson, Team Lead and Owner at Culbertson & Gray Group, Sacramento real estate agent DRE #01439112",
    bio: "Colby leads one of the West's most respected real estate teams. With deep roots in Sacramento and a network spanning four territories, he brings unmatched local knowledge and a track record of results that speaks for itself.",
    tags: ["Team Lead & Owner", "Multi-Territory Expert", "Top 1% Producer"],
  },
  {
    name: "Michael Culbertson",
    title: "Team Lead & Owner",
    dre: "DRE #02019319",
    phone: "(916) 251-6480",
    photo: "/assets/michael-culbertson.jpg",
    alt: "Michael Culbertson, Team Lead and Owner at Culbertson & Gray Group, Sacramento and San Jose real estate agent DRE #02019319",
    bio: "Michael brings a sharp negotiator's mindset and a genuine passion for helping clients find the right home. His expertise spans Sacramento, San Jose, Lake Tahoe, and Wisconsin, giving buyers and sellers a true multi-state advantage.",
    tags: ["Multi-Market Specialist", "Expert Negotiator", "Client-Focused"],
  },
  {
    name: "Jeff Culbertson",
    title: "Founding Partner",
    dre: "DRE #00715870",
    phone: "(916) 996-3900",
    photo: "/assets/jeff-culbertson.jpg",
    alt: "Jeff Culbertson, Founding Partner of Culbertson & Gray Group, veteran Sacramento real estate agent DRE #00715870",
    objectPosition: "center top",
    objectSize: "contain",
    bio: "Jeff is the founding force behind Culbertson & Gray Group. With decades of experience and an encyclopedic knowledge of the regional market, he provides the strategic foundation that has made the team a household name.",
    tags: ["Founding Partner", "Decades of Experience", "Regional Authority"],
  },
];

// Lending team
const LENDING_TEAM = [
  {
    name: "Jim Black",
    title: "Founder & Chief Lending Officer",
    nmls: "NMLS #633511",
    photo: "/assets/jim-black-team.jpg",
    alt: "Jim Black, Founder and Senior Loan Officer at Revest Loans, creative mortgage specialist NMLS #633511",
    bio: "Jim has spent over two decades helping families finance their homes. Known for creative solutions on complex deals, he specializes in situations other lenders walk away from.",
    tags: ["20+ Years Experience", "Creative Financing", "Licensed in CA, OR, FL, WI, TX"],
  },
  {
    name: "Chaz Sampson",
    title: "VP of Operations",
    nmls: "NMLS #1670621",
    photo: "/assets/chaz-sampson.png",
    alt: "Chaz Sampson, VP of Operations at Revest Loans, 15+ years mortgage industry experience NMLS #1670621",
    objectPosition: "center 25%",
    bio: "With 15+ years spanning origination to funding, Chaz ensures every loan closes on time and without drama. His commercial and construction background gives the team a unique edge.",
    tags: ["15+ Years Experience", "Origination to Funding", "Commercial & Construction"],
  },
  {
    name: "Axel Ferrand de Boissard",
    title: "Executive Assistant & MLO",
    nmls: "NMLS #2781438",
    photo: "/assets/axel-headshot.png",
    alt: "Axel Ferrand de Boissard, Executive Assistant and MLO at Revest Loans, NMLS #2781438",
    objectPosition: "center top",
    objectSize: "contain",
    cardBg: "#dce8f5",
    bio: "Axel serves as Executive Assistant to Broker Jim Black, bringing exceptional organization, attention to detail, and a genuine passion for helping clients. He will personally connect with you, listen to your goals, and work alongside you to find a solution that fits your unique needs.",
    tags: ["Executive Assistant", "Client-Focused", "Detail-Oriented"],
  },
  {
    name: "Matt Rohrbach",
    title: "Sr. Loan Officer",
    nmls: "NMLS #448766 | DRE #01439040",
    photo: "/assets/matt-rohrbach-blue.webp",
    alt: "Matt Rohrbach, Sr. Loan Officer at Revest Loans, 20+ years real estate finance experience NMLS #448766",
    objectPosition: "center top",
    bio: "Matt is a seasoned financial services and real estate industry professional with a diverse background in sales, management, credit underwriting, risk and account management, with a focus over the last 20 years in real estate and real estate finance.",
    tags: ["20+ Years Experience", "Credit Underwriting", "Sales & Risk Management"],
  },
  {
    name: "Mesha Dimitruk",
    title: "Sr. Loan Officer",
    nmls: "NMLS #694427",
    photo: "/assets/mesha-dimitruk-blue.webp",
    alt: "Mesha Dimitruk, Senior Loan Officer at Revest Loans, mortgage specialist NMLS #694427",
    objectPosition: "center 25%",
    bio: "Mesha is a seasoned loan officer known for her attention to detail and relentless client advocacy. She excels at finding the right loan product for each unique situation.",
    tags: ["Client Advocacy", "Complex Scenarios", "Detail-Oriented"],
  },
  {
    name: "Patrik Smida",
    title: "Loan Officer",
    nmls: "NMLS #390618",
    photo: "/assets/patrik-smida-blue-wide.webp",
    alt: "Patrik Smida, Loan Officer at Revest Loans, purchase and refinance mortgage specialist NMLS #390618",
    objectPosition: "center top",
    objectSize: "cover",
    cardBg: "#f0f4f8",
    applyUrl: "https://revesthomes.my1003app.com/111111/register",
    bio: "Patrik combines sharp analytical skills with a genuine passion for helping clients navigate the financing process. Known for breaking down complex structures into clear terms.",
    tags: ["Purchase & Refinance", "First-Time Buyers", "Clear Communication"],
  },
  {
    name: "Miguel Flores",
    title: "Senior Loan Officer",
    nmls: "NMLS #450794",
    photo: "/assets/miguel-flores-blue-wide.webp",
    alt: "Miguel Flores, Senior Loan Officer at Revest Loans, bilingual FHA VA USDA mortgage specialist NMLS #450794",
    objectPosition: "center top",
    objectSize: "cover",
    cardBg: "#f0f4f8",
    bio: "Miguel brings deep expertise across conventional, FHA, VA, and USDA loan programs. His bilingual capabilities make him a trusted resource for a wide range of buyers.",
    tags: ["Multi-Program Specialist", "Bilingual (EN/ES)", "VA & FHA Expert"],
  },
  {
    name: "Robert Carrillo",
    title: "Loan Officer",
    nmls: "NMLS #1030702",
    photo: "/assets/rob-carrillo-blue-close.webp",
    alt: "Robert Carrillo, Loan Officer at Revest Loans, 20+ years mortgage experience purchase and refinance specialist NMLS #1030702",
    applyUrl: "https://revesthomes.my1003app.com/1030702/register?time=1782927630170",
    bio: "Robert brings over 20 years of mortgage industry experience, building strong relationships with the nation's leading banks and lending institutions since 2005. He takes pride in offering innovative strategies, clear communication, and a transparent process.",
    tags: ["20+ Years Experience", "Purchase & Refinance", "Creative Financing"],
  },
  {
        name: "Alyshea Henson",
    title: "Loan Officer",
    nmls: "",
    photo: "/assets/alyshea-henson-blue.webp",
    alt: "Alyshea Henson, Loan Officer at Revest Loans, licensed real estate agent and mortgage loan processing specialist",
    bio: "Alyshea launched her real estate career in 2013 and brings a well-rounded perspective to the mortgage industry, with a strong foundation in loan processing and firsthand experience as a licensed real estate agent.",
    tags: ["Licensed Real Estate Agent", "Loan Processing Expert", "Client-First Approach"],
  },
];
// Comparison table
const COMPARISON = [
  { feature: "Real Estate Agent", revest: "Top 1% local expert", traditional: "Random assignment" },
  { feature: "Mortgage Lender", revest: "In-house, same team", traditional: "Separate company" },
  { feature: "Communication", revest: "One call covers both", traditional: "Two separate contacts" },
  { feature: "Pre-Approval Speed", revest: "Same-day, fully underwritten", traditional: "2-5 business days" },
  { feature: "Avg Days to Close", revest: "21 days", traditional: "35+ days" },
  { feature: "Loan Programs", revest: "8 programs available", traditional: "Limited options" },
  { feature: "Local Market Knowledge", revest: "Deep regional expertise", traditional: "Generalist approach" },
  { feature: "Referral Fees", revest: "None — aligned incentives", traditional: "Often hidden" },
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "The coordination between Culbertson & Gray and Revest Loans was seamless. We closed in 22 days and never once felt out of the loop.",
    name: "Marcus & Priya T.",
    location: "First-Time Buyers, East Sacramento",
    stars: 5,
  },
  {
    quote: "Jim found us a financing solution no other lender would touch. Combined with Colby's negotiation, we got $40K under asking on our Land Park home.",
    name: "Derek & Alicia M.",
    location: "Move-Up Buyers, Land Park",
    stars: 5,
  },
  {
    quote: "As investors, we needed speed and certainty. This team delivered both. Third deal with them and counting.",
    name: "Raymond K.",
    location: "Investment Property, Natomas",
    stars: 5,
  },
];

// Contact form
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" });

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true);
      } else {
        toast.error("Something went wrong. Please call us at (925) 285-4898.");
      }
    },
    onError: () => {
      toast.error("Unable to send your message. Please call us at (925) 285-4898.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({
      name: form.name,
      phone: form.phone,
      email: form.email,
      interest: form.interest,
      message: form.message,
      source: "Culbertson & Gray Partner Page",
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-brand-navy" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">Message Received</h3>
        <p className="font-body text-slate-600">We'll be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">Full Name</label>
          <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
            placeholder="Jane Smith" />
        </div>
        <div>
          <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">Phone Number</label>
          <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
            placeholder="(555) 000-0000" />
        </div>
      </div>
      <div>
        <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">Email Address</label>
        <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
          placeholder="jane@example.com" />
      </div>
      <div>
        <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">I'm interested in</label>
        <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors bg-white">
          <option value="">Select an option</option>
          <option value="buying">Buying a Home</option>
          <option value="selling">Selling a Home</option>
          <option value="refinancing">Refinancing</option>
          <option value="investment">Investment Property</option>
          <option value="preapproval">Just Getting Pre-Approved</option>
        </select>
      </div>
      <div>
        <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">Message (optional)</label>
        <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors resize-none"
          placeholder="Tell us about your Sacramento real estate goals..." />
      </div>
      <button type="submit"
        disabled={submitLead.isPending}
        className="btn-press w-full bg-brand-navy text-white font-body font-semibold text-sm py-3 rounded-md hover:bg-[#1a3a6b] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
        {submitLead.isPending ? "Sending..." : "Connect With Our Team"}
      </button>
      <p className="font-body text-xs text-slate-400 text-center">We respond within one business day. No spam, ever.</p>
    </form>
  );
}

export default function PartnerCG() {
  const [activeMarket, setActiveMarket] = useState("sacramento");
  const market = MARKETS.find(m => m.id === activeMarket) || MARKETS[0];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${market.bg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/75 to-brand-navy/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          {/* Co-brand badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
              <div className="w-6 h-6 bg-brand-green rounded flex items-center justify-center">
                <span className="text-brand-navy font-bold text-xs">RL</span>
              </div>
              <span className="font-body text-sm font-semibold text-white">Revest Loans</span>
            </div>
            <span className="font-body text-white/50 text-lg">×</span>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
              <span className="font-body text-sm font-semibold text-white">Culbertson & Gray</span>
            </div>
          </div>

          {/* Market selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {MARKETS.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveMarket(m.id)}
                className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  activeMarket === m.id
                    ? "bg-brand-green text-brand-navy"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
              <span className="font-body text-xs font-semibold text-brand-green tracking-widest uppercase">{market.label}</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-5">
              {market.name}'s Most{" "}
              <span className="text-brand-green italic">Complete</span>
              <br />
              Real Estate{" "}
              <span className="text-brand-green italic">Experience.</span>
            </h1>
            <p className="font-body text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              {market.tagline}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              {market.stats.map(s => (
                <div key={s} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                  <span className="font-body text-sm font-semibold text-brand-green">{s}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={SEARCH_URL} target="_blank" rel="noopener noreferrer"
                className="btn-press bg-brand-green text-brand-navy font-body font-bold text-base px-7 py-3.5 rounded-md hover:bg-[#aef55a] transition-colors flex items-center gap-2">
                Search Homes <ArrowRight size={16} />
              </a>
              <a href={VALUATION_URL} target="_blank" rel="noopener noreferrer"
                className="btn-press bg-white/10 backdrop-blur-sm border border-white/30 text-white font-body font-semibold text-base px-7 py-3.5 rounded-md hover:bg-white/20 transition-colors">
                Home Value
              </a>
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer"
                className="btn-press bg-white/10 backdrop-blur-sm border border-white/30 text-white font-body font-semibold text-base px-7 py-3.5 rounded-md hover:bg-white/20 transition-colors">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,450+", label: "Families Helped" },
              { value: "$4.6B+", label: "In Transactions" },
              { value: "21", label: "Avg Days to Close" },
              { value: "96%", label: "Satisfaction Rate" },
            ].map((s, i) => (
              <FadeSection key={s.label} delay={i * 80}>
                <div className="font-display text-4xl font-bold text-brand-green mb-1">{s.value}</div>
                <div className="font-body text-sm text-white/60">{s.label}</div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeSection>
              <div className="section-divider" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">The Partnership</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
                Two Experts.{" "}
                <span className="italic text-[#1a3a6b]">One Seamless Transaction.</span>
              </h2>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-5">
                When your real estate agent and your lender are on the same team, everything moves faster. No miscommunication between offices. No delays waiting for updates. Just a coordinated team working toward one goal — your successful close.
              </p>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-8">
                Culbertson & Gray brings unmatched regional market knowledge and negotiation expertise. Revest Loans brings creative financing solutions and same-day pre-approvals. Together, they give you an edge that neither could provide alone.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Clock, label: "Faster Closings", sub: "Avg 21 days vs. 35 industry" },
                  { icon: CheckCircle2, label: "In-House Lending", sub: "No third-party delays" },
                  { icon: TrendingUp, label: "Stronger Offers", sub: "Fully underwritten pre-approval" },
                  { icon: MapPin, label: "Local Expertise", sub: "Deep regional roots" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-card rounded-lg flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-brand-navy" />
                    </div>
                    <div>
                      <div className="font-body text-sm font-semibold text-brand-navy">{item.label}</div>
                      <div className="font-body text-xs text-slate-500">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>

            {/* Comparison table */}
            <FadeSection delay={150}>
              <div className="bg-brand-surface rounded-xl overflow-hidden border border-slate-100">
                <div className="grid grid-cols-3 bg-brand-navy text-white text-xs font-body font-semibold uppercase tracking-wide">
                  <div className="p-3 col-span-1">Feature</div>
                  <div className="p-3 text-brand-green">Revest Partnership</div>
                  <div className="p-3 text-white/50">Traditional</div>
                </div>
                {COMPARISON.map((row, i) => (
                  <div key={row.feature} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-brand-surface"}`}>
                    <div className="p-3 font-body text-xs font-medium text-slate-500">{row.feature}</div>
                    <div className="p-3 font-body text-xs text-brand-navy flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-brand-green shrink-0" />
                      {row.revest}
                    </div>
                    <div className="p-3 font-body text-xs text-slate-400">{row.traditional}</div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* REAL ESTATE TEAM */}
      <section className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="mb-12">
            <div className="section-divider" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Your Real Estate Team</span>
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-2">Culbertson & Gray Group</h2>
            <p className="font-body text-base text-slate-600 max-w-xl">One of California and Nevada's most respected real estate teams, with deep roots across all four territories.</p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {RE_TEAM.map((member, i) => (
              <FadeSection key={member.name} delay={i * 80}>
                <div className="card-lift bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 h-full">
                  <div className="relative aspect-[4/3] bg-brand-card overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.alt || member.name}
                      className={`absolute inset-0 w-full h-full ${(member as any).objectSize === 'contain' ? 'object-contain' : 'object-cover'}`}
                      style={{ objectPosition: (member as any).objectPosition || 'center top' }}
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="nmls-badge">{member.dre}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-brand-navy mb-0.5">{member.name}</h3>
                    <p className="font-body text-sm font-medium text-[#1a3a6b] mb-1">{member.title}</p>
                    <a href={`tel:${member.phone.replace(/\D/g, "")}`} className="font-body text-xs text-slate-500 hover:text-brand-navy transition-colors mb-3 block">{member.phone}</a>
                    <p className="font-body text-sm text-slate-600 leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.tags.map(tag => (
                        <span key={tag} className="font-body text-xs bg-brand-card text-[#1a3a6b] px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>

          {/* Lending team */}
          <FadeSection className="mb-12">
            <div className="section-divider" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Your Lending Team</span>
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-2">Revest Loans</h2>
            <p className="font-body text-base text-slate-600 max-w-xl">Creative financing solutions, same-day pre-approvals, and a team that stays in your corner from application to close.</p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LENDING_TEAM.map((member, i) => (
              <FadeSection key={member.name} delay={i * 80}>
                <div className="card-lift bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 h-full">
                  <div className="relative aspect-[4/3] overflow-hidden" style={{ background: (member as any).cardBg || undefined }}>
                    <img
                      src={member.photo}
                      alt={member.alt || member.name}
                      className={`absolute inset-0 w-full h-full ${ (member as any).objectSize === 'contain' ? 'object-contain' : 'object-cover' }`}
                      style={{ objectPosition: (member as any).objectPosition || 'center top' }}
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="nmls-badge">{member.nmls}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-brand-navy mb-0.5">{member.name}</h3>
                    <p className="font-body text-sm font-medium text-[#1a3a6b] mb-3">{member.title}</p>
                    <p className="font-body text-sm text-slate-600 leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.tags.map(tag => (
                        <span key={tag} className="font-body text-xs bg-brand-card text-[#1a3a6b] px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* NEIGHBORHOOD GUIDE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="mb-10">
            <div className="section-divider" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Neighborhood Guide</span>
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-2">{market.name} by the Numbers</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {MARKETS.map(m => (
                <button key={m.id} onClick={() => setActiveMarket(m.id)}
                  className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${activeMarket === m.id ? "bg-brand-navy text-white" : "bg-brand-card text-brand-navy hover:bg-brand-navy/10"}`}>
                  {m.name}
                </button>
              ))}
            </div>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {market.neighborhoods.map((n, i) => (
              <FadeSection key={n.name} delay={i * 80}>
                <div className="card-lift bg-brand-surface rounded-xl p-5 border border-slate-100 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-brand-navy">{n.name}</h3>
                      <span className="font-body text-xs text-slate-500">{n.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-bold text-brand-navy">{n.price}</div>
                      <div className="font-body text-xs text-green-600 font-medium">{n.change}</div>
                    </div>
                  </div>
                  <p className="font-body text-sm text-slate-600 leading-relaxed">{n.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-12">
            <div className="section-divider mx-auto" />
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-3">What Sacramento Clients Say</h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeSection key={t.name} delay={i * 80}>
                <div className="card-lift bg-white rounded-xl p-7 shadow-sm border border-slate-100 h-full">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={16} className="fill-brand-green text-brand-green" />
                    ))}
                  </div>
                  <blockquote className="font-body text-sm text-slate-700 leading-relaxed mb-5 border-l-2 border-brand-green pl-4 italic">
                    "{t.quote}"
                  </blockquote>
                  <div>
                    <div className="font-body text-sm font-semibold text-brand-navy">{t.name}</div>
                    <div className="font-body text-xs text-slate-500">{t.location}</div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeSection>
              <div className="section-divider" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Get In Touch</span>
              <h2 className="font-display text-4xl font-bold text-brand-navy leading-tight mb-6">
                Let's Talk{" "}
                <span className="italic text-[#1a3a6b]">{market.name} Real Estate.</span>
              </h2>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-8">
                Whether you're buying, selling, or just exploring your options, our {market.name} team is ready to give you a straight answer with no pressure and no scripts.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center">
                    <Phone size={18} className="text-brand-navy" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-slate-500 uppercase tracking-wide">Revest Loans</div>
                    <a href="tel:9252854898" className="font-body text-sm font-semibold text-brand-navy hover:text-[#1a3a6b]">(925) 285-4898</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center">
                    <Mail size={18} className="text-brand-navy" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-slate-500 uppercase tracking-wide">Jim Black</div>
                    <a href="mailto:Jim@RevestLoans.com" className="font-body text-sm font-semibold text-brand-navy hover:text-[#1a3a6b]">Jim@RevestLoans.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center">
                    <Mail size={18} className="text-brand-navy" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-slate-500 uppercase tracking-wide">Colby Culbertson</div>
                    <a href="mailto:Colby@culbertsonandgray.com" className="font-body text-sm font-semibold text-brand-navy hover:text-[#1a3a6b]">Colby@culbertsonandgray.com</a>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={SEARCH_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-press bg-brand-green text-brand-navy font-body font-bold text-sm px-5 py-2.5 rounded-md hover:bg-[#aef55a] transition-colors flex items-center gap-2">
                  Search Homes <ArrowRight size={14} />
                </a>
                <a href={APPLY_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-press bg-brand-navy text-white font-body font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-[#1a3a6b] transition-colors">
                  Apply Now
                </a>
              </div>
            </FadeSection>

            <FadeSection delay={150}>
              <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-8">
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-6">Send Us a Message</h3>
                <ContactForm />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
