/**
 * Mobile-First Bottom Navigation Bar
 */

import React from 'react';
import { AppRole, CustomerTab, RetailerTab, DistributorTab } from '../../types';
import {
  Home,
  Package,
  Sun,
  Wrench,
  User,
  LayoutDashboard,
  Layers,
  ShoppingBag,
  HelpCircle,
  Boxes,
  ClipboardList,
  Megaphone,
} from 'lucide-react';

interface BottomNavProps {
  role: AppRole;
  customerTab: CustomerTab;
  setCustomerTab: (tab: CustomerTab) => void;
  retailerTab: RetailerTab;
  setRetailerTab: (tab: RetailerTab) => void;
  distributorTab: DistributorTab;
  setDistributorTab: (tab: DistributorTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  role,
  customerTab,
  setCustomerTab,
  retailerTab,
  setRetailerTab,
  distributorTab,
  setDistributorTab,
}) => {
  if (role === 'customer') {
    const tabs: { id: CustomerTab; label: string; icon: React.ReactNode }[] = [
      { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
      { id: 'products', label: 'My Products', icon: <Package className="w-5 h-5" /> },
      { id: 'solar', label: 'Solar', icon: <Sun className="w-5 h-5" /> },
      { id: 'services', label: 'Services', icon: <Wrench className="w-5 h-5" /> },
      { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    ];

    return (
      <nav aria-label="Customer Navigation" className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-2 py-1.5 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          {tabs.map((tab) => {
            const isActive = customerTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-customer-${tab.id}`}
                onClick={() => setCustomerTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-orange-600 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-orange-50' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[11px] mt-0.5 leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (role === 'retailer') {
    const tabs: { id: RetailerTab; label: string; icon: React.ReactNode }[] = [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'catalogue', label: 'Catalogue', icon: <Layers className="w-5 h-5" /> },
      { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-5 h-5" /> },
      { id: 'support', label: 'Support', icon: <HelpCircle className="w-5 h-5" /> },
      { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    ];

    return (
      <nav aria-label="Retailer Navigation" className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-2 py-1.5 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          {tabs.map((tab) => {
            const isActive = retailerTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-retailer-${tab.id}`}
                onClick={() => setRetailerTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-blue-600 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-blue-50' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[11px] mt-0.5 leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Distributor
  const tabs: { id: DistributorTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Boxes className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'bulletins', label: 'Bulletins', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav aria-label="Distributor Navigation" className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-2 py-1.5 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const isActive = distributorTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-distributor-${tab.id}`}
              onClick={() => setDistributorTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-700 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-emerald-50' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[11px] mt-0.5 leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
