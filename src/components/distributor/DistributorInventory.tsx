/**
 * Distributor Inventory View
 * Regional stock visibility across depots, category filters, and reorder triggers.
 */

import React, { useState } from 'react';
import { InventoryItem, ProductCategory } from '../../types';
import {
  Package,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Building2,
  PlusCircle,
  TrendingDown,
  RefreshCw,
} from 'lucide-react';

interface DistributorInventoryProps {
  inventory: InventoryItem[];
  onReorderStock: (sku: string, addUnits: number) => void;
}

export const DistributorInventory: React.FC<DistributorInventoryProps> = ({
  inventory,
  onReorderStock,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedDepot, setSelectedDepot] = useState<string>('All Depots');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Electronics',
    'Electricals',
    'Consumer Durables',
    'Sunflame',
  ];

  const depots = [
    'All Depots',
    'Ernakulam Central Depot',
    'Kozhikode Hub',
    'Kottayam Sub-depot',
  ];

  const filteredItems = inventory.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchDepot = selectedDepot === 'All Depots' || item.depotLocation === selectedDepot;
    const matchLow = !onlyLowStock || item.currentStock <= item.reorderThreshold;
    const matchQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDepot && matchLow && matchQuery;
  });

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="font-heading font-extrabold text-xl text-slate-900">
            Regional Depot Inventory
          </h1>
          <p className="text-slate-500">
            Live stock balances, buffer thresholds, and factory replenishments
          </p>
        </div>

        <button
          onClick={() => setOnlyLowStock(!onlyLowStock)}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 self-start sm:self-auto border ${
            onlyLowStock
              ? 'bg-rose-50 border-rose-300 text-rose-700'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          <span>Show Low Stock Only</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by SKU or appliance name..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
          </div>

          {/* Depot Selector */}
          <div>
            <select
              value={selectedDepot}
              onChange={(e) => setSelectedDepot(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-semibold text-slate-700"
            >
              {depots.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
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

      {/* Inventory Table / Cards */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isCritical = item.currentStock <= item.reorderThreshold;
          const stockRatio = Math.min(100, Math.round((item.currentStock / (item.reorderThreshold * 2.5)) * 100));

          return (
            <div
              key={item.sku}
              className={`bg-white rounded-2xl border p-4 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isCritical ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-slate-800">{item.sku}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  {isCritical && (
                    <span className="text-[10px] bg-rose-100 text-rose-800 border border-rose-300 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      <span>Low Stock Alert</span>
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900">
                  {item.name}
                </h3>
                <div className="text-[11px] text-slate-500">
                  Depot: <strong>{item.depotLocation}</strong> • Minimum Safety Buffer:{' '}
                  {item.reorderThreshold} units
                </div>

                {/* Visual stock bar */}
                <div className="pt-1.5 max-w-sm">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>Stock Level</span>
                    <span className="font-bold text-slate-800">{item.currentStock} units available</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        isCritical ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${stockRatio}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center space-x-3 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-base font-heading font-extrabold text-slate-900 block">
                    {item.currentStock} <span className="text-xs font-normal text-slate-400">Pcs</span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Allocated: {item.allocatedOrders}
                  </span>
                </div>

                <button
                  onClick={() => onReorderStock(item.sku, 50)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 shadow-2xs active:scale-95 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Indent Factory (+50)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
