/**
 * Distributor Orders View
 * Manage dealer allocations, clearances, and fleet dispatches
 */

import React from 'react';
import { RetailerOrder } from '../../types';
import {
  CheckCircle2,
  Truck,
  Building2,
  Clock,
  FileText,
  MapPin,
} from 'lucide-react';

interface DistributorOrdersProps {
  orders: RetailerOrder[];
  onApproveOrder: (orderId: string) => void;
  onDispatchOrder: (orderId: string) => void;
}

export const DistributorOrders: React.FC<DistributorOrdersProps> = ({
  orders,
  onApproveOrder,
  onDispatchOrder,
}) => {
  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3 text-xs">
      <div>
        <h1 className="font-heading font-extrabold text-xl text-slate-900">
          Authorized Dealer Indents
        </h1>
        <p className="text-slate-500">
          Review purchase indents, check dealer credit approvals, and assign dispatches
        </p>
      </div>

      <div className="space-y-3">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-sm text-indigo-700">#{ord.id}</span>
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
                  <span className="text-slate-500">{ord.orderDate}</span>
                </div>
                <div className="font-bold text-slate-900 mt-1 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ord.retailerName}</span>
                  <span className="text-slate-400 font-mono text-[11px]">({ord.retailerCode})</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-heading font-extrabold text-slate-900">
                  ₹{ord.totalAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 block">Terms: {ord.paymentMode}</span>
              </div>
            </div>

            {/* Line items summary */}
            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Requested SKUs
              </span>
              {ord.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-800 font-medium">
                    {it.productName} ({it.code})
                  </span>
                  <span className="font-bold text-slate-700">
                    x{it.qty} pcs @ ₹{it.unitPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-1 text-slate-500 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Destination: {ord.city}</span>
              </div>

              <div className="flex items-center space-x-2">
                {ord.status === 'Pending Approval' && (
                  <button
                    onClick={() => onApproveOrder(ord.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-xl shadow-2xs flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Indent</span>
                  </button>
                )}

                {ord.status === 'Pending Dispatch' && (
                  <button
                    onClick={() => onDispatchOrder(ord.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-xl shadow-2xs flex items-center space-x-1"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Assign Fleet Truck & Dispatch</span>
                  </button>
                )}

                {ord.status === 'Dispatched' && (
                  <span className="text-blue-700 font-bold flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>In Transit (ETA {ord.deliveryExpected})</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
