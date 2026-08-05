/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Swords, Phone, Mail, MapPin, Clock, ArrowUp, Send, Facebook, Youtube, ShieldCheck } from 'lucide-react';
import { partnersLogos } from '../data/sportData';
import { useLanguage } from './LanguageContext';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const { language, t } = useLanguage();
  
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickNav = (id: string) => {
    onPageChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 pt-16 pb-8 overflow-hidden font-sans">
      
      {/* Visual neon grids */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-feca-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-feca-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* PARTNERS LOGO SCROLLER OR GRID HEADER */}
        <div className="border-b border-slate-800/80 pb-12 mb-12">
          <div className="text-center sm:text-left mb-6">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-feca-red">
              {t('footer.partenaires_sub')}
            </span>
            <h4 className="font-display font-black text-xl text-slate-100 tracking-tight mt-1">
              {t('footer.partenaires_title')}
            </h4>
          </div>
          
          {/* Partnership badges bento */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {partnersLogos.map((partner, i) => (
              <div 
                key={i} 
                className="p-3.5 rounded-xl bg-feca-night/60 border border-slate-900 hover:border-slate-800 transition-colors flex flex-col justify-center"
              >
                <span className="text-xs font-bold text-slate-200 font-display text-center sm:text-left truncate">
                  {partner.name}
                </span>
                <span className="text-[9px] text-feca-gold font-mono tracking-wider text-center sm:text-left mt-0.5">
                  {partner.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CORE COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 text-sm text-slate-400">
          
          {/* Main info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-feca-red/10 border border-feca-red/30 flex items-center justify-center">
                <Swords className="w-4.5 h-4.5 text-feca-red" />
              </div>
              <div>
                <span className="font-display font-black text-white text-lg tracking-tight uppercase">
                  Fecasavate
                </span>
                <span className="block text-[8px] text-slate-500 font-mono tracking-wider font-extrabold uppercase leading-none">
                  {t('nav.sub_title')}
                </span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-400">
              {t('footer.desc')}
            </p>

            <div className="flex gap-2">
              <a 
                href="https://facebook.com/fecasavate" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-slate-900 border border-slate-800 hover:border-feca-gold hover:text-feca-gold text-slate-400 rounded-lg transition-colors cursor-pointer"
                title="Facebook Officiel"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-slate-900 border border-slate-800 hover:border-feca-red hover:text-feca-red text-slate-400 rounded-lg transition-colors cursor-pointer"
                title="YouTube Fecasavate"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links map */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="font-display font-bold text-slate-100 uppercase tracking-widest text-xs">
              {t('footer.arborescence')}
            </h5>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => quickNav('accueil')} className="hover:text-feca-gold hover:underline cursor-pointer">
                  {t('nav.accueil')}
                </button>
              </li>
              <li>
                <button onClick={() => quickNav('about')} className="hover:text-feca-gold hover:underline cursor-pointer">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => quickNav('blog')} className="hover:text-feca-gold hover:underline cursor-pointer">
                  {t('nav.blog')}
                </button>
              </li>
              <li>
                <button onClick={() => quickNav('formation')} className="hover:text-feca-gold hover:underline cursor-pointer">
                  {t('nav.formation')}
                </button>
              </li>
              <li>
                <button onClick={() => quickNav('palmares')} className="hover:text-feca-gold hover:underline cursor-pointer">
                  {t('nav.palmares')}
                </button>
              </li>
              <li>
                <button onClick={() => quickNav('champions')} className="hover:text-feca-gold hover:underline cursor-pointer">
                  {t('nav.champions')}
                </button>
              </li>
              <li>
                <button onClick={() => quickNav('boutique')} className="hover:text-feca-gold hover:underline cursor-pointer">
                  {t('nav.boutique')}
                </button>
              </li>
            </ul>
          </div>

          {/* Opening hours */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-display font-bold text-slate-100 uppercase tracking-widest text-xs">
              {t('footer.horaires')}
            </h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-feca-red shrink-0" />
                <div>
                  <span className="block font-bold text-slate-300">{t('footer.mon_fri')}</span>
                  <span className="font-mono text-[11px] text-feca-gold">{t('footer.nonstate')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-300">{t('footer.sat_sun')}</span>
                  <span className="font-mono text-[11px]">{t('footer.forme_section')}</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-red-950/20 border border-feca-red/10 rounded-xl text-[11px] leading-relaxed">
              🇨🇲 <span className="text-white font-bold">{language === 'fr' ? 'Lions Indomptables' : 'Indomitable Lions'}</span>: {t('footer.lions_note')}
            </div>
          </div>

          {/* Central Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-display font-bold text-slate-100 uppercase tracking-widest text-xs">
              {t('footer.siege')}
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-feca-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Complexe Ndi-Samba,<br />Tropicana, Yaoundé, Cameroun
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-feca-red shrink-0 mt-0.5" />
                <div className="font-mono text-[11px] text-slate-300">
                  <a href="tel:+237242063844" className="hover:text-white block">+237 242 063 844</a>
                  <a href="tel:+237699886386" className="hover:text-white block">+237 699 886 386</a>
                  <a href="tel:+237680342440" className="hover:text-white block">+237 680 342 440</a>
                </div>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-300 font-mono">
                  <a href="mailto:savatecmr@gmail.com" className="hover:text-white block">savatecmr@gmail.com</a>
                  <a href="mailto:infos@fecasavate.cm" className="hover:text-white block">infos@fecasavate.cm</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ACCREDITATION BAR */}
        <div className="border-t border-slate-800/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          
          <div className="text-center sm:text-left">
            <p>{t('footer.rights')}</p>
            <p className="text-[10px] text-slate-600 mt-1">
              {t('footer.affiliation')}
            </p>
          </div>

          {/* Compliance flags */}
          <div className="flex gap-4 text-[10px] font-semibold text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer">{t('footer.legal')}</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">{t('footer.rgpd')}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-center sm:text-right">
              <span className="block text-[10px] text-slate-600 leading-none">{t('footer.dev')}</span>
              <span className="text-slate-400 font-bold hover:text-feca-gold transition-colors font-mono">
                Romaric NGUEMI
              </span>
            </div>
            <button 
              onClick={handleBackToTop}
              className="p-2 bg-slate-900 border border-slate-800 hover:border-feca-red hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer"
              title="Retourner en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
