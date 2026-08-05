/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Filter, Shield, User, Award, Users, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { MemberSkeleton } from '../components/Skeletons';
import { championsList } from '../data/sportData';
import { Member } from '../types';
import { useLanguage } from '../components/LanguageContext';

export default function Champions() {
  const { language, translateItem } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleManualRefresh = () => {
    setIsLoading(false);
  };

  const filteredMembers = championsList.filter(m => {
    const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
    const specialty = m.specialty ? m.specialty.toLowerCase() : '';
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || specialty.includes(searchTerm.toLowerCase());
    
    const matchesGender = selectedGender === 'all' || m.gender === selectedGender;
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesRole = selectedRole === 'all' || m.role === selectedRole;

    return matchesSearch && matchesGender && matchesCategory && matchesRole;
  });

  return (
    <div className="space-y-12 pb-16 font-sans">

      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-[50vh] min-h-[320px] overflow-hidden">
        <img
          src="/images/savat3.jpg"
          alt="Champions FECASAVATE"
          className="w-full h-full object-cover object-top"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/savate 7.png'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/35 to-feca-dark" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono mb-3"
          >
            {language === 'fr' ? "Annuaire des Licenciés d'Élite" : "Elite Licensees Directory"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl uppercase text-white leading-tight drop-shadow-lg"
          >
            {language === 'fr' ? 'Nos Membres & Champions' : 'Our Members & Champions'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-sm mt-4 max-w-2xl"
          >
            {language === 'fr'
              ? "Les athlètes, entraîneurs et officiels qui font la grandeur de la FECASAVATE."
              : "The athletes, coaches and officials who make FECASAVATE great."}
          </motion.p>
        </div>
      </section>

      <div className="px-4 sm:px-8 max-w-[1700px] w-full mx-auto space-y-12">

      {/* Intro sub-text */}
      <p className="text-slate-300 text-sm text-center max-w-2xl mx-auto">
        {language === 'fr' 
          ? "Découvrez la team technique nationale répertoriée. Filtrez les combattants par catégorie, genre, ou rôles d'encadrement."
          : "Discover our listed national technical team. Filter fighters by weight category, gender, or administrative functions."}
      </p>

      {/* 2. SECURITY PRIVACY ADVISORY BADGE */}
      <section className="max-w-4xl mx-auto bg-blue-950/20 border border-blue-500/30 p-4 rounded-2xl flex items-start gap-3.5 shadow-md">
        <div className="p-2 rounded-xl bg-slate-950 shrink-0 text-feca-gold">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-100 font-display uppercase tracking-wider">
            {language === 'fr' 
              ? "Régulation de Confidentialité des Données (RGPD/MINSEP)" 
              : "Data Privacy Regulation Standards (GDPR / MINSEP)"}
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed mt-1 font-sans">
            {language === 'fr' ? (
              <>La liste complète et dynamique des 250 membres des clubs affiliés de Douala, Yaoundé et Bafoussam n'est pas accessible publiquement sans connexion par mot de passe. Veuillez vous authentifier via votre <strong>Espace Privé</strong> pour accéder à l'annuaire complet et exporter les licences.</>
            ) : (
              <>The comprehensive dynamic list containing up to 250 licensed associates in Douala, Yaoundé, and Bafoussam is restricted to the public. Please sign in via your <strong>Private Access</strong> terminal to consult the whole registry or export administrative PDFs.</>
            )}
          </p>
        </div>
      </section>

      {/* 3. SEARCH AND FILTERS PANEL */}
      <section className="bg-slate-900/60 border border-slate-800 p-5 rounded-3xl space-y-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between pb-2 border-b border-slate-850/40">
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-feca-gold" />
            <h3 className="text-xs uppercase font-mono text-slate-400 font-bold tracking-wider">{language === 'fr' ? 'Filtres de recherche' : 'Search and Filters'}</h3>
          </div>
          <button
            onClick={handleManualRefresh}
            className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono text-slate-400 hover:text-white bg-slate-950 border border-slate-850 hover:border-slate-750 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            disabled={isLoading}
          >
            <RefreshCw size={10} className={`${isLoading ? 'animate-spin' : ''}`} />
            <span>{language === 'fr' ? 'Rafraîchir' : 'Refresh'}</span>
          </button>
        </div>
        
        {/* Row 1 search */}
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-3 flex items-center justify-center text-slate-500 z-10">
            <Search size={15} />
          </span>
          <motion.input
            type="text"
            placeholder={language === 'fr' ? 'Rechercher un membre par nom, prénom ou style spécialité...' : 'Search members by name, surname, or style specialty...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            whileFocus={{ scale: 1.012 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:ring-1 focus:ring-feca-red focus:border-feca-red outline-hidden font-medium relative"
          />
        </div>

        {/* Row 2 filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Gender Filter */}
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-mono text-slate-500 font-bold">{language === 'fr' ? 'GENRE' : 'GENDER'}</label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-hidden cursor-pointer focus:border-feca-red"
            >
              <option value="all">{language === 'fr' ? 'Tous Sexes' : 'All Genders'}</option>
              <option value="M">{language === 'fr' ? 'Homme' : 'Male'}</option>
              <option value="F">{language === 'fr' ? 'Femme' : 'Female'}</option>
            </select>
          </div>

          {/* Age Category Filter */}
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-mono text-slate-500 font-bold">{language === 'fr' ? 'CATÉGORIE CLASSE' : 'GRADE CLASS'}</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-hidden cursor-pointer focus:border-feca-red"
            >
              <option value="all">{language === 'fr' ? 'Tous Grades' : 'All Grades / Classes'}</option>
              <option value="Benjamin">{language === 'fr' ? 'Benjamin (Junior)' : 'Benjamin (Junior)'}</option>
              <option value="Senior">{language === 'fr' ? 'Senior' : 'Senior'}</option>
              <option value="Professionnel">{language === 'fr' ? 'Professionnel' : 'Professional'}</option>
              <option value="Legende">{language === 'fr' ? 'Légende Fédérale' : 'Federal Legend'}</option>
            </select>
          </div>

          {/* Role Filter */}
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-mono text-slate-500 font-bold">{language === 'fr' ? 'FONCTION RÔLE' : 'ROLE FUNCTION'}</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-hidden cursor-pointer focus:border-feca-red"
            >
              <option value="all">{language === 'fr' ? 'Toutes Fonctions' : 'All Roles'}</option>
              <option value="tireur">{language === 'fr' ? 'Tireurs / Combattants' : 'Fighters / Athletes'}</option>
              <option value="coach">{language === 'fr' ? 'Entraîneurs / Coaches' : 'Coaches & Instructors'}</option>
              <option value="dirigeant">{language === 'fr' ? 'Comité Dirigeant' : 'Executive Board'}</option>
            </select>
          </div>

        </div>

      </section>

      {/* 4. ROSTER GRID CARD */}
      <section className="max-w-5xl mx-auto">
        {isLoading ? (
          <MemberSkeleton count={8} />
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/30 border border-slate-800 border-dashed rounded-3xl">
            <AlertCircle className="w-8 h-8 text-feca-red mx-auto mb-3" />
            <p className="text-slate-400 text-sm">
              {language === 'fr' ? 'Aucun licencié ne correspond à la sélection.' : 'No licensed member matches this selection.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map(m => (
              <div 
                key={m.id} 
                className="bg-feca-night border border-slate-850 hover:border-slate-700/80 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-lg relative"
              >
                {/* Visual Image container with premium aspect */}
                <div className="aspect-square relative overflow-hidden bg-slate-950 border-b border-slate-900">
                  <img
                    src={m.imageUrl}
                    alt={`${m.firstName} ${m.lastName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-2 left-2 p-1 bg-slate-950/90 border border-slate-800 text-[9px] font-mono tracking-widest font-semibold px-2 rounded uppercase text-feca-gold">
                    {m.role === 'tireur' 
                      ? (language === 'fr' ? 'Combattant' : 'Fighter') 
                      : m.role === 'dirigeant' 
                        ? (language === 'fr' ? 'Direction' : 'Board') 
                        : (m.role === 'coach' ? (language === 'fr' ? 'Coach' : 'Coach') : m.role)}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-4 space-y-2.5">
                  <div>
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                      {m.club || 'FECASAVATE INDÉPENDANT'}
                    </span>
                    <h3 className="font-display font-black text-slate-150 text-base leading-tight truncate uppercase">
                      {m.firstName} {m.lastName}
                    </h3>
                  </div>

                  {m.specialty && (
                    <div className="p-1.5 bg-slate-950 border border-slate-900 rounded-lg text-[10px] text-slate-300 flex items-center gap-1">
                      <Sparkles size={11} className="text-feca-red shrink-0" />
                      <span className="truncate">{translateItem(m, 'specialty')}</span>
                    </div>
                  )}

                  {/* Achievements bullet board */}
                  {m.achievements && m.achievements.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-slate-900">
                      <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none font-bold">
                        {language === 'fr' ? 'Palmarès' : 'Achievements'}
                      </span>
                      <ul className="space-y-0.5 text-[9px] text-slate-450 leading-relaxed font-semibold">
                        {m.achievements.map((ach, idx) => (
                          <li key={idx} className="flex gap-1 items-start truncate text-slate-400">
                            <span className="text-feca-gold shrink-0">⭐</span>
                            <span className="truncate">{translateItem({ ach }, 'ach') || ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer card metrics */}
                <div className="p-3 bg-slate-950 border-t border-slate-850/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{language === 'fr' ? 'CLASSE' : 'CLASS'}: {translateItem(m, 'category').toUpperCase()}</span>
                  <span>{language === 'fr' ? 'GENRE' : 'GENRE'}: {m.gender}</span>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      </div>{/* /inner content wrapper */}
    </div>
  );
}
