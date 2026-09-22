/**
 * Retailer Catalogue View
 * Trade Wholesale Pricing, Dealer Margins, and Depot Stock Availability
 */

import React, { useState } from 'react';
import { CatalogItem, ProductCategory } from '../../types';
import { FULL_CATALOG } from '../../data/mockData';
import {
  Search,
  Filter,
  ShoppingBag,
  TrendingUp,
  Building2,
  CheckCircle2,
  Package,
} from 'lucide-react';

interface RetailerCatalogueProps {
  onSelectItemForOrder: (item: CatalogItem) => void;
}

export const RetailerCatalogue: React.FC<RetailerCatalogueProps> = ({
  onSelectItemForOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Electronics',
    'Electricals',
    'Consumer Durables',
    'Sunflame',
  ];

  const filteredItems = FULL_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="font-heading font-extrabold text-xl text-slate-900">
            Wholesale Trade Catalogue
          </h1>
          <p className="text-xs text-slate-500">
            Ernakulam Depot live stock, dealer invoice rates, and festive schemes
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg font-semibold">
            Depot: Ernakulam Central
          </span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="input-retailer-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SKUs, wire gauges, geysers, stabilizers, Sunflame..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Trade SKUs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredItems.map((item) => {
          const wholesalePrice = item.dealerPrice || Math.round(item.mrp * 0.75);
          const margin = item.mrp - wholesalePrice;
          const marginPercent = Math.round((margin / item.mrp) * 100);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between text-xs"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {item.category} • {item.subCategory}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-slate-900 mt-0.5">
                      {item.name}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-500">SKU: {item.code}</span>
                  </div>

                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {marginPercent}% Margin
                  </span>
                </div>

                {/* Price Matrix */}
                <div className="mt-3 grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Dealer Net Rate (ex-tax)</span>
                    <strong className="text-sm font-heading font-extrabold text-blue-900">
                      ₹{wholesalePrice.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Retail MRP</span>
                    <strong className="text-sm font-heading font-bold text-slate-700">
                      ₹{item.mrp.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Depot Stock Status */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Stock: {item.inStockUnits || 120} units at Depot</span>
                  </span>
                  <span className="text-slate-400">MoQ: 5 pcs</span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Dispatch: 24-48 hrs</span>
                <button
                  onClick={() => onSelectItemForOrder(item)}
                  className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl font-bold transition-all shadow-xs active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Stock Indent</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
