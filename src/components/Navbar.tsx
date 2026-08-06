/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ShieldCheck, Globe, Sun, Moon, ChevronDown, Trophy, BookOpen, ShoppingBag, Newspaper } from 'lucide-react';
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
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Navbar({ 
  currentPage, 
  onPageChange, 
  unreadCount, 
  onUnreadCountChange, 
  isLoggedIn,
  onLogout,
  isDark,
  onToggleDark
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [palmDropOpen, setPalmDropOpen] = useState(false);
  const [mobilePalmOpen, setMobilePalmOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPalmDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Main nav items (Formation, Boutique, Blog are now under Palmarès dropdown)
  const mainNavItems = [
    { id: 'accueil', label: t('nav.accueil') },
    { id: 'about', label: t('nav.about') },
    { id: 'licences', label: t('nav.licences') },
    { id: 'membres', label: language === 'fr' ? 'Membres' : 'Members' },
    { id: 'champions', label: t('nav.champions') },
    { id: 'contact', label: t('nav.contact') },
  ];

  // Sub-items under Palmarès dropdown
  const palmSubItems = [
    { id: 'palmares', label: t('nav.palmares'), icon: <Trophy size={14} /> },
    { id: 'formation', label: t('nav.formation'), icon: <BookOpen size={14} /> },
    { id: 'boutique', label: t('nav.boutique'), icon: <ShoppingBag size={14} /> },
    { id: 'blog', label: t('nav.blog'), icon: <Newspaper size={14} /> },
  ];

  const palmPages = ['palmares', 'formation', 'boutique', 'blog'];
  const isPalmActive = palmPages.includes(currentPage);

  const handleLinkClick = (id: string) => {
    onPageChange(id);
    setIsOpen(false);
    setPalmDropOpen(false);
    setMobilePalmOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-feca-dark/92 backdrop-blur-md border-b border-slate-800/80 py-2.5 shadow-lg' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* ── LOGO / Brand ── */}
            <div 
              onClick={() => handleLinkClick('accueil')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Official FECASAVATE logo image */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-slate-200 shadow-md group-hover:scale-105 transition-all duration-300 dark:border-slate-700">
                <img 
                  src="https://www.fecasavate.cm/wp-content/uploads/2020/08/LOGO-FCSDA-NEW.png"
                  alt="Logo FECASAVATE"
                  className="w-11 h-11 object-contain"
                  onError={(e) => {
                    // Fallback to colored shield if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-base tracking-tight text-slate-100 dark:text-white uppercase group-hover:text-feca-gold transition-colors">
                    FECASAVATE
                  </span>
                  {/* Cameroon Flag Pills */}
                  <div className="flex gap-0.5 h-3 items-center">
                    <span className="w-1 h-3 bg-emerald-600 rounded-sm" />
                    <span className="w-1 h-3 bg-feca-red rounded-sm" />
                    <span className="w-1 h-3 bg-feca-gold rounded-sm" />
                  </div>
                </div>
                <span className="block text-[8px] tracking-widest text-slate-400 uppercase font-mono font-bold leading-none">
                  {t('nav.sub_title')}
                </span>
              </div>
            </div>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-0.5 relative">

              {/* Regular nav items */}
              {mainNavItems.map(item => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`relative px-3 py-2 text-[11px] uppercase tracking-wider font-semibold rounded-lg transition-all duration-200 cursor-pointer outline-none select-none ${
                      isActive 
                        ? 'text-feca-gold' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navActiveLine"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-feca-gold via-amber-400 to-feca-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}

              {/* ── Palmarès DROPDOWN ── */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setPalmDropOpen(!palmDropOpen)}
                  className={`relative px-3 py-2 text-[11px] uppercase tracking-wider font-semibold rounded-lg transition-all duration-200 cursor-pointer outline-none select-none flex items-center gap-1 ${
                    isPalmActive 
                      ? 'text-feca-gold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {isPalmActive && (
                    <motion.span
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-feca-gold via-amber-400 to-feca-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{language === 'fr' ? 'Palmarès & Plus' : 'Palmarès & More'}</span>
                  <ChevronDown 
                    size={12} 
                    className={`relative z-10 transition-transform duration-200 ${palmDropOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {palmDropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-2 w-52 bg-feca-dark/98 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-slate-950/60 overflow-hidden py-2 z-50"
                    >
                      {palmSubItems.map((sub, i) => {
                        const isSubActive = currentPage === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleLinkClick(sub.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                              isSubActive
                                ? 'text-feca-gold bg-feca-gold/10 border-l-2 border-feca-gold'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                            }`}
                          >
                            <span className={isSubActive ? 'text-feca-gold' : 'text-slate-500'}>{sub.icon}</span>
                            {sub.label}
                            {isSubActive && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-feca-gold" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Desktop Utilities ── */}
            <div className="hidden sm:flex items-center gap-2.5">
              
              {/* Theme Switcher */}
              <button
                type="button"
                onClick={onToggleDark}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer hover:border-slate-700 transition-all shadow-inner flex items-center justify-center w-8 h-8"
                title={isDark ? 'Mode clair' : 'Mode sombre'}
              >
                {isDark ? <Sun className="w-4 h-4 text-feca-gold" /> : <Moon className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Language Switcher */}
              <div className="flex bg-slate-900 border border-slate-800 p-0.5 rounded-xl text-[9px] font-mono leading-none shadow-inner select-none">
                <button
                  type="button"
                  onClick={() => setLanguage('fr')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold uppercase cursor-pointer transition-all ${
                    language === 'fr' ? 'bg-feca-gold text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >FR</button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1.5 rounded-lg font-bold uppercase cursor-pointer transition-all ${
                    language === 'en' ? 'bg-feca-gold text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >EN</button>
              </div>

              <NotificationCenter onNotificationCountChange={onUnreadCountChange} />

              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLinkClick('espace-prive')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold cursor-pointer hover:bg-emerald-950/50 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t('nav.member_space')}</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-2.5 py-2 text-xs text-slate-400 hover:text-feca-red cursor-pointer transition-colors"
                  >
                    {t('nav.quit')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleLinkClick('espace-prive')}
                  className="relative group overflow-hidden px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-feca-night border border-slate-800 hover:border-feca-red text-slate-100 hover:text-white text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <div className="absolute top-1 right-1 w-2 h-2 bg-feca-red rounded-full animate-pulse" />
                  <User className="w-3.5 h-3.5 text-feca-red group-hover:text-feca-gold transition-colors" />
                  <span>{t('nav.athlete_portal')}</span>
                </button>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <div className="flex lg:hidden items-center gap-2">
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

        {/* ── Mobile Navigation Drawer ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 bg-feca-dark/97 backdrop-blur-xl border-b border-slate-800 shadow-2xl overflow-hidden py-5 px-4 z-50"
            >
              <div className="flex flex-col gap-1.5">

                {/* Mode Visuel (theme) */}
                <div className="flex items-center justify-between px-4 py-2 mb-1 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    {isDark ? <Sun size={11} className="text-feca-gold" /> : <Moon size={11} className="text-feca-gold" />}
                    <span>{language === 'fr' ? 'Mode Visuel :' : 'Visual Mode :'}</span>
                  </span>
                  <div className="flex bg-slate-950 border border-slate-800 p-0.5 rounded-lg text-[9px] font-mono leading-none">
                    <button type="button" onClick={onToggleDark} className={`px-3 py-1.5 rounded-md font-bold uppercase transition-all cursor-pointer ${!isDark ? 'bg-feca-gold text-slate-950 font-black' : 'text-slate-400'}`}>
                      {language === 'fr' ? 'Clair' : 'Light'}
                    </button>
                    <button type="button" onClick={onToggleDark} className={`px-3 py-1.5 rounded-md font-bold uppercase transition-all cursor-pointer ${isDark ? 'bg-feca-gold text-slate-950 font-black' : 'text-slate-400'}`}>
                      {language === 'fr' ? 'Sombre' : 'Dark'}
                    </button>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between px-4 py-2 mb-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Globe size={11} className="text-feca-gold" />
                    <span>Langue / Language :</span>
                  </span>
                  <div className="flex bg-slate-950 border border-slate-800 p-0.5 rounded-lg text-[9px] font-mono leading-none">
                    <button type="button" onClick={() => setLanguage('fr')} className={`px-3 py-1 rounded-md font-bold uppercase transition-all cursor-pointer ${language === 'fr' ? 'bg-feca-gold text-slate-950 font-black' : 'text-slate-400'}`}>Français</button>
                    <button type="button" onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-md font-bold uppercase transition-all cursor-pointer ${language === 'en' ? 'bg-feca-gold text-slate-950 font-black' : 'text-slate-400'}`}>English</button>
                  </div>
                </div>

                {/* Main nav items */}
                {mainNavItems.map((item, index) => {
                  const isActive = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      onClick={() => handleLinkClick(item.id)}
                      className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-bold rounded-xl transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-feca-red/10 to-transparent text-feca-gold border-l-4 border-feca-gold' 
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}

                {/* Palmarès dropdown group in mobile */}
                <div className="rounded-xl border border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setMobilePalmOpen(!mobilePalmOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      isPalmActive 
                        ? 'bg-gradient-to-r from-feca-red/10 to-transparent text-feca-gold border-l-4 border-feca-gold' 
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{language === 'fr' ? 'Palmarès & Plus' : 'Palmarès & More'}</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${mobilePalmOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {mobilePalmOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="border-t border-slate-800 bg-slate-950/40"
                      >
                        {palmSubItems.map(sub => {
                          const isSubActive = currentPage === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleLinkClick(sub.id)}
                              className={`w-full flex items-center gap-3 px-6 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                                isSubActive
                                  ? 'text-feca-gold bg-feca-gold/10 border-l-2 border-feca-gold'
                                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                              }`}
                            >
                              <span className={isSubActive ? 'text-feca-gold' : 'text-slate-600'}>{sub.icon}</span>
                              {sub.label}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  className="h-px bg-slate-800/80 my-3 origin-left" 
                />
                
                {isLoggedIn ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.25 }}
                    className="grid grid-cols-2 gap-2"
                  >
                    <button
                      onClick={() => handleLinkClick('espace-prive')}
                      className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-900/25 border border-emerald-500/20 text-emerald-400 text-xs font-bold cursor-pointer transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t('nav.member_space')}</span>
                    </button>
                    <button
                      onClick={() => { onLogout(); setIsOpen(false); }}
                      className="py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold cursor-pointer"
                    >
                      {t('nav.logout')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.25 }}
                    onClick={() => handleLinkClick('espace-prive')}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-feca-red to-rose-600 text-white text-xs uppercase tracking-wider font-extrabold shadow-lg cursor-pointer transition-all"
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
      {/* Spacer */}
      <div className="h-[68px]" />
    </>
  );
}
