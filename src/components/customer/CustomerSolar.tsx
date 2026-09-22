/**
 * Customer Solar Dashboard
 * Real-time rooftop generation, household consumption, battery storage, and daily/monthly trends.
 */

import React, { useState } from 'react';
import { SolarTelemetry } from '../../types';
import {
  Sun,
  BatteryCharging,
  Zap,
  ArrowRight,
  TrendingUp,
  Leaf,
  ShieldCheck,
  Calendar,
  IndianRupee,
  RefreshCw,
  Info,
  Sliders,
} from 'lucide-react';

interface CustomerSolarProps {
  solarData: SolarTelemetry;
  onRefreshTelemetry: () => void;
}

export const CustomerSolar: React.FC<CustomerSolarProps> = ({
  solarData,
  onRefreshTelemetry,
}) => {
  const [timeframe, setTimeframe] = useState<'day' | 'month'>('day');
  const [calculatorKW, setCalculatorKW] = useState(5);

  const calculatedMonthlySavings = calculatorKW * 120 * 8; // approx 120 units/kW * ₹8/unit = ₹4,800/mo

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading font-extrabold text-xl text-slate-900">
              V-Guard Rooftop Solar
            </h1>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200">
              Demo Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500">
            5.0 kW Mono PERC Grid-Tied System with Smart Pro Hybrid Inverter
          </p>
        </div>

        <button
          id="btn-refresh-solar"
          onClick={onRefreshTelemetry}
          className="flex items-center space-x-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold self-start sm:self-auto shadow-2xs active:scale-95 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-500" />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Simulated Telemetry Advisory */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-amber-900">
        <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="font-semibold">Simulated Reading Notice:</strong> All solar generation, battery charge, and household draw figures represent realistic sample telemetry for demonstration purposes and do not imply a live hardware connection.
        </p>
      </div>

      {/* Primary Metrics 4-Pack */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Solar Generation */}
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-2xl border border-amber-200/80 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Solar Output
            </span>
            <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
          </div>
          <div className="text-2xl font-heading font-extrabold text-amber-950 mt-1">
            {solarData.currentGenerationKW} <span className="text-xs font-bold text-amber-700">kW</span>
          </div>
          <p className="text-[10px] text-amber-800 mt-1">
            Peak: {solarData.peakCapacityKW} kW capacity
          </p>
        </div>

        {/* Battery Status */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-2xl border border-emerald-200/80 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Battery Bank
            </span>
            <BatteryCharging className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-heading font-extrabold text-emerald-950 mt-1">
            {solarData.batteryPercentage}%
          </div>
          <p className="text-[10px] text-emerald-800 mt-1">
            ~{solarData.batteryBackupHours} hrs outage reserve
          </p>
        </div>

        {/* Household Load */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Home Consumption
            </span>
            <Zap className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
            {solarData.householdLoadKW} <span className="text-xs font-bold text-slate-500">kW</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Covered 100% by solar
          </p>
        </div>

        {/* Grid Net Export */}
        <div className="bg-blue-50/70 rounded-2xl border border-blue-200/80 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
              Grid Export
            </span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-heading font-extrabold text-blue-950 mt-1">
            {solarData.gridExportKW} <span className="text-xs font-bold text-blue-700">kW</span>
          </div>
          <p className="text-[10px] text-blue-800 mt-1">
            Net metering active
          </p>
        </div>
      </div>

      {/* Live Energy Flow Diagram */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <h2 className="font-heading font-bold text-sm text-slate-900 mb-3">
          Live Energy Flow Topology
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          {/* Node 1: Rooftop Array */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center mb-1 shadow-xs">
              <Sun className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-amber-950">Rooftop Panels</span>
            <span className="text-[11px] text-amber-800 font-semibold">{solarData.currentGenerationKW} kW Generating</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Mono PERC 540W x 10</span>
          </div>

          {/* Node 2: Hybrid Inverter (Center Hub) */}
          <div className="p-3 bg-orange-50 rounded-xl border border-orange-300 flex flex-col items-center relative">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mb-1 shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-orange-950">Smart Pro Inverter</span>
            <span className="text-[11px] text-orange-800 font-semibold">98.2% MPPT Efficiency</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Bi-Directional Pure Sine</span>
          </div>

          {/* Node 3: Home & Grid Distribution */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-1 shadow-xs">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900">Home & Battery Bank</span>
            <span className="text-[11px] text-emerald-800 font-semibold">{solarData.householdLoadKW} kW load + {solarData.gridExportKW} kW exported</span>
            <span className="text-[10px] text-slate-500 mt-0.5">NextGen Tall Tubular Bank</span>
          </div>
        </div>
      </div>

      {/* Hourly / Monthly Generation Interactive Trend Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-heading font-bold text-base text-slate-900">
              {timeframe === 'day' ? 'Today’s Generation & Load Curve' : 'Monthly Generation History (kWh)'}
            </h2>
            <p className="text-xs text-slate-500">
              {timeframe === 'day' ? 'Hourly comparison: Solar vs Household load' : 'Historical monthly yields in units'}
            </p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setTimeframe('day')}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeframe === 'day' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeframe === 'month' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              6 Months
            </button>
          </div>
        </div>

        {/* Clean, Responsive SVG Curve / Bar Chart */}
        {timeframe === 'day' ? (
          <div className="space-y-3">
            <div className="h-44 w-full relative pt-4 pb-2">
              <svg viewBox="0 0 500 140" className="w-full h-full overflow-visible">
                {/* Horizontal gridlines */}
                <line x1="0" y1="120" x2="500" y2="120" stroke="#E2E8F0" strokeWidth="1" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="40" x2="500" y2="40" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />

                {/* Solar generation curve (Orange gradient filled) */}
                <defs>
                  <linearGradient id="solarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Solar curve area */}
                <polygon
                  points="20,120 20,115 90,85 170,45 250,15 330,22 410,60 480,110 480,120"
                  fill="url(#solarGrad)"
                />

                {/* Solar curve stroke */}
                <polyline
                  points="20,115 90,85 170,45 250,15 330,22 410,60 480,110"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* House load line (Blue dashed) */}
                <polyline
                  points="20,100 90,90 170,80 250,65 330,70 410,75 480,68"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Data points */}
                <circle cx="250" cy="15" r="4" fill="#F97316" stroke="#FFF" strokeWidth="2" />
                <text x="250" y="8" fill="#C2410C" fontSize="10" fontWeight="bold" textAnchor="middle">
                  4.8 kW Peak (12 PM)
                </text>
              </svg>
            </div>

            {/* Chart legend & X-axis markers */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>06:00 AM</span>
              <span>08:00 AM</span>
              <span>10:00 AM</span>
              <span className="font-bold text-slate-800">12:00 PM</span>
              <span>02:00 PM</span>
              <span>04:00 PM</span>
              <span>06:00 PM</span>
            </div>

            <div className="flex items-center justify-center space-x-6 text-xs pt-1">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-slate-700 font-medium">Solar Generation</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-1 bg-blue-500 border border-blue-500" />
                <span className="text-slate-700 font-medium">Household Load</span>
              </div>
            </div>
          </div>
        ) : (
          /* MONTHLY HISTORICAL BAR CHART */
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-6 gap-2 h-44 items-end pb-2">
              {solarData.monthlyTrend.map((m) => {
                const heightPercent = Math.min(100, Math.round((m.generation / 520) * 100));
                return (
                  <div key={m.month} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-[10px] font-bold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {m.generation}
                    </span>
                    <div
                      className="w-full max-w-[36px] bg-gradient-to-t from-orange-500 to-amber-400 rounded-t-lg transition-all group-hover:brightness-110"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-xs font-semibold text-slate-700 mt-2">{m.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-center text-xs text-slate-500">
              Average generation: <strong className="text-slate-800">423 kWh / month</strong> (~₹3,380 bill offset)
            </div>
          </div>
        )}
      </div>

      {/* Environmental & Financial Impact */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm">
        <h2 className="font-heading font-bold text-base text-emerald-300 mb-2">
          Your Clean Energy Green Dividend
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-3">
          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 text-emerald-300">
              <IndianRupee className="w-4 h-4" />
              <span className="font-bold">Total Bill Savings</span>
            </div>
            <div className="text-xl font-heading font-extrabold text-white mt-1">
              ₹24,840
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5">Accumulated this fiscal year</p>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 text-emerald-300">
              <Leaf className="w-4 h-4" />
              <span className="font-bold">Carbon Offset</span>
            </div>
            <div className="text-xl font-heading font-extrabold text-white mt-1">
              {solarData.co2SavedKg} kg
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5">CO2 emissions avoided</p>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 text-emerald-300">
              <Sun className="w-4 h-4" />
              <span className="font-bold">Equivalent Trees</span>
            </div>
            <div className="text-xl font-heading font-extrabold text-white mt-1">
              {solarData.equivalentTrees} Trees
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5">Planted in atmospheric benefit</p>
          </div>
        </div>
      </div>

      {/* Interactive Solar Capacity Calculator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center space-x-2 mb-2">
          <Sliders className="w-4 h-4 text-orange-500" />
          <h2 className="font-heading font-bold text-sm text-slate-900">
            Solar ROI & PM Surya Ghar Subsidy Calculator
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Estimate electricity savings for your home or next rooftop expansion.
        </p>

        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between font-semibold mb-1 text-slate-700">
              <span>Proposed Rooftop Capacity: <strong>{calculatorKW} kW</strong></span>
              <span className="text-orange-600 font-bold">~{calculatorKW * 120} Units / month</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={calculatorKW}
              onChange={(e) => setCalculatorKW(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block text-[11px]">Estimated Monthly Bill Reduction</span>
              <span className="text-lg font-heading font-extrabold text-slate-900">
                ₹{calculatedMonthlySavings.toLocaleString('en-IN')} / month
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Eligible for ₹78,000 Govt Subsidy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
