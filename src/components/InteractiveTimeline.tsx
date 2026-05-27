/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Award, Flame, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { historyTimeline } from '../data/sportData';

import { useLanguage } from './LanguageContext';

export default function InteractiveTimeline() {
  const { language, translateItem } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : historyTimeline.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev < historyTimeline.length - 1 ? prev + 1 : 0));
  };

  const activeEvent = historyTimeline[selectedIndex];

  return (
    <div className="bg-feca-night border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
      {/* Absolute ambient lights */}
      <div className="absolute top-0 right-1/4 w-60 h-60 bg-gradient-to-br from-feca-red/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-gradient-to-tr from-feca-gold/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          {language === 'fr' ? 'Rétrospective Historique Officielle' : 'Official Historical Retrospective'}
        </span>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-1.5">
          {language === 'fr' ? 'La Ligne du Temps des Lions' : 'Fecasavate Lions Timeline'}
        </h3>
        <p className="text-slate-400 text-sm mt-3">
          {language === 'fr' 
            ? "Explorez les jalons légendaires de l'émergence de la Savate au Cameroun, des affrontements intercontinentaux aux ceintures mondiales."
            : "Explore the legendary milestones of Savates emergence in Cameroon, from intercontinental clashes to absolute world belts."}
        </p>
      </div>

      {/* Horizontal Scroll Points Track */}
      <div className="relative mt-8 mb-10 overflow-x-auto pb-4 scrollbar-none">
        
        {/* Central connecting line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-800 z-0" />
        <div 
          className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-feca-red to-feca-gold transition-all duration-500 z-0" 
          style={{ width: `${(selectedIndex / (historyTimeline.length - 1)) * 100}%` }}
        />

        {/* Nodes */}
        <div className="relative flex justify-between min-w-[700px] z-10 px-6">
          {historyTimeline.map((item, index) => {
            const isSelected = selectedIndex === index;
            const isPassed = index < selectedIndex;

            return (
              <button
                key={item.year}
                onClick={() => setSelectedIndex(index)}
                className="flex flex-col items-center group cursor-pointer"
                title={translateItem(item, 'title')}
              >
                {/* Visual node ball */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'bg-feca-gold border-feca-gold text-slate-950 scale-110 shadow-lg shadow-feca-gold/20' 
                      : isPassed
                        ? 'bg-feca-red border-feca-red text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-feca-red group-hover:text-feca-red'
                  }`}
                >
                  <span className="font-display font-extrabold text-sm tracking-tight">
                    {item.year.replace(/[^\d]/g, '') || '75'}
                  </span>
                </div>

                {/* Vertical helper visual */}
                <div className={`w-0.5 h-3 my-1 transition-colors ${isSelected ? 'bg-feca-gold' : 'bg-transparent'}`} />

                {/* Bullet subtitle label */}
                <span className={`text-[11px] font-mono tracking-wider uppercase max-w-[80px] text-center truncate ${
                  isSelected ? 'text-feca-gold font-bold' : 'text-slate-500'
                }`}>
                  {translateItem(item, 'tag') || 'Step'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Panel */}
      <div className="relative min-h-[180px] sm:min-h-[160px] bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            {/* Year highlight bento */}
            <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4 shrink-0">
              <div>
                <span className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-feca-gold to-yellow-500 font-mono">
                  {activeEvent.year}
                </span>
                <span className="block text-[10px] text-feca-red font-mono uppercase tracking-widest mt-0.5 font-bold">
                  {translateItem(activeEvent, 'tag') || 'CHRONOLOGY'}
                </span>
              </div>
              <div className="p-2 sm:p-3 bg-slate-900 border border-slate-800 rounded-xl mr-2 md:mr-0 md:mt-3">
                {selectedIndex % 2 === 0 ? (
                  <Flame className="w-5 h-5 text-feca-red animate-pulse" />
                ) : (
                  <Award className="w-5 h-5 text-feca-gold" />
                )}
              </div>
            </div>

            {/* Context paragraph */}
            <div className="md:col-span-9 flex flex-col justify-center">
              <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                {translateItem(activeEvent, 'title')}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2.5 font-sans">
                {translateItem(activeEvent, 'description')}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating navigational wings */}
        <div className="absolute right-4 bottom-4 flex items-center gap-2">
          <button 
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={language === 'fr' ? 'Étape Précédente' : 'Previous Step'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={language === 'fr' ? 'Étape Suivante' : 'Next Step'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
