/**
 * Retailer Orders View
 * Track all placed replenishment stock orders with the distributor
 */

import React from 'react';
import { RetailerOrder } from '../../types';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  FileText,
  Building2,
  PlusCircle,
} from 'lucide-react';

interface RetailerOrdersProps {
  orders: RetailerOrder[];
  onOpenOrderModal: () => void;
}

export const RetailerOrders: React.FC<RetailerOrdersProps> = ({
  orders,
  onOpenOrderModal,
}) => {
  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="font-heading font-extrabold text-xl text-slate-900">
            Stock Indents & Dispatches
          </h1>
          <p className="text-slate-500">
            Track wholesale shipments from Ernakulam Central Depot
          </p>
        </div>

        <button
          onClick={onOpenOrderModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Indent Order</span>
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-sm text-blue-700">#{ord.id}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    ord.status === 'Dispatched'
                      ? 'bg-blue-100 text-blue-800'
                      : ord.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {ord.status}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{ord.orderDate}</span>
              </div>

              <div className="text-right">
                <span className="text-base font-heading font-extrabold text-slate-900">
                  ₹{ord.totalAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-slate-400 text-[10px] block">Payment: {ord.paymentMode}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-1.5">
              <span className="font-semibold text-slate-700 block text-[11px]">Indent Manifest:</span>
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 space-y-1">
                {ord.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-800 font-medium">
                      • {item.productName} <span className="text-slate-400 font-mono">({item.code})</span>
                    </span>
                    <span className="font-semibold text-slate-700">
                      x{item.qty} units @ ₹{item.unitPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Status Strip */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
              <span className="flex items-center space-x-1 text-slate-700">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                <span>Expected Delivery: <strong>{ord.deliveryExpected}</strong></span>
              </span>

              <button className="text-blue-600 font-bold hover:underline flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Tax Invoice PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
