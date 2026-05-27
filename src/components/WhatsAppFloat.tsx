/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, PhoneCall } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function WhatsAppFloat() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessageAlert, setHasNewMessageAlert] = useState(true);

  // Prefilled WhatsApp message context
  const whatsappNumber = '237699886386'; // Official Fecasavate Contact Number
  
  const welcomeText = language === 'fr' 
    ? "Bonjour ! Comment pouvons-nous vous aider aujourd'hui ? Notre secrétariat général vous répond sur WhatsApp."
    : "Hello! How can we help you today? Our general secretariat answers you on WhatsApp.";

  const inputPlaceholder = language === 'fr'
    ? "Écrivez votre message..."
    : "Type your message...";

  const sendText = language === 'fr'
    ? "Discuter maintenant"
    : "Chat now";

  const triggerTooltip = language === 'fr'
    ? "Support Client WhatsApp"
    : "WhatsApp Customer Support";

  const [message, setMessage] = useState('');

  // Handle open window
  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    setHasNewMessageAlert(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(
      message.trim() || (language === 'fr' 
        ? "Bonjour FECASAVATE, je souhaite avoir des informations sur les licences, formations ou les prochains événements."
        : "Hello FECASAVATE, I would like to get some information regarding licenses, training sessions or upcoming events.")
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none" id="whatsapp-floating-support">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="absolute bottom-20 right-0 w-80 sm:w-85 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* WhatsApp Window Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 flex items-center justify-between text-white border-b border-emerald-500/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
                    <MessageSquare className="w-5 h-5 text-white fill-white/10" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display tracking-wide uppercase">
                    FECASAVATE Support
                  </h4>
                  <span className="text-[9px] text-emerald-100 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <span>{language === 'fr' ? 'En ligne' : 'Online'}</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/10 text-emerald-100 hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Simulated Chat Area */}
            <div className="p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 text-xs min-h-[110px] space-y-4">
              
              {/* Automated Agent Message bubble */}
              <div className="flex gap-2 items-start max-w-[85%]">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-[10px] font-bold text-feca-gold flex items-center justify-center shrink-0 border border-slate-700">
                  FS
                </div>
                <div className="bg-slate-900 border border-slate-800/80 text-slate-350 p-3 rounded-2xl rounded-tl-none leading-relaxed select-text shadow-xs">
                  {welcomeText}
                </div>
              </div>

              {/* Secure notification badge */}
              <div className="text-center">
                <span className="inline-block text-[9px] text-slate-500 bg-slate-900/60 font-mono border border-slate-850 px-2.5 py-0.5 rounded-full">
                  🔒 {language === 'fr' ? 'Chiffrement de bout en bout' : 'End-to-end encryption'}
                </span>
              </div>

            </div>

            {/* Quick text Area / Trigger Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-900 flex gap-2">
              <input
                type="text"
                placeholder={inputPlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 focus:border-emerald-500 text-slate-200 text-xs rounded-xl px-3 py-2 outline-hidden font-medium transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer flex items-center justify-center shadow-md border border-emerald-500/20 active:scale-95 duration-150"
                title={sendText}
              >
                <Send size={14} className="fill-current text-white" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <div className="flex items-center gap-3">
        
        {/* Animated Popover Tooltip label */}
        <AnimatePresence>
          {hasNewMessageAlert && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="hidden md:flex px-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-850 text-[10px] sm:text-xs font-bold text-slate-300 font-display shadow-xl items-center gap-2 max-w-sm whitespace-nowrap"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>{language === 'fr' ? 'Une question ? Écrivez-nous !' : 'Any questions? Chat live!'}</span>
              <button 
                onClick={() => setHasNewMessageAlert(false)}
                className="text-slate-500 hover:text-slate-300 ml-1.5"
                title="Masquer"
              >
                <X size={11} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Icon Circle Trigger with beautiful nested rings */}
        <motion.button
          onClick={handleOpenToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-950/40 cursor-pointer group outline-hidden border border-emerald-400/20"
          title={triggerTooltip}
          aria-label={triggerTooltip}
        >
          {/* Animated decorative waves around the floating button */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 -z-10 animate-ping group-hover:scale-125 duration-1000" />
          
          <MessageSquare className="w-6.5 h-6.5 text-white fill-white/10 group-hover:scale-110 transition-transform duration-300" />
          
          {/* Unread dot alerts */}
          <AnimatePresence>
            {hasNewMessageAlert && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-0 right-0 w-4 h-4 bg-feca-red text-[8px] font-mono font-extrabold text-white rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-md"
              >
                1
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

      </div>
    </div>
  );
}
