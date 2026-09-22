/**
 * Customer Home Dashboard
 * "My Home": registered products, smart controls, solar snapshot, maintenance reminders, active tickets.
 */

import React, { useState } from 'react';
import {
  RegisteredProduct,
  SmartDeviceState,
  SolarTelemetry,
  ServiceTicket,
  CustomerTab,
} from '../../types';
import {
  Power,
  Flame,
  Sun,
  ShieldCheck,
  Wrench,
  ChevronRight,
  AlertCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  Sliders,
  Wind,
  CookingPot,
  ArrowUpRight,
  BatteryCharging,
  Zap,
} from 'lucide-react';

interface CustomerHomeProps {
  registeredProducts: RegisteredProduct[];
  smartDevices: SmartDeviceState[];
  solarData: SolarTelemetry;
  activeTickets: ServiceTicket[];
  onUpdateSmartDevice: (updated: SmartDeviceState) => void;
  onNavigateTab: (tab: CustomerTab) => void;
  onOpenSmartModal: (deviceId?: string) => void;
  onOpenAskVGuard: () => void;
  onSelectProductDetail: (product: RegisteredProduct) => void;
  onOpenRegisterProductModal: () => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  registeredProducts,
  smartDevices,
  solarData,
  activeTickets,
  onUpdateSmartDevice,
  onNavigateTab,
  onOpenSmartModal,
  onOpenAskVGuard,
  onSelectProductDetail,
  onOpenRegisterProductModal,
}) => {
  const geyserDevice = smartDevices.find((d) => d.type === 'geyser');
  const fanDevice = smartDevices.find((d) => d.type === 'fan');

  const pendingService = activeTickets.find((t) => t.status !== 'Completed');

  // Toggle quick geyser power directly from home card
  const handleQuickGeyserToggle = () => {
    if (geyserDevice) {
      onUpdateSmartDevice({
        ...geyserDevice,
        power: !geyserDevice.power,
      });
    }
  };

  const handleQuickFanToggle = () => {
    if (fanDevice) {
      onUpdateSmartDevice({
        ...fanDevice,
        power: !fanDevice.power,
      });
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md relative overflow-hidden">
        {/* Subtle decorative background orange glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                My V-Guard Home
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] text-emerald-300 font-medium">All Systems Normal</span>
            </div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white mt-1">
              Namaste, Adarsh!
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Managing 6 registered V-Guard & Sunflame appliances with clean rooftop solar power.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-home-quick-register"
              onClick={onOpenRegisterProductModal}
              className="flex items-center space-x-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Register Product</span>
            </button>
            <button
              id="btn-home-ask-ai"
              onClick={onOpenAskVGuard}
              className="flex items-center space-x-1.5 bg-white/15 hover:bg-white/20 text-white border border-white/20 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>

        {/* Mini metric counters */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-700/60 text-center">
          <div className="bg-white/5 rounded-xl p-2">
            <div className="text-base sm:text-lg font-bold text-white">{registeredProducts.length}</div>
            <div className="text-[10px] text-slate-400">Registered Devices</div>
          </div>
          <div className="bg-white/5 rounded-xl p-2">
            <div className="text-base sm:text-lg font-bold text-emerald-400">84%</div>
            <div className="text-[10px] text-slate-400">Solar Battery</div>
          </div>
          <div className="bg-white/5 rounded-xl p-2">
            <div className="text-base sm:text-lg font-bold text-orange-400">{pendingService ? '1 Active' : 'None'}</div>
            <div className="text-[10px] text-slate-400">Service Tickets</div>
          </div>
        </div>
      </div>

      {/* Active Service Ticket Notification (if any) */}
      {pendingService && (
        <div
          onClick={() => onNavigateTab('services')}
          className="bg-orange-50 border border-orange-200 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-orange-100/70 transition-colors shadow-xs"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-orange-800 bg-orange-200/80 px-2 py-0.5 rounded-md">
                  {pendingService.status}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">#{pendingService.id}</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {pendingService.productName}: {pendingService.issueCategory}
              </p>
              <p className="text-[11px] text-slate-600">
                Scheduled: {pendingService.appointmentDate} ({pendingService.appointmentSlot})
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-orange-600 font-semibold text-xs">
            <span>Track</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Smart Controls Card (Interactive Demo Devices) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-heading font-bold text-base text-slate-900">Connected Smart Controls</h2>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full border border-slate-200">
                Simulated Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live mobile controls for compatible V-Guard IoT appliances
            </p>
          </div>
          <button
            id="btn-home-manage-smart"
            onClick={() => onOpenSmartModal()}
            className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-semibold text-xs"
          >
            <span>All Controls</span>
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Geyser Smart Card */}
          {geyserDevice && (
            <div className={`p-3.5 rounded-xl border transition-all ${
              geyserDevice.power ? 'bg-orange-50/50 border-orange-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    geyserDevice.power ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xs text-slate-900">
                      {geyserDevice.name}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${geyserDevice.power ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span>{geyserDevice.power ? `${geyserDevice.currentTemp}°C / Target ${geyserDevice.targetTemp}°C` : 'Turned OFF'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Toggle Button */}
                <button
                  id="btn-quick-toggle-geyser"
                  onClick={handleQuickGeyserToggle}
                  className={`p-2 rounded-xl transition-all shadow-xs ${
                    geyserDevice.power
                      ? 'bg-orange-500 text-white'
                      : 'bg-white border border-slate-300 text-slate-400 hover:text-slate-700'
                  }`}
                  title="Toggle Geyser Power"
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>

              {/* Status footer inside card */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Mode: {geyserDevice.mode}</span>
                <button
                  id="btn-home-geyser-adjust"
                  onClick={() => onOpenSmartModal(geyserDevice.id)}
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Adjust Temp & Modes →
                </button>
              </div>
            </div>
          )}

          {/* Smart Fan Card */}
          {fanDevice && (
            <div className={`p-3.5 rounded-xl border transition-all ${
              fanDevice.power ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    fanDevice.power ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xs text-slate-900">
                      {fanDevice.name}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${fanDevice.power ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span>{fanDevice.power ? `Running at Speed ${fanDevice.speed}` : 'Turned OFF'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Toggle Button */}
                <button
                  id="btn-quick-toggle-fan"
                  onClick={handleQuickFanToggle}
                  className={`p-2 rounded-xl transition-all shadow-xs ${
                    fanDevice.power
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-400 hover:text-slate-700'
                  }`}
                  title="Toggle Fan Power"
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Breeze Mode: {fanDevice.breezeMode ? 'ON' : 'OFF'}</span>
                <button
                  id="btn-home-fan-adjust"
                  onClick={() => onOpenSmartModal(fanDevice.id)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Speed & Timer →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rooftop Solar Snapshot */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-slate-900">V-Guard Rooftop Solar</h2>
              <p className="text-[11px] text-slate-500">5 kW Grid-Tied System • Kochi Household</p>
            </div>
          </div>
          <button
            id="btn-home-view-solar"
            onClick={() => onNavigateTab('solar')}
            className="flex items-center space-x-1 text-xs font-semibold text-orange-600 hover:text-orange-700"
          >
            <span>Live Telemetry</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-2.5">
            <div className="text-[11px] text-amber-900 font-medium">Current Power</div>
            <div className="text-lg font-heading font-extrabold text-amber-950 mt-0.5">
              {solarData.currentGenerationKW} <span className="text-xs font-bold">kW</span>
            </div>
            <div className="text-[10px] text-amber-700">84% of peak capacity</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
            <div className="text-[11px] text-slate-600 font-medium">Home Load</div>
            <div className="text-lg font-heading font-extrabold text-slate-900 mt-0.5">
              {solarData.householdLoadKW} <span className="text-xs font-bold">kW</span>
            </div>
            <div className="text-[10px] text-slate-500">Covered 100% by solar</div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-2.5">
            <div className="text-[11px] text-emerald-900 font-medium">Battery Backup</div>
            <div className="text-lg font-heading font-extrabold text-emerald-950 mt-0.5 flex items-center space-x-1">
              <span>{solarData.batteryPercentage}%</span>
              <BatteryCharging className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-[10px] text-emerald-700">~{solarData.batteryBackupHours} hrs reserve</div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-2.5">
            <div className="text-[11px] text-blue-900 font-medium">Saved Today</div>
            <div className="text-lg font-heading font-extrabold text-blue-950 mt-0.5">
              ₹{solarData.rupeesSavedToday}
            </div>
            <div className="text-[10px] text-blue-700">19.8 kWh generated</div>
          </div>
        </div>
      </div>

      {/* Registered Products & Maintenance Reminders */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-heading font-bold text-base text-slate-900">Registered Appliances</h2>
            <p className="text-xs text-slate-500">Warranty status, manuals & maintenance reminders</p>
          </div>
          <button
            id="btn-home-view-all-products"
            onClick={() => onNavigateTab('products')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700"
          >
            View All ({registeredProducts.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {registeredProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProductDetail(product)}
              className="p-3 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-xs transition-all cursor-pointer bg-white group flex items-start justify-between gap-2"
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {product.category}
                    </span>
                    {product.isSmart && (
                      <span className="text-[9px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.2 rounded">
                        IoT
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-xs text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        product.warrantyStatus === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : product.warrantyStatus === 'Expiring Soon'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      Warranty {product.warrantyStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-1 text-slate-400 group-hover:text-orange-600">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance Reminder Highlight */}
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5 text-xs text-slate-700">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-slate-900">Maintenance Guidance:</span>
            <span className="ml-1 text-slate-600">
              Annual magnesium anode rod inspection recommended for your Calino Smart Geyser to prevent hard water corrosion.
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('services')}
            className="text-[11px] font-bold text-orange-600 hover:text-orange-700 whitespace-nowrap"
          >
            Book Checkup
          </button>
        </div>
      </div>
    </div>
  );
};
