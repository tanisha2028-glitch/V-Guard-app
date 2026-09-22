/**
 * Product Detail Modal
 * Digital Warranty certificate, user manual viewer, maintenance guidance, and direct service booking.
 */

import React, { useState } from 'react';
import { RegisteredProduct, CatalogItem } from '../../types';
import {
  X,
  ShieldCheck,
  FileText,
  Wrench,
  Download,
  Calendar,
  Barcode,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: RegisteredProduct | null;
  onClose: () => void;
  onRaiseServiceForProduct: (product: RegisteredProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRaiseServiceForProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'warranty' | 'manual' | 'maintenance'>('warranty');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!product) return null;

  const handleDownloadManual = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base">Product Passport & Warranty</h2>
              <p className="text-[11px] text-slate-400">V-Guard Digital Appliance Vault</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Identity Summary */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-start gap-3">
          <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex-shrink-0 p-1">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                {product.category} • {product.subCategory}
              </span>
              {product.isSmart && (
                <span className="text-[9px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.2 rounded">
                  IoT Connected
                </span>
              )}
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900">{product.name}</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Model: {product.modelNumber} | S/N: {product.serialNumber}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-white">
          <button
            id="tab-detail-warranty"
            onClick={() => setActiveTab('warranty')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
              activeTab === 'warranty'
                ? 'border-orange-500 text-orange-600 bg-orange-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Warranty Certificate</span>
          </button>
          <button
            id="tab-detail-manual"
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
              activeTab === 'manual'
                ? 'border-orange-500 text-orange-600 bg-orange-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>User Manual (PDF)</span>
          </button>
          <button
            id="tab-detail-maintenance"
            onClick={() => setActiveTab('maintenance')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
              activeTab === 'maintenance'
                ? 'border-orange-500 text-orange-600 bg-orange-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Care & Support</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Warranty Certificate Tab */}
          {activeTab === 'warranty' && (
            <div className="space-y-3">
              {/* Digital Certificate Box */}
              <div className="border-2 border-dashed border-orange-300 rounded-2xl p-4 bg-orange-50/30 relative">
                <div className="flex items-center justify-between border-b border-orange-200/80 pb-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-700">
                      Official V-Guard e-Warranty
                    </span>
                    <h4 className="font-heading font-extrabold text-sm text-slate-900">
                      V-GUARD ASSURE SHIELD
                    </h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    product.warrantyStatus === 'Active'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {product.warrantyStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Purchase Date</span>
                    <strong className="text-slate-800">{product.purchaseDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Warranty Valid Until</span>
                    <strong className="text-slate-800">{product.warrantyExpiry}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Registered Serial No.</span>
                    <span className="font-mono text-[11px] text-slate-700">{product.serialNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Coverage Type</span>
                    <span className="font-semibold text-slate-800">Comprehensive Parts & Labor</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-orange-200/80 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Authorized Dealer: <strong>Lakshmi Electricals</strong></span>
                  <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>

              {/* Extended Warranty Banner */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800">V-Guard Annual Maintenance Plan</div>
                  <p className="text-[11px] text-slate-500">Extend your peace of mind by 2 additional years.</p>
                </div>
                <button className="px-3 py-1 bg-white border border-slate-300 text-orange-600 font-bold rounded-lg hover:bg-orange-50 text-xs">
                  Explore AMC
                </button>
              </div>
            </div>
          )}

          {/* User Manual Tab */}
          {activeTab === 'manual' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  {product.name} — User Manual & Installation Guide
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Includes wiring diagrams, safety instructions, operating modes, error codes, and maintenance checklist.
                </p>
                <div className="mt-3 flex items-center justify-center space-x-3">
                  <button
                    id="btn-download-manual"
                    onClick={handleDownloadManual}
                    className="flex items-center space-x-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Manual (PDF 2.4 MB)</span>
                  </button>
                </div>

                {downloadSuccess && (
                  <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-center space-x-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>User manual downloaded to device successfully!</span>
                  </div>
                )}
              </div>

              {/* Sample Preview Snippets */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Operating Guidelines:
                </p>
                <div className="p-2.5 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Always ensure proper earthing (IS 3043) before connecting high-draw appliances.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>For water heaters, do NOT switch ON the power until water flows continuously from the hot water tap.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>In case of severe lightning, disconnect mains or rely on the V-Guard surge protector.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance & Support Tab */}
          {activeTab === 'maintenance' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-200">
                <div className="flex items-center space-x-2 text-orange-950 font-bold mb-1">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <span>Preventive Care Schedule</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {product.maintenanceNote || 'Routine inspection ensures 100% efficiency and safety.'}
                </p>
                <div className="mt-2 text-[11px] text-orange-800 font-semibold">
                  Status: {product.maintenanceDue || 'Up to date'}
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="font-bold text-slate-800">Need On-Site Technician Visit?</span>
                <p className="text-slate-600 text-[11px]">
                  Book an authorized V-Guard service engineer to visit your doorstep for installation, repair, or regular servicing.
                </p>
                <button
                  id="btn-raise-service-from-detail"
                  onClick={() => {
                    onRaiseServiceForProduct(product);
                    onClose();
                  }}
                  className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Raise Service Request for this Product</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">V-Guard One Certified Vault</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
