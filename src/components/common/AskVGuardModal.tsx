/**
 * Ask V-Guard AI Assistant Modal
 * Intelligent product knowledge, troubleshooting guides, solar explanations, and service escalation.
 */

import React, { useState, useRef, useEffect } from 'react';
import { AIChatMessage } from '../../types';
import { VGuardLogo } from './VGuardLogo';
import {
  Sparkles,
  Send,
  X,
  PhoneCall,
  MessageSquare,
  Wrench,
  Sun,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Bot,
  User,
  ArrowRight,
} from 'lucide-react';

interface AskVGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToService: (prefillProduct?: string, prefillIssue?: string) => void;
  onNavigateToSolar: () => void;
}

const INITIAL_MESSAGES: AIChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: "Namaste! I am Ask V-Guard, your virtual household advisor. How can I assist you with your V-Guard stabilizers, solar system, water heaters, or Sunflame appliances today?",
    timestamp: 'Just now',
  },
];

const SUGGESTED_QUESTIONS = [
  "Why is my Calino geyser taking longer to heat?",
  "How much electricity did my rooftop solar generate today?",
  "How do I claim warranty for my Magno 410 stabilizer?",
  "How to clean Sunflame chimney auto-clean tray?",
  "How to select the right inverter battery for my home?",
];

