/**
 * Register New Product Modal
 * Barcode / QR scanner simulation and manual serial entry with instant warranty generation.
 */

import React, { useState } from 'react';
import { RegisteredProduct, ProductCategory } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  Camera,
  Barcode,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  Sparkles,
} from 'lucide-react';

interface RegisterProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (newProduct: RegisteredProduct) => void;
  defaultCustomerMode?: boolean;
}

export const RegisterProductModal: React.FC<RegisterProductModalProps> = ({
  isOpen,
  onClose,
  onRegister,
  defaultCustomerMode = true,
}) => {
  const [model, setModel] = useState('V-Guard ClimaChill 55L Air Cooler');
  const [category, setCategory] = useState<ProductCategory>('Consumer Durables');
  const [serial, setSerial] = useState('VG-AC-2026-55912');
  const [purchaseDate, setPurchaseDate] = useState('22 Sep 2026');
  const [customerPhone, setCustomerPhone] = useState('+91 98471 00293');
  const [isScanning, setIsScanning] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setModel('V-Guard Crystal Plus TV Stabilizer');
      setCategory('Electronics');
      setSerial(`VG-ST-${Math.floor(10000 + Math.random() * 90000)}`);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProd: RegisteredProduct = {
      id: `reg-${Date.now()}`,
      name: model,
      modelNumber: model.split(' ')[1] || 'VG-SERIES',
      serialNumber: serial,
      category: category,
      subCategory: category === 'Electronics' ? 'Stabilizers' : 'Home Appliances',
      purchaseDate: purchaseDate,
      warrantyExpiry: '21 Sep 2029', // 3 years
      warrantyStatus: 'Active',
      isSmart: model.toLowerCase().includes('smart') || model.toLowerCase().includes('iot'),
      imageUrl: 'https://images.unsplash.com/photo-1558389186-438424b00a32?w=500&auto=format&fit=crop&q=80',
      rating: 4.8,
      maintenanceDue: 'Up to date',
    };

    onRegister(newProd);
    setRegistered(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      // safe fallback
    }

    setTimeout(() => {
      setRegistered(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base">Register V-Guard Appliance</h2>
              <p className="text-[11px] text-slate-400">Instant digital warranty card generation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {registered ? (
          <div className="p-6 text-center space-y-3 my-auto">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Warranty Activated!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              <strong>{model}</strong> (S/N: {serial}) is now registered in your V-Guard One vault with 3 years comprehensive warranty.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs">
            {/* Camera / Barcode scanner card */}
            <div className="p-3 bg-orange-50/60 border border-orange-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Scan Product Barcode / Invoice</span>
                <span className="text-[11px] text-slate-500">Auto-detect serial number from carton QR code</span>
              </div>
              <button
                type="button"
                id="btn-scan-barcode"
                onClick={handleSimulatedScan}
                disabled={isScanning}
                className="flex items-center space-x-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-bold text-xs transition-all shadow-xs"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{isScanning ? 'Scanning...' : 'Scan'}</span>
              </button>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Product Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:ring-2 focus:ring-orange-500"
              >
                <option value="Electronics">Electronics (Stabilizers, Inverters, Batteries, Solar)</option>
                <option value="Electricals">Electricals (Wires, Switchgear, Pumps)</option>
                <option value="Consumer Durables">Consumer Durables (Water Heaters, Fans, Coolers)</option>
                <option value="Sunflame">Sunflame (Chimneys, Stoves, Induction)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Model Name</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. V-Guard Magno 410 AC Stabilizer"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Serial Number (from sticker/invoice)</label>
              <div className="relative">
                <input
                  type="text"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-mono focus:ring-2 focus:ring-orange-500 uppercase"
                  placeholder="e.g. VG-ST-2026-99214"
                />
                <Barcode className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Purchase Date</label>
                <input
                  type="text"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Owner Contact Phone</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-registration"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Activate Official Warranty</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
