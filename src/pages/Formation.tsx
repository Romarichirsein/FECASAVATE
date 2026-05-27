/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, CheckCircle, Play, ChevronRight, Video, FileText, Compass, GraduationCap, Clock, Flame, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import VideoLightbox from '../components/VideoLightbox';
import { useLanguage } from '../components/LanguageContext';

interface FormationProps {
  onPageChange: (page: string) => void;
}

export default function Formation({ onPageChange }: FormationProps) {
  const { language } = useLanguage();
  const [activeVideoPart, setActiveVideoPart] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

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
    <div className="space-y-16 pb-16 px-4 max-w-7xl mx-auto font-sans">
      
      {/* 1. HERO DESCRIPTION */}
      <section className="text-center max-w-2xl mx-auto space-y-4 pt-10">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          {language === 'fr' ? 'Académie Nationale de Formation' : 'National Referee Academy'}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white leading-tight">
          {language === 'fr' ? 'Devenir Arbitre de Savate' : 'Become a Savate Referee'}
        </h1>
        <p className="text-slate-300 text-sm">
          {language === 'fr' 
            ? '"Devenez l’élite des arbitres de Savate au Cameroun" • Rejoignez notre programme de certification professionnelle en 6 parties pour arbitrer les tournois de Boxe Française.'
            : '"Join the elite team of Savate officials in Cameroon" • Complete our professional six-part certification program to officiate French Boxe combat meets.'}
        </p>
      </section>

      {/* 2. VALUE PROPOSITION BULLETS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <div key={i} className="p-6 rounded-2xl bg-feca-night border border-slate-850/80 hover:border-slate-700 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            
            <h4 className="font-display font-extrabold text-base text-white">
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
          <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase mb-5 leading-tight">
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
                    <h4 className="font-display font-medium text-xs text-white mt-1">
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

      {/* 4. CONVERSION ENROLLMENT FORM */}
      <section className="bg-gradient-to-tr from-indigo-950/20 via-slate-900/60 to-slate-950/80 border border-slate-800 p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          Session Pro 2026/2027
        </span>
        <h3 className="font-display font-black text-2xl uppercase text-white tracking-tight leading-none mt-1">
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

    </div>
  );
}
