/**
 * Revest Loans — Homepage
 * Design: Coastal Trust Architecture
 * Light theme, white/off-white backgrounds, navy headings, neon green (#c1ff72) accents
 * Fonts: Playfair Display (headings) + DM Sans (body) + DM Mono (badges/labels)
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Home as HomeIcon, Shield, TrendingUp, Building2, Leaf, Hammer, Crown, RefreshCw, Zap,
  CheckCircle2, ArrowRight, Star, Phone, Mail, MapPin, ChevronDown, X, Clock, Users, Bell
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const APPLY_URL = "https://revesthomes.my1003app.com/633511/register";

const FAQS = [
  {
    q: "What credit score do I need to qualify for a mortgage?",
    a: "It depends on the loan type. FHA loans allow scores as low as 580 with a 3.5% down payment, and some programs go down to 500 with 10% down. Conventional loans typically require a 620 minimum, though better rates come with 740+. VA and USDA loans have flexible requirements too. The good news is that credit score is just one piece of the picture — we look at the full file."
  },
  {
    q: "How fast can you get me pre-approved?",
    a: "We offer same-day pre-approvals on most files. If you get us your documents in the morning, you can have a fully underwritten pre-approval letter by end of day. This is a real underwritten approval — not just a soft pre-qualification — which means sellers and agents take it seriously."
  },
  {
    q: "What's the difference between a pre-qualification and a pre-approval?",
    a: "A pre-qualification is a quick estimate based on self-reported income and credit — it carries very little weight with sellers. A pre-approval means we've actually reviewed your income documents, pulled your credit, and had an underwriter sign off. In a competitive market, a pre-approval is the difference between getting the house and losing it."
  },
  {
    q: "I'm self-employed. Can I still get a mortgage?",
    a: "Absolutely. Self-employed borrowers are one of our specialties. We work with bank statement loans (12 or 24 months of deposits instead of tax returns), P&L-only programs, and 1099 loans. If your tax returns show low income due to write-offs, we have programs that look at your actual cash flow instead."
  },
  {
    q: "What is a bridge loan and when does it make sense?",
    a: "A bridge loan lets you tap the equity in your current home to fund the purchase of your next one — before you've sold. This means you can buy first, move at your own pace, and then sell your old home without the pressure of a contingent offer. In competitive markets, removing the sale contingency can be the difference between winning and losing a deal."
  },
  {
    q: "What is a DSCR loan?",
    a: "A Debt Service Coverage Ratio (DSCR) loan qualifies you based on the rental income of the property rather than your personal income. If the property's rent covers the mortgage payment, you can qualify — no W-2s or tax returns required. This is ideal for real estate investors who have multiple properties or complex personal income situations."
  },
  {
    q: "How much do I need for a down payment?",
    a: "It depends on the loan program. FHA requires as little as 3.5%. Conventional loans can go as low as 3% for first-time buyers. VA and USDA loans offer 0% down for eligible borrowers. We also have down payment assistance programs that can cover part or all of your down payment as a grant or low-interest second loan."
  },
  {
    q: "What documents will I need to apply?",
    a: "For most loans: two years of tax returns and W-2s, one month of recent pay stubs, two months of bank statements, a copy of your ID, and information on any current properties you own. Self-employed borrowers substitute tax returns with 12-24 months of bank statements. We'll give you a specific checklist based on your situation."
  },
  {
    q: "How long does the mortgage process take from application to close?",
    a: "A typical purchase loan closes in 21-30 days from a complete application. Refinances often close faster. Complex loans — construction, bridge, or DSCR — can take 30-45 days depending on the property and title. We'll give you a realistic timeline on day one so there are no surprises."
  },
  {
    q: "What's included in my monthly mortgage payment?",
    a: "Your payment typically includes principal (paying down the loan balance), interest, property taxes (held in escrow), and homeowner's insurance — often called PITI. If your down payment is less than 20% on a conventional loan, you'll also pay private mortgage insurance (PMI) until you reach 20% equity. FHA loans have their own mortgage insurance structure."
  },
  {
    q: "Can I refinance if I already have a mortgage?",
    a: "Yes. Refinancing can lower your rate, reduce your monthly payment, shorten your loan term, or let you pull out equity for home improvements or other goals. Whether it makes financial sense depends on your current rate, how long you plan to stay, and the costs involved. We'll run the numbers honestly so you can decide."
  },
  {
    q: "What states are you licensed in?",
    a: "We are currently licensed in California, Oregon, Florida, Wisconsin, and Texas. If you're outside these states, reach out anyway — our network may be able to connect you with a trusted lender in your area."
  },
  {
    q: "Do you charge a fee for the pre-approval or consultation?",
    a: "No. The initial consultation and pre-approval are completely free. We only get paid when your loan closes, which means our incentives are fully aligned with yours — we want to get you to the finish line."
  },
  {
    q: "What makes Revest Loans different from a big bank?",
    a: "Big banks have rigid guidelines and say no to anything that doesn't fit a standard box. We have access to dozens of lenders and specialty programs, so when one door closes we find another. We also pick up the phone. You'll have a direct line to your loan officer — not a call center — from application to close."
  },
  {
    q: "What is a construction loan and how does it work?",
    a: "A construction loan funds the building of a new home in stages as construction progresses, rather than in one lump sum. Once the home is complete, it typically converts to a permanent mortgage. We offer one-time close construction loans, which means you go through the approval process once and avoid a second closing cost when you convert."
  },
];

// Team Bio Modal
type TeamMember = { name: string; title: string; nmls: string; photo: string; objectPosition?: string; bio: string; tags: string[] };

function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  // Close on backdrop click or Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(10,20,40,0.72)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-y-auto max-h-[90vh]"
        style={{
          animation: "modalIn 220ms cubic-bezier(0.23,1,0.32,1) both",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X size={16} className="text-slate-600" />
        </button>

        {/* Photo strip */}
        <div className="relative h-64 bg-brand-card overflow-hidden">
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: member.objectPosition || "center top" }}
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          {member.nmls && (
            <div className="absolute bottom-4 left-5">
              <span className="nmls-badge">{member.nmls}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-7 pt-2">
          <h3 className="font-display text-2xl font-bold text-brand-navy mb-0.5">{member.name}</h3>
          <p className="font-body text-sm font-semibold text-[#1a3a6b] mb-3">{member.title}</p>
          {((member as any).phone || (member as any).email) && (
            <div className="flex flex-col gap-1.5 mb-4">
              {(member as any).phone && (
                <a href={`tel:${(member as any).phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 font-body text-sm text-slate-600 hover:text-brand-navy transition-colors">
                  <Phone size={13} className="text-[#1a3a6b] shrink-0" />
                  {(member as any).phone}
                </a>
              )}
              {(member as any).email && (
                <a href={`mailto:${(member as any).email}`} className="inline-flex items-center gap-2 font-body text-sm text-slate-600 hover:text-brand-navy transition-colors">
                  <Mail size={13} className="text-[#1a3a6b] shrink-0" />
                  {(member as any).email}
                </a>
              )}
            </div>
          )}
          <p className="font-body text-sm text-slate-600 leading-relaxed mb-5">{member.bio}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {member.tags.map(tag => (
              <span key={tag} className="font-body text-xs bg-brand-card text-[#1a3a6b] px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
          <a
            href={(member as any).applyUrl || APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold text-sm px-6 py-3 rounded-md hover:bg-[#aef55a] transition-colors w-full justify-center"
          >
            Apply Now <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
const SEARCH_URL = "https://search.culbertsonandgray.com/";
const VALUATION_URL = "https://search.culbertsonandgray.com/seller";

// Team data
const TEAM = [
  {
    name: "Jim Black",
    title: "Founder & Senior Loan Officer",
    nmls: "NMLS #633511",
    photo: "/assets/jim-black-team.jpg",
    objectPosition: "center top",
    bio: "Jim has spent over two decades helping families finance their homes. Known for creative solutions on complex deals, he specializes in situations other lenders walk away from. His in-house approach means faster approvals, clearer communication, and no surprises at closing.",
    tags: ["20+ Years Experience", "Creative Financing", "Licensed in 5 States"],
  },
  {
    name: "Chaz Sampson",
    title: "VP of Operations",
    nmls: "NMLS #1670621",
    photo: "/assets/chaz-sampson.png",
    objectPosition: "center 5%",
    bio: "With 15+ years spanning origination to funding, Chaz ensures every loan closes on time and without drama. His background in commercial and construction lending gives the team a unique edge on complex transactions.",
    tags: ["15+ Years Experience", "Origination to Funding", "Commercial & Construction"],
  },
  {
    name: "Axel Ferrand de Boissard",
    title: "Executive Assistant & MLO",
    nmls: "NMLS #2781438",
    photo: "/assets/axel-headshot.png",
    objectPosition: "center top",
    objectFit: "contain",
    cardBg: "#dce8f5",
    phone: "(332) 269-4040",
    email: "axel@revestloans.com",
    bio: "Axel serves as Executive Assistant to Broker Jim Black, bringing exceptional organization, attention to detail, and a genuine passion for helping clients. He will personally connect with you, listen to your goals, and work alongside you to find a solution that fits your unique needs.",
    tags: ["Executive Assistant", "Client-Focused", "Detail-Oriented"],
  },
  {
    name: "Matt Rohrbach",
    title: "Sr. Loan Officer",
    nmls: "NMLS #448766 | DRE #01439040",
    photo: "/assets/matt-rohrbach-blue.webp",
    objectPosition: "center top",
    phone: "(650) 906-7935",
    email: "Matt@RevestLoans.com",
    bio: "Matt is a seasoned financial services and real estate industry professional with a diverse and practical background within small, medium and large institutions in sales, management, partnership management, credit underwriting, risk and account management — with a focus over the last 20 years in real estate and real estate finance.",
    tags: ["20+ Years Experience", "Credit Underwriting", "Sales & Risk Management"],
  },
  {
    name: "Mesha Dimitruk",
    title: "Loan Officer",
    nmls: "NMLS #694427",
    photo: "/assets/mesha-dimitruk-blue.webp",
    objectPosition: "center 15%",
    bio: "Mesha is a seasoned loan officer known for her attention to detail and relentless client advocacy. She excels at finding the right loan product for each unique situation and guiding clients through the process with clarity and confidence.",
    tags: ["Client Advocacy", "Complex Scenarios", "Detail-Oriented"],
  },
  {
    name: "Patrik Smida",
    title: "Loan Officer",
    nmls: "NMLS #390618",
    photo: "/assets/patrik-smida-blue-wide.webp",
    objectPosition: "center top",
    objectFit: "cover",
    cardBg: "#f0f4f8",
    applyUrl: "https://revesthomes.my1003app.com/111111/register",
    bio: "Patrik combines sharp analytical skills with a genuine passion for helping clients navigate the financing process. He's known for breaking down complex loan structures into clear, simple terms.",
    tags: ["Purchase & Refinance", "First-Time Buyers", "Clear Communication"],
  },
  {
    name: "Miguel Flores",
    title: "Senior Loan Officer",
    nmls: "NMLS #450794",
    photo: "/assets/miguel-flores-blue-wide.webp",
    objectPosition: "center top",
    objectFit: "cover",
    cardBg: "#f0f4f8",
    bio: "Miguel brings deep expertise across conventional, FHA, VA, and USDA loan programs. His bilingual capabilities and community-focused approach make him a trusted resource for a wide range of buyers.",
    tags: ["Multi-Program Specialist", "Bilingual (EN/ES)", "VA & FHA Expert"],
  },
  {
    name: "Robert Carrillo",
    title: "Loan Officer",
    nmls: "NMLS #1030702",
    photo: "/assets/rob-carrillo-blue-close.webp",
    objectPosition: "center top",
    applyUrl: "https://revesthomes.my1003app.com/1030702/register?time=1782927630170",
    bio: "Robert brings over 20 years of mortgage industry experience, building strong relationships with the nation's leading banks and lending institutions since 2005. He takes pride in offering innovative strategies, clear communication, and a transparent process — ensuring every transaction is smooth and tailored to each client's unique needs.",
    tags: ["20+ Years Experience", "Purchase & Refinance", "Creative Financing"],
  },
  {
    name: "Alyshea Henson",
    title: "Loan Officer",
    nmls: "",
    photo: "/assets/alyshea-henson-blue.webp",
    objectPosition: "center top",
    bio: "Alyshea launched her real estate career in 2013 and brings a well-rounded perspective to the mortgage industry, with a strong foundation in loan processing and firsthand experience as a licensed real estate agent. Known for clear communication, attention to detail, and unwavering dedication to service, she guides clients through one of life's most significant financial decisions with calm and confidence.",
        tags: ["Licensed Real Estate Agent", "Loan Processing Expert", "Client-First Approach"],
  },
];
// Loan programs
const PROGRAMS = [
  { icon: HomeIcon, name: "FHA Loans", desc: "Low down payment options starting at 3.5% for first-time and repeat buyers.", color: "bg-blue-50 text-blue-700" },
  { icon: Shield, name: "VA Loans", desc: "Exclusive zero-down benefits for veterans, active military, and surviving spouses.", color: "bg-green-50 text-green-700" },
  { icon: TrendingUp, name: "Conventional", desc: "Traditional financing with competitive rates and flexible terms for qualified buyers.", color: "bg-purple-50 text-purple-700" },
  { icon: Leaf, name: "USDA Loans", desc: "Zero down payment financing for eligible rural and suburban properties.", color: "bg-emerald-50 text-emerald-700" },
  { icon: Hammer, name: "Construction Loans", desc: "Interim construction financing for new builds, custom homes, and major renovations.", color: "bg-orange-50 text-orange-700" },
  { icon: Zap, name: "Bridge Loans", desc: "Buy your next home before selling your current one — no contingencies, no pressure.", color: "bg-yellow-50 text-yellow-700" },
  { icon: Crown, name: "Jumbo Loans", desc: "Financing above conforming limits for luxury properties and high-cost markets.", color: "bg-rose-50 text-rose-700" },
  { icon: RefreshCw, name: "Reverse Mortgage", desc: "Allow eligible homeowners 62+ to convert home equity into tax-free funds.", color: "bg-slate-50 text-slate-700" },
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "This was by far the most amazing experience I have ever had with any lender. I only was able to get the property we wanted so badly based on Jim and Chaz helping me out with a Bridge Loan that I never thought I would qualify for. They are truly the best.",
    name: "Google Reviewer",
    location: "Bridge Loan Client • Google Review",
    stars: 5,
  },
  {
    quote: "Absolutely fantastic experience working with Jim and his team! From start to finish, they demonstrated professionalism, efficiency, and a genuine commitment to making the home loan process as smooth as possible. Despite a tight turnaround, they delivered.",
    name: "Google Reviewer",
    location: "Home Loan Client • Google Review",
    stars: 5,
  },
  {
    quote: "Chaz and Jim were incredible to work with in the purchase of my duplex utilizing a bridge loan. Chaz was dependable, compassionate, fiercely resourceful, and so lovely to collaborate with. When there was a snag, I loved the team effort from Jim and Chaz.",
    name: "Ann Ji",
    location: "Duplex Purchase, Bridge Loan • Google Review",
    stars: 5,
  },
  {
    quote: "Jim Black with ReVest Loans helped save a real estate transaction by quickly providing a bridge loan when timing became critical. His ability to move fast, communicate clearly, and structure the right financing solution made all the difference.",
    name: "Mario Desantis",
    location: "Bridge Loan Client • Google Review",
    stars: 5,
  },
  {
    quote: "It has been a pleasure working with Jim Black at Revest Loans. He is professional, responsive, and incredibly easy to collaborate with. We truly enjoyed partnering with him and appreciate the clear communication throughout the entire process. Highly recommend!",
    name: "Google Reviewer",
    location: "Google Review",
    stars: 5,
  },
  {
    quote: "Jim is responsive, knowledgeable and resourceful. He and his team will understand your situation — whatever it may be — and help you obtain your target objective.",
    name: "Bryant Martinez",
    location: "Google Review",
    stars: 5,
  },
  {
    quote: "I had a great experience working with Jim Black and his team for my home loan. The team is very understanding, supportive, and helpful. I highly recommend Jim Black!",
    name: "Google Reviewer",
    location: "Home Loan Client • Google Review",
    stars: 5,
  },
  {
    quote: "Jim and Chaz are very proactive and hardworking. Extremely competitive rates and help close quickly.",
    name: "Google Reviewer",
    location: "Google Review",
    stars: 5,
  },
];

// Stats
const STATS = [
  { value: "9,100+", label: "Families Helped" },
  { value: "23", label: "Avg Days to Close" },
  { value: "6+", label: "States Licensed" },
  { value: "8", label: "Loan Programs" },
];

// Fade-up hook
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

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
    <div
      ref={ref}
      className={`fade-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Fetch live 30-yr fixed rate from FRED via CORS proxy ───────────────────
async function fetchFredRate(): Promise<{ rate: number; date: string } | null> {
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

// Mortgage Calculator
type LoanType = "30yr" | "15yr" | "arm";

const LOAN_TYPES: { id: LoanType; label: string; sublabel: string; rateOffset: number; term: number }[] = [
  { id: "30yr", label: "30-Year Fixed", sublabel: "Stable, predictable", rateOffset: 0, term: 30 },
  { id: "15yr", label: "15-Year Fixed", sublabel: "Pay off faster", rateOffset: -0.625, term: 15 },
  { id: "arm", label: "5/1 ARM", sublabel: "Lower intro rate", rateOffset: -1.0, term: 30 },
];

function calcMonthlyPI(principal: number, annualRate: number, termYears: number) {
  const monthlyRate = annualRate / 100 / 12;
  const n = termYears * 12;
  if (monthlyRate === 0) return principal / n;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
}

function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(550000);
  const [downPct, setDownPct] = useState(20);
  const [baseRate, setBaseRate] = useState(6.52); // fallback; updated by live fetch
  const [loanType, setLoanType] = useState<LoanType>("30yr");
  const [rateLoading, setRateLoading] = useState(true);
  const [rateLive, setRateLive] = useState(false);
  const [rateDate, setRateDate] = useState("");

  useEffect(() => {
    fetchFredRate().then(result => {
      if (result) {
        setBaseRate(result.rate);
        setRateDate(result.date);
        setRateLive(true);
      }
      setRateLoading(false);
    });
  }, []);

  const selectedLoan = LOAN_TYPES.find(l => l.id === loanType)!;
  const effectiveRate = Math.max(2.5, baseRate + selectedLoan.rateOffset);
  const down = homePrice * (downPct / 100);
  const principal = homePrice - down;
  const numPayments = selectedLoan.term * 12;
  const monthlyPI = calcMonthlyPI(principal, effectiveRate, selectedLoan.term);
  const tax = (homePrice * 0.0125) / 12;
  const insurance = 110;
  // PMI: applies when down payment < 20%. Rate scales with LTV:
  // 15-19.99% down: ~0.5%, 10-14.99%: ~0.75%, 5-9.99%: ~1.0%, 3-4.99%: ~1.25%
  const hasPMI = downPct < 20;
  const pmiRate = downPct >= 15 ? 0.005 : downPct >= 10 ? 0.0075 : downPct >= 5 ? 0.01 : 0.0125;
  const monthlyPMI = hasPMI ? (principal * pmiRate) / 12 : 0;
  const total = monthlyPI + tax + insurance + monthlyPMI;
  const totalInterest = monthlyPI * numPayments - principal;

  // Side-by-side comparison data (PMI included in monthly totals)
  const comparison = LOAN_TYPES.map(lt => ({
    ...lt,
    rate: Math.max(2.5, baseRate + lt.rateOffset),
    monthly: calcMonthlyPI(principal, Math.max(2.5, baseRate + lt.rateOffset), lt.term),
  }));

  return (
    <div className="space-y-5">
      {/* Loan Type Selector */}
      <div>
        <label className="font-body text-sm font-medium text-brand-navy mb-2 block">Loan Type</label>
        <div className="grid grid-cols-3 gap-2">
          {LOAN_TYPES.map(lt => (
            <button
              key={lt.id}
              onClick={() => setLoanType(lt.id)}
              className={`btn-press rounded-lg border-2 px-3 py-2.5 text-left transition-all duration-150 ${
                loanType === lt.id
                  ? "border-brand-green bg-brand-green/10"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className={`font-body text-xs font-bold leading-tight ${
                loanType === lt.id ? "text-brand-navy" : "text-slate-700"
              }`}>{lt.label}</div>
              <div className="font-body text-[10px] text-slate-500 mt-0.5">{lt.sublabel}</div>
            </button>
          ))}
        </div>
        {loanType === "arm" && (
          <div className="mt-2 flex items-start gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <span className="text-amber-500 text-xs mt-0.5">&#9432;</span>
            <p className="font-body text-xs text-amber-700">Rate shown is for the initial 5-year fixed period. After that, it adjusts annually based on market index. Talk to our team about caps and worst-case scenarios.</p>
          </div>
        )}
      </div>

      {/* Home Price */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="font-body text-sm font-medium text-brand-navy">Home Price</label>
          <span className="font-mono-brand text-sm font-bold text-brand-navy">${homePrice.toLocaleString()}</span>
        </div>
        <input
          type="range" min={200000} max={2000000} step={10000} value={homePrice}
          onChange={e => setHomePrice(Number(e.target.value))}
          className="w-full accent-[#c1ff72]"
        />
        <div className="flex justify-between font-body text-xs text-slate-400 mt-1">
          <span>$200K</span><span>$2M</span>
        </div>
      </div>

      {/* Down Payment */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="font-body text-sm font-medium text-brand-navy">Down Payment</label>
          <span className="font-mono-brand text-sm font-bold text-brand-navy">{downPct}% &mdash; ${Math.round(down).toLocaleString()}</span>
        </div>
        <input
          type="range" min={3} max={50} step={1} value={downPct}
          onChange={e => setDownPct(Number(e.target.value))}
          className="w-full accent-[#c1ff72]"
        />
        <div className="flex justify-between font-body text-xs text-slate-400 mt-1">
          <span>3% (FHA/VA)</span><span>50%</span>
        </div>
        {hasPMI && (
          <div className="mt-2 flex items-start gap-1.5 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
            <span className="text-orange-400 text-xs mt-0.5 shrink-0">&#9888;</span>
            <p className="font-body text-xs text-orange-700">
              PMI applies at {downPct}% down. Estimated <span className="font-semibold">${Math.round(monthlyPMI)}/mo</span> ({(pmiRate * 100).toFixed(2)}% annually). PMI is removed once you reach 20% equity.
            </p>
          </div>
        )}
        {!hasPMI && downPct === 20 && (
          <div className="mt-2 flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <span className="text-green-500 text-xs">&#10003;</span>
            <p className="font-body text-xs text-green-700 font-medium">No PMI required at 20% down.</p>
          </div>
        )}
      </div>

      {/* Interest Rate */}
      <div>
        <div className="flex justify-between mb-2 items-center">
          <div className="flex items-center gap-2">
            <label className="font-body text-sm font-medium text-brand-navy">Base Rate (30-yr)</label>
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
          <span className="font-mono-brand text-sm font-bold text-brand-navy">{baseRate.toFixed(3)}%</span>
        </div>
        {rateLive && rateDate && (
          <p className="font-body text-[10px] text-slate-400 mb-1">Freddie Mac · {rateDate}</p>
        )}
        <input
          type="range" min={3} max={10} step={0.125} value={baseRate}
          onChange={e => setBaseRate(Number(e.target.value))}
          className="w-full accent-[#c1ff72]"
        />
        <div className="flex justify-between font-body text-xs text-slate-400 mt-1">
          <span>3.000%</span><span>10.000%</span>
        </div>
        {loanType !== "30yr" && (
          <div className="mt-1 font-body text-xs text-slate-500 text-right">
            Effective rate for {selectedLoan.label}: <span className="font-semibold text-brand-navy">{effectiveRate.toFixed(3)}%</span>
          </div>
        )}
      </div>

      {/* Result card */}
      <div className="bg-brand-navy rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-1">
          <div className="font-body text-xs text-white/50 uppercase tracking-widest">Estimated Monthly Payment</div>
          <div className="font-body text-xs text-brand-green font-semibold">{selectedLoan.label}</div>
        </div>
        <div className="font-display text-5xl font-bold text-brand-green mb-4">${Math.round(total).toLocaleString()}<span className="text-lg font-body font-normal text-white/50">/mo</span></div>
        <div className={`grid gap-3 border-t border-white/10 pt-4 ${hasPMI ? "grid-cols-4" : "grid-cols-3"}`}>
          <div className="text-center">
            <div className="font-body text-xs text-white/50 mb-0.5">Principal &amp; Interest</div>
            <div className="font-body text-base font-semibold">${Math.round(monthlyPI).toLocaleString()}</div>
          </div>
          <div className="text-center border-l border-white/10">
            <div className="font-body text-xs text-white/50 mb-0.5">Property Tax</div>
            <div className="font-body text-base font-semibold">${Math.round(tax).toLocaleString()}</div>
          </div>
          <div className="text-center border-l border-white/10">
            <div className="font-body text-xs text-white/50 mb-0.5">Insurance</div>
            <div className="font-body text-base font-semibold">${insurance}</div>
          </div>
          {hasPMI && (
            <div className="text-center border-l border-white/10">
              <div className="font-body text-xs text-amber-300 mb-0.5">PMI</div>
              <div className="font-body text-base font-semibold text-amber-300">${Math.round(monthlyPMI).toLocaleString()}</div>
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="font-body text-xs text-white/50">Loan Amount</div>
            <div className="font-body text-sm font-semibold">${Math.round(principal).toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="font-body text-xs text-white/50">{loanType === "arm" ? "5-yr intro period" : `${selectedLoan.term}-Year Fixed`}</div>
            <div className="font-body text-sm font-semibold">Total Interest: ${Math.round(totalInterest).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="rounded-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100">
          <span className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Scenario Comparison</span>
        </div>
        <div className="divide-y divide-slate-100">
          {comparison.map(lt => (
            <button
              key={lt.id}
              onClick={() => setLoanType(lt.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                loanType === lt.id ? "bg-brand-green/8" : "bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  loanType === lt.id ? "bg-brand-green" : "bg-slate-300"
                }`} />
                <div>
                  <div className={`font-body text-sm font-semibold ${
                    loanType === lt.id ? "text-brand-navy" : "text-slate-700"
                  }`}>{lt.label}</div>
                  <div className="font-body text-xs text-slate-400">{lt.rate.toFixed(3)}% rate</div>
                </div>
              </div>
              <div className="text-right">
              <div className={`font-mono-brand text-sm font-bold ${
                loanType === lt.id ? "text-brand-navy" : "text-slate-600"
              }`}>${Math.round(lt.monthly + tax + insurance + monthlyPMI).toLocaleString()}/mo</div>
                <div className="font-body text-xs text-slate-400">P&amp;I: ${Math.round(lt.monthly).toLocaleString()}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className="font-body text-xs text-slate-400 text-center">Estimate only — taxes and insurance vary by property. Contact us for a personalized rate quote.</p>
    </div>
  );
}

// Contact form
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" });

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true);
      } else {
        toast.error("Something went wrong. Please call us directly at (925) 285-4898.");
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
      source: "Website Contact Form",
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-brand-navy" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">Message Received</h3>
        <p className="font-body text-slate-600">We'll be in touch within one business day. No spam, ever.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
            placeholder="(555) 000-0000"
          />
        </div>
      </div>
      <div>
        <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">Email Address</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">I'm interested in</label>
        <select
          value={form.interest}
          onChange={e => setForm({ ...form, interest: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors bg-white"
        >
          <option value="">Select an option</option>
          <option value="purchase">Buying a Home</option>
          <option value="refinance">Refinancing</option>
          <option value="preapproval">Getting Pre-Approved</option>
          <option value="investment">Investment Property</option>
          <option value="construction">Construction Loan</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block font-body text-sm font-medium text-brand-navy mb-1.5">Message (optional)</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-md font-body text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors resize-none"
          placeholder="Tell us about your situation..."
        />
      </div>
      <button
        type="submit"
        disabled={submitLead.isPending}
        className="btn-press w-full bg-brand-navy text-white font-body font-semibold text-sm py-3 rounded-md hover:bg-[#1a3a6b] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitLead.isPending ? "Sending..." : "Send Message"}
      </button>
      <p className="font-body text-xs text-slate-400 text-center">We respond within one business day. No spam, ever.</p>
    </form>
  );
}

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="architectural-rules relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/assets/revest-hero-home.jpg)` }}
        />
        {/* Overlay — light left, darker right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="font-body text-xs font-medium text-white tracking-wide uppercase">Santa Cruz, CA — Licensed in 5 States</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Creative{" "}
              <span className="text-brand-green italic">Mortgage</span>
              <br />
              Solutions That{" "}
              <span className="text-brand-green italic">Close.</span>
            </h1>

            <p className="font-body text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              Revest Loans specializes in the deals other lenders walk away from. Same-day pre-approvals, 8 loan programs, and a team that stays in your corner from application to keys.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press bg-brand-green text-brand-navy font-body font-bold text-base px-7 py-3.5 rounded-md hover:bg-[#aef55a] transition-colors duration-200 flex items-center gap-2"
              >
                Apply Now
                <ArrowRight size={16} />
              </a>
              <a
                href={SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press bg-white/10 backdrop-blur-sm border border-white/30 text-white font-body font-semibold text-base px-7 py-3.5 rounded-md hover:bg-white/20 transition-colors duration-200"
              >
                Search Homes
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["Same-Day Pre-Approval", "No Referral Fees", "9 Loan Programs", "In-House Lending"].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-brand-green" />
                  <span className="font-body text-sm text-white/80">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="font-body text-xs text-white/50 tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="text-white/50" />
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <FadeSection key={s.label} delay={i * 80} className="text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold text-brand-green mb-1">{s.value}</div>
                <div className="font-body text-sm text-white/60 tracking-wide">{s.label}</div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / MISSION */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <FadeSection>
              <div className="relative">
                <img
                  src="/assets/jim-black-mission.jpeg"
                  alt="Jim Black, Founder & Senior Loan Officer at Revest Loans"
                  className="w-full h-[480px] object-cover rounded-xl shadow-xl"
                  style={{ objectPosition: 'center 20%' }}
                />
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -right-6 bg-brand-navy text-white rounded-xl p-5 shadow-2xl">
                  <div className="font-display text-3xl font-bold text-brand-green">20+</div>
                  <div className="font-body text-sm text-white/70 mt-0.5">Years of Experience</div>
                </div>
              </div>

              {/* Jim's quote */}
              <div className="mt-10 border-l-4 border-brand-green pl-5 py-1">
                <p className="font-body text-base italic text-slate-600 leading-relaxed">
                  "I've been doing this for over 20 years. The deals that matter most are usually the ones that look complicated on paper — and that's exactly where we do our best work."
                </p>
                <img
                  src="/assets/jim-black-signature.webp"
                  alt="Jim Black signature"
                  className="h-12 w-auto mt-3 opacity-90"
                />
                <p className="font-body text-xs text-slate-400 mt-1">Founder &amp; Senior Loan Officer, NMLS #250769</p>
              </div>
            </FadeSection>

            {/* Content */}
            <FadeSection delay={150}>
              <div className="section-divider" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Our Mission</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
                We Specialize in the Deals{" "}
                <span className="italic text-[#1a3a6b]">Others Walk Away From.</span>
              </h2>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-5">
                Revest Loans was built on a simple belief: every family deserves a lender who fights for them. Founded by Jim Black in Santa Cruz, California, our team brings over two decades of creative financing expertise to every transaction.
              </p>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-8">
                We don't just process applications. We solve problems. Whether it's a complex self-employment situation, a construction project, or a first-time buyer who needs down payment assistance, we find a path forward when other lenders say no.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Same-Day Pre-Approval", sub: "Fully underwritten" },
                  { label: "In-House Lending", sub: "No third-party delays" },
                  { label: "Creative Financing", sub: "Complex deals welcome" },
                  { label: "5 States Licensed", sub: "CA, OR, FL, WI, TX" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={12} className="text-brand-navy" />
                    </div>
                    <div>
                      <div className="font-body text-sm font-semibold text-brand-navy">{item.label}</div>
                      <div className="font-body text-xs text-slate-500">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 bg-brand-navy text-white font-body font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#1a3a6b] transition-colors"
              >
                Get Pre-Approved Today
                <ArrowRight size={14} />
              </a>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-14">
            <div className="section-divider mx-auto" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">The Team</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
              Meet the Revest Loans Team
            </h2>
            <p className="font-body text-base text-slate-600 max-w-xl mx-auto">
              Nine specialists, one shared goal: get your loan closed on time, with no surprises.
            </p>
          </FadeSection>

          {/* Team Bio Modal */}
          {selectedMember && (
            <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <FadeSection key={member.name} delay={i * 80}>
                <div
                  className="card-lift bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 h-full flex flex-col cursor-pointer group"
                  onClick={() => setSelectedMember(member)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setSelectedMember(member); }}
                  aria-label={`View ${member.name}'s full bio`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden" style={{ background: (member as any).cardBg || undefined }} >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className={`absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105 ${ (member as any).objectFit === 'contain' ? 'object-contain' : 'object-cover' }`}
                      style={{ objectPosition: member.objectPosition || "center top" }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-brand-navy font-body font-bold text-xs px-3 py-1.5 rounded-full shadow">
                        View Bio
                      </span>
                    </div>
                    {member.nmls && (
                      <div className="absolute bottom-3 left-3">
                        <span className="nmls-badge">{member.nmls}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-brand-navy mb-0.5">{member.name}</h3>
                    <p className="font-body text-sm font-medium text-[#1a3a6b] mb-3">{member.title}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.tags.map(tag => (
                        <span key={tag} className="font-body text-xs bg-brand-card text-[#1a3a6b] px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <button
                        className="font-body text-xs font-semibold text-[#1a3a6b] flex items-center gap-1 hover:text-brand-navy transition-colors"
                        tabIndex={-1}
                      >
                        View Full Bio <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* LOAN PROGRAMS */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-14">
            <div className="section-divider mx-auto" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Loan Programs</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
              A Program for Every Situation
            </h2>
            <p className="font-body text-base text-slate-600 max-w-xl mx-auto">
              From first-time buyers to seasoned investors, we have just about every program you can imagine, and plenty you've never heard of.
            </p>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAMS.map((prog, i) => (
              <FadeSection key={prog.name} delay={i * 60}>
                <div className="card-lift bg-white border border-slate-100 rounded-xl p-6 shadow-sm h-full">
                  <div className={`w-10 h-10 rounded-lg ${prog.color} flex items-center justify-center mb-4`}>
                    <prog.icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-navy mb-2">{prog.name}</h3>
                  <p className="font-body text-sm text-slate-600 leading-relaxed">{prog.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/loan-programs"
              className="btn-press inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold text-sm px-7 py-3.5 rounded-md hover:bg-[#aef55a] transition-colors"
            >
              Explore All Programs
              <ArrowRight size={16} />
            </Link>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 border border-brand-navy text-brand-navy font-body font-bold text-sm px-7 py-3.5 rounded-md hover:bg-brand-navy hover:text-white transition-colors"
            >
              Apply Now
              <ArrowRight size={16} />
            </a>
          </FadeSection>
        </div>
      </section>

      {/* BRIDGE LOAN SPOTLIGHT */}
      <section id="bridge-loans" className="py-24 bg-brand-navy overflow-hidden relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #c1ff72 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4a90d9 0%, transparent 40%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: content */}
            <FadeSection>
              <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-green">Jim's Specialty</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Buy Your Next Home{" "}
                <span className="italic text-brand-green">Before You Sell.</span>
              </h2>
              <p className="font-body text-base text-slate-300 leading-relaxed mb-5">
                Bridge loans are Jim Black's signature specialty — and for good reason. In competitive markets like Santa Cruz, waiting to sell before you buy means losing out on the home you actually want. A bridge loan lets you tap your existing home equity to fund the down payment on your next property, so you can move on your timeline, not the market's.
              </p>
              <p className="font-body text-base text-slate-300 leading-relaxed mb-8">
                No contingencies. No rushed sales. No settling. Jim has structured bridge loans for over 23 years and knows how to get them done quickly, cleanly, and with full transparency from day one.
              </p>
              {/* How it works steps */}
              <div className="space-y-4 mb-10">
                {[
                  { step: "01", title: "Tap Your Equity", desc: "Borrow against your current home's equity — typically up to 80% LTV — to fund your new purchase." },
                  { step: "02", title: "Buy Without Contingencies", desc: "Make a clean, competitive offer on your next home without a sale contingency holding you back." },
                  { step: "03", title: "Sell on Your Terms", desc: "Once you're settled in, sell your old home at the right price and pay off the bridge loan at closing." },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/15 border border-brand-green/30 flex items-center justify-center shrink-0">
                      <span className="font-mono-brand text-xs font-bold text-brand-green">{item.step}</span>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-white text-sm mb-1">{item.title}</p>
                      <p className="font-body text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://calendly.com/jimblack-revest/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#d4ff8a] transition-colors duration-200"
                >
                  Book a Call with Jim
                  <ArrowRight size={16} />
                </a>
                <Link
                  href="/bridge-loans"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeSection>

            {/* Right: stats + FAQ cards */}
            <FadeSection className="space-y-5">
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "23+", label: "Years Specializing in Bridge Loans" },
                  { value: "9,100+", label: "Families Helped Across 5 States" },
                  { value: "Same Day", label: "Pre-Approval Turnaround" },
                  { value: "Top 1%", label: "Mortgage Brokers Nationally" },
                ].map(stat => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                    <p className="font-display text-2xl font-bold text-brand-green mb-1">{stat.value}</p>
                    <p className="font-body text-xs text-slate-400 leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
              {/* FAQ cards */}
              <div className="space-y-3">
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">Common Questions</p>
                {[
                  {
                    q: "Who qualifies for a bridge loan?",
                    a: "Most homeowners with 20%+ equity in their current property qualify. Jim reviews your full picture — income, equity, and timeline — to find the right structure."
                  },
                  {
                    q: "How long does a bridge loan last?",
                    a: "Typically 6 to 12 months — enough time to sell your current home comfortably without pressure. Extensions are available if needed."
                  },
                  {
                    q: "Are bridge loan rates higher than a regular mortgage?",
                    a: "Yes, slightly — but the cost is usually far outweighed by the ability to make a clean offer and avoid a rushed sale at a lower price."
                  },
                ].map(item => (
                  <details key={item.q} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none">
                      <span className="font-body text-sm font-medium text-white">{item.q}</span>
                      <ChevronDown size={16} className="text-brand-green shrink-0 group-open:rotate-180 transition-transform duration-200" />
                    </summary>
                    <div className="px-5 pb-4">
                      <p className="font-body text-sm text-slate-400 leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </FadeSection>
          </div>

          {/* Bridge Loan Reviews Strip */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <FadeSection className="text-center mb-10">
              {/* Google Reviews Badge */}
              <a
                href="https://www.google.com/search?q=Jim+Black+Revest+Loans+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-8 group"
              >
                {/* Google G logo */}
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
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">Client Reviews</p>
              <h3 className="font-display text-2xl font-bold text-white">What Bridge Loan Clients Say About Jim</h3>
            </FadeSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              ].map((review, i) => (
                <FadeSection key={review.name} delay={i * 80}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: review.stars }).map((_, j) => (
                        <Star key={j} size={14} className="fill-brand-green text-brand-green" />
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
                </FadeSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MORTGAGE CALCULATOR */}
      <section id="calculator" className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: heading + context */}
            <FadeSection>
              <div className="section-divider" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Payment Estimator</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
                What Will Your{" "}
                <span className="italic text-[#1a3a6b]">Monthly Payment</span>{" "}
                Look Like?
              </h2>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-6">
                Use our calculator to get a quick estimate based on home price, down payment, and interest rate. Adjust the sliders to match your scenario.
              </p>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-8">
                Ready for a real number? Our team provides same-day pre-approvals with fully underwritten figures — no guesswork, no surprises at closing.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Same-Day Pre-Approval", sub: "Fully underwritten" },
                  { label: "No Hidden Fees", sub: "Transparent pricing" },
                  { label: "9 Loan Programs", sub: "FHA, VA, Jumbo & more" },
                  { label: "Licensed in 5 States", sub: "CA, OR, FL, WI, TX" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={12} className="text-brand-navy" />
                    </div>
                    <div>
                      <div className="font-body text-sm font-semibold text-brand-navy">{item.label}</div>
                      <div className="font-body text-xs text-slate-500">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold text-sm px-7 py-3.5 rounded-md hover:bg-[#aef55a] transition-colors"
              >
                Get My Real Rate
                <ArrowRight size={16} />
              </a>
            </FadeSection>

            {/* Right: calculator */}
            <FadeSection delay={150}>
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center">
                    <HomeIcon size={20} className="text-brand-navy" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-brand-navy">Mortgage Calculator</div>
                    <div className="font-body text-xs text-slate-500">30-Year Fixed Rate</div>
                  </div>
                </div>
                <MortgageCalculator />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH US */}
      <section id="partner-benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: heading + intro */}
            <FadeSection>
              <div className="section-divider mb-4" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">For Real Estate Teams</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
                Why Top Agents{" "}
                <span className="italic text-[#1a3a6b]">Partner With Revest Loans.</span>
              </h2>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-5">
                When your clients need financing, the lender you refer them to reflects directly on you. Revest Loans is built around making agents look good — fast closings, clear communication, and creative solutions that keep deals alive when other lenders walk away.
              </p>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-8">
                Our in-house mortgage team operates as a true extension of your business. We show up on calls, attend closings, and treat every referral like it came from a family member.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Same-day pre-approvals",
                  "In-house underwriting",
                  "Bridge loan specialists",
                  "Licensed in 5 states",
                  "Co-branded marketing support",
                  "Dedicated agent hotline",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 bg-brand-surface border border-slate-200 rounded-full px-3.5 py-1.5 font-body text-xs font-medium text-brand-navy">
                    <CheckCircle2 size={12} className="text-brand-navy shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </FadeSection>

            {/* Right: benefit cards */}
            <FadeSection className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  title: "Deals Stay Alive",
                  desc: "Jim's creative financing background means we find solutions when conventional lenders say no. Fewer fallen-out escrows, more closed commissions.",
                  accent: "bg-brand-navy",
                },
                {
                  icon: Clock,
                  title: "Speed That Wins Offers",
                  desc: "Same-day pre-approvals and in-house underwriting mean your buyers can move fast in competitive markets without waiting on a slow bank.",
                  accent: "bg-[#1a3a6b]",
                },
                {
                  icon: Users,
                  title: "Co-Branded Marketing",
                  desc: "We build co-branded landing pages, social content, and email campaigns that put your name and ours in front of buyers together.",
                  accent: "bg-brand-navy",
                },
                {
                  icon: TrendingUp,
                  title: "Bridge Loan Advantage",
                  desc: "Our bridge loan specialty lets your move-up buyers make clean, non-contingent offers — a powerful edge in any market.",
                  accent: "bg-[#1a3a6b]",
                },
                {
                  icon: Phone,
                  title: "Always Reachable",
                  desc: "A dedicated agent line means you can reach Jim or Chaz directly — not a call center. Real answers in real time when a deal is on the line.",
                  accent: "bg-brand-navy",
                },
                {
                  icon: MapPin,
                  title: "Multi-State Coverage",
                  desc: "Licensed in CA, OR, FL, WI, and TX — we can serve your clients whether they're buying locally or relocating across state lines.",
                  accent: "bg-[#1a3a6b]",
                },
              ].map((card) => (
                <div key={card.title} className="bg-brand-surface rounded-xl p-5 border border-slate-100 hover:shadow-md transition-shadow duration-200">
                  <div className={`w-9 h-9 rounded-lg ${card.accent} flex items-center justify-center mb-4`}>
                    <card.icon size={16} className="text-brand-green" />
                  </div>
                  <h3 className="font-body text-sm font-bold text-brand-navy mb-2">{card.title}</h3>
                  <p className="font-body text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              ))}

              {/* CTA card spanning full width */}
              <div className="sm:col-span-2 bg-brand-navy rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-body text-sm font-bold text-white mb-1">Ready to explore a partnership?</p>
                  <p className="font-body text-xs text-slate-400">Let's talk about how we can grow together.</p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-[#d4ff8a] transition-colors duration-200 shrink-0"
                >
                  Get in Touch <ArrowRight size={13} />
                </a>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* BEAT THE RATE TEASER */}
      <section className="py-20 bg-brand-green">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-navy/60 mb-3">Free Service</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-5">
                Beat the Rate.
                <br />We'll Tell You When.
              </h2>
              <p className="font-body text-base text-brand-navy/75 leading-relaxed mb-8 max-w-lg">
                Already have a mortgage? Sign up once and Jim's team monitors rates daily. The moment refinancing makes financial sense for your loan, we reach out — no spam, just the right call at the right time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/beat-the-rate" className="inline-flex items-center gap-2 bg-brand-navy text-white font-body font-bold px-7 py-3.5 rounded-md hover:bg-[#1a3a6b] transition-colors">
                  <Bell size={16} /> Set My Rate Alert
                </Link>
                <Link href="/beat-the-rate" className="inline-flex items-center gap-2 bg-white/50 border border-brand-navy/20 text-brand-navy font-body font-semibold px-7 py-3.5 rounded-md hover:bg-white/80 transition-colors">
                  Check My Savings <ArrowRight size={16} />
                </Link>
              </div>
            </FadeSection>
            <FadeSection delay={120}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Avg. Monthly Savings", value: "$312", sub: "when refinancing makes sense" },
                  { label: "Avg. Break-Even", value: "14 mo.", sub: "to recoup closing costs" },
                  { label: "Families Helped", value: "9,100+", sub: "over 23 years" },
                  { label: "No Credit Pull", value: "Free", sub: "zero obligation to sign up" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/60 rounded-xl p-5 border border-brand-navy/10">
                    <p className="font-display text-3xl font-bold text-brand-navy mb-1">{s.value}</p>
                    <p className="font-body text-xs font-semibold text-brand-navy mb-0.5">{s.label}</p>
                    <p className="font-body text-xs text-brand-navy/55">{s.sub}</p>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* PARTNER MARKETS PREVIEW */}
      <section id="partners" className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-14">
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-brand-green mb-3 block">Partner Markets</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Integrated Real Estate + Lending
            </h2>
            <p className="font-body text-base text-white/60 max-w-xl mx-auto">
              We've built strategic partnerships with top regional real estate teams so your agent and lender are always on the same call.
            </p>
          </FadeSection>

          <div className="max-w-2xl mx-auto">
            {/* C&G Card */}
            <FadeSection>
              <Link href="/partners/culbertson-gray">
                <div className="card-lift relative rounded-xl overflow-hidden cursor-pointer group h-80">
                  <img
                    src="/assets/revest-partner-cg.webp"
                    alt="Sacramento skyline"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-flex items-center gap-1.5 bg-brand-green/20 border border-brand-green/30 rounded-full px-3 py-1 mb-3">
                      <span className="font-body text-xs font-semibold text-brand-green tracking-wide">CALIFORNIA</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">Culbertson & Gray Group</h3>
                    <p className="font-body text-sm text-white/70 mb-3">Sacramento, San Jose, and Lake Tahoe — 1,450+ families helped.</p>
                    <div className="flex items-center gap-1.5 text-brand-green font-body text-sm font-semibold">
                      Explore Partnership <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-brand-surface">
        {/* JSON-LD AggregateRating Schema — enables star ratings in Google search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Revest Loans",
              "alternateName": "Revest Loans — Team Jim Black",
              "url": "https://www.revestloans.com",
              "telephone": "+19252854898",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1015 Cedar St Ste D",
                "addressLocality": "Santa Cruz",
                "addressRegion": "CA",
                "postalCode": "95060",
                "addressCountry": "US"
              },
              "founder": {
                "@type": "Person",
                "name": "Jim Black",
                "jobTitle": "Senior Loan Officer",
                "identifier": "NMLS #250769"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
              "reviewCount": "101",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Mario Desantis" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Jim Black with ReVest Loans helped save a real estate transaction by quickly providing a bridge loan when timing became critical. His ability to move fast, communicate clearly, and structure the right financing solution made all the difference."
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Ann Ji" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Chaz and Jim were incredible to work with in the purchase of my duplex utilizing a bridge loan. Chaz was dependable, compassionate, fiercely resourceful, and so lovely to collaborate with. When there was a snag, I loved the team effort from Jim and Chaz."
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Bryant Martinez" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Jim is responsive, knowledgeable and resourceful. He and his team will understand your situation — whatever it may be — and help you obtain your target objective."
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Google Reviewer" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "This was by far the most amazing experience I have ever had with any lender. I only was able to get the property we wanted so badly based on Jim and Chaz helping me out with a Bridge Loan that I never thought I would qualify for. They are truly the best."
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Google Reviewer" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Absolutely fantastic experience working with Jim and his team! From start to finish, they demonstrated professionalism, efficiency, and a genuine commitment to making the home loan process as smooth as possible. Despite a tight turnaround, they delivered."
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Google Reviewer" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "It has been a pleasure working with Jim Black at Revest Loans. He is professional, responsive, and incredibly easy to collaborate with. We truly enjoyed partnering with him and appreciate the clear communication throughout the entire process. Highly recommend!"
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Google Reviewer" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "I had a great experience working with Jim Black and his team for my home loan. The team is very understanding, supportive, and helpful. I highly recommend Jim Black!"
                },
                {
                  "@type": "Review",
                  "author": { "@type": "Person", "name": "Google Reviewer" },
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "reviewBody": "Jim and Chaz are very proactive and hardworking. Extremely competitive rates and help close quickly."
                }
              ]
            })
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-14">
            <div className="section-divider mx-auto" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Client Stories</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
              What Our Clients Say
            </h2>
            {/* Google Rating Badge */}
            <a
              href="https://www.google.com/search?q=Revest+Loans+Team+Jim+Black+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-shadow mt-2"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-body text-sm font-semibold text-brand-navy">4.8</span>
              <span className="font-body text-sm text-slate-500">101 Google Reviews</span>
              <span className="font-body text-xs text-[#1a3a6b] font-semibold">View All →</span>
            </a>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeSection key={i} delay={i * 80}>
                <div className="card-lift bg-white rounded-xl p-7 shadow-sm border border-slate-100 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} size={15} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    {/* Google G logo */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                  <blockquote className="font-body text-base text-slate-700 leading-relaxed mb-5 border-l-2 border-brand-green pl-4 italic flex-1">
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

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        {/* JSON-LD FAQ Schema for Google and AI engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map(f => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a,
                },
              })),
            }),
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-14">
            <div className="section-divider mx-auto" />
            <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Common Questions</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
              Mortgage Questions,{" "}
              <span className="italic text-[#1a3a6b]">Straight Answers.</span>
            </h2>
            <p className="font-body text-base text-slate-500 max-w-xl mx-auto">
              No jargon, no runaround. Here are the questions we hear most often — answered the way we'd explain them to a neighbor.
            </p>
          </FadeSection>

          <FadeSection delay={100}>
            <Accordion type="single" collapsible className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b-0 last:border-b-0"
                >
                  <AccordionTrigger className="px-6 py-5 text-base font-semibold text-brand-navy hover:no-underline hover:bg-slate-50 transition-colors [&[data-state=open]]:bg-slate-50 [&[data-state=open]]:text-[#1a3a6b]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0">
                    <p className="font-body text-base text-slate-600 leading-relaxed">{faq.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeSection>

          <FadeSection delay={200} className="mt-10 text-center">
            <p className="font-body text-sm text-slate-500 mb-4">Still have questions? We're happy to talk through your specific situation.</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-navy text-white font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#1a3a6b] transition-colors"
            >
              Talk to a Loan Officer <ArrowRight size={16} />
            </a>
          </FadeSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: info */}
            <FadeSection>
              <div className="section-divider" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-[#1a3a6b] mb-3 block">Get In Touch</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
                Let's Talk About Your{" "}
                <span className="italic text-[#1a3a6b]">Next Move.</span>
              </h2>
              <p className="font-body text-base text-slate-600 leading-relaxed mb-8">
                Whether you're buying your first home, refinancing, or working on a complex deal, our team is ready to give you a straight answer with no pressure and no scripts.
              </p>

              <div className="space-y-4 mb-8">
                <a href="tel:9252854898" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center group-hover:bg-brand-green transition-colors">
                    <Phone size={18} className="text-brand-navy" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-slate-500 uppercase tracking-wide">Call Us</div>
                    <div className="font-body text-sm font-semibold text-brand-navy">(925) 285-4898</div>
                  </div>
                </a>
                <a href="mailto:Jim@RevestLoans.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center group-hover:bg-brand-green transition-colors">
                    <Mail size={18} className="text-brand-navy" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-slate-500 uppercase tracking-wide">Email</div>
                    <div className="font-body text-sm font-semibold text-brand-navy">Jim@RevestLoans.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center">
                    <MapPin size={18} className="text-brand-navy" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-slate-500 uppercase tracking-wide">Based In</div>
                    <div className="font-body text-sm font-semibold text-brand-navy">Santa Cruz, California</div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-card rounded-xl p-5">
                <div className="font-body text-xs font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Quick Apply</div>
                <p className="font-body text-sm text-slate-600 mb-3">Ready to get started? Our online application takes less than 10 minutes.</p>
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 bg-brand-green text-brand-navy font-body font-bold text-sm px-5 py-2.5 rounded-md hover:bg-[#aef55a] transition-colors"
                >
                  Start Application
                  <ArrowRight size={14} />
                </a>
              </div>
            </FadeSection>

            {/* Right: form */}
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
