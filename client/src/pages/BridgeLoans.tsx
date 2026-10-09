/**
 * Revest Loans — Bridge Loans Dedicated Page
 * Design: Coastal Trust Architecture
 * Light theme with navy/green accents, SEO-optimized content for bridge loan searches
 * Fonts: Playfair Display (headings) + DM Sans (body)
 */
import { useState, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, ChevronDown, Phone, Calendar,
  Home as HomeIcon, TrendingUp, Clock, Shield, DollarSign, Users, Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const APPLY_URL = "https://revesthomes.my1003app.com/633511/register";
const CALENDLY_URL = "https://calendly.com/jimblack-revest/30min";

// FAQ accordion item with smooth height animation
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
        open
          ? "border-[#1a3a6b] shadow-md shadow-slate-100"
          : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
      }`}
      onClick={() => setOpen(!open)}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className={`font-body text-base font-semibold transition-colors duration-200 ${
          open ? "text-[#1a3a6b]" : "text-brand-navy"
        }`}>{q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
          open ? "bg-[#c1ff72] rotate-180" : "bg-slate-100"
        }`}>
          <ChevronDown size={14} className="text-brand-navy" />
        </span>
      </button>
      {/* Animated content using CSS grid trick for smooth height transition */}
      <div
        ref={contentRef}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 260ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-0">
            <div className="border-t border-slate-100 pt-4">
              <p className="font-body text-sm text-slate-600 leading-relaxed">{a}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BridgeLoans() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="architectural-rules pt-32 pb-20 bg-brand-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 60%, #54b947 0%, transparent 45%), radial-gradient(circle at 85% 15%, #4a90d9 0%, transparent 40%)",
          }}
        />
        <div className="absolute right-0 top-0 hidden h-full w-[46%] lg:block">
          <div
            className="architectural-image-frame absolute inset-y-0 right-0 w-full bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url(/assets/revest-property-detail.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-navy/70 to-brand-navy" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-green">
                Jim Black's Signature Specialty
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Bridge Loans:{" "}
              <span className="italic text-brand-green">Buy Before You Sell.</span>
            </h1>
            <p className="font-body text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Don't let the timing of your home sale hold you back from buying the property you actually want. Revest Loans specializes in bridge financing that lets you move on your terms — not the market's.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-green text-white font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#439a39] transition-colors duration-200"
              >
                <Calendar size={16} />
                Book a Free Call with Jim
              </a>
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                Start Your Application
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
        {/* Stats band */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "23+", label: "Years Specializing in Bridge Loans" },
              { value: "9,100+", label: "Families Helped" },
              { value: "Top 1%", label: "Mortgage Brokers Nationally" },
              { value: "Same Day", label: "Pre-Approval Turnaround" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
              >
                <p className="font-display text-3xl font-bold text-brand-green mb-1">{stat.value}</p>
                <p className="font-body text-xs text-slate-400 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS A BRIDGE LOAN */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-divider mb-4" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">
                What Is a Bridge Loan?
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
                The Gap Between{" "}
                <span className="italic text-[#1a3a6b]">Where You Are and Where You're Going.</span>
              </h2>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-5">
                A bridge loan is a short-term financing solution — typically 6 to 12 months — that lets you borrow against the equity in your current home to fund the purchase of your next one. It "bridges" the gap between buying and selling, so you never have to choose between the two.
              </p>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-5">
                In competitive markets like Santa Cruz, Sacramento, and Portland, contingent offers are often passed over in favor of clean, non-contingent bids. A bridge loan gives you the buying power of a cash-like offer while your current home is still on the market.
              </p>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-8">
                Jim Black has been structuring bridge loans for over two decades. He's one of the few lenders in the country who truly specializes in this product — understanding not just the mechanics, but the timing, the strategy, and the right structure for each client's situation.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "No sale contingency required",
                  "Use existing home equity",
                  "Close in as little as 10 days",
                  "Available in CA, OR, FL, WI, TX",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-brand-navy shrink-0" />
                    <span className="font-body text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual: equity diagram */}
            <div className="bg-brand-surface rounded-2xl p-8 border border-slate-100">
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500 mb-6">
                How Your Equity Works for You
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: HomeIcon,
                    label: "Your Current Home",
                    sub: "Estimated value: $900,000",
                    bar: 100,
                    barColor: "bg-slate-200",
                  },
                  {
                    icon: DollarSign,
                    label: "Your Existing Mortgage",
                    sub: "Remaining balance: $400,000",
                    bar: 44,
                    barColor: "bg-slate-400",
                  },
                  {
                    icon: TrendingUp,
                    label: "Available Equity",
                    sub: "Up to 80% LTV: ~$320,000",
                    bar: 36,
                    barColor: "bg-brand-navy",
                  },
                  {
                    icon: ArrowRight,
                    label: "Bridge Loan Funds",
                    sub: "Used as down payment on new home",
                    bar: 36,
                    barColor: "bg-brand-green",
                  },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <row.icon size={14} className="text-brand-navy" />
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-brand-navy">{row.label}</p>
                        <p className="font-body text-xs text-slate-500">{row.sub}</p>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${row.barColor} transition-all duration-700`}
                        style={{ width: `${row.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs text-slate-400 mt-6 italic">
                * Example figures for illustration only. Actual amounts depend on your home value, existing mortgage, and lender guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 5 STEPS */}
      <section className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-4" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">
              The Process
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
              How a Bridge Loan Works
            </h2>
            <p className="font-body text-base text-slate-600 max-w-2xl mx-auto">
              From first call to keys in hand, Jim walks you through every step. Here's what the typical bridge loan timeline looks like.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                icon: Phone,
                title: "Free Strategy Call",
                desc: "Jim reviews your current home's equity, your target purchase price, and your timeline to determine if a bridge loan is the right fit.",
              },
              {
                step: "02",
                icon: Shield,
                title: "Same-Day Pre-Approval",
                desc: "Once qualified, you receive a fully underwritten pre-approval letter — typically the same business day — so you can make offers immediately.",
              },
              {
                step: "03",
                icon: HomeIcon,
                title: "Make a Clean Offer",
                desc: "Submit a non-contingent offer on your new home. No sale contingency means sellers take you seriously, even in competitive bidding situations.",
              },
              {
                step: "04",
                icon: Clock,
                title: "Close on Your New Home",
                desc: "Bridge loan funds are used for your down payment. You close on the new property and move in on your schedule — before your old home sells.",
              },
              {
                step: "05",
                icon: TrendingUp,
                title: "Sell & Pay Off",
                desc: "List your current home at the right price, without pressure. When it sells, the bridge loan is paid off at closing. Done.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative"
              >
                <div className="absolute -top-3 left-6">
                  <span className="font-mono-brand text-xs font-bold text-brand-navy bg-brand-green px-2.5 py-1 rounded-full">
                    {item.step}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center mb-4 mt-3">
                  <item.icon size={18} className="text-brand-navy" />
                </div>
                <h3 className="font-body text-sm font-bold text-brand-navy mb-2">{item.title}</h3>
                <p className="font-body text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-divider mb-4" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">
                Who It's For
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
                Bridge Loans Are the Right Tool When…
              </h2>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-8">
                Not every buyer needs a bridge loan — but for the right situation, it's the most powerful tool in the mortgage toolkit. Here are the scenarios where Jim sees them work best.
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: HomeIcon,
                    title: "You Found Your Dream Home — But Haven't Listed Yet",
                    desc: "The perfect property just hit the market and you can't afford to wait. A bridge loan lets you act now without scrambling to sell first.",
                  },
                  {
                    icon: Users,
                    title: "You're Competing Against Cash Buyers",
                    desc: "In markets like Santa Cruz and Sacramento, cash offers dominate. A bridge loan lets you submit a clean, non-contingent offer that competes on equal footing.",
                  },
                  {
                    icon: TrendingUp,
                    title: "You Want to Maximize Your Sale Price",
                    desc: "Selling under pressure leads to lower offers. A bridge loan removes the urgency so you can list at the right time, stage properly, and hold out for the best price.",
                  },
                  {
                    icon: Clock,
                    title: "You're Relocating and Need to Move Quickly",
                    desc: "Job changes, family situations, or retirement moves often require fast action. Bridge loans can close in as little as 10 days.",
                  },
                  {
                    icon: DollarSign,
                    title: "You Have Significant Equity but Limited Liquid Cash",
                    desc: "Your wealth is in your home. A bridge loan unlocks that equity as usable capital for your next purchase without requiring a sale first.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-brand-surface border border-slate-100 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-brand-navy" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-bold text-brand-navy mb-1">{item.title}</p>
                      <p className="font-body text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA card + market callout */}
            <div className="space-y-6 lg:sticky lg:top-28">
              {/* Book a call card */}
              <div className="bg-brand-navy rounded-2xl p-8 text-white">
                <div className="w-12 h-12 rounded-xl bg-brand-green/15 border border-brand-green/30 flex items-center justify-center mb-5">
                  <Calendar size={20} className="text-brand-green" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  Not Sure If a Bridge Loan Is Right for You?
                </h3>
                <p className="font-body text-sm text-slate-300 leading-relaxed mb-6">
                  Jim offers a free 30-minute strategy call to review your situation, run the numbers, and give you an honest answer — no pressure, no obligation.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-brand-green text-brand-navy font-body font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-[#d4ff8a] transition-colors duration-200"
                >
                  <Calendar size={16} />
                  Book a Free 30-Min Call
                </a>
                <p className="font-body text-xs text-slate-500 text-center mt-3">
                  No obligation. Jim will give you a straight answer.
                </p>
              </div>

              {/* Markets served */}
              <div className="bg-brand-surface rounded-2xl p-6 border border-slate-100">
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
                  Markets We Serve
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { state: "California", cities: "Santa Cruz, Sacramento, San Jose, Lake Tahoe" },
                    { state: "Oregon", cities: "Portland, Eugene, Bend" },
                    { state: "Florida", cities: "Miami, Orlando, Tampa" },
                    { state: "Wisconsin", cities: "Milwaukee, Madison, Green Bay" },
                    { state: "Texas", cities: "Austin, Houston, Dallas" },
                  ].map((m) => (
                    <div key={m.state} className="bg-white rounded-xl p-3 border border-slate-100">
                      <p className="font-body text-xs font-bold text-brand-navy">{m.state}</p>
                      <p className="font-body text-[10px] text-slate-500 leading-snug mt-0.5">{m.cities}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much can I borrow with a bridge loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most bridge loans allow you to borrow up to 80% of your current home's value, minus any existing mortgage balance. For example, if your home is worth $900,000 and you owe $400,000, you could potentially access up to $320,000 in bridge financing."
                }
              },
              {
                "@type": "Question",
                "name": "What are the interest rates on bridge loans?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bridge loan rates are typically 1-2% higher than a conventional 30-year mortgage, reflecting the short-term nature and added flexibility. However, the cost is usually far outweighed by the ability to make a competitive offer and avoid a rushed sale at a lower price."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to make monthly payments on the bridge loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on the structure Jim sets up for you. Some bridge loans are interest-only with a balloon payment at the end. Others allow deferred payments until the existing home sells. Jim will walk you through the options and recommend the structure that fits your cash flow."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if my current home doesn't sell quickly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bridge loans are typically structured for 6-12 months, with extension options available. Jim builds in enough runway for a comfortable sale, not a fire sale. If your home takes longer than expected, he can often arrange an extension before the term expires."
                }
              },
              {
                "@type": "Question",
                "name": "Can I get a bridge loan if I already have a mortgage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Most bridge loan borrowers have an existing mortgage on their current home. Jim factors in both the bridge loan and your current mortgage when qualifying you, and structures the deal so the combined payment is manageable during the transition period."
                }
              },
              {
                "@type": "Question",
                "name": "How fast can a bridge loan close?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Revest Loans can typically issue a same-day pre-approval and close a bridge loan in as little as 10 business days, depending on the property and title work. Jim's in-house process eliminates the third-party delays that slow down other lenders."
                }
              },
              {
                "@type": "Question",
                "name": "Is a bridge loan available in my state?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Revest Loans is licensed to originate bridge loans in California, Oregon, Florida, Wisconsin, and Texas. If you're in one of those states, Jim can help. If you're outside those states, he can often refer you to a trusted partner lender."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between a bridge loan and a HELOC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A HELOC (Home Equity Line of Credit) also taps your home's equity, but it's a revolving credit line tied to your current home, which means it typically gets frozen or closed when you list the property for sale. A bridge loan is specifically designed for the transition period and stays in place through the sale."
                }
              },
              {
                "@type": "Question",
                "name": "Who qualifies for a bridge loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most borrowers need at least 20% equity in their current home, a credit score of 620 or higher, and enough income to cover both the bridge loan and any existing mortgage during the transition period. Bridge loans are evaluated more on your equity position than on a rigid debt-to-income ratio. Jim reviews every situation individually."
                }
              },
              {
                "@type": "Question",
                "name": "What documents do I need to apply for a bridge loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You'll typically need two years of tax returns or W-2s, recent pay stubs, two months of bank statements, a mortgage statement for your current home, and a purchase contract for the new home if you have one. If you're self-employed, bank statements may be used in place of tax returns."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use a bridge loan for an investment property or only my primary residence?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bridge loans can be used for primary residences, second homes, and investment properties, though the terms and qualification requirements vary by property type. Investment property bridge loans typically require more equity and carry slightly higher rates."
                }
              },
              {
                "@type": "Question",
                "name": "What happens to the bridge loan when my current home sells?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "When your current home closes escrow, the bridge loan is paid off directly from the sale proceeds at closing. Your escrow officer coordinates this automatically. Any remaining equity after paying off the bridge loan and your existing mortgage comes back to you."
                }
              },
              {
                "@type": "Question",
                "name": "Is a bridge loan the same as a hard money loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, they're different products. Hard money loans are typically short-term, asset-based loans from private investors with very high rates (often 10-15%) and are commonly used for fix-and-flip projects. Bridge loans from Revest are conventional short-term mortgage products with institutional pricing, proper underwriting, and rates that are only modestly higher than a standard mortgage."
                }
              }
            ]
          })
        }}
      />

      {/* FAQ */}
      <section className="py-24 bg-brand-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-divider mx-auto mb-4" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">
              Common Questions
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
              Bridge Loan FAQs
            </h2>
            <p className="font-body text-base text-slate-600">
              Straight answers to the questions Jim hears most often.
            </p>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "How much can I borrow with a bridge loan?",
                a: "Most bridge loans allow you to borrow up to 80% of your current home's value, minus any existing mortgage balance. For example, if your home is worth $900,000 and you owe $400,000, you could potentially access up to $320,000 in bridge financing.",
              },
              {
                q: "What are the interest rates on bridge loans?",
                a: "Bridge loan rates are typically 1–2% higher than a conventional 30-year mortgage, reflecting the short-term nature and added flexibility. However, the cost is usually far outweighed by the ability to make a competitive offer and avoid a rushed sale at a lower price.",
              },
              {
                q: "Do I need to make monthly payments on the bridge loan?",
                a: "It depends on the structure Jim sets up for you. Some bridge loans are interest-only with a balloon payment at the end. Others allow deferred payments until the existing home sells. Jim will walk you through the options and recommend the structure that fits your cash flow.",
              },
              {
                q: "What happens if my current home doesn't sell quickly?",
                a: "Bridge loans are typically structured for 6–12 months, with extension options available. Jim builds in enough runway for a comfortable sale — not a fire sale. If your home takes longer than expected, he can often arrange an extension before the term expires.",
              },
              {
                q: "Can I get a bridge loan if I already have a mortgage?",
                a: "Yes. Most bridge loan borrowers have an existing mortgage on their current home. Jim factors in both the bridge loan and your current mortgage when qualifying you, and structures the deal so the combined payment is manageable during the transition period.",
              },
              {
                q: "How fast can a bridge loan close?",
                a: "Revest Loans can typically issue a same-day pre-approval and close a bridge loan in as little as 10 business days, depending on the property and title work. Jim's in-house process eliminates the third-party delays that slow down other lenders.",
              },
              {
                q: "Is a bridge loan available in my state?",
                a: "Revest Loans is licensed to originate bridge loans in California, Oregon, Florida, Wisconsin, and Texas. If you're in one of those states, Jim can help. If you're outside those states, he can often refer you to a trusted partner lender.",
              },
              {
                q: "What's the difference between a bridge loan and a HELOC?",
                a: "A HELOC (Home Equity Line of Credit) also taps your home's equity, but it's a revolving credit line tied to your current home — which means it typically gets frozen or closed when you list the property for sale. A bridge loan is specifically designed for the transition period and stays in place through the sale.",
              },
              {
                q: "Who qualifies for a bridge loan?",
                a: "Most borrowers need at least 20% equity in their current home, a credit score of 620 or higher, and enough income to cover both the bridge loan and any existing mortgage during the transition period. The good news is that bridge loans are evaluated more on your equity position and the strength of your current home as collateral than on a rigid debt-to-income ratio. Jim reviews every situation individually and can often find a path forward even if the numbers look tight on paper.",
              },
              {
                q: "What documents do I need to apply for a bridge loan?",
                a: "You'll typically need two years of tax returns or W-2s, recent pay stubs, two months of bank statements, a mortgage statement for your current home, and a purchase contract for the new home if you have one. If you're self-employed, bank statements may be used in place of tax returns. Jim's team will give you a specific checklist on day one so nothing slows down your timeline.",
              },
              {
                q: "Can I use a bridge loan for an investment property or only my primary residence?",
                a: "Bridge loans can be used for primary residences, second homes, and investment properties, though the terms and qualification requirements vary by property type. Investment property bridge loans typically require more equity and carry slightly higher rates. Jim structures bridge loans across all property types and can walk you through the differences based on your specific situation.",
              },
              {
                q: "What happens to the bridge loan when my current home sells?",
                a: "When your current home closes escrow, the bridge loan is paid off directly from the sale proceeds at closing. Your escrow officer coordinates this automatically — you don't have to manage the payoff yourself. Any remaining equity after paying off the bridge loan and your existing mortgage comes back to you. Jim walks every client through this process so there are no surprises on closing day.",
              },
              {
                q: "Is a bridge loan the same as a hard money loan?",
                a: "No, they're different products. Hard money loans are typically short-term, asset-based loans from private investors with very high rates (often 10–15%) and are commonly used for fix-and-flip projects or when a borrower can't qualify through traditional channels. Bridge loans from Revest are conventional short-term mortgage products with institutional pricing, proper underwriting, and rates that are only modestly higher than a standard mortgage. Jim's bridge loans are designed for qualified homeowners making a move, not distressed situations.",
              },
            ].map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* BRIDGE LOAN REVIEWS */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #c1ff72 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4a90d9 0%, transparent 40%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            {/* Google Reviews Badge */}
            <a
              href="https://www.google.com/search?q=Jim+Black+Revest+Loans+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-8 group"
            >
              <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-body text-sm font-bold text-slate-800">5.0</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBC05">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="font-body text-xs text-slate-500">(101 reviews)</span>
                </div>
                <p className="font-body text-xs text-slate-500 group-hover:text-blue-600 transition-colors">Read our Google Reviews →</p>
              </div>
            </a>
            <div className="inline-flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="fill-brand-green text-brand-green" />
              ))}
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
              Real Clients. Real Results.
            </h2>
            <p className="font-body text-sm text-slate-400 max-w-xl mx-auto">
              Here's what homeowners say after working with Jim on their bridge loan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                quote: "We found our dream home in Sacramento but hadn't listed yet. Jim had us pre-approved the same day and we closed on the new house before our old one even hit the market. Unbelievable.",
                name: "Mark & Diane T.",
                location: "Move-Up Buyers, Sacramento, CA",
                stars: 5,
              },
              {
                quote: "Jim explained the bridge loan process in plain English, ran the numbers with us on the phone, and got it done in 11 days. Other lenders told us it wasn't possible. Jim made it happen.",
                name: "Carlos R.",
                location: "Relocating Buyer, San Jose, CA",
                stars: 5,
              },
              {
                quote: "We were competing against cash buyers in Santa Cruz. Jim's bridge loan let us make a clean offer with no contingencies. We won the house. I can't recommend him enough.",
                name: "Sarah & Tom W.",
                location: "First Move-Up, Santa Cruz, CA",
                stars: 5,
              },
              {
                quote: "I had significant equity but no liquid cash for the down payment. Jim structured a bridge loan that unlocked exactly what we needed. The whole process was smooth and stress-free.",
                name: "Jennifer L.",
                location: "Equity Buyer, Lake Tahoe, CA",
                stars: 5,
              },
              {
                quote: "We were relocating from Oregon to California for work and needed to move fast. Jim closed our bridge loan in under two weeks. He's the only lender I'll ever use.",
                name: "David & Amy K.",
                location: "Relocation Buyers, Portland, OR",
                stars: 5,
              },
              {
                quote: "Jim found a financing solution no other lender would touch. Creative, fast, and completely transparent from start to finish. He saved our deal when it looked like it was going to fall apart.",
                name: "Derek & Alicia M.",
                location: "Move-Up Buyers, Miami, FL",
                stars: 5,
              },
            ].map((review, i) => (
              <div
                key={review.name}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} size={13} className="fill-brand-green text-brand-green" />
                  ))}
                </div>
                <p className="font-body text-sm text-slate-300 leading-relaxed italic flex-1 mb-5">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center shrink-0">
                    <span className="font-body text-xs font-bold text-brand-green">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-white">{review.name}</p>
                    <p className="font-body text-xs text-slate-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="py-20 bg-brand-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, #c1ff72 0%, transparent 50%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-5">
            Ready to Move Without{" "}
            <span className="italic text-brand-green">Waiting?</span>
          </h2>
          <p className="font-body text-base text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Jim has helped thousands of families navigate the buy-before-you-sell transition. Book a free 30-minute call and find out if a bridge loan is the right move for your situation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#d4ff8a] transition-colors duration-200"
            >
              <Calendar size={16} />
              Book a Free Call with Jim
            </a>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              Start Your Application
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            <a href="tel:9252854898" className="flex items-center gap-2 font-body text-sm text-slate-400 hover:text-brand-green transition-colors">
              <Phone size={14} />
              (925) 285-4898
            </a>
            <span className="text-slate-700">·</span>
            <span className="font-body text-xs text-slate-500">Jim Black NMLS #633511</span>
            <span className="text-slate-700">·</span>
            <span className="font-body text-xs text-slate-500">Licensed in CA, OR, FL, WI, TX</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
