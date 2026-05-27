/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Ticket, AlertTriangle, Sparkles, BellRing } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface EventCountdownProps {
  // Target date string, e.g. "2025-11-29T15:00:00"
  targetDateStr?: string;
  className?: string;
}

export default function EventCountdown({ targetDateStr = "2025-11-29T15:00:00", className = "" }: EventCountdownProps) {
  const { language, t } = useLanguage();
  
  // To ensure the counter is always ticking & beautiful even if the sandbox local time is in 2026+,
  // we dynamically resolve the target date. If the default date has passed, we count down to
  // Nov 29 of the next year (e.g., 2026) to maintain visual live "urgency" for the ticket sales!
  const getTargetDate = () => {
    const rawTarget = new Date(targetDateStr);
    const now = new Date();
    
    if (rawTarget.getTime() < now.getTime()) {
      // Create a date for the same month/day but in the upcoming year to keep the countdown live
      const nextYearTarget = new Date(now.getFullYear(), 10, 29, 15, 0, 0); // Month is 0-indexed, so 10 is November
      if (nextYearTarget.getTime() < now.getTime()) {
        nextYearTarget.setFullYear(now.getFullYear() + 1);
      }
      return nextYearTarget;
    }
    return rawTarget;
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    const target = getTargetDate();

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  const padZero = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className={`space-y-3.5 ${className}`} id="event-countdown-wrapper">
      
      {/* Header Visual Bar with glowing pulse */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-feca-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-feca-red"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-extrabold text-feca-red uppercase tracking-widest flex items-center gap-1">
            <BellRing size={12} className="animate-bounce" />
            <span>{t('countdown.closing')}</span>
          </span>
        </div>

        <span className="text-[9px] font-mono text-slate-400 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-md flex items-center gap-1 select-none">
          <Sparkles size={10} className="text-feca-gold" />
          <span>{t('countdown.limited')}</span>
        </span>
      </div>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        
        {/* Days Box */}
        <div className="bg-slate-950 border border-slate-850/80 rounded-2xl p-2.5 sm:p-4 text-center select-none relative overflow-hidden group hover:border-feca-red/40 transition-colors">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-feca-red/20 group-hover:bg-feca-red/60 transition-colors" />
          <motion.div 
            key={timeLeft.days}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-mono text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            {padZero(timeLeft.days)}
          </motion.div>
          <span className="block text-[8px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">{t('countdown.days')}</span>
        </div>

        {/* Hours Box */}
        <div className="bg-slate-950 border border-slate-850/80 rounded-2xl p-2.5 sm:p-4 text-center select-none relative overflow-hidden group hover:border-feca-gold/40 transition-colors">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-feca-gold/20 group-hover:bg-feca-gold/60 transition-colors" />
          <motion.div 
            key={timeLeft.hours}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-mono text-2xl sm:text-4xl font-extrabold text-feca-gold tracking-tight"
          >
            {padZero(timeLeft.hours)}
          </motion.div>
          <span className="block text-[8px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">{t('countdown.hours')}</span>
        </div>

        {/* Minutes Box */}
        <div className="bg-slate-950 border border-slate-850/80 rounded-2xl p-2.5 sm:p-4 text-center select-none relative overflow-hidden group hover:border-slate-700/80 transition-colors">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-slate-800 group-hover:bg-slate-600 transition-colors" />
          <motion.div 
            key={timeLeft.minutes}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-mono text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            {padZero(timeLeft.minutes)}
          </motion.div>
          <span className="block text-[8px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">{t('countdown.minutes')}</span>
        </div>

        {/* Seconds Box */}
        <div className="bg-slate-950 border border-slate-850/80 rounded-2xl p-2.5 sm:p-4 text-center select-none relative overflow-hidden group hover:border-feca-red/40 transition-colors">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-feca-red/10 group-hover:bg-feca-red/50 transition-colors" />
          <motion.div 
            key={timeLeft.seconds}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-mono text-2xl sm:text-4xl font-extrabold text-feca-red tracking-tight"
          >
            {padZero(timeLeft.seconds)}
          </motion.div>
          <span className="block text-[8px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">{t('countdown.seconds')}</span>
        </div>

      </div>

      {/* Ticket Booking Callout Mini footer */}
      <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3 flex flex-col sm:flex-row items-center sm:justify-between gap-2.5">
        <div className="flex items-center gap-2 text-left">
          <Ticket size={13} className="text-feca-gold animate-pulse shrink-0" />
          <p className="text-[10px] sm:text-xs text-slate-400 select-text">
            {t('countdown.tickets')} <strong className="text-white">5 000 FCFA</strong> ({language === 'fr' ? 'Classique' : 'Standard'}) / <strong className="text-feca-gold">25 000 FCFA</strong> (VIP Prestige)
          </p>
        </div>
        
        <div className="text-[9px] font-mono text-feca-red font-bold uppercase animate-pulse select-none">
          ⚡ {t('countdown.sold')}
        </div>
      </div>

    </div>
  );
}
