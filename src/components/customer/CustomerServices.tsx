/**
 * Customer Services & Support View
 * 4-Step Guided Flow: Product -> Issue -> Description -> Service Slot -> Confirmation
 * Ticket status tracker, Service History, Warranty Lookup, FAQs & Direct Helpline.
 */

import React, { useState, useEffect } from 'react';
import {
  RegisteredProduct,
  ServiceTicket,
  CustomerTab,
} from '../../types';
import { FREQUENT_FAQS } from '../../data/mockData';
import confetti from 'canvas-confetti';
import {
  Wrench,
  CheckCircle2,
  Clock,
  MapPin,
  PhoneCall,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  UserCheck,
  Sparkles,
} from 'lucide-react';

interface CustomerServicesProps {
  registeredProducts: RegisteredProduct[];
  activeTickets: ServiceTicket[];
  onCreateTicket: (newTicket: ServiceTicket) => void;
  initialPrefillProduct?: string;
  initialPrefillIssue?: string;
}

export const CustomerServices: React.FC<CustomerServicesProps> = ({
  registeredProducts,
  activeTickets,
  onCreateTicket,
  initialPrefillProduct,
  initialPrefillIssue,
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'history' | 'lookup' | 'faqs'>('book');

  // Guided 4-Step Booking State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedProduct, setSelectedProduct] = useState<RegisteredProduct | null>(
    registeredProducts[0] || null
  );
  const [issueCategory, setIssueCategory] = useState(initialPrefillIssue || 'Water Heating Delay');
  const [issueDescription, setIssueDescription] = useState('');
  const [serviceType, setServiceType] = useState<ServiceTicket['serviceType']>('On-Site Visit');
  const [appointmentDate, setAppointmentDate] = useState('Tomorrow (23 Sep 2026)');
  const [appointmentSlot, setAppointmentSlot] = useState('10:00 AM - 01:00 PM');
  const [address, setAddress] = useState('Flat 4B, Skyline Ivy, Kadavanthra, Kochi - 682020');
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  // Warranty lookup test state
  const [lookupSerial, setLookupSerial] = useState('');
  const [lookupResult, setLookupResult] = useState<RegisteredProduct | null | 'not-found'>(null);

  // FAQ accordion toggle state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Handle prefill if passed from AI or product card
  useEffect(() => {
    if (initialPrefillProduct) {
      const match = registeredProducts.find((p) =>
        p.name.toLowerCase().includes(initialPrefillProduct.toLowerCase())
      );
      if (match) setSelectedProduct(match);
      if (initialPrefillIssue) setIssueCategory(initialPrefillIssue);
      setActiveTab('book');
      setStep(2);
    }
  }, [initialPrefillProduct, initialPrefillIssue, registeredProducts]);

  const issueOptions = [
    'Water Heating Delay',
    'No Power / Display Blank',
    'Unusual Noise or Vibration',
    'Water Leakage from Valve',
    'Voltage Tripping / Inverter Overload',
    'New Installation Request',
    'Annual Preventive Inspection',
  ];

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const newTicketId = `VG-SR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: ServiceTicket = {
      id: newTicketId,
      productName: selectedProduct.name,
      productModel: selectedProduct.modelNumber,
      category: selectedProduct.category,
      serialNumber: selectedProduct.serialNumber,
      issueCategory,
      issueDescription: issueDescription || 'Service requested via V-Guard One app.',
      serviceType,
      status: 'Engineer Assigned',
      dateCreated: '22 Sep 2026',
      appointmentDate,
      appointmentSlot,
      engineerName: 'Ramesh Kumar (Badge: #VG-TECH-409)',
      engineerPhone: '+91 98471 22910',
      address,
      ticketHistory: [
        { date: '22 Sep, Just now', title: 'Ticket Created', desc: 'Service request booked via V-Guard One' },
        { date: '22 Sep, Just now', title: 'Technician Dispatched', desc: 'Certified Engineer Ramesh Kumar confirmed slot' },
      ],
    };

    onCreateTicket(newTicket);
    setCreatedTicketId(newTicketId);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = lookupSerial.trim().toLowerCase();
    const found = registeredProducts.find(
      (p) => p.serialNumber.toLowerCase().includes(query) || p.modelNumber.toLowerCase().includes(query)
    );
    if (found) {
      setLookupResult(found);
    } else {
      setLookupResult('not-found');
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-xl text-slate-900">
          Service & Certified Care
        </h1>
        <p className="text-xs text-slate-500">
          Doorstep visits, genuine spare parts, and authorized V-Guard technicians
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex space-x-1.5 border-b border-slate-200 pb-1 text-xs overflow-x-auto">
        <button
          id="tab-service-book"
          onClick={() => {
            setActiveTab('book');
            setCreatedTicketId(null);
          }}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'book'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Raise Service Request
        </button>
        <button
          id="tab-service-history"
          onClick={() => setActiveTab('history')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'history'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Track & History ({activeTickets.length})
        </button>
        <button
          id="tab-service-lookup"
          onClick={() => setActiveTab('lookup')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'lookup'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Warranty Lookup
        </button>
        <button
          id="tab-service-faqs"
          onClick={() => setActiveTab('faqs')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'faqs'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Support FAQs
        </button>
      </div>

      {/* --- TAB 1: GUIDED 4-STEP SERVICE BOOKING FLOW --- */}
      {activeTab === 'book' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          {createdTicketId ? (
            /* Ticket Confirmation Screen */
            <div className="p-4 sm:p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full">
                  Appointment Confirmed
                </span>
                <h2 className="font-heading font-extrabold text-xl text-slate-900 mt-1.5">
                  Ticket #{createdTicketId}
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Your service visit for <strong>{selectedProduct?.name}</strong> is scheduled for{' '}
                  <strong>{appointmentDate}</strong> during <strong>{appointmentSlot}</strong>.
                </p>
              </div>

              {/* Technician card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 max-w-sm mx-auto text-left text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Ramesh Kumar</div>
                    <div className="text-[11px] text-slate-500">V-Guard Certified Senior Technician (#409)</div>
                    <div className="text-orange-600 font-semibold mt-0.5">+91 98471 22910</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 pt-2">
                <button
                  onClick={() => setActiveTab('history')}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  View Live Tracking
                </button>
                <button
                  onClick={() => {
                    setCreatedTicketId(null);
                    setStep(1);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Book Another
                </button>
              </div>
            </div>
          ) : (
            /* 4-Step Form Container */
            <div className="space-y-4">
              {/* Step indicator breadcrumbs */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                {[
                  { s: 1, label: '1. Product' },
                  { s: 2, label: '2. Issue' },
                  { s: 3, label: '3. Details' },
                  { s: 4, label: '4. Slot' },
                ].map((st) => (
                  <div
                    key={st.s}
                    className={`flex items-center space-x-1 font-semibold ${
                      step === st.s
                        ? 'text-orange-600 font-bold'
                        : step > st.s
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        step === st.s
                          ? 'bg-orange-500 text-white'
                          : step > st.s
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step > st.s ? '✓' : st.s}
                    </span>
                    <span className="hidden xs:inline">{st.label}</span>
                  </div>
                ))}
              </div>

              {/* STEP 1: CHOOSE PRODUCT */}
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    Step 1: Choose Appliance for Service
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {registeredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        id={`select-product-${prod.id}`}
                        onClick={() => setSelectedProduct(prod)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                          selectedProduct?.id === prod.id
                            ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                              {prod.name}
                            </h4>
                            {selectedProduct?.id === prod.id && (
                              <CheckCircle2 className="w-4 h-4 text-orange-600" />
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono">S/N: {prod.serialNumber}</p>
                          <span className="text-[10px] text-emerald-700 font-medium">
                            Warranty {prod.warrantyStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      id="btn-step1-next"
                      onClick={() => setStep(2)}
                      disabled={!selectedProduct}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5"
                    >
                      <span>Continue to Issue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT ISSUE */}
              {step === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-slate-900">
                      Step 2: Select Issue for {selectedProduct?.name}
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-orange-600 hover:underline"
                    >
                      Change Product
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {issueOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setIssueCategory(opt)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                          issueCategory === opt
                            ? 'border-orange-500 bg-orange-50/50 text-orange-950 font-bold shadow-xs'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt}</span>
                        {issueCategory === opt && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2"
                    >
                      Back
                    </button>
                    <button
                      id="btn-step2-next"
                      onClick={() => setStep(3)}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5"
                    >
                      <span>Describe Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: DESCRIBE ISSUE & SERVICE TYPE */}
              {step === 3 && (
                <div className="space-y-3 text-xs">
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    Step 3: Describe Issue & Support Type
                  </h3>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Service Type Required
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['On-Site Visit', 'Installation', 'Warranty Claim', 'Inspection'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setServiceType(type)}
                          className={`p-2 rounded-xl border text-center font-bold text-xs transition-all ${
                            serviceType === type
                              ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Describe the problem in your words (optional)
                    </label>
                    <textarea
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      rows={3}
                      placeholder="e.g. Geyser takes 35 minutes to heat water to 50 degrees; water pressure is normal."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Service Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    />
                  </div>

                  <div className="flex justify-between pt-3">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2"
                    >
                      Back
                    </button>
                    <button
                      id="btn-step3-next"
                      onClick={() => setStep(4)}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5"
                    >
                      <span>Choose Appointment Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CHOOSE APPOINTMENT WINDOW & CONFIRM */}
              {step === 4 && (
                <form onSubmit={handleCreateTicketSubmit} className="space-y-3.5 text-xs">
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    Step 4: Select Appointment Window & Confirm
                  </h3>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1.5">Preferred Date</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['Today (Urgent)', 'Tomorrow (23 Sep)', '24 Sep (Thu)'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setAppointmentDate(d)}
                          className={`p-2 rounded-xl border text-center font-bold text-xs transition-all ${
                            appointmentDate === d
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1.5">Time Window</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['10:00 AM - 01:00 PM', '02:00 PM - 05:00 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setAppointmentSlot(slot)}
                          className={`p-2 rounded-xl border text-center font-bold text-xs transition-all ${
                            appointmentSlot === slot
                              ? 'bg-orange-500 text-white border-orange-500'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary recap box */}
                  <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200 space-y-1">
                    <div className="font-bold text-orange-950">Service Visit Summary:</div>
                    <div className="text-slate-700">Appliance: <strong>{selectedProduct?.name}</strong></div>
                    <div className="text-slate-700">Issue: <strong>{issueCategory}</strong> ({serviceType})</div>
                    <div className="text-slate-700">Slot: <strong>{appointmentDate} ({appointmentSlot})</strong></div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2"
                    >
                      Back
                    </button>
                    <button
                      id="btn-confirm-service-ticket"
                      type="submit"
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Service Booking</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: TRACK TICKETS & SERVICE HISTORY --- */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {activeTickets.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-heading font-bold text-sm text-slate-800">No active service tickets</h3>
              <p className="text-xs text-slate-500 mt-1">All your appliances are in top working order.</p>
            </div>
          ) : (
            activeTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-orange-600">
                        #{ticket.id}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          ticket.status === 'Completed'
                            ? 'bg-slate-100 text-slate-600 border border-slate-200'
                            : 'bg-orange-100 text-orange-800 border border-orange-200'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-slate-900 mt-1">
                      {ticket.productName}
                    </h3>
                    <p className="text-xs text-slate-600">{ticket.issueCategory}</p>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-slate-400 block text-[10px]">Appointment</span>
                    <strong className="text-slate-800">{ticket.appointmentDate}</strong>
                    <span className="text-slate-500 block text-[11px]">{ticket.appointmentSlot}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="bg-slate-100 rounded-full h-2 overflow-hidden flex">
                  <div
                    className={`h-full bg-orange-500 transition-all ${
                      ticket.status === 'Request Received'
                        ? 'w-1/4'
                        : ticket.status === 'Engineer Assigned'
                        ? 'w-2/4'
                        : ticket.status === 'Out for Service'
                        ? 'w-3/4'
                        : 'w-full bg-emerald-500'
                    }`}
                  />
                </div>

                {/* Technician info strip */}
                {ticket.engineerName && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-orange-500" />
                      <div>
                        <span className="font-bold text-slate-800">{ticket.engineerName}</span>
                        <span className="text-[11px] text-slate-500 block">Authorized V-Guard Engineer</span>
                      </div>
                    </div>

                    <a
                      href={`tel:${ticket.engineerPhone}`}
                      className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-bold bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call Tech</span>
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* --- TAB 3: WARRANTY LOOKUP TOOL --- */}
      {activeTab === 'lookup' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
          <div>
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Warranty & Authenticity Verification
            </h2>
            <p className="text-xs text-slate-500">
              Enter any V-Guard product serial number or model code to check warranty validity.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="text"
              value={lookupSerial}
              onChange={(e) => setLookupSerial(e.target.value)}
              placeholder="e.g. VG-ST-2023-11204 or MAGNO-410"
              required
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs"
            >
              Verify
            </button>
          </form>

          {lookupResult && lookupResult !== 'not-found' && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs animate-in fade-in">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Valid V-Guard Certified Warranty Record Found</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1">
                <div>Appliance: <strong>{lookupResult.name}</strong></div>
                <div>Status: <strong className="text-emerald-700">{lookupResult.warrantyStatus}</strong></div>
                <div>Serial: <span className="font-mono">{lookupResult.serialNumber}</span></div>
                <div>Expires: <strong>{lookupResult.warrantyExpiry}</strong></div>
              </div>
            </div>
          )}

          {lookupResult === 'not-found' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>No match found for that serial number. Please double check the carton sticker or invoice.</span>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 4: SUPPORT FAQS --- */}
      {activeTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5">
          <h2 className="font-heading font-bold text-sm text-slate-900 mb-2">
            Frequently Answered Questions
          </h2>
          {FREQUENT_FAQS.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  className="w-full text-left p-3 flex items-center justify-between font-bold text-xs text-slate-800 bg-slate-50/50 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isExpanded && (
                  <div className="p-3 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-100 whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Direct Contact Support Strip */}
      <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-heading font-bold text-sm text-white">V-Guard 24x7 Customer Helpline</div>
          <p className="text-[11px] text-slate-300">Toll-free national assistance across all Indian states</p>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="tel:18001031300"
            className="flex items-center space-x-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-xl font-bold transition-all shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1800-103-1300</span>
          </a>
        </div>
      </div>
    </div>
  );
};
