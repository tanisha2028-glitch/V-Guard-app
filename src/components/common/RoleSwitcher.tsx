/**
 * Role Switcher & Interactive Demo Tour Launcher
 */

import React from 'react';
import { AppRole } from '../../types';
import { User, Store, Warehouse, Compass } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: AppRole;
  onSelectRole: (role: AppRole) => void;
  onOpenDemoTours: () => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  onSelectRole,
  onOpenDemoTours,
}) => {
  return (
    <div className="bg-slate-900 text-white px-3 py-1.5 flex items-center justify-between text-xs border-b border-slate-800">
      {/* Role selection pill group */}
      <div className="flex items-center space-x-1">
        <span className="text-slate-400 font-medium mr-1 hidden sm:inline">Role:</span>
        <button
          id="btn-role-customer"
          onClick={() => onSelectRole('customer')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            currentRole === 'customer'
              ? 'bg-orange-500 text-white shadow-sm font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Customer</span>
        </button>

        <button
          id="btn-role-retailer"
          onClick={() => onSelectRole('retailer')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            currentRole === 'retailer'
              ? 'bg-blue-600 text-white shadow-sm font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Retailer</span>
        </button>

        <button
          id="btn-role-distributor"
          onClick={() => onSelectRole('distributor')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            currentRole === 'distributor'
              ? 'bg-emerald-600 text-white shadow-sm font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Warehouse className="w-3.5 h-3.5" />
          <span>Distributor</span>
        </button>
      </div>

      {/* Guided Key Demo Journeys button */}
      <button
        id="btn-open-demo-journeys"
        onClick={onOpenDemoTours}
        className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-orange-300 hover:text-white border border-orange-500/40 px-2.5 py-1 rounded-full hover:bg-orange-500/30 transition-all font-semibold"
        title="Interactive 6 Key Demo Journeys"
      >
        <Compass className="w-3.5 h-3.5 text-orange-400 animate-spin-slow" />
        <span className="hidden xs:inline">6 Key Demo Journeys</span>
        <span className="xs:hidden">Demos</span>
      </button>
    </div>
  );
};
