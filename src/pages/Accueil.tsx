/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Swords, ShieldAlert, Shield, Crown, Music, Zap, 
  MapPin, Calendar, Users, Trophy, ChevronRight, Star, Quote, ArrowRight, BellRing, Play, Award, FileText, CheckCircle, GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { disciplines, upcomingFights, gradeRecipients, officialExperts, membresWP } from '../data/sportData';
import VideoLightbox, { FECASAVATE_VIDEOS } from '../components/VideoLightbox';
import EventCountdown from '../components/EventCountdown';
import { useLanguage } from '../components/LanguageContext';

interface AccueilProps {
  onPageChange: (page: string) => void;
  onDispatchAlert?: () => void;
}

export default function Accueil({ onPageChange, onDispatchAlert }: AccueilProps) {
  const { language, t, translateItem } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('assaut');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('gala-2025');
  const [memberSectionTab, setMemberSectionTab] = useState<'recipients' | 'membres'>('recipients');

  const openVideoLightbox = (videoId: string) => {
    setSelectedVideoId(videoId);
    setLightboxOpen(true);
  };

  const selectedDiscipline = disciplines.find(d => d.id === activeTab) || disciplines[0];

  const getIcon = (id: string, size = 22) => {
    switch (id) {
      case 'assaut': return <ShieldAlert size={size} className="text-blue-400" />;
      case 'combat': return <Swords size={size} className="text-red-500 animate-pulse" />;
      case 'pro': return <Crown size={size} className="text-amber-400" />;
      case 'forme': return <Music size={size} className="text-emerald-400" />;
      case 'defense': return <Shield size={size} className="text-purple-400" />;
      case 'canne': return <Shield size={size} className="text-cyan-400" />; /********** Fallback **********/
      default: return <Swords size={size} className="text-slate-400" />;
    }
  };

  const testimonies = [
    { 
      name: 'Kande Elodie', 
      role: language === 'fr' ? 'Tireuse catégorie Assaut - Yaoundé' : 'Fighter, Assault category - Yaounde', 
      text: language === 'fr' 
        ? 'La Fecasavate m’a appris la rigueur scientifique des touches. Sous le contrôle des coachs nationaux, on progresse de manière sécurisée et d’athlète amateur, on devient un compétiteur discipliné.'
        : 'Fecasavate taught me the scientific rigor of touches. Under national coaches, we progress safely and go from amateur athlete to disciplined competitor.', 
      stars: 5 
    },
    { 
      name: 'Me Jean-Jules Kamdem', 
      role: language === 'fr' ? 'Entraîneur Fédéral' : 'Federal Instructor', 
      text: language === 'fr' 
        ? 'Sculpter nos jeunes athlètes est notre sacerdoce. Grâce à l’agrément et aux structures d’entraînement de Tropicana, nous formons une génération de guerriers moraux et de futurs champions internationaux.'
        : 'Sculpting our young athletes is our duty. Thanks to the approval and state facilities in Tropicana, we train a generation of moral warriors and future world champions.', 
      stars: 5 
    }
  ];

  return (
    <div className="space-y-24 pb-20 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION ("UFC / ONE CHAMPIONSHIP" GRADE ATHLETIC IMPRESSION) */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-8">
        {/* Extreme glowing overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-feca-red/10 via-transparent to-transparent opacity-80 z-0 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-feca-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1700px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Slogans and CTA info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-4 py-1.5 select-none">
              <span className="flex h-2 w-2 rounded-full bg-feca-red animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 font-extrabold flex items-center gap-1">
                {language === 'fr' ? 'La Maison des Champions Camerounais' : 'The Home of Cameroonian Champions'} <span className="text-feca-gold">Camerounais</span> 🇨🇲
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight uppercase text-slate-100">
              {language === 'fr' ? (
                <>
                  S'entraîner avec Ferveur <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-feca-red via-feca-gold to-yellow-500">
                    Gagner avec Dignité
                  </span>
                </>
              ) : (
                <>
                  Train with Fervor <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-feca-red via-feca-gold to-yellow-500">
                    Win with Dignity
                  </span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              {language === 'fr' ? (
                <>Bienvenue sur la plateforme réglementaire de la <strong>FECASAVATE</strong>. Nous structurons, encadrons et cultivons la boxe française à travers 6 disciplines phares à Yaoundé et sur tout le territoire national. Rejoignez nos clubs affiliés et hissez haut le flambeau des Lions Indomptables de la Savate.</>
              ) : (
                <>Welcome to the regulatory platform of <strong>FECASAVATE</strong>. We organize, supervise and cultivate French boxing across 6 core disciplines in Yaounde and across the national territory. Join our affiliated clubs and lift high the banner of the Indomitable Lions of Savate.</>
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onPageChange('espace-prive')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-feca-red to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-red-950/30 hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'fr' ? 'Rejoindre la Fédération' : 'Join the Federation'}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onPageChange('palmares')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-feca-gold text-feca-gold hover:text-white font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group shadow-lg"
              >
                <Trophy size={14} className="text-feca-gold" />
                <span>{language === 'fr' ? 'Voir le Palmarès' : 'See our Honours'}</span>
              </button>
            </div>

            {/* Bullet metrics board */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-display font-black text-white font-mono leading-none">
                  09+
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 block">
                  {language === 'fr' ? 'Titres Mondiaux' : 'World Titles'}
                </span>
              </div>
              <div className="text-center lg:text-left border-x border-slate-800 px-4">
                <span className="block text-2xl font-display font-black text-feca-gold font-mono leading-none">
                  06
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 block">
                  Disciplines
                </span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-display font-black text-white font-mono leading-none">
                  100%
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 block">
                  Lions Indomptables
                </span>
              </div>
            </div>

          </motion.div>

          {/* Hero image — real savate action photo */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-950/60 border border-slate-800">
              {/* Glow border accent */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-feca-gold/20 z-10 pointer-events-none" />
              <img
                src="/images/savat2.jpg"
                alt="Savate FECASAVATE – combattants en action"
                className="w-full h-[420px] object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/savate 6.png';
                }}
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-sm border border-feca-gold/30 rounded-xl px-4 py-2.5 flex items-center gap-2 z-20">
                <Trophy size={16} className="text-feca-gold" />
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">{language === 'fr' ? 'Championnat National' : 'National Championship'}</span>
                  <span className="block text-xs font-display font-bold text-white">FECASAVATE 🇨🇲</span>
                </div>
              </div>
            </div>
            {/* Floating stat chips */}
            <div className="absolute -top-4 -right-4 bg-feca-red text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-950/40 animate-float">
              🥇 Champions du Monde
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE 6 DISCIPINES BENTO SELECTOR */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
            {language === 'fr' ? 'Catalogue de Combat & de Forme' : 'Combat & Fitness Catalog'}
          </span>
          <h2 className="font-display font-black text-3xl text-slate-100 uppercase mt-1 leading-tight">
            {language === 'fr' ? 'Les 6 Grandes Disciplines Pratiquées' : 'The 6 Core Practiced Disciplines'}
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            {language === 'fr' 
              ? 'Découvrez la richesse technique de nos sections, des combats de percussion extrême à l’esthétique musicale de la Savate Forme.'
              : 'Discover the technical richness of our sections, from extreme punching combats to the musical aesthetics of Savate Forme.'}
          </p>
        </div>

        {/* Tab row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5">
          {disciplines.map(d => {
            const isSelected = activeTab === d.id;
            const dynamicName = translateItem(d, 'name');
            return (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`p-4 rounded-xl border text-center transition-all duration-300 flex flex-col items-center gap-2 cursor-pointer ${
                  isSelected 
                    ? 'bg-feca-night border-feca-gold text-feca-gold shadow-lg shadow-feca-gold/5' 
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-lg bg-slate-950 ${isSelected ? 'border border-feca-gold' : ''}`}>
                  {getIcon(d.id, 20)}
                </div>
                <span className="font-display font-bold text-xs">
                  {dynamicName.split(' ')[1] || dynamicName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Discipline Details */}
        <div className="bg-feca-night border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient from-feca-red/5 to-transparent rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Visual Icon panel */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-48 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center relative glow-card group">
                {getIcon(selectedDiscipline.id, 64)}
                <div className="absolute bottom-3 left-3 right-3 text-center bg-slate-900 border border-slate-800 py-1 rounded-lg text-[9px] font-mono tracking-widest font-bold">
                  {translateItem(selectedDiscipline, 'safetyLevel').toUpperCase()}
                </div>
              </div>
            </div>

            {/* Content text */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-slate-100">
                    {translateItem(selectedDiscipline, 'name')}
                  </h3>
                  <span className="text-xs text-feca-gold block mt-0.5">
                    {language === 'fr' ? "Catégorie d'activité Fecasavate" : "Fecasavate category of activity"}
                  </span>
                </div>
                <div className="space-y-1 text-left sm:text-right">
                  <span className="block text-[10px] font-mono text-slate-400">{language === 'fr' ? 'DURÉE RÉGLEMENTAIRE' : 'REGULATORY DURATION'}</span>
                  <span className="block font-mono text-xs font-bold text-white bg-slate-950 border border-slate-800 px-2.5 py-1 rounded inline-block">
                    {translateItem(selectedDiscipline, 'duration')}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <p className="leading-relaxed">
                  <strong>{language === 'fr' ? 'Présentation:' : 'Introduction:'}</strong> {translateItem(selectedDiscipline, 'description')}
                </p>
                <p className="p-3 bg-slate-950/80 border border-slate-850 rounded-xl leading-relaxed text-slate-400 font-sans">
                  <strong>{language === 'fr' ? 'Règles de Combat:' : 'Combat Rules:'}</strong> {translateItem(selectedDiscipline, 'rules')}
                </p>
              </div>

              <button
                onClick={() => onPageChange('formation')}
                className="inline-flex items-center gap-1.5 text-xs text-feca-red font-bold hover:underline font-mono pt-2 cursor-pointer"
              >
                <span>{language === 'fr' ? 'VOIR LE PROGRAMME DE FORMATION' : 'VIEW THE TRAINING PROGRAM'}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* 2.5 PASSAGE DE GRADE OFFICIEL & REGLEMENTATION HIGHLIGHT */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-feca-night border border-slate-800 p-6 sm:p-10 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-md inline-block">
                OFFICIEL FECASAVATE 2026
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-100 uppercase tracking-tight">
                Passage de Grade Officiel & Annuaire des Membres
              </h3>
              <p className="text-xs text-slate-400 font-sans max-w-2xl">
                Résultats officiels du passage de grade du 12 Juillet 2026 encadré par l’Officiel Fédéral Me EVINA PATRICK, ainsi que l'annuaire des athlètes et cadres licenciés FECASAVATE.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onPageChange('formation')}
                className="px-5 py-3 bg-feca-gold hover:bg-yellow-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-yellow-950/20 cursor-pointer flex items-center gap-2"
              >
                <Award size={16} />
                <span>Voir les Récipiendaires & Grades</span>
              </button>
              <button
                onClick={() => onPageChange('membres')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Users size={16} />
                <span>Annuaire Complet</span>
              </button>
              <button
                onClick={() => onPageChange('licences')}
                className="px-5 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <FileText size={16} />
                <span>Demander une Licence</span>
              </button>
            </div>
          </div>

          {/* TAB SELECTOR */}
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 flex-wrap">
            <button
              onClick={() => setMemberSectionTab('recipients')}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
                memberSectionTab === 'recipients'
                  ? 'bg-feca-red text-white shadow-md shadow-red-950/40'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Award size={14} />
              <span>Nouveaux Récipiendaires 2026 ({gradeRecipients.length})</span>
            </button>

            <button
              onClick={() => setMemberSectionTab('membres')}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
                memberSectionTab === 'membres'
                  ? 'bg-feca-red text-white shadow-md shadow-red-950/40'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Users size={14} />
              <span>Membres Licenciés & Staff ({membresWP.length})</span>
            </button>
          </div>

          {/* ATHLETES & MEMBERS DISPLAY GRID */}
          {memberSectionTab === 'recipients' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {gradeRecipients.map((r) => (
                <div key={r.id} className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl space-y-2 text-center group hover:border-feca-gold/50 transition-all flex flex-col justify-between">
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 relative">
                    <img
                      src={r.imageUrl || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=80'}
                      alt={r.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=80'; }}
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] font-mono font-bold text-feca-gold uppercase border border-slate-800">
                      {r.grade.split(' ')[1] || r.grade}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-200 font-display uppercase block truncate" title={r.name}>
                      {r.name}
                    </span>
                    <span className="text-[9px] font-mono text-feca-gold font-bold block truncate">
                      {r.grade} {r.degree ? `(${r.degree})` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {membresWP.map((m) => (
                <div key={m.id} className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl space-y-2 text-center group hover:border-emerald-500/50 transition-all flex flex-col justify-between">
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 relative">
                    <img
                      src={m.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                      alt={`${m.firstName} ${m.lastName}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'; }}
                    />
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-emerald-950/90 text-[8px] font-mono font-bold text-emerald-300 uppercase border border-emerald-500/40">
                      {m.role}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-200 font-display uppercase block truncate" title={`${m.firstName} ${m.lastName}`}>
                      {m.firstName} {m.lastName}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 font-semibold block truncate">
                      {m.grade || m.category}
                    </span>
                    {m.club && (
                      <span className="text-[8px] font-mono text-slate-500 block truncate">
                        {m.club}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. MAJOR FIGHT-CARD PROMOTION (THE MAIN EVENT NOV 29, 2025) */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        
        {/* Banner callout */}
        <div className="bg-gradient-to-r from-red-950/50 via-rose-950/30 to-slate-900/60 border-2 border-feca-red rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-3 bg-feca-red text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded-bl-xl select-none">
            {language === 'fr' ? 'GALA EXCLUSIF' : 'EXCLUSIVE GALA'}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Main title headers */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <span className="text-xs uppercase tracking-widest text-feca-gold font-bold font-mono bg-feca-gold/10 border border-feca-gold/20 px-3 py-1 rounded-full">
                👑 {language === 'fr' ? 'SOUS LE HAUT PARRAINAGE DE LA PREMIÈRE DAME' : 'UNDER THE HIGH PATRONAGE OF THE FIRST LADY'}
              </span>
              
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-100 uppercase leading-tight pt-2">
                {language === 'fr' ? (
                  <>GRAND ÉVÉNEMENT <br />DE SAVATE AU CAMEROUN</>
                ) : (
                  <>GRAND SAVATE <br />EVENT IN CAMEROON</>
                )}
              </h3>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 py-1">
                <button
                  onClick={() => openVideoLightbox('gala-2025')}
                  className="inline-flex items-center gap-1.5 bg-feca-red/20 hover:bg-feca-red/40 border border-feca-red text-feca-red px-3 py-1.5 rounded-lg text-xs font-display font-bold cursor-pointer transition-all"
                >
                  <Play size={11} className="fill-feca-red text-feca-red" />
                  <span>{language === 'fr' ? 'Teaser Officiel' : 'Official Teaser'}</span>
                </button>
                <button
                  onClick={() => openVideoLightbox('combat-clash')}
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-display font-bold cursor-pointer transition-all"
                >
                  <Swords size={11} />
                  <span>{language === 'fr' ? 'Choc Continentaux Elite' : 'Elite Continental Clash'}</span>
                </button>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto lg:mx-0">
                {language === 'fr' 
                  ? "S.E. Chantal BIYA parraine deux finales mondiales spectaculaires réunissant deux continents pour un titre unifié de Boxe Française. Un rendez-vous historique à Yaoundé."
                  : "H.E. Chantal BIYA sponsors two spectacular world finals bringing together two continents for a unified French Boxing title. An historic rendezvous in Yaounde."}
              </p>

              {/* Dynamic urgent countdown timer */}
              <div className="max-w-sm mx-auto lg:mx-0 py-2">
                <EventCountdown targetDateStr="2025-11-29T15:00:00" />
              </div>

              {/* Local information locator bullet */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-left bg-slate-950 border border-slate-800/80 p-3 rounded-xl max-w-sm mx-auto lg:mx-0">
                <div>
                  <span className="block text-[9px] font-mono text-slate-500">{language === 'fr' ? 'DATE DU CHOC' : 'CLASH DATE'}</span>
                  <span className="block font-sans text-xs font-bold text-white flex items-center gap-1">
                    <Calendar size={12} className="text-feca-red" /> 29 Nov 2025
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-slate-500">{language === 'fr' ? 'EMPLACEMENT' : 'LOCATION'}</span>
                  <span className="block font-sans text-xs font-bold text-white flex items-center gap-1">
                    <MapPin size={12} className="text-feca-gold" /> {language === 'fr' ? 'Palais des Sports' : 'Palais des Sports Arena'}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 font-mono">
                📞 INFOLINE: <span className="text-white">+237 697 370 486</span> / <span className="text-white">+237 690 155 182</span>
              </div>
            </div>

            {/* Duelists Cards Display */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono text-slate-400 block text-center uppercase tracking-wider">
                {language === 'fr' ? 'FIGHT CARD DU GALA MONDIAL (YAOUNDÉ)' : 'WORLD GALA FIGHT CARD (YAOUNDE)'}
              </span>

              {upcomingFights.map(fight => (
                <div 
                  key={fight.id} 
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors"
                >
                  {/* Contender 1 */}
                  <div className="flex-1 text-center sm:text-left">
                    <span className="block text-[8px] font-mono text-slate-500">{language === 'fr' ? 'REPRÉSENTANT RECONNU' : 'RECOGNIZED CONTENDER'}</span>
                    <span className="font-display font-extrabold text-sm text-white block">
                      {fight.contenders.fighterA}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                      {fight.contenders.flagA} • <span className="font-mono text-[9px] text-feca-gold">{fight.contenders.rankA}</span>
                    </span>
                  </div>

                  {/* VS indicator pill */}
                  <div className="shrink-0 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-feca-red/10 border border-feca-red/40 flex items-center justify-center">
                      <span className="font-mono font-black text-[10px] text-feca-red">VS</span>
                    </div>
                    <span className="block text-[8px] text-feca-gold font-mono tracking-wider mt-1 uppercase font-bold text-center">
                      {fight.type}
                    </span>
                  </div>

                  {/* Contender 2 */}
                  <div className="flex-1 text-center sm:text-right">
                    <span className="block text-[8px] font-mono text-slate-500">{language === 'fr' ? "CHAMPION DE L'UNION APPOSÉ" : "UNION CHAMPION CHALLENGER"}</span>
                    <span className="font-display font-extrabold text-sm text-white block">
                      {fight.contenders.fighterB}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-end gap-1 mt-0.5">
                      <span className="font-mono text-[9px] text-slate-400 mr-1">{fight.contenders.rankB}</span> {fight.contenders.flagB}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => onPageChange('boutique')}
                  className="px-5 py-2 rounded-lg bg-feca-gold text-slate-950 text-xs font-display font-bold hover:bg-yellow-500 transition-colors cursor-pointer"
                >
                  {language === 'fr' ? 'Achat Tickets de Combat 🎟️' : 'Purchase Combat Tickets 🎟️'}
                </button>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* 4. PALMARÈS SUMMARY */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
              {language === 'fr' ? 'Un Bilan de Sacre' : 'A Record of Glory'}
            </span>
            <h2 className="font-display font-black text-3xl text-slate-100 uppercase mt-1 leading-tight">
              {language === 'fr' ? 'Une Tradition de Médailles' : 'A Tradition of Medals'}
            </h2>
            <p className="text-slate-400 text-sm">
              {language === 'fr' 
                ? "La Fecasavate n'accompagne pas seulement les pratiquants : nous façonnons des athlètes d'envergure internationale capables de vaincre les meilleures délégations sur la scène mondiale."
                : "Fecasavate does not just support practitioners: we mold athletes of international stature capable of defeating the best delegations on the world stage."}
            </p>
            
            <div className="pt-2">
              <button 
                onClick={() => onPageChange('palmares')}
                className="inline-flex items-center gap-1 text-xs text-feca-gold hover:underline font-mono font-bold cursor-pointer"
              >
                <span>{language === 'fr' ? 'VOIR LE PALMARÈS HISTORIQUE COMPLET' : 'VIEW THE COMPLETE HISTORIC MEDAL LIST'}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-feca-gold/15 border border-feca-gold/25 text-feca-gold">
                <Trophy size={16} />
              </div>
              <span className="text-[10px] font-mono text-feca-gold uppercase tracking-wider font-bold">Bulgarie 2023</span>
              <h4 className="font-display font-bold text-base text-slate-100 mt-1.5">Akouan Pharelle</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-2 font-sans">
                {language === 'fr' 
                  ? "Sacré champion du monde Savate Pro au cours d'un tournoi explosif, asseyant la domination de l’école technique du Cameroun."
                  : "Crowned Savate Pro World Champion during an explosive tournament, cementing the technical dominance of the Cameroonian academy."}
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-feca-gold/15 border border-feca-gold/25 text-feca-gold">
                <Trophy size={16} />
              </div>
              <span className="text-[10px] font-mono text-feca-gold uppercase tracking-wider font-bold">Le Caire 2024</span>
              <h4 className="font-display font-bold text-base text-slate-100 mt-1.5">{language === 'fr' ? 'Équipe Nationale' : 'National Team'}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-2 font-sans">
                {language === 'fr' 
                  ? "Le Cameroun s'impose comme la 1ère nation subsaharienne de Savate Boxe Française lors des Championnats Continentaux."
                  : "Cameroon emerges as the 1st sub-Saharan nation in French Savate Boxing during the Continental Championships."}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. GUEST TESTIMONIALS */}
      <section className="bg-slate-900/40 border-y border-slate-800/80 py-16">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
              {language === 'fr' ? 'La Voix des Gymnases' : 'Voices from the Gymnasiums'}
            </span>
            <h3 className="font-display font-black text-2xl text-slate-100 uppercase mt-1">
              {language === 'fr' ? 'Témoignages de nos Membres' : 'Our Member Testimonials'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonies.map((item, i) => (
              <div 
                key={i} 
                className="bg-slate-950 border border-slate-850 p-6 rounded-2xl relative flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 text-slate-800">
                  <Quote size={40} className="stroke-1 opacity-20" />
                </div>

                <div className="space-y-4">
                  {/* Stars gold widget */}
                  <div className="flex gap-1.5">
                    {Array.from({ length: item.stars }).map((_, s) => (
                      <Star key={s} size={12} className="fill-feca-gold text-feca-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-900 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-display font-bold text-xs text-feca-gold">
                    {item.name[0]}
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-slate-100">
                      {item.name}
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoLightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        initialVideoId={selectedVideoId} 
      />

    </div>
  );
}
