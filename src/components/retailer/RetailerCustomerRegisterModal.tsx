/**
 * Retailer Customer Registration Modal
 * Register walk-in customer purchases to award instant digital warranty and earn dealer Rishta points.
 */

import React, { useState } from 'react';
import { RegisteredProduct, ProductCategory } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  FileCheck,
  CheckCircle2,
  Award,
  Barcode,
  Camera,
  ShieldCheck,
} from 'lucide-react';

interface RetailerCustomerRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerRegistered?: (product: RegisteredProduct) => void;
}

export const RetailerCustomerRegisterModal: React.FC<RetailerCustomerRegisterModalProps> = ({
  isOpen,
  onClose,
  onCustomerRegistered,
}) => {
  const [customerName, setCustomerName] = useState('Rahul K. Menon');
  const [customerPhone, setCustomerPhone] = useState('+91 94470 18290');
  const [productModel, setProductModel] = useState('V-Guard Magno 410 AC Stabilizer');
  const [serialNumber, setSerialNumber] = useState('VG-ST-2026-88102');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-LE-2026-441');
  const [category, setCategory] = useState<ProductCategory>('Electronics');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProd: RegisteredProduct = {
      id: `reg-dealer-${Date.now()}`,
      name: productModel,
      modelNumber: 'MAGNO-410',
      serialNumber,
      category,
      subCategory: 'Stabilizers',
      purchaseDate: '22 Sep 2026',
      warrantyExpiry: '21 Sep 2029',
      warrantyStatus: 'Active',
      isSmart: false,
      imageUrl: 'https://images.unsplash.com/photo-1558389186-438424b00a32?w=500&auto=format&fit=crop&q=80',
    };

    if (onCustomerRegistered) {
      onCustomerRegistered(newProd);
    }

    setIsDone(true);
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
      setIsDone(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base">Point-of-Sale Registration</h2>
              <p className="text-[11px] text-slate-400">Lakshmi Electricals Dealer Terminal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          <div className="p-8 text-center space-y-3 my-auto text-xs">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Warranty SMS Dispatched!</h3>
            <p className="text-slate-600 max-w-xs mx-auto">
              Digital warranty certificate sent to <strong>{customerPhone}</strong>. You earned{' '}
              <strong className="text-orange-600">+50 V-Guard Rishta Dealer Points</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3 text-xs">
            {/* Dealer incentive tag */}
            <div className="p-2.5 bg-orange-50/70 border border-orange-200 rounded-xl flex items-center space-x-2 text-orange-950">
              <Award className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span className="text-[11px]">
                Earn <strong>50 Rishta Points</strong> per registered appliance today!
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Full Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Mobile Number</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Retail Invoice No.</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Electricals">Electricals</option>
                  <option value="Consumer Durables">Consumer Durables</option>
                  <option value="Sunflame">Sunflame</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Appliance Model Sold</label>
              <input
                type="text"
                value={productModel}
                onChange={(e) => setProductModel(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Appliance Serial Number (Barcode)</label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-mono uppercase"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="btn-dealer-submit-registration"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Register & Send Warranty SMS</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
