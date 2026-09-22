/**
 * Retailer Order Placement Modal
 * Create mock replenishment order from distributor depot
 */

import React, { useState } from 'react';
import { CatalogItem, RetailerOrder } from '../../types';
import { FULL_CATALOG } from '../../data/mockData';
import confetti from 'canvas-confetti';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2,
  Trash2,
  Building2,
  ShieldCheck,
} from 'lucide-react';

interface RetailerOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (newOrder: RetailerOrder) => void;
  initialItem?: CatalogItem;
}

export const RetailerOrderModal: React.FC<RetailerOrderModalProps> = ({
  isOpen,
  onClose,
  onPlaceOrder,
  initialItem,
}) => {
  const [cart, setCart] = useState<{ item: CatalogItem; qty: number }[]>([
    {
      item: initialItem || FULL_CATALOG[0],
      qty: 5,
    },
    {
      item: FULL_CATALOG[5], // Caliber wires
      qty: 10,
    },
  ]);

  const [paymentMode, setPaymentMode] = useState<RetailerOrder['paymentMode']>('Dealer Credit');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  if (!isOpen) return null;

  const handleQtyChange = (idx: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[idx].qty + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== idx);
      }
      updated[idx].qty = newQty;
      return updated;
    });
  };

  const handleAddItem = (item: CatalogItem) => {
    setCart((prev) => {
      const existing = prev.findIndex((p) => p.item.id === item.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing].qty += 1;
        return updated;
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const totalAmount = cart.reduce((acc, c) => acc + (c.item.dealerPrice || c.item.mrp * 0.75) * c.qty, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newId = `ORD-RET-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: RetailerOrder = {
      id: newId,
      retailerName: 'Lakshmi Electricals & Appliances',
      retailerCode: 'RET-KER-KOCH-102',
      city: 'Kochi, Kerala',
      items: cart.map((c) => ({
        productName: c.item.name,
        code: c.item.code,
        qty: c.qty,
        unitPrice: c.item.dealerPrice || Math.round(c.item.mrp * 0.75),
      })),
      totalAmount,
      status: 'Pending Approval',
      orderDate: '22 Sep 2026',
      deliveryExpected: '25 Sep 2026',
      paymentMode,
    };

    onPlaceOrder(newOrder);
    setCreatedOrderId(newId);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base">Trade Stock Indent Order</h2>
              <p className="text-[11px] text-slate-400">Ernakulam Regional Depot Replenishment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3 my-auto">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Order Placed Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Mock Indent <strong>#{createdOrderId}</strong> for ₹{totalAmount.toLocaleString('en-IN')} routed to Distributor Depot. Expected dispatch within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
            {/* Dealer Info Banner */}
            <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-blue-950 block">Billing to: Lakshmi Electricals</span>
                <span className="text-[11px] text-blue-800">Depot: South Zone Central Depot (Ernakulam)</span>
              </div>
              <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded-md">
                Dealer Credit 30 Days
              </span>
            </div>

            {/* Cart Items */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-700 pb-1 border-b border-slate-100">
                <span>Indent Items ({cart.length})</span>
                <span>Wholesale Price</span>
              </div>

              {cart.map((item, idx) => {
                const unitWholesale = item.item.dealerPrice || Math.round(item.item.mrp * 0.75);
                return (
                  <div
                    key={item.item.id}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">{item.item.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {item.item.code} • MRP ₹{item.item.mrp}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(idx, -1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-600 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 font-bold text-xs text-slate-800 min-w-[28px] text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(idx, 1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-600 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <span className="font-bold text-slate-900 block">
                          ₹{(unitWholesale * item.qty).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400">@ ₹{unitWholesale}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Add more SKUs */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 block mb-1">
                + Quick Add Popular SKUs:
              </span>
              <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
                {FULL_CATALOG.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleAddItem(cat)}
                    className="whitespace-nowrap px-2 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-[11px] text-slate-700 transition-colors"
                  >
                    + {cat.name.split(' ')[0]} {cat.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Payment / Settlement Terms</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Dealer Credit', 'NEFT/RTGS', 'UPI'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`p-2 rounded-xl border text-center font-bold text-xs transition-all ${
                      paymentMode === mode
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Total and Submit */}
            <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                  Total Wholesale Value
                </span>
                <span className="text-lg font-heading font-extrabold text-white">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                id="btn-confirm-retailer-order"
                type="submit"
                disabled={cart.length === 0}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
              >
                Confirm Mock Indent
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
