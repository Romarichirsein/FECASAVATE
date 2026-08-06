/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, CheckCircle, Play, ChevronRight, Video, FileText, Compass, GraduationCap, Clock, Flame, Maximize2, ShieldCheck, Eye, Download, UserCheck, Sparkles, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import VideoLightbox from '../components/VideoLightbox';
import { useLanguage } from '../components/LanguageContext';
import { gradeRecipients, officialExperts } from '../data/sportData';

interface FormationProps {
  onPageChange: (page: string) => void;
}

export default function Formation({ onPageChange }: FormationProps) {
  const { language } = useLanguage();
  const [activeVideoPart, setActiveVideoPart] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [docModalOpen, setDocModalOpen] = useState<boolean>(false);
  const [gradeFilter, setGradeFilter] = useState<string>('Tous');

  const getModuleVideoId = (num: number): string => {
    switch (num) {
      case 1:
      case 2:
        return 'initiation-savate';
      case 3:
      case 5:
      case 6:
        return 'arbitrage-rules';
      case 4:
        return 'combat-clash';
      default:
        return 'initiation-savate';
    }
  };

  const parts = [
    { 
      num: 1, 
      title: language === 'fr' ? 'Initiation & Geste Rituels' : 'Initiation & Ritual Gestures', 
      desc: language === 'fr' 
        ? 'Règles de base, position réglementaire du juge-arbitre, gestuelle d’engagement et de salut des deux tireurs.' 
        : 'Basic guidelines, regulatory postures of the referee, and ritual salutes for both combatants.', 
      length: language === 'fr' ? '12 min' : '12 mins' 
    },
    { 
      num: 2, 
      title: language === 'fr' ? 'Notation Technique de l’Assaut' : 'Assault Technical Scoring', 
      desc: language === 'fr' 
        ? 'Comprendre et évaluer la touche. Différence stricte entre coup de pied armé règlementaire et coup frappé illicite.' 
        : 'Understanding and scoring touches. Strictest differences between armed kicks and disallowed blows.', 
      length: language === 'fr' ? '15 min' : '15 mins' 
    },
    { 
      num: 3, 
      title: language === 'fr' ? 'Évaluation des Avertissements' : 'Admonitions & Foul Penalties', 
      desc: language === 'fr' 
        ? 'Attribution des sanctions (poussées, coups non autorisés, manque de distance). Règle cruciale des 3 avertissements.' 
        : 'Attribution of warning points (pushes, void strikes, distance loss). The crucial 3-foul rule.', 
      length: language === 'fr' ? '18 min' : '18 mins' 
    },
    { 
      num: 4, 
      title: language === 'fr' ? 'Arbitrage Combat & Gestion K.O.' : 'Combat Refereeing & KO Management', 
      desc: language === 'fr' 
        ? 'Règles de haut-niveau. Procédure de décompte réglementaire des dix secondes lors d’un hors-combat et coordination médicale.' 
        : 'High-level combat officiating. Official ten-second count procedures, knockdown handling, and medical coordination.', 
      length: language === 'fr' ? '22 min' : '22 mins' 
    },
    { 
      num: 5, 
      title: language === 'fr' ? 'Réglementation Balance & Poids' : 'Weight Checking & Scale Rules', 
      desc: language === 'fr' 
        ? 'La charte des catégories de poids et visite d’aptitude officielle sous mandat du Ministère des Sports.' 
        : 'Official division weights and mandatory medical physicals under Cameroon Ministry of Sports mandates.', 
      length: language === 'fr' ? '10 min' : '10 mins' 
    },
    { 
      num: 6, 
      title: language === 'fr' ? 'Épreuve Finale & Certification' : 'Final Examination & Certification', 
      desc: language === 'fr' 
        ? 'Validation écrite et simulation de jury devant le comité supérieur de l’Académie de Savate de Yaoundé.' 
        : 'Written credentials checking and mock juries evaluated by Yaounde Savate Elite Board of Experts.', 
      length: language === 'fr' ? '25 min' : '25 mins' 
    }
  ];

  const benefits = [
    { 
      title: language === 'fr' ? 'Reconnaissance Officielle' : 'Official Credentials', 
      desc: language === 'fr' 
        ? 'Tous nos diplômes sont certifiés par la Fecasavate et homologués sous la tutelle du Ministère des Sports Camerounais (MINSEP), ouvrant les portes des championnats régionaux et d’Afrique Centrale.' 
        : 'All certifications are issued by Fecasavate and accredited under the tutelage of Cameroon Ministry of Sports (MINSEP), for professional access to regional tournaments or African Championships.' 
    },
    { 
      title: language === 'fr' ? 'Opportunités de Carrière' : 'Career Progression paths', 
      desc: language === 'fr' 
        ? 'Accédez aux jurys officiels des grands galas de Savate Pro, voyagez lors des sélections internationales FISav (Dakar, Le Caire, Paris), et percevez des indemnités de match réglementaires.' 
        : 'Officiate in premium events such as Professional Savate Galas, earn certified match allowances, and travel on team delegations with FISav (Dakar, Cairo, Paris).' 
    },
    { 
      title: language === 'fr' ? 'Développement Personnel' : 'Exceptional Focus & Ethics', 
      desc: language === 'fr' 
        ? 'Perfectionnez votre maîtrise psychologique, affinez votre prise de décision instantanée sous pression et devenez un pilier respecté respectant la charte d’éthique de la fédération.' 
        : 'Perfect your technical and psychological analysis under competition pressure, master lightning decision-making, and uphold high federal values.' 
    }
  ];

  const activePartData = parts.find(p => p.num === activeVideoPart) || parts[0];

  return (
    <div className="space-y-16 pb-16 font-sans">

      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-[55vh] min-h-[360px] overflow-hidden">
        <img
          src="/images/savate 6.png"
          alt="Formation FECASAVATE"
          className="w-full h-full object-cover object-center"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/savat2.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/40 to-feca-dark" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono mb-3"
          >
            {language === 'fr' ? 'Académie Nationale de Formation' : 'National Referee Academy'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl uppercase text-white leading-tight drop-shadow-lg"
          >
            {language === 'fr' ? 'Devenir Arbitre de Savate' : 'Become a Savate Referee'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-sm mt-4 max-w-2xl"
          >
            {language === 'fr' 
              ? '"Devenez l’élite des arbitres de Savate au Cameroun" • Programme de certification professionnelle en 6 parties.'
              : '"Join the elite team of Savate officials in Cameroon" • Six-part professional certification program.'}
          </motion.p>
        </div>
      </section>

      <div className="px-4 sm:px-8 max-w-[1700px] w-full mx-auto space-y-16">

      {/* 2. VALUE PROPOSITION BULLETS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <div key={i} className="p-6 rounded-2xl bg-feca-night border border-slate-850/80 hover:border-slate-700 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            
            <h4 className="font-display font-extrabold text-base text-slate-100">
              {b.title}
            </h4>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {b.desc}
            </p>
          </div>
        ))}
      </section>

      {/* 3. INTERACTIVE 6-PART TRAINING PATHWAY & VIDEO SIMULATOR */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Pathway Left List */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-feca-gold block uppercase">
            {language === 'fr' ? 'PROGRAMME DE CERTIFICATION' : 'CERTIFICATION PROGRAMME'}
          </span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-slate-100 uppercase mb-5 leading-tight">
            {language === 'fr' ? 'Les 6 Modules Académiques' : 'The 6 Academic Modules'}
          </h3>

          <div className="space-y-2.5">
            {parts.map(p => {
              const isActive = activeVideoPart === p.num;
              return (
                <button
                  key={p.num}
                  onClick={() => {
                    setActiveVideoPart(p.num);
                    setIsPlaying(false);
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isActive 
                      ? 'bg-feca-night border-feca-red text-white shadow-lg' 
                      : 'bg-slate-900/40 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-xs shrink-0 ${
                    isActive ? 'bg-feca-red text-white' : 'bg-slate-950 text-slate-500'
                  }`}>
                    P{p.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold uppercase truncate">
                      {p.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                      {language === 'fr' ? 'Durée :' : 'Duration:'} {p.length}
                    </span>
                  </div>
                  <ChevronRight size={14} className={isActive ? 'text-feca-red' : 'text-slate-600'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Player Simulator on Right */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Virtual Screen Viewport */}
            <div className="aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden ring-inner">
              
              {/* Background scanning lines */}
              <div className="absolute inset-x-0 bottom-0 bg-radial-gradient from-feca-red/10 to-transparent pointer-events-none w-full h-full" />
              
              {isPlaying ? (
                /* Streaming simulation graphic state */
                <div className="text-center space-y-4 z-10 w-full px-4">
                  {/* Neon pulsing loading spinner */}
                  <div className="w-14 h-14 rounded-full border-4 border-feca-red/20 border-t-feca-red border-b-feca-gold animate-spin mx-auto mb-2" />
                  
                  <div className="bg-slate-900/95 border border-slate-800 p-4 rounded-xl max-w-sm mx-auto shadow-xl">
                    <span className="text-[9px] font-mono text-feca-gold font-bold uppercase block tracking-wider animate-pulse">
                      {language === 'fr' ? '• FLUX CERTIFIÉ ACADÉMIE YAOUNDÉ LIVE' : '• CERTIFIED ACADEMY YAOUNDE LIVE FEED'}
                    </span>
                    <h4 className="font-display font-medium text-xs text-slate-100 mt-1">
                      {language === 'fr' ? 'Visualisation :' : 'Viewing:'} {activePartData.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-sans leading-relaxed">
                      {language === 'fr' 
                        ? '"Pour valider l’évaluation pratique d’arbitrage, analysez rigoureusement la position latérale du tireur et les points d’appuis au sol."'
                        : '"To pass the official practical judging assessment, rigorously analyze the fighter\'s lateral stance and ground pivot points."'}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="text-[11px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      {language === 'fr' ? 'Pause du Module' : 'Pause Module'}
                    </button>
                    <span className="text-slate-700 text-xs">•</span>
                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="text-[11px] font-mono text-feca-gold hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Maximize2 size={11} />
                      <span>{language === 'fr' ? 'Mode Plein Écran (HD)' : 'Full Screen HD'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Poster trigger state with dedicated Premium dual controls */
                <div className="text-center space-y-4 z-10 p-4">
                  {/* Central red hot play button with ring shadow */}
                  <div className="relative inline-block">
                    <button 
                      onClick={() => setLightboxOpen(true)}
                      className="w-16 h-16 rounded-full bg-feca-red hover:bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-feca-red/30 cursor-pointer hover:scale-105 active:scale-95 transition-all mx-auto"
                      title={language === 'fr' ? 'Démarrer la leçon vidéo' : 'Start video lesson'}
                    >
                      <Play size={24} className="ml-1 fill-white" />
                    </button>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-feca-gold rounded-full flex items-center justify-center border border-slate-950 shadow-md">
                      <span className="text-[8px] font-extrabold text-slate-950 font-mono">HD</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                      {language === 'fr' ? "SUPPORT D'ENSEIGNEMENT VIDÉO" : "VIDEO TEACHING SUPPORT"}
                    </span>
                    <h4 className="font-display font-extrabold text-sm text-slate-200 uppercase mt-1">
                      {language === 'fr' ? 'Module' : 'Module'} {activePartData.num} : {activePartData.title}
                    </h4>
                    
                    {/* Double trigger layout */}
                    <div className="flex items-center justify-center gap-2.5 pt-2 flex-wrap max-w-sm mx-auto">
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-display text-xs font-extrabold cursor-pointer transition-all uppercase"
                        title={language === 'fr' ? 'Démarrer la simulation de flux' : 'Start feed simulator'}
                      >
                        {language === 'fr' ? 'Écran interactif' : 'Interactive Screen'}
                      </button>
                      <button 
                        onClick={() => setLightboxOpen(true)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-feca-gold to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-slate-950 font-display text-xs font-extrabold cursor-pointer transition-all uppercase flex items-center gap-1.5 shadow-lg shadow-yellow-950/10"
                        title={language === 'fr' ? 'Ouvrir le lecteur de cinéma en continu' : 'Open continuous cinema player'}
                      >
                        <Maximize2 size={11} />
                        <span>{language === 'fr' ? 'Plein Écran' : 'Full Screen'} {activePartData.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom OSD dashboard */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-slate-500 font-mono select-none pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <Video size={11} /> 1080P HD
                </span>
                <span>FECA-SAVATE ACADEMY v.2026</span>
              </div>
            </div>

            {/* Sub description detailing what is inside part */}
            <div className="p-5 bg-slate-900 border-t border-slate-800">
              <span className="text-[10px] font-mono text-feca-gold font-bold uppercase">
                {language === 'fr' ? `Synopsis du Module ${activePartData.num}` : `Synopsis for Module ${activePartData.num}`}
              </span>
              <p className="text-slate-300 text-xs mt-1 font-sans leading-relaxed">
                {activePartData.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3.5 OFFICIEL FÉDÉRAL & EXPERT TECHNIQUE : Me PATRICK TIMBERT EVINA ── */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-feca-night border border-slate-800 p-6 sm:p-10 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-feca-red/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-[10px] font-mono text-feca-gold font-bold uppercase tracking-widest bg-feca-gold/10 border border-feca-gold/30 px-3 py-1 rounded-md inline-block mb-2">
              ENCADREMENT TECHNIQUE & ARBITRAGE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100 uppercase tracking-tight">
              Officiel Fédéral Me Patrick Timbert EVINA
            </h2>
            <span className="text-xs text-slate-400 font-mono block mt-1">
              Expert International & Encadrant Principal du Passage de Grade Officiel
            </span>
          </div>

          <div className="px-4 py-2 bg-slate-950 border border-feca-gold/30 rounded-xl text-right shrink-0">
            <span className="text-[9px] font-mono text-slate-400 block uppercase">SUPERVISION DIPLÔMÉE</span>
            <span className="text-xs font-bold text-feca-gold font-mono">Expert Multi-Disciplines</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Photo Frame */}
          <div className="lg:col-span-4 relative group">
            <div className="relative rounded-2xl overflow-hidden border-2 border-feca-gold/40 shadow-2xl shadow-yellow-950/20 aspect-3/4 max-w-sm mx-auto">
              <img 
                src="/images/patrick_evina.jpeg" 
                alt="Me Patrick Timbert Evina"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=80'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-center space-y-1">
                <span className="text-xs font-display font-black text-white uppercase tracking-wider block">
                  Me Patrick Timbert EVINA
                </span>
                <span className="text-[10px] text-feca-gold font-mono block">
                  Officiel Fédéral Homologué
                </span>
              </div>
            </div>
          </div>

          {/* Diplômes & Palmarès */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* DIPLÔMES */}
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-feca-gold">
                <GraduationCap className="w-5 h-5" />
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-100">
                  Diplômes Officiels & Certifications
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Boxe Française :</strong> BEES 1 – BPJEPS</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Kick Boxing, Boxe thaï, Pancrace :</strong> BPJEPS SPORTS DE CONTACT</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Lutte contact :</strong> BMF 2</span>
                </li>
              </ul>
            </div>

            {/* PALMARÈS */}
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-feca-red">
                <Award className="w-5 h-5" />
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-slate-100">
                  Palmarès de Prestige International
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-feca-gold font-bold uppercase block">Boxe Française</span>
                  <span className="font-bold text-slate-200">Champion de Belgique combat & Champion du monde vétéran</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block">Boxe Anglaise</span>
                  <span className="font-bold text-slate-200">Champion de France militaire</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase block">Kick Boxing</span>
                  <span className="font-bold text-slate-200">Champion du monde WFC et XFC</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Boxe Thaï & Lutte</span>
                  <span className="font-bold text-slate-200">Champion de France C1 Pro & 4X Champion de France / Europe Lutte</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3.6 PASSAGE DE GRADE OFFICIEL DU 12 JUILLET 2026 ── */}
      <section className="bg-feca-night border border-slate-800 p-6 sm:p-10 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-850 pb-6">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-md inline-block mb-2">
              SESSION NATIONALE RÉSULTATS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100 uppercase tracking-tight">
              Passage de Grade Officiel du 12 Juillet 2026
            </h2>
            <span className="text-xs text-slate-400 font-mono block mt-1">
              Liste Officielle des Récipiendaires • Encadré par Me EVINA PATRICK • DTN Ngo Nlep Henriette / Akouan Pharelle
            </span>
          </div>

          <button
            onClick={() => setDocModalOpen(true)}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-feca-gold/40 text-feca-gold font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-yellow-950/10"
          >
            <Eye size={16} />
            <span>Voir Document Officiel (Scan)</span>
          </button>
        </div>

        {/* GRADE FILTER BUTTONS */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mr-2">
            <Filter size={14} /> Grade :
          </span>
          {['Tous', 'Gant Jaune', 'Gant Rouge', 'Gant Vert', 'Gant Bleu'].map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-bold uppercase transition-all cursor-pointer ${
                gradeFilter === g
                  ? 'bg-feca-red text-white shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* ATHLETES RECIPIENDANCE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {(gradeFilter === 'Tous' ? gradeRecipients : gradeRecipients.filter(r => r.grade === gradeFilter)).map((r) => {
            const isGantRouge = r.grade === 'Gant Rouge';
            const isGantVert = r.grade === 'Gant Vert';
            const isGantBleu = r.grade === 'Gant Bleu';

            const badgeBg = isGantRouge 
              ? 'bg-red-950/80 border-red-500/50 text-red-200 shadow-red-950/50' 
              : isGantVert 
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200 shadow-emerald-950/50' 
              : isGantBleu 
              ? 'bg-blue-950/80 border-blue-500/50 text-blue-200 shadow-blue-950/50' 
              : 'bg-amber-950/80 border-amber-500/50 text-amber-200 shadow-amber-950/50';

            const dotBg = isGantRouge 
              ? 'bg-red-500' 
              : isGantVert 
              ? 'bg-emerald-500' 
              : isGantBleu 
              ? 'bg-blue-500' 
              : 'bg-amber-400';

            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950 border border-slate-850 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo Header */}
                <div className="aspect-4/3 relative overflow-hidden bg-slate-900">
                  <img
                    src={r.imageUrl || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=80'}
                    alt={r.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Grade Badge */}
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md ${badgeBg}`}>
                    <span className={`w-2 h-2 rounded-full ${dotBg}`} />
                    <span>{r.grade}</span>
                  </div>
                </div>

                {/* Info Body */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-slate-100 uppercase leading-snug group-hover:text-feca-gold transition-colors">
                      {r.name}
                    </h4>
                    {r.degree && (
                      <span className="text-[11px] font-mono text-feca-gold font-semibold block mt-0.5">
                        {r.degree}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Passage du {r.date}</span>
                    <span className="text-emerald-400 font-bold">Validé FISav</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* DOCUMENT SCAN MODAL LIGHTBOX */}
      <AnimatePresence>
        {docModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setDocModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-feca-gold" />
                  <span className="font-display font-bold text-sm uppercase text-slate-100">
                    Document Officiel - Passage de Grade du 12 Juillet 2026
                  </span>
                </div>
                <button
                  onClick={() => setDocModalOpen(false)}
                  className="p-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1 flex justify-center bg-slate-950">
                <img
                  src="/images/passage_grade_12jul2026.jpeg"
                  alt="Attestation Officielle Passage de Grade 12 Juillet 2026"
                  className="max-w-full h-auto rounded-xl shadow-2xl border border-slate-800"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. PROJET DE NOUVELLE RÉGLEMENTATION DES PASSAGES DE GRADE */}
      <section className="bg-feca-night border border-slate-800 p-6 sm:p-10 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Seal / Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-850 pb-6">
          <div>
            <span className="text-[10px] font-mono text-feca-gold font-bold uppercase tracking-widest bg-feca-gold/10 border border-feca-gold/30 px-3 py-1 rounded-md inline-block mb-2">
              TEXTE RÉGLEMENTAIRE OFFICIEL
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100 uppercase tracking-tight">
              Projet de nouvelle réglementation des passages de grade
            </h2>
            <span className="text-xs text-slate-400 font-mono block mt-1">
              Fédération Camerounaise de Savate Boxe Française (FECASAVAT)
            </span>
          </div>

          <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-right shrink-0">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">DIRECTION TECHNIQUE NATIONALE</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">Homologation & Certification</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-2xl border border-slate-850">
          Dans le cadre de l’harmonisation et de la professionnalisation des formations et des passages de grade, la Fédération Camerounaise de Savate Boxe Française met en place une nouvelle réglementation qui entrera prochainement en vigueur.
        </p>

        {/* ARTICLES GRID */}
        <div className="space-y-6">
          
          {/* ARTICLE 1 */}
          <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-feca-gold" />
              <h3 className="font-display font-extrabold text-sm uppercase text-slate-100">
                Article 1 – Grades fédéraux
              </h3>
            </div>
            
            <p className="text-xs text-slate-400">
              Les grades officiels de la Savate Boxe Française reconnus sur le territoire national sont les suivants :
            </p>

            {/* GLOVES BADGES GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-2.5 bg-blue-950/40 border border-blue-500/30 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                <span className="text-xs font-bold text-blue-200">Gant bleu</span>
              </div>
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-emerald-200">Gant vert</span>
              </div>
              <div className="p-2.5 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                <span className="text-xs font-bold text-red-200">Gant rouge</span>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-600 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white shrink-0" />
                <span className="text-xs font-bold text-white">Gant blanc</span>
              </div>
              <div className="p-2.5 bg-amber-950/40 border border-amber-500/30 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                <span className="text-xs font-bold text-amber-200">Gant jaune</span>
              </div>
              <div className="p-2.5 bg-slate-800 border border-slate-400 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-slate-300 to-slate-100 shrink-0" />
                <span className="text-xs font-bold text-slate-100">Gant d’Argent (GAT)</span>
              </div>
              <div className="col-span-2 p-2.5 bg-gradient-to-r from-amber-950/50 via-slate-900 to-yellow-950/50 border border-feca-gold/40 rounded-xl flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-600 via-slate-300 to-yellow-400 shrink-0 animate-pulse" />
                <span className="text-xs font-bold text-feca-gold">Gants de bronze, d’argent et d’or de compétition</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic font-mono border-t border-slate-900 pt-2">
              • L’attribution de l’ensemble de ces grades est exclusivement réglementée par la Fédération Camerounaise de Savate Boxe Française.
            </p>
          </div>

          {/* ARTICLE 2 & 3 GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl space-y-2">
              <h3 className="font-display font-extrabold text-sm uppercase text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-feca-red" />
                Article 2 – Organisation des formations
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Les formations et les passages de grade seront organisés au niveau des Ligues, sous l’autorité de la Direction Technique Nationale (DTN) et de la Commission Fédérale des Grades.
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                La Direction Technique Nationale désignera les formateurs, les examinateurs et les membres des jurys habilités à conduire les formations et à évaluer les candidats.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl space-y-2">
              <h3 className="font-display font-extrabold text-sm uppercase text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-feca-red" />
                Article 3 – Validation des grades
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Aucun professeur, moniteur, président de Ligue, dirigeant de club ou responsable régional n’est habilité à délivrer, signer ou valider seul un diplôme ou un grade fédéral.
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                Tous les passages de grade seront évalués par la Commission Fédérale des Grades et la DTN, seules autorités compétentes. Tous les diplômes porteront la validation officielle et seront enregistrés dans les archives fédérales.
              </p>
            </div>
          </div>

          {/* ARTICLE 4 & 5 GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl space-y-2">
              <h3 className="font-display font-extrabold text-sm uppercase text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-feca-gold" />
                Article 4 – Modalités
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Les programmes de formation, les conditions d’accès, les modalités d’évaluation, le calendrier des sessions ainsi que les tarifs des formations et des examens seront fixés exclusivement par la Fédération et communiqués officiellement.
              </p>
              <p className="text-[11px] text-feca-red font-mono pt-1">
                ⚠️ Toute formation ou passage de grade hors réglementation ne pourra faire l’objet d’aucune reconnaissance fédérale.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl space-y-2">
              <h3 className="font-display font-extrabold text-sm uppercase text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-feca-gold" />
                Article 5 – Homologation des diplômes
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Tous les titulaires d’un diplôme de moniteur, d’instructeur ou d’un diplôme d’enseignement exerçant au Cameroun devront obligatoirement faire homologuer leur diplôme auprès de la FECASAVATE.
              </p>
              <p className="text-[11px] text-emerald-400 font-mono pt-1">
                ✓ Seuls les moniteurs inscrits sur la liste officielle homologuée seront habilités à encadrer et participer aux jurys.
              </p>
            </div>
          </div>

        </div>

        {/* DISPOSITIONS FINALES & SIGNATURE */}
        <div className="pt-4 border-t border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Dispositions Finales</span>
            <p className="text-[11px] text-slate-400 max-w-xl leading-relaxed font-sans">
              Cette réforme garantit une organisation uniforme, préserve la valeur des grades fédéraux et assure la crédibilité de la Savate au Cameroun. Entrée en vigueur fixée par le Comité Exécutif.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center shrink-0 space-y-1">
            <span className="text-[9px] font-mono text-slate-500 uppercase block">HOMOLOGATION DTN</span>
            <span className="font-display font-black text-sm text-feca-gold uppercase block">Akouan Pharelle</span>
            <span className="text-[10px] text-slate-400 font-mono block">Directeur Technique National</span>
          </div>
        </div>

      </section>

      {/* 5. CONVERSION ENROLLMENT FORM */}
      <section className="bg-gradient-to-tr from-indigo-950/20 via-slate-900/60 to-slate-950/80 border border-slate-800 p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          Session Pro 2026/2027
        </span>
        <h3 className="font-display font-black text-2xl uppercase text-slate-100 tracking-tight leading-none mt-1">
          {language === 'fr' ? 'Prêt à arbitrer le Choc de Novembre 2025 ?' : 'Ready to Referee the November 2025 Clash?'}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
          {language === 'fr' 
            ? "Inscrivez-vous dès aujourd’hui pour soumettre vos dossiers physiques de licence. Notre secrétariat basé à Yaoundé (complexe Ndi-Samba) examinera votre profil d’athlète ou d’amateur."
            : "Register today to submit your accreditation physical file. Our centralized desk in Yaoundé will evaluate your fighter or sport affiliate profile."}
        </p>
        
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => onPageChange('espace-prive')}
            className="px-8 py-3.5 rounded-xl bg-feca-gold hover:bg-yellow-500 text-slate-950 text-xs font-display font-extrabold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-yellow-950/20 active:scale-98 cursor-pointer"
          >
            {language === 'fr' ? 'S\'inscrire à la Prochaine Session 🎓' : 'Enroll in upcoming Seminar 🎓'}
          </button>
        </div>
      </section>

      <VideoLightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        initialVideoId={getModuleVideoId(activeVideoPart)} 
      />

      </div>{/* /inner content wrapper */}
    </div>
  );
}
