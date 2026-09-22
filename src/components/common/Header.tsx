/**
 * App Header with Brand Logo, Location/Profile, and Ask V-Guard trigger
 */

import React, { useState } from 'react';
import { VGuardLogo } from './VGuardLogo';
import { AppRole } from '../../types';
import { Bell, Sparkles, MapPin, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface HeaderProps {
  role: AppRole;
  onOpenAskVGuard: () => void;
  onOpenDemoModal?: () => void;
  activeServiceCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onOpenAskVGuard,
  onOpenDemoModal,
  activeServiceCount = 1,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const roleDetails = {
    customer: {
      entity: 'Adarsh’s Smart Home',
      location: 'Kochi, Kerala',
      badge: 'Verified Household',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    },
    retailer: {
      entity: 'Lakshmi Electricals',
      location: 'Kadavanthra, Kochi',
      badge: 'V-Guard Star Dealer',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    distributor: {
      entity: 'South Zone Central Depot',
      location: 'Ernakulam HUB',
      badge: 'Authorised Master Distributor',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
  }[role];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between">
        {/* Left: V-Guard Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <VGuardLogo size="md" variant="horizontal" showTagline={true} />
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {onOpenDemoModal && (
            <button
              id="btn-header-demo-tours"
              onClick={onOpenDemoModal}
              className="hidden sm:flex items-center space-x-1 border border-slate-300 text-slate-700 hover:bg-slate-50 px-2.5 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all"
              title="Key Demo Journeys"
            >
              <span>🧭 Demo Journeys</span>
            </button>
          )}

          {/* Ask V-Guard Quick AI Launcher */}
          <button
            id="btn-header-ask-ai"
            onClick={onOpenAskVGuard}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-xs hover:brightness-105 active:scale-95 transition-all"
            title="Ask V-Guard AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Ask V-Guard</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Notifications button */}
          <div className="relative">
            <button
              id="btn-header-notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {activeServiceCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-600 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <Bell className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-xs text-slate-800">Alerts & Updates</span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-orange-50/70 border border-orange-100">
                    <div className="font-medium text-orange-950 flex items-center justify-between">
                      <span>Service Scheduled</span>
                      <span className="text-[10px] text-orange-700">Tomorrow 10 AM</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Technician Ramesh Kumar assigned for Calino Smart Geyser (Ticket #VG-SR-2026-8842).
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                    <div className="font-medium text-emerald-950 flex items-center justify-between">
                      <span>Solar Generation Milestone</span>
                      <span className="text-[10px] text-emerald-700">Today</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Rooftop solar generated 19.8 kWh today, saving approx ₹158 in energy costs.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-header Context Strip */}
      <div className="bg-slate-50 border-t border-slate-200/70 px-3 sm:px-4 py-1.5 text-xs text-slate-600">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="font-semibold text-slate-800 truncate">{roleDetails.entity}</span>
            <span className="text-slate-400">•</span>
            <div className="flex items-center space-x-1 text-slate-500 text-[11px] truncate">
              <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" />
              <span>{roleDetails.location}</span>
            </div>
          </div>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${roleDetails.badgeColor} flex-shrink-0 flex items-center space-x-1`}>
            <ShieldCheck className="w-3 h-3" />
            <span>{roleDetails.badge}</span>
          </span>
        </div>
      </div>
    </header>
  );
};
