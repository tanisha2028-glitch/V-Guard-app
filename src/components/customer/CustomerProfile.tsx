/**
 * Customer Profile View
 */

import React, { useState } from 'react';
import { VGuardLogo } from '../common/VGuardLogo';
import {
  User,
  MapPin,
  ShieldCheck,
  Award,
  Globe,
  Phone,
  FileCheck,
  ChevronRight,
  LogOut,
  Bell,
  Sparkles,
} from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  const [language, setLanguage] = useState('English');

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3 text-xs">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center space-x-3.5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-xs">
          AN
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h2 className="font-heading font-bold text-base text-slate-900">Adarsh Nair</h2>
            <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full">
              Verified Household
            </span>
          </div>
          <p className="text-slate-500 text-[11px] mt-0.5">adarsh.nair@example.com • +91 98471 00293</p>
          <div className="flex items-center space-x-1 text-slate-500 text-[11px] mt-1">
            <MapPin className="w-3 h-3 text-orange-500" />
            <span>Kadavanthra, Kochi, Kerala - 682020</span>
          </div>
        </div>
      </div>

      {/* V-Guard Rishta Loyalty Points */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-orange-400">
            <Award className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">V-Guard Rishta Rewards</span>
          </div>
          <div className="text-2xl font-heading font-extrabold text-white mt-1">
            1,240 <span className="text-xs font-normal text-slate-300">Points</span>
          </div>
          <p className="text-[10px] text-slate-300 mt-0.5">Earned from product registrations & feedback</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all shadow-xs">
          Redeem Gifts
        </button>
      </div>

      {/* Settings & Language */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <h3 className="font-heading font-bold text-sm text-slate-900">App Preferences</h3>

        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-800">Language Preference</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs font-medium"
          >
            <option value="English">English</option>
            <option value="Malayalam">മലയാളം (Malayalam)</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-800">Digital Warranty Vault Export</span>
          </div>
          <button className="text-orange-600 font-bold hover:underline">
            Download All (ZIP)
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-800">Privacy & Terms</span>
          </div>
          <span className="text-slate-400">v2.4 (2026)</span>
        </div>
      </div>

      {/* Brand Footer */}
      <div className="text-center pt-4 text-slate-400 text-xs">
        <p className="font-medium text-slate-600">V-Guard One — Bring Home a Better Tomorrow.</p>
        <p className="text-[10px] mt-0.5">© 2026 V-Guard Industries Ltd. Cochin, India</p>
      </div>
    </div>
  );
};
