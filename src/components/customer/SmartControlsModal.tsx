/**
 * Smart Controls Deep Interactive Modal
 * Realistic controls for compatible V-Guard IoT geysers, fans, and Sunflame chimneys.
 */

import React, { useState } from 'react';
import { SmartDeviceState } from '../../types';
import {
  X,
  Power,
  Flame,
  Wind,
  CookingPot,
  Sparkles,
  Clock,
  Zap,
  CheckCircle2,
  Sliders,
  Thermometer,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface SmartControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: SmartDeviceState[];
  onUpdateDevice: (updated: SmartDeviceState) => void;
  initialDeviceId?: string;
}

export const SmartControlsModal: React.FC<SmartControlsModalProps> = ({
  isOpen,
  onClose,
  devices,
  onUpdateDevice,
  initialDeviceId,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialDeviceId || (devices.length > 0 ? devices[0].id : '')
  );
  const [activeCleanAlert, setActiveCleanAlert] = useState(false);

  if (!isOpen) return null;

  const currentDevice = devices.find((d) => d.id === selectedId) || devices[0];
  if (!currentDevice) return null;

  const togglePower = () => {
    onUpdateDevice({
      ...currentDevice,
      power: !currentDevice.power,
    });
  };

  const handleTempChange = (delta: number) => {
    const newTemp = Math.min(75, Math.max(35, (currentDevice.targetTemp || 55) + delta));
    onUpdateDevice({
      ...currentDevice,
      targetTemp: newTemp,
    });
  };

  const setGeyserMode = (mode: 'Eco' | 'Power' | 'Standard') => {
    const target = mode === 'Eco' ? 45 : mode === 'Power' ? 65 : 55;
    onUpdateDevice({
      ...currentDevice,
      mode,
      targetTemp: target,
    });
  };

  const setFanSpeed = (speed: number) => {
    onUpdateDevice({
      ...currentDevice,
      speed,
      power: true,
    });
  };

  const toggleBreezeMode = () => {
    onUpdateDevice({
      ...currentDevice,
      breezeMode: !currentDevice.breezeMode,
    });
  };

  const triggerAutoClean = () => {
    setActiveCleanAlert(true);
    setTimeout(() => {
      setActiveCleanAlert(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base">Smart Device Controls</h2>
              <p className="text-[11px] text-slate-400">V-Guard One Connected IoT Ecosystem</p>
            </div>
          </div>
          <button
            id="btn-close-smart-controls"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Switcher Tabs */}
        <div className="bg-slate-100 p-2 flex space-x-1.5 border-b border-slate-200 overflow-x-auto">
          {devices.map((dev) => (
            <button
              key={dev.id}
              onClick={() => setSelectedId(dev.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedId === dev.id
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {dev.type === 'geyser' && <Flame className="w-3.5 h-3.5 text-orange-500" />}
              {dev.type === 'fan' && <Wind className="w-3.5 h-3.5 text-blue-500" />}
              {dev.type === 'chimney' && <CookingPot className="w-3.5 h-3.5 text-amber-500" />}
              <span>{dev.name.split(' ')[0]} {dev.name.split(' ')[1]}</span>
              <span className={`w-2 h-2 rounded-full ${dev.power ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </button>
          ))}
        </div>

        {/* Device Content Area */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Simulated Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="font-medium text-[11px]">
                Demo IoT Telemetry • Realistic Simulated Controls
              </span>
            </div>
            <span className="text-[10px] bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded-full font-bold">
              SIMULATED
            </span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {currentDevice.lastActive}
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900">{currentDevice.name}</h3>
              </div>

              {/* Master Power Toggle Button */}
              <button
                id="btn-toggle-device-power"
                onClick={togglePower}
                className={`p-3 rounded-full transition-all shadow-md flex items-center justify-center ${
                  currentDevice.power
                    ? 'bg-orange-500 text-white shadow-orange-500/30 scale-105'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
                title="Toggle Power"
              >
                <Power className="w-6 h-6" />
              </button>
            </div>

            {/* Status indicator */}
            <div className="mt-3 flex items-center space-x-2 text-xs">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currentDevice.power
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {currentDevice.power ? 'DEVICE ACTIVE' : 'STANDBY / OFF'}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-[11px]">
                Energy Today: <strong className="text-slate-800">{currentDevice.energyTodayKWh} kWh</strong> (~₹11.20)
              </span>
            </div>

            {/* --- GEYSER CONTROLS --- */}
            {currentDevice.type === 'geyser' && (
              <div className="mt-5 space-y-4">
                {/* Temperature Dial Representation */}
                <div className={`p-4 rounded-2xl text-center border transition-all ${
                  currentDevice.power ? 'bg-gradient-to-b from-orange-50/60 to-white border-orange-200' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}>
                  <div className="flex items-center justify-center space-x-1 text-slate-500 text-xs mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                    <span>Current Water Temp: <strong>{currentDevice.currentTemp || 48}°C</strong></span>
                  </div>

                  <div className="my-2 flex items-center justify-center space-x-6">
                    <button
                      id="btn-geyser-temp-minus"
                      onClick={() => handleTempChange(-1)}
                      disabled={!currentDevice.power}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-50 active:scale-95 disabled:opacity-40 shadow-xs"
                    >
                      -
                    </button>

                    <div className="flex flex-col items-center">
                      <span className="text-4xl font-extrabold font-heading text-slate-900">
                        {currentDevice.targetTemp || 55}°
                        <span className="text-xl text-orange-500 font-bold">C</span>
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5">Target Temperature</span>
                    </div>

                    <button
                      id="btn-geyser-temp-plus"
                      onClick={() => handleTempChange(1)}
                      disabled={!currentDevice.power}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-50 active:scale-95 disabled:opacity-40 shadow-xs"
                    >
                      +
                    </button>
                  </div>

                  {currentDevice.showerReady && currentDevice.power && (
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Shower Ready (Water at 48°C)</span>
                    </div>
                  )}
                </div>

                {/* Preset Modes */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-2 block">
                    Energy Mode Presets
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(['Eco', 'Standard', 'Power'] as const).map((mode) => (
                      <button
                        key={mode}
                        id={`btn-geyser-mode-${mode.toLowerCase()}`}
                        onClick={() => setGeyserMode(mode)}
                        disabled={!currentDevice.power}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          currentDevice.mode === mode && currentDevice.power
                            ? 'bg-orange-50 border-orange-500 text-orange-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40'
                        }`}
                      >
                        <div className="font-bold">{mode}</div>
                        <div className="text-[10px] text-slate-500">
                          {mode === 'Eco' ? '45°C (Saves 25%)' : mode === 'Standard' ? '55°C (Recommended)' : '65°C (Quick Boost)'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- FAN CONTROLS --- */}
            {currentDevice.type === 'fan' && (
              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">BLDC Fan Speed (1 - 5)</span>
                    <span className="text-xs font-bold text-orange-600">Speed {currentDevice.speed || 3}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 4, 5].map((spd) => (
                      <button
                        key={spd}
                        id={`btn-fan-speed-${spd}`}
                        onClick={() => setFanSpeed(spd)}
                        className={`py-2 rounded-xl border text-center font-bold text-xs transition-all ${
                          currentDevice.speed === spd && currentDevice.power
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    id="btn-fan-breeze-mode"
                    onClick={toggleBreezeMode}
                    className={`p-3 rounded-xl border flex items-center space-x-2 text-xs font-semibold transition-all ${
                      currentDevice.breezeMode
                        ? 'bg-blue-50 border-blue-400 text-blue-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Wind className="w-4 h-4 text-blue-500" />
                    <div className="text-left">
                      <div>Natural Breeze</div>
                      <div className="text-[10px] text-slate-400 font-normal">Gentle fluctuation</div>
                    </div>
                  </button>

                  <div className="p-3 rounded-xl border bg-white border-slate-200 flex items-center space-x-2 text-xs font-semibold">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <div className="text-left">
                      <div>Sleep Timer</div>
                      <div className="text-[10px] text-slate-400 font-normal">Turn off in 2h</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- CHIMNEY CONTROLS --- */}
            {currentDevice.type === 'chimney' && (
              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-2 block">
                    Extraction Suction Speed
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Low', 'Medium', 'High'] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() =>
                          onUpdateDevice({
                            ...currentDevice,
                            fanSpeed: spd,
                            power: true,
                          })
                        }
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                          currentDevice.fanSpeed === spd && currentDevice.power
                            ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="btn-chimney-autoclean"
                    onClick={triggerAutoClean}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-xs hover:brightness-105 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Trigger Thermal Auto-Clean Cycle</span>
                  </button>

                  {activeCleanAlert && (
                    <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2 animate-in fade-in">
                      <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 animate-spin" />
                      <span>Heating elements engaged. Auto-clean drainage initiated. (Simulated)</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">Sync Status: Online via Wi-Fi</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
