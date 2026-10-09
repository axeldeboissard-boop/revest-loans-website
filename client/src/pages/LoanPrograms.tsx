/**
 * Loan Programs — Dedicated page with rich detail on all 8 programs
 * Design: Revest Loans brand (navy / white / #c1ff72 green)
 * Typography: Playfair Display (display) + Inter (body)
 */

import { useState, useEffect, useRef } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "wouter";
import {
  Home as HomeIcon,
  Shield,
  TrendingUp,
  Leaf,
  Hammer,
  HandCoins,
  Crown,
  RefreshCw,
  Zap,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Phone,
  Calendar,
  Info,
  Download,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const APPLY_URL = "https://revesthomes.my1003app.com/633511/register";
const CALENDLY_URL = "https://calendly.com/jimblack-revest/30min";

// ─── FadeIn ───────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Program Data ─────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: "fha",
    icon: HomeIcon,
    name: "FHA Loans",
    tagline: "The most accessible path to homeownership",
    color: "bg-blue-50 text-blue-700",
    accentColor: "border-blue-400",
    badgeColor: "bg-blue-100 text-blue-800",
    summary: "FHA loans are government-backed mortgages insured by the Federal Housing Administration. They're designed to make homeownership accessible to buyers who might not qualify for conventional financing — particularly first-time buyers and those with less-than-perfect credit.",
    idealFor: ["First-time homebuyers", "Buyers with credit scores as low as 580", "Those with limited savings for a down payment", "Buyers who've had past credit challenges"],
    keyDetails: [
      { label: "Minimum Down Payment", value: "3.5% (with 580+ credit score)" },
      { label: "Credit Score", value: "580+ for 3.5% down; 500–579 requires 10% down" },
      { label: "Debt-to-Income Ratio", value: "Up to 57% in some cases" },
      { label: "Loan Limits (2024)", value: "$498,257 standard; up to $1,149,825 in high-cost areas like Santa Cruz" },
      { label: "Mortgage Insurance", value: "Required — upfront MIP (1.75%) + annual MIP (0.55%–1.05%)" },
      { label: "Property Types", value: "Primary residence only; 1–4 unit properties" },
    ],
    pros: [
      "Lowest down payment option for buyers with imperfect credit",
      "More flexible debt-to-income requirements than conventional",
      "Seller can contribute up to 6% toward closing costs",
      "Assumable loan — future buyer can take over your rate",
    ],
    cons: [
      "Requires mortgage insurance for the life of the loan (if less than 10% down)",
      "Property must meet FHA minimum standards",
      "Loan limits may not cover high-end properties",
    ],
    cta: "Check Your FHA Eligibility",
  },
  {
    id: "va",
    icon: Shield,
    name: "VA Loans",
    tagline: "Zero down. No PMI. A benefit you've earned.",
    color: "bg-green-50 text-green-700",
    accentColor: "border-green-400",
    badgeColor: "bg-green-100 text-green-800",
    summary: "VA loans are one of the most powerful mortgage benefits available — and one of the most underused. Backed by the U.S. Department of Veterans Affairs, they allow eligible veterans, active-duty service members, and surviving spouses to purchase a home with zero down payment and no private mortgage insurance.",
    idealFor: ["Active-duty military members", "Veterans with honorable discharge", "Surviving spouses of veterans", "National Guard and Reserve members (with qualifying service)"],
    keyDetails: [
      { label: "Down Payment", value: "0% — no down payment required" },
      { label: "Private Mortgage Insurance", value: "None — ever" },
      { label: "Credit Score", value: "No VA minimum; Revest typically works with 580+" },
      { label: "Debt-to-Income Ratio", value: "Flexible — VA focuses on residual income" },
      { label: "Funding Fee", value: "1.25%–3.3% (waived for disabled veterans)" },
      { label: "Loan Limits", value: "No limit for full entitlement; county limits apply if entitlement is reduced" },
    ],
    pros: [
      "Zero down payment — no savings required for the purchase",
      "No private mortgage insurance saves hundreds per month",
      "Competitive interest rates — often lower than conventional",
      "No prepayment penalty",
      "Assumable by another VA-eligible buyer",
    ],
    cons: [
      "VA funding fee required (can be rolled into the loan)",
      "Primary residence only — no investment properties",
      "Property must meet VA minimum property requirements",
    ],
    cta: "Check Your VA Eligibility",
  },
  {
    id: "conventional",
    icon: TrendingUp,
    name: "Conventional Loans",
    tagline: "The most flexible financing for qualified buyers",
    color: "bg-purple-50 text-purple-700",
    accentColor: "border-purple-400",
    badgeColor: "bg-purple-100 text-purple-800",
    summary: "Conventional loans are the most common mortgage type — not backed by a government agency, but conforming to guidelines set by Fannie Mae and Freddie Mac. They offer the most flexibility in property type, loan amount, and terms, and are ideal for buyers with solid credit and stable income.",
    idealFor: ["Buyers with 620+ credit score", "Those with 3–20%+ available for a down payment", "Move-up buyers purchasing a second home or investment property", "Buyers who want to avoid FHA mortgage insurance"],
    keyDetails: [
      { label: "Minimum Down Payment", value: "3% for first-time buyers; 5% for repeat buyers" },
      { label: "Credit Score", value: "620 minimum; best rates at 740+" },
      { label: "Debt-to-Income Ratio", value: "Up to 45–50% with strong compensating factors" },
      { label: "Conforming Loan Limit (2024)", value: "$766,550 standard; $1,149,825 in high-cost counties" },
      { label: "PMI", value: "Required if less than 20% down; drops off at 80% LTV" },
      { label: "Property Types", value: "Primary, second home, investment — 1–4 units" },
    ],
    pros: [
      "PMI cancels automatically at 80% LTV — unlike FHA",
      "No upfront mortgage insurance premium",
      "Available for primary, second homes, and investment properties",
      "Faster appraisal process than government-backed loans",
      "Best rates for buyers with excellent credit",
    ],
    cons: [
      "Stricter credit and income requirements than FHA",
      "PMI required below 20% down",
      "Less flexibility for buyers with past credit issues",
    ],
    cta: "See Your Conventional Rate",
  },
  {
    id: "usda",
    icon: Leaf,
    name: "USDA Loans",
    tagline: "Zero down for eligible rural and suburban properties",
    color: "bg-emerald-50 text-emerald-700",
    accentColor: "border-emerald-400",
    badgeColor: "bg-emerald-100 text-emerald-800",
    summary: "USDA loans are backed by the U.S. Department of Agriculture and offer 100% financing for eligible buyers in designated rural and suburban areas. Many people are surprised to find that \"rural\" includes a wide range of suburban communities — including parts of the markets Revest serves.",
    idealFor: ["Buyers purchasing in eligible rural or suburban areas", "Low-to-moderate income households", "Buyers who want zero down without VA eligibility", "Those looking for below-market interest rates"],
    keyDetails: [
      { label: "Down Payment", value: "0% — no down payment required" },
      { label: "Credit Score", value: "640+ for streamlined processing; lower scores reviewed manually" },
      { label: "Income Limits", value: "Household income must be ≤115% of area median income" },
      { label: "Property Location", value: "Must be in a USDA-eligible rural or suburban area" },
      { label: "Guarantee Fee", value: "1% upfront + 0.35% annual fee (much lower than FHA MIP)" },
      { label: "Property Types", value: "Primary residence only; single-family homes" },
    ],
    pros: [
      "Zero down payment — 100% financing",
      "Lower mortgage insurance costs than FHA",
      "Competitive fixed interest rates",
      "Seller can contribute up to 6% toward closing costs",
      "No loan limit — based on ability to repay",
    ],
    cons: [
      "Geographic restrictions — property must be in eligible area",
      "Income limits apply — not available to higher earners",
      "Primary residence only",
      "Longer processing times than conventional loans",
    ],
    cta: "Check USDA Eligibility",
  },
  {
    id: "construction",
    icon: Hammer,
    name: "Construction Loans",
    tagline: "Finance the build, then convert to a permanent mortgage",
    color: "bg-orange-50 text-orange-700",
    accentColor: "border-orange-400",
    badgeColor: "bg-orange-100 text-orange-800",
    summary: "Construction loans provide short-term financing to cover the cost of building a new home or completing a major renovation. Chaz Sampson brings deep expertise here from his background in commercial and construction lending — this is one of Revest's signature strengths.",
    idealFor: ["Buyers building a custom home from the ground up", "Homeowners doing a major renovation or addition", "Developers building 1–4 unit residential properties", "Buyers who can't find the right home and want to build it"],
    keyDetails: [
      { label: "Loan Term", value: "Typically 12–18 months (construction phase)" },
      { label: "Disbursement", value: "Funds released in draws as construction milestones are met" },
      { label: "Interest", value: "Interest-only during construction on drawn funds" },
      { label: "Conversion", value: "One-time close converts to permanent mortgage at completion" },
      { label: "Down Payment", value: "Typically 20–25% of total project cost" },
      { label: "Credit Score", value: "680+ preferred; strong reserves required" },
    ],
    pros: [
      "Build exactly what you want in the location you want",
      "One-time close option avoids double closing costs",
      "Interest-only payments during construction keep costs manageable",
      "Chaz's commercial lending background means complex builds are handled with expertise",
    ],
    cons: [
      "Higher down payment than standard purchase loans",
      "More documentation required — plans, permits, contractor bids",
      "Timeline risk if construction is delayed",
      "Not available for all property types",
    ],
    cta: "Talk to Chaz About Your Build",
  },
  {
    id: "dpa",
    icon: HandCoins,
    name: "Down Payment Assistance",
    tagline: "Grant and loan programs to bridge the gap to ownership",
    color: "bg-yellow-50 text-yellow-700",
    accentColor: "border-yellow-400",
    badgeColor: "bg-yellow-100 text-yellow-800",
    summary: "Down payment assistance (DPA) programs are state, county, and local initiatives that help qualified buyers cover their down payment and closing costs — sometimes as a grant (free money) and sometimes as a low-interest second loan. California has some of the most robust DPA programs in the country, and Revest's team knows how to stack them effectively.",
    idealFor: ["First-time homebuyers who lack savings for a down payment", "Moderate-income buyers in California", "Buyers who qualify for FHA or conventional but need help with upfront costs", "Teachers, firefighters, healthcare workers, and other workforce buyers"],
    keyDetails: [
      { label: "Program Types", value: "Grants (forgiven), deferred second loans, shared appreciation" },
      { label: "Key Programs", value: "CalHFA MyHome, Dream For All, GSFA Platinum, local city/county programs" },
      { label: "Income Limits", value: "Vary by program and county — typically 80–150% of AMI" },
      { label: "Assistance Amount", value: "Typically 3–10% of purchase price; Dream For All up to 20%" },
      { label: "Eligible Loan Types", value: "FHA, conventional, USDA — varies by program" },
      { label: "First-Time Buyer Requirement", value: "Most programs require no ownership in past 3 years" },
    ],
    pros: [
      "Can cover your entire down payment — get into a home with minimal cash",
      "Some programs are outright grants — no repayment required",
      "Can be stacked with FHA or conventional loans",
      "California programs are among the most generous in the country",
    ],
    cons: [
      "Income and purchase price limits apply",
      "First-time buyer requirement for most programs",
      "Some programs have limited funding and close when exhausted",
      "Slightly longer processing time to coordinate multiple programs",
    ],
    cta: "Find Your DPA Program",
  },
  {
    id: "jumbo",
    icon: Crown,
    name: "Jumbo Loans",
    tagline: "High-value financing for luxury and high-cost markets",
    color: "bg-rose-50 text-rose-700",
    accentColor: "border-rose-400",
    badgeColor: "bg-rose-100 text-rose-800",
    summary: "Jumbo loans finance properties above the conforming loan limits set by Fannie Mae and Freddie Mac. In high-cost markets like Santa Cruz County, where median home prices regularly exceed $1.2M, jumbo financing is a practical necessity for many buyers — not just luxury purchasers.",
    idealFor: ["Buyers in high-cost markets like Santa Cruz, Monterey, and the Bay Area", "Purchasing homes above $1,149,825 in high-cost counties", "High-income buyers with strong credit and reserves", "Move-up buyers upgrading to a premium property"],
    keyDetails: [
      { label: "Loan Minimum", value: "$766,551+ standard; $1,149,826+ in high-cost counties" },
      { label: "Down Payment", value: "Typically 10–20% depending on loan size and lender" },
      { label: "Credit Score", value: "700+ preferred; 720+ for best pricing" },
      { label: "Reserves", value: "6–12 months PITI in liquid assets typically required" },
      { label: "Debt-to-Income Ratio", value: "43–45% maximum; stricter than conforming" },
      { label: "Documentation", value: "Full income documentation required; bank statement options available" },
    ],
    pros: [
      "Finance high-value properties that exceed conforming limits",
      "Competitive rates — often close to conforming rates for strong borrowers",
      "Fixed and adjustable rate options available",
      "Interest-only options available for cash flow management",
    ],
    cons: [
      "Stricter qualification requirements than conforming loans",
      "Larger down payment typically required",
      "More documentation and longer underwriting process",
      "Not all lenders offer jumbo products — Revest has strong jumbo relationships",
    ],
    cta: "Get a Jumbo Rate Quote",
  },
  {
    id: "reverse",
    icon: RefreshCw,
    name: "Reverse Mortgage",
    tagline: "Convert your home equity into tax-free funds",
    color: "bg-slate-50 text-slate-700",
    accentColor: "border-slate-400",
    badgeColor: "bg-slate-100 text-slate-700",
    summary: "A reverse mortgage — formally called a Home Equity Conversion Mortgage (HECM) — allows homeowners 62 and older to convert a portion of their home equity into cash, a line of credit, or monthly payments, without selling the home or making monthly mortgage payments. The loan is repaid when the last borrower leaves the home.",
    idealFor: ["Homeowners age 62 or older", "Those who want to supplement retirement income", "Buyers who want to purchase a new home without monthly mortgage payments (HECM for Purchase)", "Homeowners who want to eliminate their existing mortgage payment"],
    keyDetails: [
      { label: "Minimum Age", value: "62 years old (at least one borrower)" },
      { label: "Equity Required", value: "Significant equity — typically 50%+ of home value" },
      { label: "Loan Limit (2024)", value: "Up to $1,149,825 (HECM limit)" },
      { label: "Monthly Payments", value: "None required — loan balance grows over time" },
      { label: "Repayment Trigger", value: "Sale of home, last borrower moves out or passes away" },
      { label: "FHA Insurance", value: "Required — protects borrower and heirs if loan balance exceeds home value" },
    ],
    pros: [
      "Eliminate your monthly mortgage payment",
      "Proceeds are generally tax-free",
      "Non-recourse loan — heirs never owe more than the home is worth",
      "Retain title and ownership of your home",
      "Line of credit grows over time if unused",
    ],
    cons: [
      "Loan balance grows over time — reduces estate value",
      "Upfront costs higher than conventional refinance",
      "Must maintain home, pay property taxes, and keep insurance current",
      "Age 62+ requirement limits eligibility",
    ],
    cta: "Learn If a Reverse Mortgage Is Right for You",
  },
  {
    id: "bridge",
    name: "Bridge Loan",
    tagline: "Buy your next home before selling your current one",
    icon: Zap,
    color: "bg-amber-100 text-amber-700",
    category: "specialty",
    badge: "Fast Close",
    summary: "A bridge loan is a short-term financing solution that lets you tap into your current home's equity to fund the purchase of a new home — before your existing home sells. It 'bridges' the gap between the two transactions, so you can move on your timeline instead of the market's. Revest specializes in bridge loans and can typically close in 7 to 14 days.",
    idealFor: ["Homeowners who want to buy before selling", "Buyers in competitive markets who can't make contingent offers", "Investors acquiring properties quickly", "Anyone who needs fast, flexible short-term financing"],
    keyDetails: [
      { label: "Loan Term", value: "6 to 12 months (short-term)" },
      { label: "Down Payment", value: "Equity from current home — often no cash needed" },
      { label: "Close Timeline", value: "As fast as 7 to 14 days" },
      { label: "Credit Score", value: "620+ preferred" },
      { label: "Interest Rate", value: "Typically higher than long-term mortgages" },
      { label: "Repayment", value: "Paid off when current home sells or long-term financing is secured" },
    ],
    pros: [
      "Buy your next home without waiting for your current home to sell",
      "Make non-contingent offers — stronger in competitive markets",
      "Fast close — often 7 to 14 days",
      "Flexible repayment tied to your home sale timeline",
      "Revest has deep expertise and a dedicated bridge loan page",
    ],
    cons: [
      "Higher interest rate than conventional long-term mortgages",
      "Short repayment window — typically 6 to 12 months",
      "Requires sufficient equity in your current home",
      "Carrying two properties temporarily adds financial exposure",
    ],
    cta: "Explore Bridge Loan Options",
    ctaUrl: "/bridge-loans",
  },
];

