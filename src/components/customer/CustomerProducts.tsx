/**
 * Customer Products View
 * Category tabs: Electronics, Electricals, Consumer Durables, Sunflame.
 * Registered appliances vs. Full product catalogue with warranty & manuals.
 */

import React, { useState } from 'react';
import {
  RegisteredProduct,
  CatalogItem,
  ProductCategory,
} from '../../types';
import { FULL_CATALOG } from '../../data/mockData';
import {
  Package,
  Search,
  Filter,
  ShieldCheck,
  FileText,
  Wrench,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';

interface CustomerProductsProps {
  registeredProducts: RegisteredProduct[];
  onSelectProductDetail: (product: RegisteredProduct) => void;
  onOpenRegisterModal: () => void;
  onRaiseServiceForProduct: (product: RegisteredProduct) => void;
}

export const CustomerProducts: React.FC<CustomerProductsProps> = ({
  registeredProducts,
  onSelectProductDetail,
  onOpenRegisterModal,
  onRaiseServiceForProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'registered' | 'all'>('registered');

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Electronics',
    'Electricals',
    'Consumer Durables',
    'Sunflame',
  ];

  // Filter registered products
  const filteredRegistered = registeredProducts.filter((prod) => {
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesQuery =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.modelNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Filter full catalogue
  const filteredCatalog = FULL_CATALOG.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Header & Registration Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="font-heading font-extrabold text-xl text-slate-900">
            My V-Guard Products
          </h1>
          <p className="text-xs text-slate-500">
            Digital warranties, manuals, maintenance guidance & service support
          </p>
        </div>

        <button
          id="btn-products-register-new"
          onClick={onOpenRegisterModal}
          className="flex items-center space-x-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Register New Product</span>
        </button>
      </div>

      {/* Sub-view switcher: Registered vs. Explore All */}
      <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl border border-slate-200">
        <div className="flex space-x-1">
          <button
            id="btn-view-registered"
            onClick={() => setViewMode('registered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'registered'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registered in My Home ({registeredProducts.length})
          </button>
          <button
            id="btn-view-all-catalogue"
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'all'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Explore V-Guard & Sunflame
          </button>
        </div>

        <span className="text-[11px] text-slate-500 pr-2 hidden sm:inline">
          {viewMode === 'registered' ? '4 Categories Available' : `${FULL_CATALOG.length} Products`}
        </span>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-2">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="input-search-products"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search geyser, stabilizer, fan, pump, wires, Sunflame..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 transition-all shadow-2xs"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`tab-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      {viewMode === 'registered' ? (
        /* REGISTERED PRODUCTS VIEW */
        <div className="space-y-3">
          {filteredRegistered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-heading font-bold text-sm text-slate-800">No registered products found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No registered appliances in "{selectedCategory}". You can register a new appliance in 30 seconds.
              </p>
              <button
                onClick={onOpenRegisterModal}
                className="mt-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs"
              >
                + Register Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredRegistered.map((prod) => (
                <div
                  key={prod.id}
                  id={`card-registered-${prod.id}`}
                  className="bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              {prod.category}
                            </span>
                            {prod.isSmart && (
                              <span className="text-[9px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.2 rounded">
                                IoT Smart
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading font-bold text-sm text-slate-900 mt-0.5">
                            {prod.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            S/N: {prod.serialNumber}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                          prod.warrantyStatus === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : prod.warrantyStatus === 'Expiring Soon'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {prod.warrantyStatus}
                      </span>
                    </div>

                    {/* Maintenance Note preview */}
                    {prod.maintenanceNote && (
                      <div className="mt-2.5 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-100">
                        <span className="font-semibold text-slate-700">Guide:</span> {prod.maintenanceNote}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      id={`btn-open-warranty-${prod.id}`}
                      onClick={() => onSelectProductDetail(prod)}
                      className="flex items-center space-x-1 text-slate-700 hover:text-orange-600 font-bold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                      <span>Warranty & Manual</span>
                    </button>

                    <button
                      id={`btn-product-service-${prod.id}`}
                      onClick={() => onRaiseServiceForProduct(prod)}
                      className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-bold"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Raise Service</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* EXPLORE ALL CATALOGUE VIEW */
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCatalog.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {item.category} • {item.subCategory}
                        </span>
                        {item.tag && (
                          <span className="text-[9px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.2 rounded">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-sm text-slate-900 mt-0.5">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono">Code: {item.code}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-heading font-extrabold text-slate-900">
                        ₹{item.mrp.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">MRP (incl. taxes)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.features.slice(0, 2).map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    {item.warrantyYears} Years V-Guard Warranty
                  </span>

                  <button
                    onClick={() => {
                      const mockRegistered: RegisteredProduct = {
                        id: `reg-browse-${item.id}`,
                        name: item.name,
                        modelNumber: item.code,
                        serialNumber: `VG-${item.code}-0091`,
                        category: item.category,
                        subCategory: item.subCategory,
                        purchaseDate: '22 Sep 2026',
                        warrantyExpiry: `21 Sep ${2026 + item.warrantyYears}`,
                        warrantyStatus: 'Active',
                        isSmart: item.isSmart,
                        imageUrl: 'https://images.unsplash.com/photo-1558389186-438424b00a32?w=500&auto=format&fit=crop&q=80',
                      };
                      onSelectProductDetail(mockRegistered);
                    }}
                    className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-bold"
                  >
                    <span>View Specs & Manual</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