export const AskVGuardModal: React.FC<AskVGuardModalProps> = ({
  isOpen,
  onClose,
  onNavigateToService,
  onNavigateToSolar,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Realistic intelligent response engine grounded in V-Guard product specifications & safety protocols
    setTimeout(() => {
      let reply = '';
      let actionSuggestion: AIChatMessage['actionSuggestion'] = undefined;
      let escalationReady = false;

      const q = query.toLowerCase();

      if (q.includes('geyser') || q.includes('water heater') || q.includes('calino') || q.includes('heating')) {
        reply =
          "For the Calino 25L Smart Geyser, normal heating to 55°C takes approximately 18–22 minutes. If heating takes longer, potential causes include:\n\n" +
          "1. Hard water mineral scaling around the heating element.\n" +
          "2. The sacrificial Magnesium Anode rod may be due for annual replacement.\n" +
          "3. Input water inlet temperature during winter months.\n\n" +
          "⚠️ Notice: As an AI assistant, I provide general diagnostic guidance and do not guarantee physical hardware diagnosis. Would you like to schedule an authorized technician visit?";
        actionSuggestion = {
          type: 'service',
          label: 'Book Water Heater Service Visit',
          payload: { product: 'Calino 25L IoT Smart Geyser', issue: 'Water Heating Delay' },
        };
        escalationReady = true;
      } else if (q.includes('solar') || q.includes('generation') || q.includes('electricity') || q.includes('bill') || q.includes('units')) {
        reply =
          "Your 5 kW Rooftop Solar system is performing optimally today!\n\n" +
          "• Today's Generation: ~19.8 kWh (Units)\n" +
          "• Household Consumption: 2.1 kW current draw\n" +
          "• Battery Bank: 84% charged (~7.2 hrs backup available)\n" +
          "• Estimated Today Savings: ₹158.40 saved\n\n" +
          "During bright sunlight (11 AM to 2 PM), excess power is exported back to the KSEB grid via Net Metering.";
        actionSuggestion = {
          type: 'solar',
          label: 'View Detailed Solar Dashboard',
        };
      } else if (q.includes('warranty') || q.includes('guarantee') || q.includes('claim') || q.includes('magno')) {
        reply =
          "Your V-Guard Magno 410 Stabilizer (Serial #VG-ST-2023-11204) has an Active 3-Year Comprehensive Warranty valid until 14 March 2026.\n\n" +
          "To claim warranty:\n" +
          "1. No physical receipt needed if registered in V-Guard One.\n" +
          "2. You can raise a home inspection request.\n" +
          "3. Authorized V-Guard engineers carry digital warranty validation tools.\n\n" +
          "Toll-free customer care is also available at 1800-103-1300.";
        actionSuggestion = {
          type: 'manual',
          label: 'View Magno 410 Warranty Card',
        };
        escalationReady = true;
      } else if (q.includes('chimney') || q.includes('sunflame') || q.includes('clean') || q.includes('oil')) {
        reply =
          "For Sunflame Bella 60cm Autoclean Chimney:\n\n" +
          "1. Press and hold the 'Auto-Clean' button for 3 seconds or trigger it via the app.\n" +
          "2. The internal thermal heating element melts accumulated grease and drains oil into the stainless steel collector tray within 15 minutes.\n" +
          "3. Detach the lower oil tray, rinse with warm soapy water, dry, and click it back.\n\n" +
          "Do not use abrasive metal scrubbers on the glass sensor panel.";
      } else if (q.includes('battery') || q.includes('inverter') || q.includes('ups') || q.includes('tubular')) {
        reply =
          "For residential homes in India with 3–4 hours of daily power cuts, V-Guard recommends:\n\n" +
          "• Recommended Combo: Smart Pro 1200 Pure Sine Wave Inverter + NextGen VT 1500 (150Ah Tall Tubular Battery).\n" +
          "• Load capability: Supports 3 Fans, 4 LED lights, 1 TV, and Wi-Fi router for 4.5 to 6 hours.\n" +
          "• Comes with 60 months warranty and ceramic float water-level indicators.";
      } else {
        reply =
          `Thank you for asking about "${query}". V-Guard offers certified technical support across India. ` +
          "You can verify your product user manual, view warranty status in My Products, or connect directly with our toll-free customer care team.";
        escalationReady = true;
      }

      const assistantMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
        actionSuggestion,
        escalationReady,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleAction = (suggestion: AIChatMessage['actionSuggestion']) => {
    if (!suggestion) return;
    if (suggestion.type === 'service') {
      onNavigateToService(suggestion.payload?.product, suggestion.payload?.issue);
      onClose();
    } else if (suggestion.type === 'solar') {
      onNavigateToSolar();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col h-[90vh] sm:h-[640px] max-h-[90vh] overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white p-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-bold text-base leading-tight">Ask V-Guard</span>
                <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                  AI Advisor
                </span>
              </div>
              <p className="text-[11px] text-orange-100 italic">“Bring Home a Better Tomorrow”</p>
            </div>
          </div>
          <button
            id="btn-close-ask-vguard"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="bg-orange-50 border-b border-orange-100 px-3 py-1.5 text-[11px] text-orange-800 flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
          <span>Demo Knowledge Base: Sample guidance only. Real live hardware telemetry is simulated.</span>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-orange-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Interactive Action Suggestion Card */}
                {msg.actionSuggestion && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                    <button
                      onClick={() => handleAction(msg.actionSuggestion)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 rounded-xl font-semibold transition-colors"
                    >
                      <span className="flex items-center space-x-1.5">
                        {msg.actionSuggestion.type === 'service' && <Wrench className="w-3.5 h-3.5 text-orange-600" />}
                        {msg.actionSuggestion.type === 'solar' && <Sun className="w-3.5 h-3.5 text-orange-600" />}
                        {msg.actionSuggestion.type === 'manual' && <FileText className="w-3.5 h-3.5 text-orange-600" />}
                        <span>{msg.actionSuggestion.label}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
                    </button>
                  </div>
                )}

                {/* Human Support Escalation Strip */}
                {msg.escalationReady && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Need human engineer?</span>
                    <div className="flex items-center space-x-2">
                      <a
                        href="tel:18001031300"
                        className="inline-flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-semibold"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>1800-103-1300</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-500 text-xs pl-9">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]"></div>
              <span className="text-[11px] text-slate-400">Ask V-Guard is analyzing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Carousel */}
        <div className="bg-white border-t border-slate-100 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Quick Prompts
          </p>
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              id="input-ask-vguard"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about geyser, solar, stabilizer, warranty..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
            <button
              id="btn-send-ask-vguard"
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white p-2 rounded-xl transition-all shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