// ─── Program Card ─────────────────────────────────────────────────────────────
function ProgramCard({ prog, index }: { prog: typeof PROGRAMS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = prog.icon;

  return (
    <FadeIn delay={index * 60} className="w-full">
      <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md`}>
        {/* Header */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl ${prog.color} flex items-center justify-center shrink-0`}>
              <Icon size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-xl font-bold text-brand-navy">{prog.name}</h3>
              <p className="font-body text-sm text-slate-500 mt-0.5">{prog.tagline}</p>
            </div>
          </div>

          <p className="font-body text-sm text-slate-600 leading-relaxed mb-5">{prog.summary}</p>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
            {prog.keyDetails.slice(0, 4).map(detail => (
              <div key={detail.label} className="bg-slate-50 rounded-lg px-3 py-2.5">
                <p className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{detail.label}</p>
                <p className="font-body text-sm font-medium text-brand-navy">{detail.value}</p>
              </div>
            ))}
          </div>

          {/* Expand/Collapse */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 font-body text-sm font-semibold text-brand-navy hover:text-[#1a3a6b] transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? "Show less" : "See full details, pros & cons"}
          </button>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className="border-t border-slate-100 px-6 sm:px-8 py-6 bg-slate-50/50">
            {/* Remaining key details */}
            {prog.keyDetails.length > 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {prog.keyDetails.slice(4).map(detail => (
                  <div key={detail.label} className="bg-white rounded-lg px-3 py-2.5 border border-slate-100">
                    <p className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{detail.label}</p>
                    <p className="font-body text-sm font-medium text-brand-navy">{detail.value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Ideal For */}
              <div>
                <h4 className="font-body text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Ideal For</h4>
                <ul className="space-y-2">
                  {prog.idealFor.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-brand-navy shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pros */}
              <div>
                <h4 className="font-body text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Advantages</h4>
                <ul className="space-y-2">
                  {prog.pros.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-600 shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cons */}
            <div className="mb-6">
              <h4 className="font-body text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Things to Know</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {prog.cons.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                    <span className="font-body text-sm text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className={`px-6 sm:px-8 py-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between`}>
          {(prog as any).ctaUrl ? (
            <Link
              href={(prog as any).ctaUrl}
              className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold text-sm px-5 py-2.5 rounded-md hover:bg-[#aef55a] transition-colors"
            >
              {prog.cta} <ArrowRight size={14} />
            </Link>
          ) : (
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold text-sm px-5 py-2.5 rounded-md hover:bg-[#aef55a] transition-colors"
            >
              {prog.cta} <ArrowRight size={14} />
            </a>
          )}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-slate-600 hover:text-brand-navy transition-colors"
          >
            <Calendar size={14} />
            Talk to Jim first
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LoanPrograms() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All Programs" },
    { id: "low-down", label: "Low / No Down Payment" },
    { id: "high-value", label: "High-Value Homes" },
    { id: "specialty", label: "Specialty" },
  ];

  const filterMap: Record<string, string[]> = {
    "all": PROGRAMS.map(p => p.id),
    "low-down": ["fha", "va", "usda", "dpa"],
    "high-value": ["jumbo", "conventional", "construction"],
    "specialty": ["construction", "dpa", "reverse", "bridge"],
  };

  const visiblePrograms = PROGRAMS.filter(p => filterMap[activeFilter].includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="architectural-rules relative bg-brand-navy pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 80% 30%, rgba(193,255,114,0.10) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 10% 70%, rgba(74,144,217,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="absolute right-0 top-0 hidden h-full w-[38%] lg:block">
          <div
            className="architectural-image-frame absolute inset-y-8 right-0 w-full bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url(/assets/revest-property-detail.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-navy/80 to-brand-navy" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 text-brand-green px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-wide mb-6">
              9 Programs Available
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              A Program for{" "}
              <span className="text-brand-green italic">Every Situation.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="font-body text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
              From your first home to your forever home — and everything in between. Explore all 9 loan programs we offer, understand the details, and find the right fit before you apply.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold px-8 py-4 rounded-md hover:bg-[#aef55a] transition-colors text-base"
              >
                Start Your Application <ArrowRight size={16} />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-body font-semibold px-8 py-4 rounded-md hover:bg-white/20 transition-colors text-base"
              >
                <Phone size={16} /> Talk to Jim First
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── NOT SURE WHICH PROGRAM BANNER ── */}
      <section className="border-y border-[#54b947]/25 bg-[#edf6ea] py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-brand-navy font-semibold text-sm text-center sm:text-left">
            Not sure which program fits your situation? Jim's team can figure it out in a 15-minute call — no obligation.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-brand-navy text-white font-body font-bold text-sm px-5 py-2.5 rounded-md hover:bg-[#1a3a6b] transition-colors"
          >
            <Calendar size={14} /> Book a Free 15-Min Call
          </a>
        </div>
      </section>

      {/* ── PROGRAMS LIST ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <FadeIn className="mb-10">
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`font-body text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                    activeFilter === f.id
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "bg-white text-slate-600 border-slate-200 hover:border-brand-navy hover:text-brand-navy"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Program cards */}
          <div className="space-y-6">
            {visiblePrograms.map((prog, i) => (
              <ProgramCard key={prog.id} prog={prog} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <div className="section-divider mx-auto" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Side-by-Side</span>
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-4">
              Compare All 9 Programs
            </h2>
            <p className="font-body text-base text-slate-600 max-w-xl mx-auto">
              Key numbers at a glance. Scroll right on mobile to see all programs.
            </p>
            <div className="mt-6">
              <a
                href="/api/pdf/loan-comparison"
                download="Revest-Loans-Program-Comparison.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-navy text-white font-body text-sm font-semibold shadow-sm hover:bg-[#0d2d7a] active:scale-[0.97] transition-all duration-150"
              >
                <Download className="w-4 h-4" />
                Download Comparison PDF
              </a>
            </div>
          </FadeIn>

          <FadeIn>
            {/* Scroll hint — visible on mobile only */}
            <div className="relative">
              {/* Right-edge fade gradient — signals more content to the right */}
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-40 rounded-r-2xl sm:hidden"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.92))",
                }}
              />
              {/* Swipe hint pill — mobile only */}
              <div className="flex items-center justify-end gap-1.5 mb-2 sm:hidden">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="text-slate-400">
                  <path d="M1 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-body text-xs text-slate-400">Swipe to see all programs</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm" style={{ maxHeight: "520px", overflowY: "auto" }}>
              <table className="w-full min-w-[900px] text-sm font-body">
                <thead className="sticky top-0 z-20">
                  <tr className="bg-brand-navy text-white">
                    <th className="text-left px-4 py-4 font-semibold text-xs uppercase tracking-wide w-36 sticky left-0 bg-brand-navy z-30">Feature</th>
                    {[
                      { id: "conventional", name: "Conventional", color: "bg-blue-500" },
                      { id: "fha", name: "FHA", color: "bg-emerald-500" },
                      { id: "va", name: "VA", color: "bg-red-500" },
                      { id: "usda", name: "USDA", color: "bg-green-600" },
                      { id: "jumbo", name: "Jumbo", color: "bg-purple-500" },
                      { id: "construction", name: "Construction", color: "bg-orange-500" },
                      { id: "bridge", name: "Bridge", color: "bg-amber-500" },
                      { id: "reverse", name: "Reverse", color: "bg-pink-500" },
                      { id: "bank", name: "Bank Statement", color: "bg-indigo-500" },
                    ].map(p => (
                      <th key={p.id} className="px-3 py-4 text-center font-semibold text-xs">
                        <span className={`inline-block w-2 h-2 rounded-full ${p.color} mr-1.5 align-middle`} />
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Min. Down Payment",
                      tooltip: "The percentage of the home's purchase price you pay upfront out of pocket. A higher down payment usually means a lower monthly payment and no mortgage insurance.",
                      values: ["3%", "3.5%", "0%", "0%", "10–20%", "20–25%", "Equity", "N/A", "20–30%"]
                    },
                    {
                      label: "Min. Credit Score",
                      tooltip: "Your credit score is a number (300–850) that lenders use to gauge how reliably you repay debt. Higher scores unlock better rates. N/A means the program doesn't use a traditional credit score.",
                      values: ["620+", "580+", "580+", "640+", "700+", "680+", "620+", "N/A", "620+"]
                    },
                    {
                      label: "Loan Limit",
                      tooltip: "The maximum amount you can borrow under this program. Limits are set by the government or lender and vary by county. High-cost areas like Santa Cruz often have higher limits.",
                      values: ["$806K", "$524K", "No limit", "Area limits", "$3M+", "Varies", "Based on equity", "Based on equity", "Varies"]
                    },
                    {
                      label: "Mortgage Insurance",
                      tooltip: "An extra monthly fee that protects the lender (not you) if you default. It's typically required when your down payment is less than 20%. Once you build enough equity, it can often be removed.",
                      values: ["If < 20% down", "Required", "None", "Required", "None", "Varies", "None", "None", "None"]
                    },
                    {
                      label: "Loan Term",
                      tooltip: "How long you have to repay the loan. A 30-year term means lower monthly payments but more interest paid over time. A 15-year term means higher payments but you build equity faster and pay less total interest.",
                      values: ["15–30 yr", "15–30 yr", "15–30 yr", "30 yr", "15–30 yr", "12–18 mo build", "6–12 mo", "No monthly pmt", "15–30 yr"]
                    },
                    {
                      label: "Close Timeline",
                      tooltip: "The estimated number of days from a complete loan application to the day you get your keys. Revest's average is 23 days — well below the industry average of 45 days.",
                      values: ["21–30 days", "21–30 days", "21–30 days", "30–45 days", "21–30 days", "30–45 days", "7–14 days", "30–45 days", "21–30 days"]
                    },
                    {
                      label: "Best For",
                      tooltip: "The type of borrower or situation this loan program is most commonly used for. Every situation is different — Jim can help you figure out which program fits your specific goals.",
                      values: [
                        "Strong credit buyers",
                        "First-time buyers",
                        "Veterans & military",
                        "Rural homebuyers",
                        "High-value homes",
                        "Building new home",
                        "Buy before selling",
                        "62+ homeowners",
                        "Self-employed buyers"
                      ]
                    },
                    {
                      label: "Available in",
                      tooltip: "The states where Revest Loans is currently licensed to originate this loan type. Revest is licensed in California, Oregon, Florida, Wisconsin, and Texas.",
                      values: ["CA, OR, FL, WI, TX", "CA, OR, FL, WI, TX", "CA, OR, FL, WI, TX", "CA, OR, FL, WI, TX", "CA, OR, FL, WI, TX", "CA, OR, FL, WI, TX", "CA, OR, FL, WI, TX", "CA, OR, FL, WI, TX", "CA, OR, FL, WI, TX"]
                    },
                  ].map((row, ri) => (
                    <tr key={row.label} className={`group transition-colors duration-150 ${ri % 2 === 0 ? "bg-white hover:bg-blue-50" : "bg-slate-50 hover:bg-blue-50"}`}>
                      <td className={`px-4 py-3.5 font-semibold text-brand-navy text-xs uppercase tracking-wide sticky left-0 z-10 transition-colors duration-150 ${ri % 2 === 0 ? "bg-white group-hover:bg-blue-50" : "bg-slate-50 group-hover:bg-blue-50"}`}>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex items-center gap-1 cursor-help">
                                {row.label}
                                <Info className="w-3 h-3 text-slate-400 shrink-0" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs text-xs leading-relaxed">
                              {row.tooltip}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      {row.values.map((val, vi) => (
                        <td key={vi} className="px-3 py-3.5 text-center text-slate-700 text-xs leading-snug">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>{/* end overflow-x-auto */}
            </div>{/* end relative scroll-hint wrapper */}
            <p className="font-body text-xs text-slate-400 mt-3 text-center">
              Figures are general guidelines. Exact terms depend on your credit profile, property, and market conditions. Talk to Jim for numbers specific to your situation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── APPLICATION PROCESS FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <div className="section-divider mx-auto" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Application Process</span>
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-4">
              Common Questions Before You Apply
            </h2>
            <p className="font-body text-base text-slate-600 max-w-xl mx-auto">
              Everything you need to know about what happens from your first conversation with Revest to the day you close.
            </p>
          </FadeIn>

          {/* JSON-LD FAQPage schema for application process questions */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  { "@type": "Question", "name": "How do I get started with Revest Loans?", "acceptedAnswer": { "@type": "Answer", "text": "The easiest first step is a 15-minute call with Jim or one of our loan officers. You can also start your application online at any time — it takes about 10 minutes and there's no obligation. We'll review your situation and tell you exactly which programs you qualify for before you commit to anything." } },
                  { "@type": "Question", "name": "What documents do I need to apply for a mortgage?", "acceptedAnswer": { "@type": "Answer", "text": "For most loan programs you'll need: two years of W-2s and tax returns, recent pay stubs (30 days), two to three months of bank statements, a government-issued ID, and information on any current debts. Self-employed borrowers typically need two years of business and personal tax returns, plus a year-to-date profit and loss statement. We'll give you a specific checklist once we know which program fits your situation." } },
                  { "@type": "Question", "name": "How long does the mortgage application process take?", "acceptedAnswer": { "@type": "Answer", "text": "Pre-approval can happen the same day if you have your documents ready. From full application to closing typically takes 21 to 30 days for conventional and FHA loans. Bridge loans and construction loans can take slightly longer due to their complexity. Revest's average is 23 days to close — faster than the industry average of 45 days." } },
                  { "@type": "Question", "name": "Does applying for a mortgage hurt my credit score?", "acceptedAnswer": { "@type": "Answer", "text": "A mortgage application triggers a hard credit inquiry, which typically reduces your score by 2 to 5 points temporarily. However, if you apply with multiple lenders within a 14 to 45-day window, the credit bureaus count all those inquiries as a single event — so rate shopping doesn't compound the impact. Your score will typically recover within a few months." } },
                  { "@type": "Question", "name": "What is the difference between pre-qualification and pre-approval?", "acceptedAnswer": { "@type": "Answer", "text": "Pre-qualification is a quick, informal estimate based on information you provide verbally or online — no credit check, no documentation. Pre-approval is a full review of your credit, income, and assets, resulting in a conditional commitment letter from the lender. In competitive markets like Santa Cruz, sellers expect a pre-approval letter, not just a pre-qualification. Revest offers same-day pre-approvals." } },
                  { "@type": "Question", "name": "Can I get pre-approved if I'm self-employed?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Self-employed borrowers can qualify through standard documentation (two years of tax returns showing sufficient income) or through bank statement loans, which use 12 to 24 months of bank deposits to calculate income instead of tax returns. This is especially useful if your tax returns show lower income due to business deductions. Jim Black specializes in creative financing for exactly these situations." } },
                  { "@type": "Question", "name": "What happens after I submit my application?", "acceptedAnswer": { "@type": "Answer", "text": "After you submit, your file goes to processing where we collect and verify all your documents. Then it moves to underwriting, where a licensed underwriter reviews everything and issues a conditional approval. You'll satisfy any conditions (like providing additional documents), and then we schedule your closing. Chaz Sampson, our VP of Operations, personally oversees every file from application to funding to make sure nothing falls through the cracks." } },
                  { "@type": "Question", "name": "Are there any fees to apply?", "acceptedAnswer": { "@type": "Answer", "text": "There are no fees to get pre-approved or to have an initial conversation with our team. Standard mortgage fees — like appraisal, title, and origination fees — come later in the process and will be fully disclosed in your Loan Estimate, which we're required to provide within three business days of your application. We never charge referral fees, and we'll walk you through every line item before you commit." } },
                  { "@type": "Question", "name": "Can I lock in my interest rate?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Once you're under contract on a property, you can lock your rate for a set period — typically 30, 45, or 60 days. Rate locks protect you from market movement while your loan is being processed. If rates drop after you lock, some programs allow a one-time float-down. We'll walk you through the best lock strategy based on your timeline and current market conditions." } },
                  { "@type": "Question", "name": "What if I've been denied by another lender?", "acceptedAnswer": { "@type": "Answer", "text": "A denial from one lender doesn't mean you can't get approved elsewhere. Lenders have different overlays — their own internal requirements on top of program guidelines — and some are simply more conservative than others. Revest specializes in the deals other lenders walk away from. Jim and the team will review exactly why you were denied and find a program or strategy that works for your situation." } }
                ]
              })
            }}
          />

          <Accordion type="single" collapsible className="space-y-2">
            {[
              { q: "How do I get started with Revest Loans?", a: "The easiest first step is a 15-minute call with Jim or one of our loan officers. You can also start your application online at any time — it takes about 10 minutes and there's no obligation. We'll review your situation and tell you exactly which programs you qualify for before you commit to anything." },
              { q: "What documents do I need to apply?", a: "For most loan programs you'll need: two years of W-2s and tax returns, recent pay stubs (30 days), two to three months of bank statements, a government-issued ID, and information on any current debts. Self-employed borrowers typically need two years of business and personal tax returns plus a year-to-date profit and loss statement. We'll give you a specific checklist once we know which program fits." },
              { q: "How long does the process take from application to close?", a: "Pre-approval can happen the same day if you have your documents ready. From full application to closing typically takes 21 to 30 days for conventional and FHA loans. Revest's average is 23 days to close — faster than the industry average of 45 days. Bridge loans and construction loans can take slightly longer due to their complexity." },
              { q: "Does applying hurt my credit score?", a: "A mortgage application triggers a hard credit inquiry, which typically reduces your score by 2 to 5 points temporarily. However, if you apply with multiple lenders within a 14 to 45-day window, the credit bureaus count all those inquiries as a single event — so rate shopping doesn't compound the impact. Your score typically recovers within a few months." },
              { q: "What's the difference between pre-qualification and pre-approval?", a: "Pre-qualification is a quick, informal estimate based on information you provide verbally — no credit check, no documentation. Pre-approval is a full review of your credit, income, and assets, resulting in a conditional commitment letter. In competitive markets like Santa Cruz, sellers expect a pre-approval letter. Revest offers same-day pre-approvals." },
              { q: "Can I get pre-approved if I'm self-employed?", a: "Yes. Self-employed borrowers can qualify through standard documentation (two years of tax returns) or through bank statement loans, which use 12 to 24 months of bank deposits to calculate income instead of tax returns. This is especially useful if your returns show lower income due to business deductions. Jim specializes in creative financing for exactly these situations." },
              { q: "What happens after I submit my application?", a: "Your file goes to processing where we collect and verify all documents, then to underwriting where a licensed underwriter issues a conditional approval. You'll satisfy any conditions, and then we schedule your closing. Chaz Sampson, our VP of Operations, personally oversees every file from application to funding to make sure nothing falls through the cracks." },
              { q: "Are there any fees to apply?", a: "No fees to get pre-approved or to have an initial conversation. Standard mortgage fees — appraisal, title, origination — come later and will be fully disclosed in your Loan Estimate within three business days of your application. We never charge referral fees and will walk you through every line item before you commit." },
              { q: "Can I lock in my interest rate?", a: "Yes. Once you're under contract, you can lock your rate for 30, 45, or 60 days. Rate locks protect you from market movement while your loan is being processed. If rates drop after you lock, some programs allow a one-time float-down. We'll walk you through the best lock strategy based on your timeline and current market conditions." },
              { q: "What if I've been denied by another lender?", a: "A denial from one lender doesn't mean you can't get approved elsewhere. Lenders have different internal overlays on top of program guidelines, and some are simply more conservative than others. Revest specializes in the deals other lenders walk away from. Jim and the team will review exactly why you were denied and find a program or strategy that works for your situation." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`apfaq-${i}`} className="border border-slate-200 rounded-xl px-2 bg-white shadow-sm">
                <AccordionTrigger className="font-body text-base font-semibold text-brand-navy text-left hover:no-underline py-5 px-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-base text-slate-600 leading-relaxed px-4 pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-brand-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Ready to find your program?
            </h2>
            <p className="font-body text-slate-300 text-base mb-8 leading-relaxed">
              Jim Black and his team have helped over 9,100 families find the right loan. Same-day pre-approvals available. No referral fees. No pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold px-8 py-4 rounded-md hover:bg-[#aef55a] transition-colors text-base"
              >
                Apply Now <ArrowRight size={16} />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-body font-semibold px-8 py-4 rounded-md hover:bg-white/20 transition-colors text-base"
              >
                <Calendar size={16} /> Book a Call with Jim
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
