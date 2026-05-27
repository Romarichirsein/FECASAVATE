/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Swords, User, Layers, ShieldCheck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NotificationCenter from './NotificationCenter';
import { useLanguage } from './LanguageContext';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  unreadCount: number;
  onUnreadCountChange: (count: number) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ 
  currentPage, 
  onPageChange, 
  unreadCount, 
  onUnreadCountChange, 
  isLoggedIn,
  onLogout
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'accueil', label: t('nav.accueil') },
    { id: 'about', label: t('nav.about') },
    { id: 'blog', label: t('nav.blog') },
    { id: 'formation', label: t('nav.formation') },
    { id: 'palmares', label: t('nav.palmares') },
    { id: 'champions', label: t('nav.champions') },
    { id: 'boutique', label: t('nav.boutique') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleLinkClick = (id: string) => {
    onPageChange(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-feca-dark/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo / Brand Title */}
            <div 
              onClick={() => handleLinkClick('accueil')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-feca-red to-rose-600 flex items-center justify-center border border-rose-500/30 shadow-md shadow-rose-950/20 group-hover:scale-105 transition-all duration-300">
                <Swords className="w-5.5 h-5.5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border border-feca-dark" title="Plateforme Officielle" />
              </div>
              
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-lg tracking-tight text-white uppercase group-hover:text-feca-gold transition-colors">
                    Fecasavate
                  </span>
                  {/* Subtle Cameroon Flag Pills */}
                  <div className="flex gap-0.5 h-3 items-center">
                    <span className="w-1 h-3 bg-emerald-600 rounded-2xs" />
                    <span className="w-1 h-3 bg-feca-red rounded-2xs" />
                    <span className="w-1 h-3 bg-feca-gold rounded-2xs" />
                  </div>
                </div>
                <span className="block text-[8px] tracking-widest text-slate-400 uppercase font-mono mt-0.5 font-bold leading-none">
                  {t('nav.sub_title')}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links Container with hover highlight support */}
            <div 
              className="hidden lg:flex items-center gap-1 relative"
              onMouseLeave={() => setHoveredId(null)}
            >
              {navItems.map(item => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    className={`relative px-3.5 py-2.5 text-xs uppercase tracking-wider font-semibold font-sans rounded-lg transition-colors duration-300 cursor-pointer outline-none select-none ${
                      isActive 
                        ? 'text-feca-gold' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {/* Animated hover backdrop pill */}
                    <AnimatePresence>
                      {hoveredId === item.id && (
                        <motion.span
                          layoutId="navHoverPill"
                          className="absolute inset-0 bg-slate-800/40 rounded-lg -z-0 border border-slate-700/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Animated active bar */}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveLine"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[3px] bg-gradient-to-r from-feca-gold via-amber-400 to-feca-gold rounded-full shadow-[0_1px_8px_rgba(254,194,54,0.4)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Utilities / Notification Bell + Login CTA */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Premium Dual Language Switcher Segment */}
              <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-xl text-[9px] font-mono leading-none mr-1 shadow-inner select-none transition-all hover:border-slate-700">
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold uppercase cursor-pointer transition-all ${
                    language === 'fr' 
                      ? 'bg-feca-gold text-slate-950 font-black' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold uppercase cursor-pointer transition-all ${
                    language === 'en' 
                      ? 'bg-feca-gold text-slate-950 font-black' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              <NotificationCenter onNotificationCountChange={onUnreadCountChange} />

              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLinkClick('espace-prive')}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs font-display font-bold cursor-pointer hover:bg-emerald-950/50 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t('nav.member_space')}</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-2.5 py-2 text-xs text-slate-400 hover:text-feca-red cursor-pointer transition-colors hover:underline"
                  >
                    {t('nav.quit')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleLinkClick('espace-prive')}
                  className="relative group overflow-hidden px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-feca-night border border-slate-800 hover:border-feca-red text-slate-100 hover:text-white text-xs font-display font-bold tracking-wide transition-all duration-300 shadow-xl shadow-slate-950/50 flex items-center gap-2 cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-2 h-2 bg-feca-red rounded-full ring-2 ring-feca-dark top-1 right-1 animate-pulse" />
                  <User className="w-3.5 h-3.5 text-feca-red group-hover:text-feca-gold transition-colors" />
                  <span>{t('nav.athlete_portal')}</span>
                </button>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="flex lg:hidden items-center gap-3">
              <NotificationCenter onNotificationCountChange={onUnreadCountChange} />
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl bg-feca-night border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer with smooth slide + stagger entry effects */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 bg-feca-dark/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl overflow-hidden py-5 px-4 z-50 animate-fade-in"
            >
              <div className="flex flex-col gap-1.5">
                
                {/* Mobile Language Switcher row */}
                <div className="flex items-center justify-between px-4 py-2 mb-2 bg-slate-900 rounded-xl border border-slate-850">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Globe size={11} className="text-feca-gold" />
                    <span>Langue / Language :</span>
                  </span>
                  
                  <div className="flex bg-slate-950 border border-slate-800 p-0.5 rounded-lg text-[9px] font-mono leading-none">
                    <button
                      type="button"
                      onClick={() => setLanguage('fr')}
                      className={`px-3 py-1 rounded-md font-bold uppercase transition-all cursor-pointer ${
                        language === 'fr' 
                          ? 'bg-feca-gold text-slate-950 font-black' 
                          : 'text-slate-400'
                      }`}
                    >
                      Français
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`px-3 py-1 rounded-md font-bold uppercase transition-all cursor-pointer ${
                        language === 'en' 
                          ? 'bg-feca-gold text-slate-950 font-black' 
                          : 'text-slate-400'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {navItems.map((item, index) => {
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.22, ease: 'easeOut' }}
                      onClick={() => handleLinkClick(item.id)}
                      className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-bold rounded-xl transition-all relative ${
                        isActive 
                          ? 'bg-gradient-to-r from-feca-red/10 to-transparent text-feca-gold border-l-4 border-feca-gold shadow-xs' 
                          : 'text-slate-350 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
                
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: navItems.length * 0.02 + 0.05, duration: 0.2 }}
                  className="h-px bg-slate-800/80 my-3 origin-left" 
                />
                
                {isLoggedIn ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.02 + 0.1, duration: 0.25 }}
                    className="grid grid-cols-2 gap-2"
                  >
                    <button
                      onClick={() => handleLinkClick('espace-prive')}
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-900/25 border border-emerald-500/20 hover:bg-emerald-900/35 text-emerald-400 text-xs font-bold font-display cursor-pointer transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t('nav.member_space')}</span>
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsOpen(false);
                      }}
                      className="py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold font-display cursor-pointer hover:bg-slate-850 transition-colors"
                    >
                      {t('nav.logout')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.02 + 0.1, duration: 0.25 }}
                    onClick={() => handleLinkClick('espace-prive')}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-feca-red to-rose-600 hover:from-rose-600 hover:to-feca-red text-white text-xs uppercase tracking-wider font-extrabold font-display shadow-lg shadow-red-950/20 cursor-pointer transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    <span>{t('nav.login_register')}</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to push site content down */}
      <div className="h-[73px]" />
    </>
  );
}
