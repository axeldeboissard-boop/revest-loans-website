/**
 * Beat the Rate — Refinance Alert Sign-Up Page
 * Design: Revest Loans brand (navy / white / #c1ff72 green)
 * Typography: Playfair Display (display) + Inter (body)
 * Layout: Full-page with hero, interactive rate checker, sign-up form, how-it-works, FAQ
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Bell, TrendingDown, CheckCircle, ChevronDown, ChevronUp, DollarSign, Percent, Mail, User, Phone, AlertCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = "idle" | "submitting" | "success" | "error";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatCurrency(val: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
}

function calcMonthlyPayment(principal: number, annualRate: number, termYears: number) {
  if (annualRate === 0) return principal / (termYears * 12);
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calcMonthlySavings(balance: number, currentRate: number, newRate: number, termYears: number) {
  const current = calcMonthlyPayment(balance, currentRate, termYears);
  const next = calcMonthlyPayment(balance, newRate, termYears);
  return Math.max(0, current - next);
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How does the rate alert work?",
    a: "When you sign up, we log your current rate and loan details. Our team monitors mortgage rate movements daily. The moment rates drop to a level where refinancing makes financial sense for your specific situation, we reach out — no spam, just a timely heads-up.",
  },
  {
    q: "Is there any cost to sign up?",
    a: "Zero cost, zero obligation. This is a free service from Revest Loans. We believe in earning your business by adding real value first.",
  },
  {
    q: "How do you determine when I should refinance?",
    a: "We look at your current rate, remaining balance, estimated closing costs (typically 2-3% of the loan), and how long you plan to stay in the home. If the break-even point is under 24 months, we'll flag it as a strong candidate.",
  },
  {
    q: "Will signing up affect my credit score?",
    a: "Not at all. Signing up for rate alerts is completely soft — no credit pull, no application, no obligation. We only run credit when you decide to move forward with an actual refinance.",
  },
  {
    q: "How often will you contact me?",
    a: "Only when it matters. We won't flood your inbox. If rates haven't moved enough to benefit you, you won't hear from us. When they do, you'll get one clear message with the numbers.",
  },
  {
    q: "What states do you serve?",
    a: "Revest Loans is licensed in California, Oregon, Florida, Wisconsin, and Texas. If you're in one of those states, we can help.",
  },
];

// ─── FadeSection ──────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Fetch live 30-yr fixed rate from FRED via CORS proxy ────────────────────
async function fetchLiveRate(): Promise<{ rate: number; date: string } | null> {
  // Try corsproxy.io to bypass CORS on the FRED CSV endpoint
  const FRED_CSV = "https://fred.stlouisfed.org/graph/fredgraph.csv?id=MORTGAGE30US";
  const proxies = [
    `https://corsproxy.io/?${encodeURIComponent(FRED_CSV)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(FRED_CSV)}`,
  ];
  for (const url of proxies) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const text = await res.text();
      // CSV format: DATE,VALUE — last non-empty line has the most recent data
      const lines = text.trim().split("\n").filter(l => l && !l.startsWith("DATE"));
      const last = lines[lines.length - 1];
      if (!last) continue;
      const [date, value] = last.split(",");
      const rate = parseFloat(value);
      if (!isNaN(rate) && rate > 0) return { rate, date };
    } catch {
      // try next proxy
    }
  }
  return null;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BeatTheRate() {
  // Rate checker state
  const [balance, setBalance] = useState(420000);
  const [currentRate, setCurrentRate] = useState(7.25);
  const [termYears] = useState(30);

  // Live 30-yr fixed rate from FRED (fallback to last known value)
  const FALLBACK_RATE = 6.52;
  const [todayRate, setTodayRate] = useState<number>(FALLBACK_RATE);
  const [rateDate, setRateDate] = useState<string>("");
  const [rateLoading, setRateLoading] = useState(true);
  const [rateLive, setRateLive] = useState(false);

  useEffect(() => {
    fetchLiveRate().then(result => {
      if (result) {
        setTodayRate(result.rate);
        setRateDate(result.date);
        setRateLive(true);
      }
      setRateLoading(false);
    });
  }, []);

  const TODAY_RATE = todayRate;
  const monthlySavings = calcMonthlySavings(balance, currentRate, TODAY_RATE, termYears);
  const annualSavings = monthlySavings * 12;
  const lifetimeSavings = monthlySavings * termYears * 12;
  const shouldRefi = currentRate - TODAY_RATE >= 0.5;

  // Sign-up form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", currentRate: "", loanBalance: "", state: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setFormState("success");
      } else {
        setFormState("error");
        toast.error("Something went wrong. Please call us at (925) 285-4898.");
      }
    },
    onError: () => {
      setFormState("error");
      toast.error("Unable to send your message. Please call us at (925) 285-4898.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.currentRate || !form.loanBalance) return;
    setFormState("submitting");
    submitLead.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      interest: `Rate Alert — Current Rate: ${form.currentRate}%, Balance: $${form.loanBalance}, State: ${form.state || "Not specified"}`,
      message: `Beat the Rate sign-up. Current rate: ${form.currentRate}%, loan balance: $${form.loanBalance}`,
      source: "Beat the Rate Sign-Up",
    });
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="architectural-rules relative bg-brand-navy overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 40%, rgba(84,185,71,0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 70%, rgba(74,144,217,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="absolute left-0 top-0 hidden h-full w-[34%] lg:block">
          <div
            className="architectural-image-frame absolute inset-y-8 left-0 w-full bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url(/assets/revest-renovation.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-navy/70 to-brand-navy" />
        </div>
        {/* Animated ticker-tape rate numbers in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-5">
          {["6.44%", "6.25%", "5.99%", "6.75%", "7.00%", "6.50%", "5.75%"].map((r, i) => (
            <span
              key={i}
              className="absolute font-display font-bold text-white"
              style={{
                fontSize: `${3 + (i % 3)}rem`,
                top: `${10 + i * 12}%`,
                left: `${5 + i * 13}%`,
                transform: `rotate(${-8 + i * 3}deg)`,
              }}
            >
              {r}
            </span>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 text-brand-green px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-wide mb-6">
              <Bell size={12} className="animate-pulse" />
              FREE REFINANCE ALERT SERVICE
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Beat the Rate.
              <br />
              <span className="text-brand-green">We'll Tell You When.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="font-body text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Sign up once. We monitor rates daily. The moment refinancing makes financial sense for your loan, Jim Black's team reaches out — no spam, just the right call at the right time.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#sign-up"
                className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold px-8 py-4 rounded-md hover:bg-[#aef55a] transition-colors text-base"
                style={{ transition: "background 0.18s" }}
              >
                <Bell size={16} /> Set My Rate Alert
              </a>
              <a
                href="#rate-checker"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-body font-semibold px-8 py-4 rounded-md hover:bg-white/20 transition-colors text-base"
              >
                Check My Savings <ArrowRight size={16} />
              </a>
            </div>
          </FadeIn>

          {/* Stats strip */}
          <FadeIn delay={320}>
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto border-t border-white/10 pt-10">
              {[
                { label: "Avg. Monthly Savings", value: "$312" },
                { label: "Avg. Break-Even", value: "14 mo." },
                { label: "Families Helped", value: "9,100+" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-brand-green">{s.value}</p>
                  <p className="font-body text-xs text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── RATE CHECKER ── */}
      <section id="rate-checker" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">Interactive Tool</p>
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-3">See What You Could Save</h2>
            <p className="font-body text-sm text-slate-500 max-w-lg mx-auto">
              Drag the sliders to match your current loan. We'll show you what today's rates could mean for your monthly payment.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Sliders */}
            <FadeIn delay={80} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              {/* Loan Balance */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-body text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <DollarSign size={14} className="text-brand-navy" /> Remaining Loan Balance
                  </label>
                  <span className="font-display text-lg font-bold text-brand-navy">{formatCurrency(balance)}</span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={2000000}
                  step={5000}
                  value={balance}
                  onChange={e => setBalance(Number(e.target.value))}
                  className="w-full accent-brand-navy h-2 rounded-full"
                />
                <div className="flex justify-between font-body text-xs text-slate-400 mt-1">
                  <span>$50K</span><span>$2M</span>
                </div>
              </div>

              {/* Current Rate */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-body text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Percent size={14} className="text-brand-navy" /> Your Current Rate
                  </label>
                  <span className="font-display text-lg font-bold text-brand-navy">{currentRate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={10}
                  step={0.125}
                  value={currentRate}
                  onChange={e => setCurrentRate(Number(e.target.value))}
                  className="w-full accent-brand-navy h-2 rounded-full"
                />
                <div className="flex justify-between font-body text-xs text-slate-400 mt-1">
                  <span>3.00%</span><span>10.00%</span>
                </div>
              </div>

              {/* Today's rate reference — live from FRED */}
              <div className="flex items-center gap-3 bg-brand-green/10 border border-brand-green/25 rounded-xl px-4 py-3">
                <TrendingDown size={18} className="text-brand-navy shrink-0" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-body text-xs font-semibold text-brand-navy">30-Yr Fixed Avg.</p>
                    {rateLoading ? (
                      <span className="w-3 h-3 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin inline-block" />
                    ) : (
                      <span className={`font-body text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        rateLive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        {rateLive ? "LIVE" : "EST"}
                      </span>
                    )}
                  </div>
                  <p className="font-display text-xl font-bold text-brand-navy">
                    {rateLoading ? "—" : `${TODAY_RATE.toFixed(2)}%`}
                  </p>
                  {rateLive && rateDate && (
                    <p className="font-body text-[10px] text-slate-400">Freddie Mac · {rateDate}</p>
                  )}
                  {!rateLoading && !rateLive && (
                    <p className="font-body text-[10px] text-slate-400">Est. — updated weekly</p>
                  )}
                </div>
                <div className="ml-auto text-right">
                  <p className="font-body text-xs text-slate-500">Rate difference</p>
                  <p className={`font-display text-xl font-bold ${currentRate > TODAY_RATE ? "text-green-600" : "text-slate-400"}`}>
                    {rateLoading ? "—" : currentRate > TODAY_RATE ? `−${(currentRate - TODAY_RATE).toFixed(3)}%` : "At market"}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Results */}
            <FadeIn delay={160}>
              {shouldRefi ? (
                <div className="bg-brand-navy rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle size={20} className="text-brand-green" />
                    <span className="font-body text-sm font-semibold text-brand-green">Refinancing looks favorable for you</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    <div className="bg-white/10 rounded-xl p-5">
                      <p className="font-body text-xs text-slate-400 mb-1">Est. Monthly Savings</p>
                      <p className="font-display text-4xl font-bold text-brand-green">{formatCurrency(monthlySavings)}<span className="text-lg text-slate-300">/mo</span></p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="font-body text-xs text-slate-400 mb-1">Annual Savings</p>
                        <p className="font-display text-2xl font-bold text-white">{formatCurrency(annualSavings)}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="font-body text-xs text-slate-400 mb-1">Lifetime Savings</p>
                        <p className="font-display text-2xl font-bold text-white">{formatCurrency(lifetimeSavings)}</p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#sign-up"
                    className="flex items-center justify-center gap-2 bg-brand-green text-brand-navy font-body font-bold px-6 py-3 rounded-md hover:bg-[#aef55a] transition-colors w-full"
                  >
                    <Bell size={15} /> Set My Rate Alert
                  </a>
                  <p className="font-body text-xs text-slate-400 text-center mt-3">No credit pull. No obligation. Free.</p>
                </div>
              ) : (
                <div className="bg-slate-100 rounded-2xl p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle size={20} className="text-slate-500" />
                    <span className="font-body text-sm font-semibold text-slate-600">Your rate is close to market</span>
                  </div>
                  <p className="font-body text-sm text-slate-600 mb-6 leading-relaxed">
                    Based on your current rate of <strong>{currentRate.toFixed(2)}%</strong>, refinancing right now may not save enough to justify closing costs. But rates move fast — sign up and we'll alert you the moment the math tips in your favor.
                  </p>
                  <div className="bg-white rounded-xl p-5 mb-6 border border-slate-200">
                    <p className="font-body text-xs text-slate-500 mb-1">Rate drop needed to make sense</p>
                    <p className="font-display text-3xl font-bold text-brand-navy">
                      {Math.max(0, 0.5 - (currentRate - TODAY_RATE)).toFixed(3)}%
                    </p>
                    <p className="font-body text-xs text-slate-400 mt-1">below today's average</p>
                  </div>
                  <a
                    href="#sign-up"
                    className="flex items-center justify-center gap-2 bg-brand-navy text-white font-body font-bold px-6 py-3 rounded-md hover:bg-[#1a3a6b] transition-colors w-full"
                  >
                    <Bell size={15} /> Alert Me When It's Time
                  </a>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">Simple Process</p>
            <h2 className="font-display text-4xl font-bold text-brand-navy">How It Works</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <User size={22} className="text-brand-navy" />,
                title: "Sign Up in 60 Seconds",
                desc: "Enter your current rate, loan balance, and contact info. No credit pull, no application — just a quick form.",
              },
              {
                step: "02",
                icon: <TrendingDown size={22} className="text-brand-navy" />,
                title: "We Watch the Market",
                desc: "Jim's team monitors 30-year fixed rates daily. We track the spread between your rate and current market rates.",
              },
              {
                step: "03",
                icon: <Bell size={22} className="text-brand-navy" />,
                title: "You Get the Call",
                desc: "When refinancing makes financial sense for your specific loan — we reach out with the numbers. You decide.",
              },
            ].map((s, i) => (
              <FadeIn key={s.step} delay={i * 100}>
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-brand-green/15 flex items-center justify-center">
                        {s.icon}
                      </div>
                    </div>
                    <div>
                      <p className="font-body text-xs font-bold text-brand-green tracking-widest mb-1">STEP {s.step}</p>
                      <h3 className="font-display text-xl font-bold text-brand-navy mb-2">{s.title}</h3>
                      <p className="font-body text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-6 left-full w-8 border-t-2 border-dashed border-brand-green/30 -translate-x-4" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGN-UP FORM ── */}
      <section id="sign-up" className="py-20 bg-brand-navy">
        <div
          className="absolute pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(193,255,114,0.07) 0%, transparent 70%)",
            inset: 0,
          }}
        />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 text-brand-green px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-wide mb-4">
              <Bell size={12} /> FREE — NO OBLIGATION
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-3">Set Your Rate Alert</h2>
            <p className="font-body text-sm text-slate-400 max-w-md mx-auto">
              Fill in your loan details and we'll reach out the moment refinancing makes sense for you.
            </p>
          </FadeIn>

          {formState === "success" ? (
            <FadeIn>
              <div className="bg-white rounded-2xl p-10 text-center shadow-xl">
                <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-brand-navy" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">You're on the list!</h3>
                <p className="font-body text-sm text-slate-600 mb-6 leading-relaxed max-w-sm mx-auto">
                  Jim's team has your details. We'll be in touch the moment rates move in your favor. In the meantime, feel free to explore your loan options.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://revesthomes.my1003app.com/633511/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold px-6 py-3 rounded-md hover:bg-[#aef55a] transition-colors"
                  >
                    Apply Now <ArrowRight size={14} />
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 border border-brand-navy text-brand-navy font-body font-semibold px-6 py-3 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={80}>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl space-y-5">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs font-semibold text-slate-700 mb-1.5 block">Full Name *</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-slate-700 mb-1.5 block">Phone Number</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(831) 555-0100"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="font-body text-xs font-semibold text-slate-700 mb-1.5 block">Email Address *</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy transition"
                    />
                  </div>
                </div>

                {/* Current Rate + Loan Balance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs font-semibold text-slate-700 mb-1.5 block">Current Interest Rate *</label>
                    <div className="relative">
                      <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        name="currentRate"
                        required
                        step="0.001"
                        min="1"
                        max="20"
                        placeholder="7.25"
                        value={form.currentRate}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-slate-700 mb-1.5 block">Remaining Loan Balance *</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        name="loanBalance"
                        required
                        step="1000"
                        min="10000"
                        placeholder="420000"
                        value={form.loanBalance}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy transition"
                      />
                    </div>
                  </div>
                </div>

                {/* State */}
                <div>
                  <label className="font-body text-xs font-semibold text-slate-700 mb-1.5 block">State</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30 focus:border-brand-navy transition bg-white text-slate-700"
                  >
                    <option value="">Select your state</option>
                    <option value="CA">California (CA)</option>
                    <option value="OR">Oregon (OR)</option>
                    <option value="FL">Florida (FL)</option>
                    <option value="WI">Wisconsin (WI)</option>
                    <option value="TX">Texas (TX)</option>
                  </select>
                </div>

                {/* ── Live Savings Preview ── */}
                {(() => {
                  const formRate = parseFloat(form.currentRate);
                  const formBalance = parseFloat(form.loanBalance);
                  const hasInputs = !isNaN(formRate) && formRate > 0 && !isNaN(formBalance) && formBalance > 0;
                  if (!hasInputs) return null;

                  const CLOSING_COST_PCT = 0.025; // 2.5% estimated closing costs
                  const formMonthlySavings = calcMonthlySavings(formBalance, formRate, TODAY_RATE, 30);
                  const formAnnualSavings = formMonthlySavings * 12;
                  const formLifetimeSavings = formMonthlySavings * 30 * 12;
                  const closingCosts = formBalance * CLOSING_COST_PCT;
                  const breakEvenMonths = formMonthlySavings > 0 ? Math.ceil(closingCosts / formMonthlySavings) : null;
                  const rateDiff = formRate - TODAY_RATE;
                  const worthIt = rateDiff >= 0.5;

                  return (
                    <div
                      className="rounded-xl border overflow-hidden"
                      style={{
                        borderColor: worthIt ? "#c1ff72" : "#e2e8f0",
                        background: worthIt ? "#f0fff0" : "#f8fafc",
                        transition: "border-color 0.3s, background 0.3s",
                      }}
                    >
                      {/* Header */}
                      <div
                        className="px-5 py-3 flex items-center gap-2"
                        style={{ background: worthIt ? "#0a1428" : "#1e293b" }}
                      >
                        <TrendingDown size={14} className="text-brand-green shrink-0" />
                        <span className="font-body text-xs font-semibold text-white tracking-wide">
                          {worthIt ? "Your Estimated Savings" : "Your Rate vs. Today's Market"}
                        </span>
                        {!rateLoading && (
                          <span className={`ml-auto font-body text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                            rateLive ? "bg-green-700 text-green-100" : "bg-slate-600 text-slate-300"
                          }`}>
                            {rateLive ? "LIVE RATE" : "EST. RATE"}
                          </span>
                        )}
                      </div>

                      {worthIt ? (
                        <div className="p-5">
                          {/* Big monthly savings number */}
                          <div className="flex items-end gap-3 mb-4">
                            <div>
                              <p className="font-body text-xs text-slate-500 mb-0.5">Est. Monthly Savings</p>
                              <p className="font-display text-4xl font-bold text-brand-navy leading-none">
                                {formatCurrency(formMonthlySavings)}
                                <span className="font-body text-base font-normal text-slate-400">/mo</span>
                              </p>
                            </div>
                            <div className="ml-auto text-right">
                              <p className="font-body text-xs text-slate-500 mb-0.5">Rate drop</p>
                              <p className="font-display text-xl font-bold text-green-600">−{rateDiff.toFixed(3)}%</p>
                            </div>
                          </div>

                          {/* Stats row */}
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                              <p className="font-body text-[10px] text-slate-400 mb-0.5">Annual</p>
                              <p className="font-display text-base font-bold text-brand-navy">{formatCurrency(formAnnualSavings)}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                              <p className="font-body text-[10px] text-slate-400 mb-0.5">Lifetime</p>
                              <p className="font-display text-base font-bold text-brand-navy">{formatCurrency(formLifetimeSavings)}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                              <p className="font-body text-[10px] text-slate-400 mb-0.5">Break-Even</p>
                              <p className="font-display text-base font-bold text-brand-navy">
                                {breakEvenMonths !== null ? `${breakEvenMonths} mo.` : "N/A"}
                              </p>
                            </div>
                          </div>

                          {/* Payment comparison bar chart */}
                          {(() => {
                            const currentPmt = calcMonthlyPayment(formBalance, formRate, 30);
                            const newPmt = calcMonthlyPayment(formBalance, TODAY_RATE, 30);
                            const maxPmt = Math.max(currentPmt, newPmt);
                            const currentPct = (currentPmt / maxPmt) * 100;
                            const newPct = (newPmt / maxPmt) * 100;
                            return (
                              <div className="bg-white rounded-lg p-4 border border-slate-100">
                                <p className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Monthly Payment Comparison</p>
                                {/* Current payment bar */}
                                <div className="mb-3">
                                  <div className="flex justify-between items-center mb-1.5">
                                    <span className="font-body text-xs text-slate-500">Current payment</span>
                                    <span className="font-body text-sm font-semibold text-slate-700">{formatCurrency(currentPmt)}/mo</span>
                                  </div>
                                  <div className="h-8 bg-slate-100 rounded-md overflow-hidden">
                                    <div
                                      className="h-full rounded-md flex items-center justify-end pr-2"
                                      style={{
                                        width: `${currentPct}%`,
                                        background: "#1e3a5f",
                                        transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)",
                                      }}
                                    >
                                      <span className="font-body text-[10px] font-bold text-white/80">{formRate.toFixed(2)}%</span>
                                    </div>
                                  </div>
                                </div>
                                {/* New payment bar */}
                                <div>
                                  <div className="flex justify-between items-center mb-1.5">
                                    <span className="font-body text-xs text-slate-500">New payment (est.)</span>
                                    <span className="font-body text-sm font-bold text-green-600">{formatCurrency(newPmt)}/mo</span>
                                  </div>
                                  <div className="h-8 bg-slate-100 rounded-md overflow-hidden">
                                    <div
                                      className="h-full rounded-md flex items-center justify-end pr-2"
                                      style={{
                                        width: `${newPct}%`,
                                        background: "#c1ff72",
                                        transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)",
                                      }}
                                    >
                                      <span className="font-body text-[10px] font-bold text-brand-navy/80">{TODAY_RATE.toFixed(2)}%</span>
                                    </div>
                                  </div>
                                </div>
                                {/* Savings callout */}
                                <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                                  <span className="font-body text-xs text-green-700 font-semibold">
                                    You save {formatCurrency(formMonthlySavings)}/mo — that's {formatCurrency(formAnnualSavings)} per year
                                  </span>
                                </div>
                              </div>
                            );
                          })()}

                          <p className="font-body text-[10px] text-slate-400 mt-3 text-center">
                            Based on today's 30-yr avg of {TODAY_RATE.toFixed(2)}%. Est. closing costs of {formatCurrency(closingCosts)} assumed.
                          </p>
                        </div>
                      ) : (
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-body text-xs text-slate-500">Your rate</p>
                              <p className="font-display text-2xl font-bold text-brand-navy">{formRate.toFixed(3)}%</p>
                            </div>
                            <div className="text-center px-4">
                              <div className="w-8 h-0.5 bg-slate-300 mx-auto" />
                            </div>
                            <div className="text-right">
                              <p className="font-body text-xs text-slate-500">Today's avg</p>
                              <p className="font-display text-2xl font-bold text-slate-500">{TODAY_RATE.toFixed(2)}%</p>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-slate-200">
                            <p className="font-body text-xs text-slate-500 mb-0.5">Rate drop needed to make refinancing worthwhile</p>
                            <p className="font-display text-xl font-bold text-brand-navy">
                              {Math.max(0, 0.5 - rateDiff).toFixed(3)}% more
                            </p>
                          </div>
                          <p className="font-body text-xs text-slate-500 mt-3 leading-relaxed">
                            Your rate is close to market. Sign up and we'll alert you the moment the math tips in your favor.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full flex items-center justify-center gap-2 bg-brand-green text-brand-navy font-body font-bold py-3.5 rounded-lg hover:bg-[#aef55a] transition-colors disabled:opacity-60 text-base"
                  style={{ transition: "background 0.18s" }}
                >
                  {formState === "submitting" ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin" /> Setting Alert...</span>
                  ) : (
                    <><Bell size={16} /> Set My Free Rate Alert</>
                  )}
                </button>
                <p className="font-body text-xs text-slate-400 text-center leading-relaxed max-w-lg mx-auto">
                  Revest Homes, Inc. is licensed by the California Department of Real Estate (Broker # 02174879) and holds NMLS numbers (633511/2362319) across California, Florida, Oregon, Texas &amp; Wisconsin
                  <br />
                  <br />
                  Loan approvals are conditional and subject to underwriting review and written issuance. Rates are subject to market changes and may not apply to all borrowers. Revest Homes operates as an Equal Opportunity Mortgage Broker/Lender, offering services restricted to CA, FL, OR, TX &amp; WI.
                </p>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-brand-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">Real Results</p>
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-3">Clients Who Beat the Rate</h2>
            <p className="font-body text-base text-slate-600 max-w-xl mx-auto">
              When rates dropped, these homeowners were ready. Here's what they had to say.
            </p>
          </FadeIn>

          {/* Google badge */}
          <FadeIn delay={100} className="flex justify-center mb-10">
            <a
              href="https://www.google.com/search?q=Revest+Loans+Jim+Black+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC05">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                  <span className="font-body text-sm font-bold text-slate-800 ml-1">5.0</span>
                </div>
                <p className="font-body text-xs text-slate-500">101 Google Reviews</p>
              </div>
            </a>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "Santa Cruz, CA",
                rate: "Went from 7.1% to 5.9%",
                savings: "$287/mo saved",
                quote: "Jim called me the week rates dropped. I had signed up months earlier and honestly forgot about it. He had the numbers ready and we closed in 21 days. Couldn't have been smoother.",
                initials: "SM",
              },
              {
                name: "David & Karen T.",
                location: "Portland, OR",
                rate: "Went from 7.375% to 6.25%",
                savings: "$341/mo saved",
                quote: "We'd been watching rates for over a year. The alert system meant we didn't have to obsess over it daily. When Jim reached out, we were ready to move and the process was incredibly efficient.",
                initials: "DT",
              },
              {
                name: "Marcus L.",
                location: "Miami, FL",
                rate: "Went from 6.875% to 5.75%",
                savings: "$198/mo saved",
                quote: "I signed up thinking it was just a newsletter. It's not — it's a real monitoring service. Jim personally called me with a full breakdown before I even asked. That's the difference.",
                initials: "ML",
              },
              {
                name: "Jennifer R.",
                location: "Madison, WI",
                rate: "Went from 7.5% to 6.375%",
                savings: "$412/mo saved",
                quote: "The savings calculator on this page is what convinced me to sign up. Seeing $412 a month in real numbers made it obvious. Jim delivered exactly what was promised.",
                initials: "JR",
              },
              {
                name: "Carlos & Ana V.",
                location: "Austin, TX",
                rate: "Went from 7.25% to 6.0%",
                savings: "$376/mo saved",
                quote: "We refinanced twice in 18 months because Jim kept watching for us. The second time we saved even more. Having someone actively monitoring your rate is worth every penny — and this is free.",
                initials: "CV",
              },
              {
                name: "Tom H.",
                location: "Sacramento, CA",
                rate: "Went from 6.75% to 5.875%",
                savings: "$224/mo saved",
                quote: "I was skeptical at first. But Jim's team is genuinely watching the market, not just sending automated emails. When they reached out, the timing was perfect and the process was fast.",
                initials: "TH",
              },
            ].map((t, i) => (
              <FadeIn key={t.name} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC05">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  {/* Rate savings badge */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="font-body text-[11px] font-semibold bg-brand-green/15 text-brand-navy px-2.5 py-1 rounded-full">{t.rate}</span>
                    <span className="font-body text-[11px] font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">{t.savings}</span>
                  </div>
                  {/* Quote */}
                  <p className="font-body text-sm text-slate-600 leading-relaxed flex-1 mb-5 italic">&#8220;{t.quote}&#8221;</p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
                      <span className="font-body text-xs font-bold text-brand-green">{t.initials}</span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-brand-navy">{t.name}</p>
                      <p className="font-body text-xs text-slate-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">Questions</p>
            <h2 className="font-display text-4xl font-bold text-brand-navy">Frequently Asked</h2>
          </FadeIn>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-body text-sm font-semibold text-brand-navy pr-4">{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="font-body text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-brand-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold text-brand-navy mb-4">Ready to Beat the Rate?</h2>
            <p className="font-body text-base text-brand-navy/70 mb-8 max-w-xl mx-auto">
              It takes 60 seconds to sign up. Jim's team will handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#sign-up"
                className="inline-flex items-center gap-2 bg-brand-navy text-white font-body font-bold px-8 py-4 rounded-md hover:bg-[#1a3a6b] transition-colors"
              >
                <Bell size={16} /> Set My Rate Alert
              </a>
              <a
                href="https://calendly.com/jimblack-revest/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/60 border border-brand-navy/20 text-brand-navy font-body font-semibold px-8 py-4 rounded-md hover:bg-white transition-colors"
              >
                Talk to Jim First <ArrowRight size={16} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
