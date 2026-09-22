/**
 * Distributor Analytics View
 * Regional sales velocity, category mix, and dealer network health.
 */

import React from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Award,
  Users,
  Building2,
} from 'lucide-react';

export const DistributorAnalytics: React.FC = () => {
  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3 text-xs">
      <div>
        <h1 className="font-heading font-extrabold text-xl text-slate-900">
          Territory Market Intelligence
        </h1>
        <p className="text-slate-500">
          Kerala Zone 1 (Ernakulam, Thrissur, Kottayam, Idukki) Performance
        </p>
      </div>

      {/* Category velocity bar indicators */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <h2 className="font-heading font-bold text-sm text-slate-900">
          Category Primary Sales Distribution (YTD)
        </h2>

        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Consumer Durables (Water Heaters & Fans)</span>
              <span className="font-bold text-slate-900">38% (₹1.84 Cr)</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-[38%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Electronics (Stabilizers, UPS & Inverters)</span>
              <span className="font-bold text-slate-900">32% (₹1.55 Cr)</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-[32%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Electricals (Wires & Switchgear)</span>
              <span className="font-bold text-slate-900">18% (₹87 Lakhs)</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[18%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Sunflame Kitchen Appliances</span>
              <span className="font-bold text-slate-900">12% (₹58 Lakhs)</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[12%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Performing Authorized Dealers */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <h2 className="font-heading font-bold text-sm text-slate-900">
          Top Performing Territory Dealers
        </h2>

        <div className="space-y-2">
          {[
            { name: 'Lakshmi Electricals & Appliances', city: 'Kochi', vol: '₹48.2 Lakhs', growth: '+18.4%' },
            { name: 'Malabar Power Systems', city: 'Calicut', vol: '₹41.8 Lakhs', growth: '+22.1%' },
            { name: 'Kottayam Electronics Mart', city: 'Kottayam', vol: '₹34.5 Lakhs', growth: '+14.6%' },
          ].map((d, i) => (
            <div
              key={i}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px]">
                  #{i + 1}
                </span>
                <div>
                  <span className="font-bold text-slate-900 block">{d.name}</span>
                  <span className="text-[11px] text-slate-500">{d.city} • Platinum Club</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-heading font-extrabold text-slate-900 block">{d.vol}</span>
                <span className="text-emerald-700 font-bold text-[11px]">{d.growth} YoY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
