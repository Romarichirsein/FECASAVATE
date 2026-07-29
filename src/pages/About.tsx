/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Award, Heart, Activity, Milestone, HeartHandshake, Eye, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { bigFigures, historicVictories } from '../data/sportData';
import InteractiveTimeline from '../components/InteractiveTimeline';

import { useLanguage } from '../components/LanguageContext';

export default function About() {
  const { language, translateItem } = useLanguage();
  const [activeValueTab, setActiveValueTab] = useState<'ethique' | 'educative' | 'esthetique' | 'efficacite'>('ethique');

  const valuesLayouts = {
    ethique: {
      title: language === 'fr' ? 'Charte d’Éthique et d’Intégrité' : 'Ethics & Integrity Charter',
      icon: <ShieldCheck className="w-8 h-8 text-feca-red shrink-0" />,
      bullets: language === 'fr' ? [
        'Respect mutuel strict entre tous les licenciés, coaches, et officiels.',
        'Intégrité morale et transparence absolue dans l’administration du cabinet fédéral.',
        'Responsabilité sociale accrue envers les communautés et la jeunesse défavorisée.',
        'Solidarité continentale et coopération amicale avec les fédérations affiliées.'
      ] : [
        'Strict mutual respect between all licensing members, coaches, and officials.',
        'Moral integrity and absolute transparency in the administration of the federal board.',
        'Increased social responsibility towards local communities and disadvantaged youth.',
        'Continental solidarity and friendly cooperation with affiliated federations.'
      ],
      description: language === 'fr' 
        ? 'Pour la FECASAVATE, la boxe française n’est pas qu’un art de percussion, c’est une école de droiture et de dignité civique camerounaise.'
        : 'For FECASAVATE, French boxing is not just a striking art, it is a school of righteousness and Cameroonian civic dignity.'
    },
    educative: {
      title: language === 'fr' ? 'Vocation Éducative et Citoyenne' : 'Educational & Civic Vocation',
      icon: <Award className="w-8 h-8 text-feca-gold shrink-0" />,
      bullets: language === 'fr' ? [
        'Apprentissage technique continu et opportunités de développement de la confiance.',
        'Éducation culturelle solide, ancrée dans les traditions festives locales.',
        'Formation qualifiante en leadership, gestion associative et arbitrage diplomatique.'
      ] : [
        'Continuous technical learning and confidence growth opportunities.',
        'Solid cultural education, anchored in festive local traditions.',
        'Qualifying leadership training, association management and diplomatic refereeing.'
      ],
      description: language === 'fr' 
        ? 'L’Académie de Savate enseigne aux plus jeunes le dépassement de soi, la discipline corporelle, et le civisme pour former l’élite de demain.'
        : 'The Savate Academy teaches youth self-transcendence, bodily discipline, and civism to shape the elite of tomorrow.'
    },
    esthetique: {
      title: language === 'fr' ? 'Valorisation du Patrimoine Esthétique' : 'Promoting Aesthetic Heritage',
      icon: <Heart className="w-8 h-8 text-pink-500 shrink-0" />,
      bullets: language === 'fr' ? [
        'Promotion et valorisation globale du patrimoine d’Afrique Centrale.',
        'Encouragement actif de la musique de rythme traditionnelle et de la chorégraphie.',
        'Entretien d’une gestuelle athlétique harmonieuse et authentique.'
      ] : [
        'Global promotion and appreciation of Central African culture and heritage.',
        'Active encouragement of traditional rhythmic music and choreography.',
        'Promotion of harmonious, authentic athletic movements.'
      ],
      description: language === 'fr' 
        ? 'La Savate Forme en musique exprime l’énergie vibratoire du pays tout en respectant l’idéal technique d’harmonie physique.'
        : 'Savate Forme with music expresses the country\'s vibrant energy while respecting the physical harmony technical ideals.'
    },
    efficacite: {
      title: language === 'fr' ? 'Performance technique & Administration moderne' : 'Technical Performance & Modern Org',
      icon: <Activity className="w-8 h-8 text-indigo-400 shrink-0" />,
      bullets: language === 'fr' ? [
        'Professionnalisme élevé s’appuyant sur des indicateurs de performance stricts.',
        'Intégration d’outils numériques avancés et de plateformes de suivi des licences.',
        'Détermination à former continuellement des médaillés d’or universels.'
      ] : [
        'High level of professionalism based on strict performance indicators.',
        'Integration of advanced digital tools and license tracking portals.',
        'Dedication to continuously training world-class gold medalists.'
      ],
      description: language === 'fr' 
        ? 'Chez nous, l’efficacité administrative soutient directement l’efficacité sportive dans l’arène.'
        : 'With us, administrative efficacy directly supports athletic efficacy in the arena.'
    }
  };

  const selectedValue = valuesLayouts[activeValueTab];

  return (
    <div className="space-y-16 pb-16 px-4 max-w-7xl mx-auto font-sans">
      
      {/* 1. BRAND STORY HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-10">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          {language === 'fr' ? "La Vocation d'une Naissance" : "The Vocation of a Birth"}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-slate-100 leading-tight">
          {language === 'fr' ? 'À Propos de la Fecasavate' : 'About Fecasavate'}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {language === 'fr' ? (
            <>Fondée pour structurer, promouvoir et réglementer la Boxe Française au Cameroun, la <strong>FECASAVATE</strong> a su hisser l’Afrique Centrale au firmament des rings internationaux. Découvrez notre patrimoine, nos valeurs d’intégrité, et les ligues d’excellence qui nous animent.</>
          ) : (
            <>Founded to structure, promote, and regulate French Boxing in Cameroon, <strong>FECASAVATE</strong> has lifted Central Africa to the skies of international rings. Discover our heritage, our values of integrity, and the elite leagues that drive us.</>
          )}
        </p>
      </section>

      {/* 2. THE 4 SYSTEMIC CORE VALUES */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-feca-gold font-mono font-bold">
            {language === 'fr' ? 'Les Piliers Fondateurs' : 'The Founding Pillars'}
          </span>
          <h2 className="font-display font-extrabold text-2xl text-slate-100 uppercase mt-1">
            {language === 'fr' ? 'Les Grandes Saisies de nos Valeurs' : 'Our Key Architectural Values'}
          </h2>
        </div>

        {/* Tab triggers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
          {(Object.keys(valuesLayouts) as Array<keyof typeof valuesLayouts>).map(key => {
            const isSelected = activeValueTab === key;
            const labelMap = {
              ethique: language === 'fr' ? 'Éthique' : 'Ethics',
              educative: language === 'fr' ? 'Éducative' : 'Education',
              esthetique: language === 'fr' ? 'Esthétique' : 'Aesthetics',
              efficacite: language === 'fr' ? 'Efficacité' : 'Efficiency'
            };
            return (
              <button
                key={key}
                onClick={() => setActiveValueTab(key)}
                className={`p-4 rounded-xl border text-center font-display font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'bg-feca-night border-feca-red text-feca-red shadow-lg' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {labelMap[key]}
              </button>
            );
          })}
        </div>

        {/* Value detail showcase */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-6 sm:p-10 rounded-3xl max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeValueTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center md:border-r border-slate-800 pb-4 md:pb-0 pr-0 md:pr-6 shrink-0">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl mb-3">
                  {selectedValue.icon}
                </div>
                <h4 className="font-display font-black text-sm text-slate-100 uppercase tracking-wider">
                  {selectedValue.title}
                </h4>
              </div>

              <div className="md:col-span-8 space-y-4">
                <p className="text-slate-300 text-sm font-sans italic leading-relaxed">
                  "{selectedValue.description}"
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  {selectedValue.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-feca-gold shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. CORE CHRONOLOGY CONTAINER */}
      <section className="pt-4">
        <InteractiveTimeline />
      </section>

      {/* 4. HISTORICAL FIGURES (LEGENDS & FOUNDERS) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
            {language === 'fr' ? "Les Esprits d'Engagement" : "Spirits of Commitment"}
          </span>
          <h2 className="font-display font-black text-2xl text-slate-100 uppercase mt-1">
            {language === 'fr' ? 'Les Grandes Figures Historiques' : 'Legendary Historical Figures'}
          </h2>
          <p className="text-slate-400 text-xs mt-3">
            {language === 'fr' 
              ? 'Hommage aux donateurs, entraîneurs et premiers visionnaires qui ont subventionné et soutenu le rayonnement martial du Cameroun.'
              : 'Tribute to donors, coaches, and early visionaries who sponsored and sustained the martial reach of Cameroon.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bigFigures.map((figure, i) => (
            <div 
              key={i} 
              className="p-5 rounded-2xl bg-feca-night border border-slate-850/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <Award className="w-4 h-4 text-feca-gold" />
                  </div>
                  <span className="text-[10px] text-feca-gold font-mono tracking-widest uppercase font-bold">
                    {translateItem(figure, 'role')}
                  </span>
                </div>
                
                <h4 className="font-display font-extrabold text-base text-slate-100">
                  {figure.name}
                </h4>
                
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {translateItem(figure, 'contribution')}
                </p>
              </div>

              <div className="border-t border-slate-900 mt-4 pt-3 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>{language === 'fr' ? 'RECONNAISSANCE FÉDÉRALE' : 'FEDERAL RECOGNITION'}</span>
                <span>{language === 'fr' ? 'HONNEUR' : 'HONOR'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VINTAGE KEY VICTORIES ARCHIVE */}
      <section className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs uppercase tracking-widest text-feca-gold font-mono font-bold">
            {language === 'fr' ? 'Les Gloires de Légende' : 'Glories of Legend'}
          </span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-slate-100 uppercase">
            {language === 'fr' ? 'Sacre et Victoires Historiques Détaillées' : 'Detailed Historical Victories & Podiums'}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
            {language === 'fr' 
              ? 'Retrouvez les premiers podiums officiels des Lions de la Savate lors des grands championnats intercontinentaux (2010 à 2016).'
              : 'Find the first official podiums of the Savate Lions during major intercontinental championships (2010 to 2016).'}
          </p>
        </div>

        {/* Vintage table grid */}
        <div className="grid grid-cols-1 divide-y divide-slate-850 font-sans border-t border-slate-850">
          {historicVictories.map(v => (
            <div 
              key={v.id} 
              className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center hover:bg-slate-900/30 px-3 rounded-lg transition-colors"
            >
              {/* Year column */}
              <div className="sm:col-span-2">
                <span className="font-mono text-xs font-bold text-feca-red bg-red-950/20 border border-feca-red/20 px-2 py-0.5 rounded">
                  {v.year}
                </span>
              </div>
              
              {/* Competition Title */}
              <div className="sm:col-span-4">
                <span className="font-display font-extrabold text-xs text-slate-200 block">
                  {translateItem(v, 'title')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {language === 'fr' ? 'Catégorie' : 'Category'} : {translateItem(v, 'category') || 'Mondiale / Africaine'}
                </span>
              </div>

              {/* Athlete Column */}
              <div className="sm:col-span-3">
                <span className="text-xs font-bold text-white block">
                  {v.athlete}
                </span>
              </div>

              {/* Location / Medal Column */}
              <div className="sm:col-span-3 flex justify-between sm:justify-end items-center gap-4">
                <span className="text-xs text-slate-400 truncate">
                  {v.location}
                </span>
                <span className="text-lg">
                  {v.medal === 'gold' ? '🥇' : v.medal === 'silver' ? '🥈' : '🥉'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
