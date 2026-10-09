/**
 * Revest Loans Footer
 * Design: Dark navy background, green accents, DM Mono for NMLS numbers
 */
import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src="/assets/revest-official-logo.png"
                alt="Revest Loans"
                className="h-16 w-auto rounded-sm object-contain"
              />
            </div>
            <p className="font-body text-sm text-slate-300 leading-relaxed mb-4">
              Creative mortgage financing solutions for families across California, Oregon, Florida, Wisconsin, and Texas.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:9252854898" className="flex items-center gap-2 font-body text-sm text-slate-300 hover:text-brand-green transition-colors">
                <Phone size={14} />
                (925) 285-4898
              </a>
              <a href="mailto:Jim@RevestLoans.com" className="flex items-center gap-2 font-body text-sm text-slate-300 hover:text-brand-green transition-colors">
                <Mail size={14} />
                Jim@RevestLoans.com
              </a>
              <div className="flex items-center gap-2 font-body text-sm text-slate-300">
                <MapPin size={14} />
                Santa Cruz, CA
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><a href="https://revesthomes.my1003app.com/633511/register" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">Apply Now</a></li>
              <li><a href="https://search.culbertsonandgray.com/" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">Search Homes</a></li>
              <li><a href="https://search.culbertsonandgray.com/seller" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">Home Valuation</a></li>
              <li><Link href="/#programs" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">Loan Programs</Link></li>
              <li><Link href="/#team" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">Meet the Team</Link></li>
              <li><Link href="/#contact" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">Partner Markets</h4>
            <ul className="space-y-2.5">
              <li><Link href="/partners/culbertson-gray" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">Sacramento</Link></li>
              <li><Link href="/partners/culbertson-gray" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">San Jose</Link></li>
              <li><Link href="/partners/culbertson-gray" className="font-body text-sm text-slate-300 hover:text-brand-green transition-colors">Lake Tahoe</Link></li>
            </ul>
          </div>

          {/* Loan programs */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-4">Loan Programs</h4>
            <ul className="space-y-2.5">
              {["FHA Loans", "VA Loans", "Conventional", "USDA Loans", "Construction Loans", "Down Payment Assistance", "Jumbo Loans", "Reverse Mortgage"].map(p => (
                <li key={p}><span className="font-body text-sm text-slate-300">{p}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* NMLS disclosure */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="font-mono-brand text-xs text-slate-400 leading-relaxed">
            Jim Black NMLS #633511 | Chaz Sampson NMLS #1670621 | Patrik Smida NMLS #390618 | Miguel Flores NMLS #450794 | Mesha Dimitruk NMLS #694427 | Jason Walter NMLS #256669
          </p>
          <p className="font-body text-xs text-slate-400 mt-2 leading-relaxed">
            Revest Homes, Inc. is licensed by the California Department of Real Estate (Broker # 02174879) and holds NMLS numbers (633511/2362319) across California, Florida, Oregon, Texas &amp; Wisconsin
            <br />
            <br />
            Loan approvals are conditional and subject to underwriting review and written issuance. Rates are subject to market changes and may not apply to all borrowers. Revest Homes operates as an Equal Opportunity Mortgage Broker/Lender, offering services restricted to CA, FL, OR, TX &amp; WI.
          </p>
          <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
            <p className="font-body text-xs text-slate-500">
              © {new Date().getFullYear()} Revest Loans. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-brand-green/20 rounded flex items-center justify-center">
                <span className="text-brand-green text-[8px] font-bold">EHL</span>
              </div>
              <span className="font-body text-xs text-slate-400">Equal Housing Lender</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
