/**
 * Retailer Dashboard View
 * Lightweight & practical channel partner tool for V-Guard & Sunflame dealers.
 */

import React from 'react';
import { RetailerTab, RetailerOrder } from '../../types';
import {
  Store,
  ShoppingBag,
  PlusCircle,
  FileCheck,
  Wrench,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface RetailerDashboardProps {
  orders: RetailerOrder[];
  onNavigateTab: (tab: RetailerTab) => void;
  onOpenOrderModal: () => void;
  onOpenCustomerRegisterModal: () => void;
}

export const RetailerDashboard: React.FC<RetailerDashboardProps> = ({
  orders,
  onNavigateTab,
  onOpenOrderModal,
  onOpenCustomerRegisterModal,
}) => {
  const pendingOrders = orders.filter((o) => o.status === 'Pending Approval' || o.status === 'Dispatched');

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Dealer Welcome Strip */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Authorized Dealer Portal
              </span>
              <span className="text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/40 px-2 py-0.5 rounded-full font-semibold">
                Tier-1 Partner
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white mt-1">
              Lakshmi Electricals & Appliances
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Dealer Code: <strong>RET-KER-KOCH-102</strong> • Kadavanthra, Kochi
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-retailer-new-order"
              onClick={onOpenOrderModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>+ New Stock Order</span>
            </button>
            <button
              id="btn-retailer-reg-customer"
              onClick={onOpenCustomerRegisterModal}
              className="bg-white/15 hover:bg-white/20 text-white border border-white/20 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 active:scale-95"
            >
              <FileCheck className="w-4 h-4 text-orange-400" />
              <span>Register Customer</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-blue-800/60 text-xs">
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-slate-400 text-[11px] block">Month Primary Volume</span>
            <span className="text-base sm:text-lg font-heading font-bold text-white mt-0.5 block">
              ₹4.82 Lakhs
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-slate-400 text-[11px] block">Active Dispatches</span>
            <span className="text-base sm:text-lg font-heading font-bold text-blue-300 mt-0.5 block">
              {pendingOrders.length} In Transit
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-slate-400 text-[11px] block">Customer Registrations</span>
            <span className="text-base sm:text-lg font-heading font-bold text-emerald-400 mt-0.5 block">
              42 This Month
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-slate-400 text-[11px] block">Trade Margin Bonus</span>
            <span className="text-base sm:text-lg font-heading font-bold text-amber-300 mt-0.5 block">
              +3.5% Festive
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          onClick={() => onNavigateTab('catalogue')}
          className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-slate-900">
            Wholesale Trade Catalogue
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Check dealer margins, unit prices, and distributor inventory availability.
          </p>
          <span className="text-xs font-bold text-blue-600 mt-2 block">
            Browse Catalogue →
          </span>
        </div>

        <div
          onClick={onOpenCustomerRegisterModal}
          className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-orange-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-slate-900">
            Customer Product Registration
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Register warranty for walk-in retail buyers and earn V-Guard Rishta dealer coins.
          </p>
          <span className="text-xs font-bold text-orange-600 mt-2 block">
            Register Customer Warranty →
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('support')}
          className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-slate-900">
            Installation & Support Desk
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Raise solar, AC stabilizer, or geyser installation requests for your customers.
          </p>
          <span className="text-xs font-bold text-emerald-600 mt-2 block">
            Raise Request →
          </span>
        </div>
      </div>

      {/* Recent Replenishment Orders */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-heading font-bold text-base text-slate-900">
              Recent Trade Stock Orders
            </h2>
            <p className="text-xs text-slate-500">Track shipments from Ernakulam Central Depot</p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            All Orders ({orders.length}) →
          </button>
        </div>

        <div className="space-y-2.5">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-blue-700">#{ord.id}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      ord.status === 'Dispatched'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ord.status}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium">Order Date: {ord.orderDate}</span>
                </div>
                <div className="mt-1 font-semibold text-slate-800">
                  {ord.items.map((i) => `${i.productName} (x${i.qty})`).join(', ')}
                </div>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-sm font-heading font-extrabold text-slate-900 block">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500">{ord.paymentMode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
