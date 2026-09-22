/**
 * Distributor Dashboard View
 * Regional stock visibility, retailer allocation, dispatch monitoring, and low-stock alerts.
 */

import React from 'react';
import {
  DistributorTab,
  InventoryItem,
  RetailerOrder,
} from '../../types';
import {
  Building2,
  Package,
  AlertTriangle,
  Truck,
  CheckCircle2,
  Clock,
  TrendingUp,
  MapPin,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface DistributorDashboardProps {
  inventory: InventoryItem[];
  orders: RetailerOrder[];
  onNavigateTab: (tab: DistributorTab) => void;
  onApproveOrder: (orderId: string) => void;
  onDispatchOrder: (orderId: string) => void;
}

export const DistributorDashboard: React.FC<DistributorDashboardProps> = ({
  inventory,
  orders,
  onNavigateTab,
  onApproveOrder,
  onDispatchOrder,
}) => {
  const lowStockItems = inventory.filter((item) => item.currentStock <= item.reorderThreshold);
  const pendingApprovalOrders = orders.filter((o) => o.status === 'Pending Approval');
  const dispatchedOrders = orders.filter((o) => o.status === 'Dispatched');

  const totalStockUnits = inventory.reduce((acc, curr) => acc + curr.currentStock, 0);

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Regional Distributor Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                South Zone Master Distribution
              </span>
              <span className="text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full font-semibold">
                Ernakulam Regional Hub
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white mt-1">
              Apex Electro-Distributors Kerala
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Hub Code: <strong>DIST-KER-EKM-01</strong> • Servicing 142 Authorized Dealers
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateTab('inventory')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5"
            >
              <Package className="w-4 h-4" />
              <span>Manage Depot Stock</span>
            </button>
          </div>
        </div>

        {/* 4 Depot Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-slate-400 text-[11px] block">Depot Physical Units</span>
            <span className="text-base sm:text-lg font-heading font-bold text-white mt-0.5 block">
              {totalStockUnits.toLocaleString('en-IN')} Pcs
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-slate-400 text-[11px] block">Pending Dealer Indents</span>
            <span className="text-base sm:text-lg font-heading font-bold text-amber-300 mt-0.5 block">
              {pendingApprovalOrders.length} Awaiting Action
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-slate-400 text-[11px] block">Low Stock Alerts</span>
            <span className="text-base sm:text-lg font-heading font-bold text-rose-400 mt-0.5 block">
              {lowStockItems.length} SKUs Critical
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-slate-400 text-[11px] block">Territory Fill Rate</span>
            <span className="text-base sm:text-lg font-heading font-bold text-emerald-400 mt-0.5 block">
              98.4% On-Time
            </span>
          </div>
        </div>
      </div>

      {/* Critical Low Stock Advisory Banner */}
      {lowStockItems.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-rose-950 block text-sm">
                Low Stock Threshold Alert: {lowStockItems.length} SKUs need factory indent
              </span>
              <p className="text-rose-800 text-[11px] mt-0.5">
                {lowStockItems.map((item) => `${item.name} (${item.currentStock} left)`).join(', ')}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('inventory')}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs whitespace-nowrap shadow-2xs self-center"
          >
            Review Stock →
          </button>
        </div>
      )}

      {/* Pending Dealer Indents Table with Approve / Dispatch action */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-heading font-bold text-base text-slate-900">
              Dealer Stock Orders Awaiting Clearance
            </h2>
            <p className="text-xs text-slate-500">
              Authorize allocations for immediate dispatch from Ernakulam Central Depot
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            View All ({orders.length}) →
          </button>
        </div>

        <div className="space-y-3">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-indigo-700">#{ord.id}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      ord.status === 'Pending Approval'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : ord.status === 'Dispatched'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    {ord.status}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="font-semibold text-slate-700">{ord.retailerName}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Destination: {ord.city} • Indent Total: <strong>₹{ord.totalAmount.toLocaleString('en-IN')}</strong> ({ord.items.length} SKUs)
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-end sm:self-auto">
                {ord.status === 'Pending Approval' && (
                  <button
                    onClick={() => onApproveOrder(ord.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Indent</span>
                  </button>
                )}

                {ord.status === 'Pending Dispatch' && (
                  <button
                    onClick={() => onDispatchOrder(ord.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-2xs"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Mark Dispatched</span>
                  </button>
                )}

                {ord.status === 'Dispatched' && (
                  <span className="text-blue-700 font-bold flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>In Transit to Dealer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Depots Map / List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-xs">
        <h2 className="font-heading font-bold text-sm text-slate-900 mb-2">
          Territory Depot Network
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ernakulam Central Depot</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Primary warehouse • 1,280 pallets capacity</p>
            <span className="text-emerald-700 font-bold mt-2 block text-[11px]">Status: Active (92% Fill)</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Kozhikode North Hub</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Malabar zone satellite • 640 pallets capacity</p>
            <span className="text-emerald-700 font-bold mt-2 block text-[11px]">Status: Active (84% Fill)</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-800 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Kottayam Central Sub-depot</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Central Travancore feeder • 420 pallets capacity</p>
            <span className="text-emerald-700 font-bold mt-2 block text-[11px]">Status: Active (88% Fill)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
