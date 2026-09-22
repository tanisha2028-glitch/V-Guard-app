/**
 * Interactive 6 Key Demo Journeys Modal
 * Guided 1-tap navigation for product evaluation and grading
 */

import React from 'react';
import { AppRole, CustomerTab, RetailerTab, DistributorTab } from '../../types';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  X,
  Flame,
  Sun,
  Bot,
  ShieldCheck,
  Store,
  Warehouse,
  Sparkles,
} from 'lucide-react';

interface DemoJourneysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectJourney: (journeyIndex: number) => void;
}

export interface DemoJourneyInfo {
  index: number;
  title: string;
  role: AppRole;
  category: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

export const DEMO_JOURNEYS: DemoJourneyInfo[] = [
  {
    index: 1,
    title: 'Switch OFF Compatible Demo Geyser',
    role: 'customer',
    category: 'Smart Home IoT',
    description: 'Interact with the Calino 25L IoT Smart Geyser. Toggle simulated power, adjust target water temperature, and observe telemetry.',
    icon: <Flame className="w-5 h-5 text-orange-500" />,
    badge: 'Customer Journey #1',
  },
  {
    index: 2,
    title: 'Check Solar Generation & Battery Backup',
    role: 'customer',
    category: 'Clean Energy',
    description: 'Inspect live rooftop 5kW generation (4.2 kW), 84% battery storage, household load, and rupee savings calculations.',
    icon: <Sun className="w-5 h-5 text-amber-500" />,
    badge: 'Customer Journey #2',
  },
  {
    index: 3,
    title: 'Ask AI Question & Raise Service Request',
    role: 'customer',
    category: 'AI & Support',
    description: 'Use "Ask V-Guard" assistant to diagnose heating delay, followed by 4-step certified engineer appointment booking with ticket creation.',
    icon: <Bot className="w-5 h-5 text-blue-500" />,
    badge: 'Customer Journey #3',
  },
  {
    index: 4,
    title: 'Find Product Warranty & User Manual',
    role: 'customer',
    category: 'Product Lifecycle',
    description: 'Open the Magno 410 Stabilizer or Calino Geyser to view digital warranty certificate, PDF manual preview, and maintenance tips.',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    badge: 'Customer Journey #4',
  },
  {
    index: 5,
    title: 'Retailer: Search Catalogue, Order & Customer Registration',
    role: 'retailer',
    category: 'Channel Partner',
    description: 'Search V-Guard & Sunflame trade catalogue, place a mock stock replenishment order, and register warranty for a walk-in customer.',
    icon: <Store className="w-5 h-5 text-indigo-500" />,
    badge: 'Retailer Journey #5',
  },
  {
    index: 6,
    title: 'Distributor: Check Stock Levels & Order Dispatch',
    role: 'distributor',
    category: 'Logistics & Depot',
    description: 'Inspect warehouse SKU inventories (wires, stabilizers, solar), review pending retailer orders, and dispatch consignments.',
    icon: <Warehouse className="w-5 h-5 text-teal-500" />,
    badge: 'Distributor Journey #6',
  },
];

export const DemoJourneysModal: React.FC<DemoJourneysModalProps> = ({
  isOpen,
  onClose,
  onSelectJourney,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base">Key Demo Journeys</h2>
              <p className="text-xs text-slate-400">Click any journey for a guided 1-tap walkthrough</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of 6 Journeys */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5 bg-slate-50 flex-1">
          {DEMO_JOURNEYS.map((journey) => (
            <div
              key={journey.index}
              onClick={() => {
                onSelectJourney(journey.index);
                onClose();
              }}
              className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all cursor-pointer group flex items-start justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                  {journey.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                      {journey.badge}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium capitalize">
                      • {journey.role} Mode
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-slate-900 mt-1 group-hover:text-orange-600 transition-colors">
                    {journey.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {journey.description}
                  </p>
                </div>
              </div>

              <div className="self-center p-2 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
          Tip: You can also switch roles anytime using the top bar pills (Customer / Retailer / Distributor).
        </div>
      </div>
    </div>
  );
};
